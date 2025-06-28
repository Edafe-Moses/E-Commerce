'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser, clearError } from '@/lib/features/auth/authSlice';
import NavBar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Store, Eye, EyeOff, Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await dispatch(loginUser(formData)).unwrap();
      toast.success('Welcome back!');
      router.push('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleDecline = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <NavBar />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#1e1e1e_25%,#2a2a2a_50%,#1e1e1e_75%)] bg-[length:20px_20px] opacity-50"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <Link href="/auth/login" className="text-blue-500 text-xl font-semibold mr-4">Login</Link>
            <Link href="/auth/register" className="text-blue-500 text-xl font-semibold">Register</Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="text-center">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-white text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-white text-white placeholder-gray-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="text-right">
              <Link
                href="/auth/forgot-password"
                className="text-blue-500 text-sm hover:underline"
              >
                Lost your password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
              disabled={isLoading}
            >
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>

            <Button
              type="button"
              onClick={handleDecline}
              className="w-full bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2"
            >
              Decline
            </Button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}