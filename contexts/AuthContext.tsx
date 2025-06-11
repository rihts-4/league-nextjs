'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { adminEmails } from '@/lib/admin';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  // signUp: (email: string, password: string, options?: {
  //   data?: Record<string, any>
  // }) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  // resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        //   // Assign 'viewer' role if user is authenticated
        if (session?.user) {
          // 1. Get the 'viewer' role ID
          const { data: role, error: roleError } = await supabase
            .from('roles')
            .select('id')
            .eq('name', 'viewer')
            .single();

          if (!roleError && role?.id && !adminEmails.includes(session.user.email!)) {
            // 2. Upsert into user_roles
            await supabase
              .from('user_roles')
              .upsert(
                [{ user_id: session.user.id, role_id: role.id }],
                { onConflict: 'user_id,role_id' }
              );
          }
        }
      }
    )

    return () => subscription.unsubscribe();
  }, [user]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  };

  const signIn = async (email_: string, password_: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email_,
        password: password_
      })
      
      return { error };
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  // const signUp = async (email: string, 
  //   password: string, 
  //   options?: { data?: Record<string, any> 
  // }) => {
  //   try {
  //     const { error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         data: options?.data || {},
  //       },
  //     })
  //     return { error }
  //   } catch (error) {
  //     return { error: error as AuthError }
  //   }
  // }

  /*
  * ======================================================== 
  * I DONT UNDERSTAND BUT IT WORKS
  * ======================================================== 
  */
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  const isAdmin = adminEmails?.includes(user?.email!);

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      isAdmin,
      signIn, 
      // signUp, 
      signInWithGoogle, 
      signOut, 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
return context;
}
