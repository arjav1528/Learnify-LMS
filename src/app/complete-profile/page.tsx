'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import toast, { Toaster } from 'react-hot-toast';
import { FaUser, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
export default function CompleteProfile() {
  const { user } = useUser();
  const router = useRouter();
  const userId = user?.id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'student', // Default role
    bio: '',
    profileImage: '',
  });

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
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Update user metadata
      const response = await fetch(`/api/user/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: formData.role,
            bio: formData.bio,
          }),
        }
       )

       console.log(response);


      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully!");

      // Redirect or perform any other actions after successful profile update
      const router = useRouter();
      if(formData.role === 'instructor'){
        router.push('/instructor/dashboard');
      }else{
        router.push('/dashboard');
      }

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl"
      >
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mb-4"
          >
            <FaUser className="h-10 w-10 text-purple-600" />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-gray-900">Complete Your Profile</h2>
          <p className="mt-3 text-md text-gray-600">
            Let's set up your account to personalize your learning experience
          </p>
        </div>

        <form className="mt-10 space-y-7" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
              <Input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="mt-1 focus:ring-purple-500 focus:border-purple-500 shadow-sm bg-white text-gray-800"
                placeholder="John"
              />
            </div>

            <div>
              <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="mt-1 focus:ring-purple-500 focus:border-purple-500 shadow-sm bg-white text-gray-800"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="role" className="text-gray-700 font-medium mb-2 block">I want to join as</Label>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className={`p-5 border-2 rounded-xl text-center transition-all ${
                  formData.role === 'student' 
                    ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => handleInputChange('role', 'student')}
              >
                <div className="flex flex-col items-center">
                  <FaGraduationCap className="h-8 w-8 mb-2 text-purple-500" />
                  <div className="font-semibold text-lg">Student</div>
                  <div className="text-sm text-gray-500 mt-1">I want to learn new skills</div>
                </div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className={`p-5 border-2 rounded-xl text-center transition-all ${
                  formData.role === 'instructor' 
                    ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => handleInputChange('role', 'instructor')}
              >
                <div className="flex flex-col items-center">
                  <FaChalkboardTeacher className="h-8 w-8 mb-2 text-purple-500" />
                  <div className="font-semibold text-lg">Instructor</div>
                  <div className="text-sm text-gray-500 mt-1">I want to share my knowledge</div>
                </div>
              </motion.button>
            </div>
          </div>

          <div>
            <Label htmlFor="bio" className="text-gray-700 font-medium">Bio</Label>
            <motion.div
              whileHover={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
              className="mt-2 relative rounded-xl border border-gray-300 bg-white overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
              <Input
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="border-none pt-4 px-4 focus:ring-0 text-base placeholder:text-gray-400 bg-white text-gray-800"
                placeholder="Tell us a little about yourself..."
              />
              <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <div className="text-xs text-gray-500">Share your interests or goals</div>
                <div className="text-xs font-medium text-purple-600">
                  {formData.bio.length}/250 characters
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button
              type="submit"
              className="w-full py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg font-medium rounded-xl shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : 'Complete Your Profile'}
            </Button>
          </motion.div>
        </form>

        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            success: {
              duration: 5000,
              iconTheme: {
                primary: '#10B981',
                secondary: 'white',
              },
              style: {
                background: '#10B981',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: 'white',
              },
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
      </motion.div>
    </div>
  );
}