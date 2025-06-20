"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import * as Tooltip from '@radix-ui/react-tooltip';
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  UserRound, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Calendar,
  ChevronRight,
  Clock,
  Menu,
  X
} from 'lucide-react';
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: BookOpen, label: 'My Courses', id: 'courses' },
  { icon: Award, label: 'Certificates', id: 'certificates' },
  { icon: UserRound, label: 'Profile', id: 'profile' },
  { icon: Settings, label: 'Settings', id: 'settings' },
  { icon: LogOut, label: 'Logout', id: 'logout' },
];

const enrolledCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop',
    progress: 68,
    lastLesson: 'CSS Grid and Flexbox Layout Techniques',
  },
  {
    id: 2,
    title: 'Data Science: Python for Beginners',
    instructor: 'Michael Chen',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    progress: 42,
    lastLesson: 'Data Visualization with Matplotlib',
  },
  {
    id: 3,
    title: 'UI/UX Design Masterclass',
    instructor: 'Emma Rodriguez',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
    progress: 24,
    lastLesson: 'Principles of Visual Hierarchy',
  }
];

const certificates = [
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    issueDate: 'May 15, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=150&fit=crop'
  },
  {
    id: 2,
    title: 'HTML & CSS Mastery',
    issueDate: 'March 22, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=200&h=150&fit=crop'
  }
];

const deadlines = [
  {
    id: 1,
    title: 'JavaScript Quiz',
    course: 'Web Development Bootcamp',
    dueDate: 'June 10, 2025',
    type: 'Quiz',
  },
  {
    id: 2,
    title: 'Final Project Submission',
    course: 'UI/UX Design Masterclass',
    dueDate: 'June 15, 2025',
    type: 'Assignment',
  }
];

export default function StudentDashboard() {
  const { user } = useUser();
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const overallProgress = Math.round(
    enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200"
      >
        <div className="p-4 border-b border-gray-200">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Learnify
            </span>
          </motion.div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => (
              <Tooltip.Provider key={item.id}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg transition-all w-full",
                        activeSidebarItem === item.id
                          ? "bg-purple-50 text-purple-700" 
                          : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                      )}
                      onClick={() => setActiveSidebarItem(item.id)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-white px-3 py-2 rounded-lg shadow-lg text-sm"
                      sideOffset={5}
                    >
                      {item.label}
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-30"
            onClick={toggleMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Mobile */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: isMobileSidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white"
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Learnify
            </span>
            <button 
              onClick={toggleMobileSidebar}
              className="text-gray-500 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg transition-all w-full",
                  activeSidebarItem === item.id
                    ? "bg-purple-50 text-purple-700" 
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                )}
                onClick={() => {
                  setActiveSidebarItem(item.id);
                  setIsMobileSidebarOpen(false);
                }}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-white border-b border-gray-200 shadow-sm z-10"
        >
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={toggleMobileSidebar}
                className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 md:ml-0">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl font-semibold text-gray-800"
                >
                  Hi {user?.firstName || 'there'} 👋
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm text-gray-500"
                >
                  Welcome back to your dashboard
                </motion.p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center relative">
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm bg-gray-50"
                />
              </div>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative p-1 rounded-full text-gray-500 hover:bg-gray-100"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                    </motion.button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-white px-3 py-2 rounded-lg shadow-lg text-sm"
                      sideOffset={5}
                    >
                      You have 3 new notifications
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src={user?.imageUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"}
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Continue Learning and My Courses */}
              <div className="lg:col-span-2 space-y-6">
                {/* Continue Learning */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">Continue Learning</h2>
                      <motion.span 
                        whileHover={{ x: 5 }}
                        className="text-sm text-purple-700 hover:underline cursor-pointer flex items-center"
                      >
                        View all my courses <ChevronRight className="h-4 w-4 ml-1" />
                      </motion.span>
                    </div>
                    <div className="relative">
                      <div className="aspect-video relative rounded-lg overflow-hidden">
                        <Image
                          src={enrolledCourses[0].thumbnail}
                          alt={enrolledCourses[0].title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold mb-1">{enrolledCourses[0].title}</h3>
                          <p className="text-white/80 text-sm mb-2">{enrolledCourses[0].lastLesson}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${enrolledCourses[0].progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="bg-purple-600 h-2 rounded-full"
                            />
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-white/80 text-sm">{enrolledCourses[0].progress}% Complete</span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-purple-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                            >
                              Continue
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* My Courses */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">My Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {enrolledCourses.slice(1).map((course) => (
                        <motion.div
                          key={course.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-gray-50 rounded-lg overflow-hidden"
                        >
                          <div className="aspect-video relative">
                            <Image
                              src={course.thumbnail}
                              alt={course.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-gray-800 mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">Instructor: {course.instructor}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="bg-purple-600 h-2 rounded-full"
                              />
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">{course.progress}% Complete</span>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                              >
                                Continue
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Progress and Deadlines */}
              <div className="space-y-6">
                {/* Overall Progress */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Overall Progress</h2>
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-200"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <motion.circle
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: overallProgress / 100 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="text-purple-600"
                          strokeWidth="8"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-800">{overallProgress}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Upcoming Deadlines */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Deadlines</h2>
                  <div className="space-y-4">
                    {deadlines.map((deadline) => (
                      <motion.div
                        key={deadline.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
                      >
                        <div className="flex-shrink-0">
                          <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800">{deadline.title}</p>
                          <p className="text-sm text-gray-500">{deadline.course}</p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">Due: {deadline.dueDate}</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {deadline.type}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Certificates */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Certificates</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {certificates.map((certificate) => (
                      <motion.div
                        key={certificate.id}
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden"
                      >
                        <Image
                          src={certificate.thumbnail}
                          alt={certificate.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="text-white text-sm font-medium">{certificate.title}</h3>
                          <p className="text-white/80 text-xs">Issued: {certificate.issueDate}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}