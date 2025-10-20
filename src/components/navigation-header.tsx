'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Target, LogOut, User } from 'lucide-react';
import { NavigationHeaderProps } from '@/lib/types';

export function NavigationHeader({
  userName,
  showLogout = true,
  userType = 'student'
}: NavigationHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout? Your session will end.')) {
      // Clear session data based on user type
      if (userType === 'student') {
        localStorage.removeItem('studentId');
      } else if (userType === 'mentor') {
        localStorage.removeItem('mentorId');
      } else if (userType === 'admin') {
        localStorage.removeItem('adminId');
        // Clear any admin-specific session data
        sessionStorage.clear();
      }

      // Redirect to home
      router.push('/');
    }
  };

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">CareerGuide AI</span>
          </Link>

          {showLogout && userName && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <User className="h-4 w-4" />
                <span>Welcome, {userName}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
