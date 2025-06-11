'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Users, 
  UserCheck, 
  Calendar,
  LogOut,
  Shield,
  Home,
  Menu,
  X,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navigation() {
  const { user, isAdmin, signOut} = useAuth();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/leagues', label: 'Leagues', icon: Trophy },
    { href: '/teams', label: 'Teams', icon: Users },
    { href: '/games', label: 'Games', icon: Calendar },
  ];

  const adminNavItems = [
    { href: '/admin', label: 'Dashboard', icon: Shield },
    { href: '/admin/leagues', label: 'Manage Leagues', icon: Trophy },
    { href: '/admin/teams', label: 'Manage Teams', icon: Users },
    { href: '/admin/players', label: 'Manage Players', icon: UserCheck },
    { href: '/admin/games', label: 'Manage Games', icon: Calendar },
  ];

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Sports League</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {isAdmin && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-orange-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                    >
                      <Shield className="h-4 w-4" />
                      <span>Admin</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Admin Pages</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {adminNavItems.map((item) => (
                      <DropdownMenuItem asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center space-x-2"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user.email}
                </span>
                {isAdmin && (
                  <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                    Admin
                  </span>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
         

          <div className="md:hidden flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-4 py-4 border-b">
                    <span className="flex items-center space-x-2">
                      <Trophy className="h-6 w-6 text-blue-600" />
                      <span className="text-lg font-bold text-gray-900">Sports League</span>
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex flex-col px-4 py-2 space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-2 px-2 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    {isAdmin && (
                      <>
                        <div className="border-t my-2" />
                        {adminNavItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center space-x-2 px-2 py-2 rounded-md text-base font-medium text-orange-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                            onClick={() => setOpen(false)}
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="mt-auto px-4 py-4 border-t">
                    {user ? (
                      <div className="flex flex-col space-y-2">
                        <span className="text-sm text-gray-700">
                          Welcome, {user.email}
                        </span>
                        {isAdmin && (
                          <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full w-fit">
                            Admin
                          </span>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setOpen(false);
                            signOut();
                          }}
                          className="flex items-center space-x-1"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </Button>
                      </div>
                    ) : (
                      <Link href="/login" onClick={() => setOpen(false)}>
                        <Button className="w-full">Login</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}