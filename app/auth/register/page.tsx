'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { registerUser, clearError } from '@/lib/features/auth/authSlice';
import Header from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const inputs = [
    { id: 'name', name: 'name', type: 'text', placeholder: 'Enter your full name', required: true },
    { id: 'email', name: 'email', type: 'email', placeholder: 'Enter your email', required: true },
    { id: 'password', name: 'password', type: showPassword ? 'text' : 'password', placeholder: 'Create a password', required: true },
    { id: 'confirmPassword', name: 'confirmPassword', type: showConfirmPassword ? 'text' : 'password', placeholder: 'Confirm your password', required: true },
    { id: 'company', name: 'company', type: 'text', placeholder: 'Enter your company name', required: false },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (formData.company.trim() && !formData.name.trim()) {
      toast.error('Full name is required for business accounts');
      return;
    }

    try {
      await dispatch(registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        company: formData.company || undefined,
        accountType: 'B2C'
      })).unwrap();
      toast.success('Account created successfully!');
      router.push('/');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Header />
      
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

            {inputs.map((input) => (
              <div key={input.id} className="space-y-2">
                {input.id === 'password' && (
                  <div className="relative">
                    <Input
                      id={input.id}
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      value={formData[input.name as keyof typeof formData]}
                      onChange={handleChange}
                      required={input.required}
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
                )}
                {input.id === 'confirmPassword' && (
                  <div className="relative">
                    <Input
                      id={input.id}
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      value={formData[input.name as keyof typeof formData]}
                      onChange={handleChange}
                      required={input.required}
                      className="w-full bg-transparent border-white text-white placeholder-gray-400"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-white"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                )}
                {(input.id !== 'password' && input.id !== 'confirmPassword') && (
                  <Input
                    id={input.id}
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={formData[input.name as keyof typeof formData]}
                    onChange={handleChange}
                    required={input.required}
                    className="w-full bg-transparent border-white text-white placeholder-gray-400"
                  />
                )}
              </div>
            ))}

            <div className="text-left text-sm">
              <Link
                href="/privacy-policy"
                className="text-blue-500 hover:underline"
              >
                Privacy Policy
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2"
              disabled={isLoading}
            >
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Register
            </Button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}