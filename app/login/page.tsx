'use client';

// Login page, MVP done, next is leagues page

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false); THIS IS FOR REMEMBER ME FUNCTIONALITY
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signIn } = useAuth();
  const router = useRouter();
  const showPwIcon = <Image src={showPassword ? '/icons/show_pw.png' : '/icons/hide_pw.png'} alt="show password" width={24} height={24} />

  /*
  * ======================================================== 
  * START OF LOGIN, REGISTER, AND GOOGLE LOGIN FUNCTIONALITY 
  * ======================================================== 
  */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try{
      const { error } = await signIn(email, password);
        if (error) {
          setError(error.message || 'Invalid email or password');
        } else {
          router.push('/admin');
        }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
    /*
  * ======================================================== 
  * END` OF LOGIN AND REGISTER FUNCTIONALITY 
  * ======================================================== 
  */
    // const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    // if(submitter?.name === 'login') {
    //   setError('');
    //   setLoading(true);
    //   try {
    //     const { error } = await signIn(email, password);
    //     if (error) {
    //       setError(error.message || 'Invalid email or password');
    //     } else {
    //       router.push('/');
    //     }
    //   } catch (err) {
    //     setError('An unexpected error occurred');
    //   } finally {
    //     setLoading(false);
    //   }
    // } else if(submitter?.name === 'register') {
    //   setError('');
    //   setLoading(true);
    //   try {
    //     const { error } = await signUp(email, password);
    //     if (error) {
    //       setError(error.message || 'Failed to register');
    //     } else {
    //       router.push('/');
    //     }
    //   } catch (err) {
    //     setError('An unexpected error occurred');
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    /*
  * ======================================================== 
  * END OF LOGIN AND REGISTER FUNCTIONALITY, the bottom is only for admin
  * ======================================================== 
  */
  };

  /*
  * ======================================================== 
  * I DONT UNDERSTAND BUT IT WORKS
  * ======================================================== 
  */
  const handleSSOLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message || 'Failed to sign in with Google');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  /*
  * ======================================================== 
  * END OF LOGIN, REGISTER, AND GOOGLE LOGIN FUNCTIONALITY 
  * ======================================================== 
  */

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Left: Login Form */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 bg-white">
          <div className="flex flex-col items-center mb-8">
            {/* Logo */}
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Image src="https://picsum.photos/id/22/48" className='rounded-full' alt="logo" width={48} height={48} />
            </div>
            <h1 className="text-2xl font-bold mb-1">Welcome!</h1>
            {/* <p className="text-gray-500 text-sm">
              Don&apos;t have an account yet?{' '}
              <a href="#" className="text-blue-600 hover:underline font-medium">Sign up now</a>
            </p> */}
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="mt-1 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showPwIcon}
                </button>
              </div>
            </div>
            {/* REMEMBER ME FUNCTIONALITY */}
            {/* <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                Remember me
              </label>
            </div> */}
            {error && (
              <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-center">
                {error}
              </div>
            )}
              <Button type="submit" name="login" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Log in'}
              </Button>
              {/* REGISTER FUNCTIONALITY
              <Button type="submit" name="register" className="w-full" variant="outline">
                Register
              </Button>
              */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-2 text-gray-400 text-xs">OR</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="w-full flex items-center justify-center border border-gray-300 bg-white text-gray-700 font-medium rounded-md py-2 hover:bg-gray-50 transition"
              onClick={handleSSOLogin}
            >
              <span className="mr-2 flex items-center">
                <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M44.5 20H24V28.5H36.9C35.5 33.1 31.2 36.5 24 36.5C16.3 36.5 10 30.2 10 22.5C10 14.8 16.3 8.5 24 8.5C27.2 8.5 30.1 9.6 32.3 11.6L38.1 6.1C34.5 2.8 29.6 0.5 24 0.5C11.8 0.5 2 10.3 2 22.5C2 34.7 11.8 44.5 24 44.5C35.2 44.5 44 35.7 44 24.5C44 23.2 44.3 21.6 44.5 20Z" fill="#FFC107"/>
                    <path d="M6.3 14.1L13.1 19.1C15.1 15.1 19.2 12.5 24 12.5C27.2 12.5 30.1 13.6 32.3 15.6L38.1 10.1C34.5 6.8 29.6 4.5 24 4.5C16.3 4.5 10 10.8 10 18.5C10 20.1 10.3 21.6 10.7 23.1L6.3 14.1Z" fill="#FF3D00"/>
                    <path d="M24 44.5C31.2 44.5 36.5 41.1 36.9 36.5H24V28.5H44.5C44.3 29.8 44 31.4 44 32.5C44 35.7 35.2 44.5 24 44.5Z" fill="#4CAF50"/>
                    <path d="M44.5 20H24V28.5H36.9C36.5 33.1 31.2 36.5 24 36.5C19.2 36.5 15.1 33.9 13.1 29.9L6.3 34.9C10.3 41.1 16.3 44.5 24 44.5C35.2 44.5 44 35.7 44 24.5C44 23.2 44.3 21.6 44.5 20Z" fill="#1976D2"/>
                  </g>
                </svg>
              </span>
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </Button>
          </form>
        </div>
        {/* Right: Blue Pattern */}
        <div className="hidden md:block w-1/2 bg-[#0a1a3a]">
          <div className="h-full w-full flex flex-wrap">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1/3 h-1/4 flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-600 rounded-br-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full flex justify-between items-center px-8 py-2 bg-transparent">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
          <Image src="https://picsum.photos/id/22/48" className='rounded-full' alt="logo" width={48} height={48} />
          </div>
          <span className="text-gray-700 font-medium">MyLeagues</span>
        </div>
        <span className="text-gray-400 text-sm">curated by <b>Mobbin</b></span>
      </div>
    </div>
  );
}