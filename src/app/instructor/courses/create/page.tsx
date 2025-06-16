'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { FaChalkboardTeacher, FaTags, FaDollarSign, FaLanguage, FaImage } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';
import * as Tooltip from '@radix-ui/react-tooltip';
import { CourseLevel } from '@/models/models';

interface CourseFormData {
  title: string;
  description: string;
  thumbnail: string;
  language: string;
  level: CourseLevel;
  categoryId: string;
  price: number;
  tags: string[];
}

export default function CreateCourse() {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    thumbnail: '',
    language: '',
    level: 'beginner',
    categoryId: '',
    price: 0,
    tags: [],
  });

  // Dropzone for thumbnail
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    disabled: isLoading,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFormData(prev => ({ ...prev, thumbnail: file.name }));
        setThumbnailPreview(URL.createObjectURL(file));
      }
    }
  });

  const handleInputChange = (field: keyof CourseFormData, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('language', formData.language);
      formDataToSend.append('level', formData.level);
      formDataToSend.append('categoryId', formData.categoryId);
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('tags', JSON.stringify(formData.tags));
      formDataToSend.append('instructorId', user?.id || '');

      // Get the file from the dropzone
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formDataToSend.append('file', fileInput.files[0]);
      }

      const response = await fetch('/api/courses/create', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      toast.success('Course created successfully!');
      router.push('/instructor/dashboard');
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('Failed to create course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip.Provider>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-blue-100 py-16 px-4 flex items-center justify-center relative"
      >
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="bg-white rounded-xl p-8 shadow-2xl flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="text-lg font-medium text-gray-700">Creating your course...</p>
            </div>
          </motion.div>
        )}
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="w-full max-w-2xl"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1 }}
            className="h-2 mb-6 rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400 shadow-lg"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-purple-200"
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 mb-4 shadow-lg"
              >
                <FaChalkboardTeacher className="w-12 h-12 text-white" />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-extrabold text-black drop-shadow-lg"
              >
                Create a Course
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-base font-medium text-black"
              >
                Share your knowledge with the world. Fill in the details below.
              </motion.p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="title" className="text-black flex items-center gap-2">
                    <FaChalkboardTeacher className="text-black" /> Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Modern Web Development"
                    className="mt-1 text-black bg-white/90 border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 shadow-md rounded-lg transition-all duration-200"
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="category" className="text-black flex items-center gap-2">
                    <MdCategory className="text-black" /> Category
                  </Label>
                  <Input
                    id="category"
                    type="text"
                    required
                    value={formData.categoryId}
                    onChange={(e) => handleInputChange('categoryId', e.target.value)}
                    placeholder="e.g., Web Development"
                    className="mt-1 text-black bg-white/90 border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 shadow-md rounded-lg transition-all duration-200"
                    disabled={isLoading}
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="thumbnail" className="text-black flex items-center gap-2">
                    <FaImage /> Thumbnail
                  </Label>
                  <div
                    {...getRootProps()}
                    className={clsx(
                      "mt-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer transition",
                      isDragActive ? "border-purple-500 bg-purple-50" : "border-purple-200 bg-white/90"
                    )}
                  >
                    <input {...getInputProps()} />
                    <AnimatePresence mode="wait">
                      {thumbnailPreview ? (
                        <motion.img
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-24 h-24 object-cover rounded-lg shadow mb-2"
                        />
                      ) : (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-black font-medium"
                        >
                          Drag & drop or click to upload
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Label htmlFor="language" className="text-black flex items-center gap-2">
                    <FaLanguage className="text-black" /> Language
                  </Label>
                  <Input
                    id="language"
                    type="text"
                    required
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    placeholder="e.g., English"
                    className="mt-1 text-black bg-white/90 border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 shadow-md rounded-lg transition-all duration-200"
                    disabled={isLoading}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Label htmlFor="description" className="text-black">Description</Label>
                <Textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your course in detail"
                  className="mt-1 text-black bg-white/90 border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 shadow-md rounded-lg transition-all duration-200"
                  disabled={isLoading}
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Label htmlFor="level" className="text-black flex items-center gap-2">
                    <FaChalkboardTeacher className="text-black" /> Level
                  </Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => handleInputChange('level', value as CourseLevel)}
                  >
                    <SelectTrigger className="mt-1 text-black bg-white/90 border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 shadow-md rounded-lg transition-all duration-200">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-purple-200 shadow-lg rounded-lg">
                      <SelectItem value="beginner" className="text-black hover:bg-purple-50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          Beginner
                        </div>
                      </SelectItem>
                      <SelectItem value="intermediate" className="text-black hover:bg-purple-50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          Intermediate
                        </div>
                      </SelectItem>
                      <SelectItem value="advanced" className="text-black hover:bg-purple-50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          Advanced
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Label htmlFor="price" className="text-black flex items-center gap-2">
                    <FaDollarSign className="text-black" /> Price (USD)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleInputChange('price', value === '' ? 0 : parseFloat(value));
                    }}
                    placeholder="e.g., 49.99"
                    className="mt-1 text-black bg-white/90 border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 shadow-md rounded-lg transition-all duration-200"
                    disabled={isLoading}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Label htmlFor="tags" className="text-black flex items-center gap-2">
                  <FaTags className="text-black" /> Tags
                </Label>
                <Input
                  id="tags"
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
                  placeholder="e.g., javascript, react, frontend"
                  className="mt-1 text-black bg-white/90 border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 shadow-md rounded-lg transition-all duration-200"
                  disabled={isLoading}
                />
                <p className="text-xs text-black mt-1 font-medium">Separate tags with commas</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="flex justify-end gap-4 pt-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isLoading}
                    className="min-w-[100px] border-purple-200 shadow"
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:from-purple-700 hover:to-blue-600 min-w-[140px] shadow-lg text-white font-bold disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </div>
                    ) : 'Create Course'}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
        <Toaster position="bottom-right" />
      </motion.div>
    </Tooltip.Provider>
  );
}