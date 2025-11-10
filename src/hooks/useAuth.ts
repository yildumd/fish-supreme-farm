'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('adminAuth') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const login = () => {
    localStorage.setItem('adminAuth', 'true');
    localStorage.setItem('adminLoginTime', new Date().toISOString());
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminLoginTime');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  return {
    isAuthenticated,
    login,
    logout
  };
}