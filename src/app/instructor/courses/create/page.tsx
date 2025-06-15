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
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { FaChalkboardTeacher, FaTags, FaDollarSign, FaLanguage, FaImage } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';
import * as Tooltip from '@radix-ui/react-tooltip';

type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

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
      // TODO: Backend Integration
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
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-blue-100 py-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
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
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-purple-200"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 mb-4 shadow-lg">
                <FaChalkboardTeacher className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-lg">Create a Course</h1>
              <p className="mt-2 text-base text-gray-700 font-medium">Share your knowledge with the world. Fill in the details below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      <Label htmlFor="title" className="text-black flex items-center gap-2">
                        <FaChalkboardTeacher /> Title
                      </Label>
                      <Input
                        id="title"
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g., Modern Web Development"
                        className="mt-1 placeholder:text-gray-700 placeholder:font-medium bg-gray-50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 shadow"
                      />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="bg-purple-700 text-white px-3 py-2 rounded shadow" side="top">
                      Enter a catchy course title!
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      <Label htmlFor="category" className="text-black flex items-center gap-2">
                        <MdCategory /> Category
                      </Label>
                      <Input
                        id="category"
                        type="text"
                        required
                        value={formData.categoryId}
                        onChange={(e) => handleInputChange('categoryId', e.target.value)}
                        placeholder="e.g., Web Development"
                        className="mt-1 placeholder:text-gray-700 placeholder:font-medium bg-gray-50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 shadow"
                      />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="bg-purple-700 text-white px-3 py-2 rounded shadow" side="top">
                      What category best fits your course?
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      <Label htmlFor="thumbnail" className="text-black flex items-center gap-2">
                        <FaImage /> Thumbnail
                      </Label>
                      <div
                        {...getRootProps()}
                        className={clsx(
                          "mt-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer transition",
                          isDragActive ? "border-purple-500 bg-purple-50" : "border-purple-200 bg-gray-50"
                        )}
                      >
                        <input {...getInputProps()} />
                        {thumbnailPreview ? (
                          <img src={thumbnailPreview} alt="Thumbnail preview" className="w-24 h-24 object-cover rounded-lg shadow mb-2" />
                        ) : (
                          <span className="text-gray-500 font-medium">Drag & drop or click to upload</span>
                        )}
                      </div>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="bg-purple-700 text-white px-3 py-2 rounded shadow" side="top">
                      Upload a course thumbnail image.
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      <Label htmlFor="language" className="text-black flex items-center gap-2">
                        <FaLanguage /> Language
                      </Label>
                      <Input
                        id="language"
                        type="text"
                        required
                        value={formData.language}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        placeholder="e.g., English"
                        className="mt-1 text-gray-900 font-medium placeholder:text-gray-700 placeholder:font-medium bg-gray-50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 shadow"
                      />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="bg-purple-700 text-white px-3 py-2 rounded shadow" side="top">
                      What language is your course in?
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </div>

              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Label htmlFor="description" className="text-black">Description</Label>
                    <Textarea
                      id="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your course in detail"
                      className="mt-1 text-gray-900 font-medium placeholder:text-gray-700 placeholder:font-medium bg-gray-50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 shadow"
                    />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="bg-purple-700 text-white px-3 py-2 rounded shadow" side="top">
                    Give a detailed and engaging course description.
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="level" className="text-black">Level</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => handleInputChange('level', value as CourseLevel)}
                  >
                    <SelectTrigger className="mt-1 bg-gray-50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 shadow">
                      <SelectValue placeholder="Select level" className="placeholder:text-gray-700 placeholder:font-medium" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      <Label htmlFor="price" className="text-black flex items-center gap-2">
                        <FaDollarSign /> Price (USD)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                        placeholder="e.g., 49.99"
                        className="mt-1 placeholder:text-gray-700 placeholder:font-medium bg-gray-50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 shadow"
                      />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="bg-purple-700 text-white px-3 py-2 rounded shadow" side="top">
                      Set a fair price for your course.
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </div>

              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Label htmlFor="tags" className="text-black flex items-center gap-2">
                      <FaTags /> Tags
                    </Label>
                    <Input
                      id="tags"
                      type="text"
                      value={formData.tags.join(', ')}
                      onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
                      placeholder="e.g., javascript, react, frontend"
                      className="mt-1 text-gray-900 font-medium placeholder:text-gray-700 placeholder:font-medium bg-gray-50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 shadow"
                    />
                    <p className="text-xs text-gray-600 mt-1 font-medium">Separate tags with commas</p>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="bg-purple-700 text-white px-3 py-2 rounded shadow" side="top">
                    Add keywords to help students find your course.
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>

              <div className="flex justify-end gap-4 pt-4">
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
                    className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:from-purple-700 hover:to-blue-600 min-w-[140px] shadow-lg text-white font-bold"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create Course'}
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
        <Toaster position="bottom-right" />
        <style jsx global>{`
          input::placeholder,
          textarea::placeholder {
            color: #4b5563 !important;
            opacity: 1 !important;
            font-weight: 500;
          }
        `}</style>
      </div>
    </Tooltip.Provider>
  );
}