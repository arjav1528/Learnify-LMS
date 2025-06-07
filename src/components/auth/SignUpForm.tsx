import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Mail, Lock, User, UserRound, ArrowLeft } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useSignUp, useUser } from '@clerk/nextjs';
import toast, { Toaster } from 'react-hot-toast';
import { clerkClient } from '@clerk/nextjs/server';

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' // Default role is student
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { signUp } = useSignUp();
  const { user } = useUser();

  // Add these new state variables
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!signUp) {
        throw new Error("Authentication service is not available.");
      }
      
      // Create the user account
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });
      
      // Prepare email verification
      toast.success("Account created! Sending verification code...");
      
      // Start email verification process
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      
      // Show verification UI
      setIsVerifying(true);
      setIsLoading(false);
      
    } catch (error) {
      // Handle different error cases
      console.error("Error during sign up:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create account. Please try again.");
      setIsLoading(false);
    }
  };

  // Add this to handle OTP input
  const handleVerificationInput = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0]; // Only take the first character if multiple are pasted
    }

    // Only allow numbers
    if (value && !/^[0-9]$/.test(value)) {
      return;
    }

    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    // Focus next input if current one is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const completeCode = verificationCode.join('');

  const handleVerifyEmail = async () => {
    if (completeCode.length !== 6) {
      toast.error("Please enter the complete verification code");
      return;
    }

    setIsLoading(true);
    try {
      if (!signUp) {
        throw new Error("Authentication service is not available.");
      }
      
      const result = await signUp.attemptEmailAddressVerification({
        code: completeCode
      });

      // Fix the comparison by checking the status correctly
      if (result.status !== "complete") {
        throw new Error("Email verification failed");
      }

      // Update the user metadata correctly
      if (user) {
        await user.update({
          unsafeMetadata: {
            role: formData.role,
          },
        });
      }

      toast.success("Email verified successfully!");
      // Redirect to dashboard based on role
      window.location.href = formData.role === 'student' 
        ? '/dashboard' 
        : '/instructor/dashboard';
      
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to verify email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      if (!signUp) {
        throw new Error("Authentication service is not available.");
      }
      
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast.success("A new verification code has been sent to your email");
      
    } catch (error) {
      console.error("Error resending code:", error);
      toast.error("Failed to resend verification code");
    }
  };

  const resetSignUp = () => {
    setIsVerifying(false);
    setVerificationCode(['', '', '', '', '', '']);
  };

  const passwordsMatch = formData.password === formData.confirmPassword;
  const isFormValid = formData.email && formData.password && passwordsMatch && formData.role;

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 5000,
            style: {
              background: '#10B981',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#EF4444',
            },
          },
        }}
      />

      {isVerifying ? (
        <div className="space-y-7">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify your email</h2>
            <p className="text-gray-600">
              We've sent a verification code to <span className="font-medium">{formData.email}</span>
            </p>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <Input
                  key={index}
                  // ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={verificationCode[index]}
                  onChange={(e) => handleVerificationInput(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  className="w-12 h-14 text-center text-xl font-semibold bg-gray-50 focus:bg-white focus:border-purple-700 focus:ring-purple-700/20"
                />
              ))}
            </div>

            <Button
              onClick={handleVerifyEmail}
              disabled={isLoading || completeCode.length !== 6}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white border-0 py-3.5 text-base font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify Email'
              )}
            </Button>

            <div className="flex flex-col sm:flex-row items-center justify-between w-full text-sm gap-4">
              <button 
                type="button" 
                onClick={resetSignUp}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to signup
              </button>
              
              <button 
                type="button" 
                onClick={handleResendCode}
                className="text-purple-700 hover:text-purple-900 font-medium"
              >
                Didn't receive a code? Resend
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Name field */}
          <div className="space-y-2.5">
            <Label htmlFor="signup-name" className="text-gray-700 text-sm font-medium block mb-1">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
              <Input
                id="signup-name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="pl-11 py-2.5 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-700 focus:ring-purple-700/20 transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-2.5">
            <Label htmlFor="signup-email" className="text-gray-700 text-sm font-medium block mb-1">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-11 py-2.5 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-700 focus:ring-purple-700/20 transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Role selection */}
          <div className="space-y-2.5">
            <Label htmlFor="signup-role" className="text-gray-700 text-sm font-medium block mb-1">
              I am a
            </Label>
            <div className="relative">
              <UserRound className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5 pointer-events-none z-10" />
              <select
                id="signup-role"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full pl-11 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-gray-900 appearance-none focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20 transition-all duration-300 cursor-pointer hover:bg-gray-100"
                required
              >
                <option value="student" className="py-2.5">Student</option>
                <option value="teacher" className="py-2.5">Teacher</option>
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M7 7l3 3 3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1.5 ml-0.5">
              {formData.role === 'student' 
                ? "As a student, you'll be able to enroll in courses and track your learning progress"
                : "As a teacher, you'll be able to create and manage courses"}
            </p>
          </div>

          {/* Password field */}
          <div className="space-y-2.5">
            <Label htmlFor="signup-password" className="text-gray-700 text-sm font-medium block mb-1">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
              <Input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-11 pr-11 py-2.5 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-700 focus:ring-purple-700/20 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password field */}
          <div className="space-y-2.5">
            <Label htmlFor="signup-confirm-password" className="text-gray-700 text-sm font-medium block mb-1">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
              <Input
                id="signup-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`pl-11 pr-11 py-2.5 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 transition-all duration-300 ${
                  formData.confirmPassword && !passwordsMatch 
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                    : 'focus:border-purple-700 focus:ring-purple-700/20'
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
            {formData.confirmPassword && !passwordsMatch && (
              <p className="text-red-400 text-xs mt-1.5 ml-0.5">Passwords do not match</p>
            )}
          </div>

          {/* Terms and conditions */}
          <div className="flex items-start space-x-3 text-sm mt-8">
            <input
              type="checkbox"
              required
              className="rounded border-gray-300 bg-gray-50 text-purple-700 focus:ring-purple-700/20 mt-0.5"
            />
            <span className="text-gray-600">
              I agree to the{' '}
              <button type="button" className="text-purple-700 hover:text-purple-800 transition-colors duration-200 cursor-pointer">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-purple-700 hover:text-purple-800 transition-colors duration-200 cursor-pointer">
                Privacy Policy
              </button>
            </span>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isLoading || isVerifying || !isFormValid}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white border-0 py-3.5 mt-8 text-base font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating account...</span>
              </div>
            ) : isVerifying ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Sending verification email...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </Button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social login buttons */}
          <div className="flex justify-center">
            <Button
                  type="button"
                  variant="outline"
                  className="w-full max-w-xs border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
              </div>
      </form>
      )}
    </>
  );
};