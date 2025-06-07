"use client";

import React, { useState } from 'react';
import Image from 'next/image';
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
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

export default function StudentDashboard() {
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
      thumbnail: 'https://readdy.ai/api/search-image?query=Web%20development%20course%20thumbnail%20showing%20code%20editor%2C%20modern%20website%20design%2C%20clean%20interface%20with%20purple%20accents%2C%20professional%20look%2C%20suitable%20for%20online%20learning%20platform&width=400&height=225&seq=course-1&orientation=landscape',
      progress: 68,
      lastLesson: 'CSS Grid and Flexbox Layout Techniques',
    },
    {
      id: 2,
      title: 'Data Science: Python for Beginners',
      instructor: 'Michael Chen',
      thumbnail: 'https://readdy.ai/api/search-image?query=Data%20science%20course%20thumbnail%20showing%20Python%20code%2C%20data%20visualization%20charts%2C%20clean%20interface%20with%20purple%20accents%2C%20professional%20look%2C%20suitable%20for%20online%20learning%20platform&width=400&height=225&seq=course-2&orientation=landscape',
      progress: 42,
      lastLesson: 'Data Visualization with Matplotlib',
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'Emma Rodriguez',
      thumbnail: 'https://readdy.ai/api/search-image?query=UI%20UX%20design%20course%20thumbnail%20showing%20design%20software%2C%20wireframes%2C%20color%20palettes%2C%20clean%20interface%20with%20purple%20accents%2C%20professional%20look%2C%20suitable%20for%20online%20learning%20platform&width=400&height=225&seq=course-3&orientation=landscape',
      progress: 24,
      lastLesson: 'Principles of Visual Hierarchy',
    }
  ];


  const certificates = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      issueDate: 'May 15, 2025',
      thumbnail: 'https://readdy.ai/api/search-image?query=Certificate%20template%20with%20purple%20accents%20for%20JavaScript%20course%20completion%2C%20professional%20design%2C%20clean%20layout&width=200&height=150&seq=cert-1&orientation=landscape'
    },
    {
      id: 2,
      title: 'HTML & CSS Mastery',
      issueDate: 'March 22, 2025',
      thumbnail: 'https://readdy.ai/api/search-image?query=Certificate%20template%20with%20purple%20accents%20for%20HTML%20and%20CSS%20course%20completion%2C%20professional%20design%2C%20clean%20layout&width=200&height=150&seq=cert-2&orientation=landscape'
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

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const overallProgress = Math.round(
    enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold text-purple-700">Learnify</span>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
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
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-30"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar - Mobile */}
      <div className={cn(
        "md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out",
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-purple-700">Learnify</span>
            <button 
              onClick={toggleMobileSidebar}
              className="text-gray-500 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
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
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileSidebar}
                className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="ml-4 md:ml-0">
                <h1 className="text-xl font-semibold text-gray-800">Hi Arjav 👋</h1>
                <p className="text-sm text-gray-500">Welcome back to your dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center relative">
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm bg-gray-50"
                />
              </div>
              {/* Notifications */}
              <button className="relative p-1 rounded-full text-gray-500 hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              {/* Profile */}
              <div className="flex items-center">
                <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20man%20with%20a%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20suitable%20for%20a%20testimonial%2C%20natural%20lighting%2C%20professional%20appearance&width=100&height=100&seq=testimonial-2&orientation=squarish"
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Continue Learning and My Courses */}
              <div className="lg:col-span-2 space-y-6">
                {/* Continue Learning */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">Continue Learning</h2>
                      <span className="text-sm text-purple-700 hover:underline cursor-pointer flex items-center">
                        View all my courses <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                    <div className="relative">
                      <div className="aspect-video relative rounded-lg overflow-hidden">
                        <Image
                          src={enrolledCourses[0].thumbnail}
                          alt={enrolledCourses[0].title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-medium mb-1 text-lg line-clamp-2">
                            {enrolledCourses[0].title}
                          </h3>
                          <p className="text-white/80 text-sm mb-3">
                            {enrolledCourses[0].instructor}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="w-3/4">
                              <div className="h-1.5 bg-white/30 rounded-full">
                                <div 
                                  className="h-1.5 bg-white rounded-full" 
                                  style={{ width: `${enrolledCourses[0].progress}%` }}
                                ></div>
                              </div>
                              <div className="mt-1 flex justify-between">
                                <span className="text-xs text-white/80">
                                  {enrolledCourses[0].progress}% complete
                                </span>
                                <span className="text-xs text-white/80">
                                  {Math.round((100 - enrolledCourses[0].progress) * 0.12)} hours left
                                </span>
                              </div>
                            </div>
                            <Button className="bg-white text-purple-700 hover:bg-white/90 rounded-lg">
                              Resume
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-800">Next Lesson</h4>
                        <div className="mt-2 flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50">
                          <div className="flex items-center">
                            <div className="bg-purple-100 p-2 rounded-lg">
                              <Clock className="h-5 w-5 text-purple-700" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-800">
                                {enrolledCourses[0].lastLesson}
                              </p>
                              <p className="text-xs text-gray-500">Duration: 22 min</p>
                            </div>
                          </div>
                          <Button className="text-white bg-purple-700 hover:bg-purple-800">
                            Continue
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* My Courses */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">My Courses</h2>
                      <span className="text-sm text-purple-700 hover:underline cursor-pointer flex items-center">
                        View all <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                    <div className="space-y-4">
                      {enrolledCourses.slice(1).map((course) => (
                        <div key={course.id} className="flex flex-col sm:flex-row gap-4 border border-gray-100 rounded-lg p-4">
                          <div className="relative w-full sm:w-36 h-20 shrink-0">
                            <Image
                              src={course.thumbnail}
                              alt={course.title}
                              fill
                              className="rounded-lg object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-800 line-clamp-1">{course.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">Instructor: {course.instructor}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="w-full sm:w-2/3">
                                <div className="h-1.5 bg-gray-100 rounded-full">
                                  <div 
                                    className="h-1.5 bg-purple-700 rounded-full" 
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">{course.progress}% completed</p>
                              </div>
                              <Button
                                variant="outline" 
                                className="text-purple-700 border-purple-700 hover:bg-purple-50"
                              >
                                Resume
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Progress and Deadlines */}
              <div className="space-y-6">
                {/* Progress Overview */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Progress Overview</h2>
                    <div className="flex justify-center">
                      <div className="relative h-40 w-40">
                        {/* Circle Progress SVG */}
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          {/* Background Circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#EDE9FE"
                            strokeWidth="8"
                          />
                          {/* Progress Circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#7C3AED"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${overallProgress * 2.51} 251`}
                            strokeDashoffset="0"
                            transform="rotate(-90 50 50)"
                          />
                          <text
                            x="50%"
                            y="50%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fontSize="18"
                            fontWeight="bold"
                            fill="#7C3AED"
                          >
                            {`${overallProgress}%`}
                          </text>
                          <text
                            x="50%"
                            y="65%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fontSize="10"
                            fill="#6B7280"
                          >
                            completed
                          </text>
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Courses</p>
                        <p className="text-xl font-bold text-purple-700">{enrolledCourses.length}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Hours</p>
                        <p className="text-xl font-bold text-purple-700">42</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Deadlines</h2>
                    <div className="space-y-3">
                      {deadlines.map(deadline => (
                        <div key={deadline.id} className="flex items-center p-3 border border-gray-100 rounded-lg">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <Calendar className="h-5 w-5 text-purple-700" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-800">{deadline.title}</p>
                            <p className="text-xs text-gray-500">{deadline.course}</p>
                          </div>
                          <div className="text-right">
                            <span className={cn(
                              "text-xs px-2 py-1 rounded-full",
                              deadline.type === 'Quiz' 
                                ? "bg-blue-50 text-blue-700" 
                                : "bg-amber-50 text-amber-700"
                            )}>
                              {deadline.type}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">{deadline.dueDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* My Certificates */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">My Certificates</h2>
                      <span className="text-sm text-purple-700 hover:underline cursor-pointer flex items-center">
                        View all <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {certificates.map(certificate => (
                        <div key={certificate.id} className="border border-gray-100 rounded-lg p-3 flex">
                          <div className="relative w-20 h-14 shrink-0">
                            <Image
                              src={certificate.thumbnail}
                              alt={certificate.title}
                              fill
                              className="rounded object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-800">{certificate.title}</p>
                            <p className="text-xs text-gray-500">Issued on {certificate.issueDate}</p>
                            <button className="text-purple-700 text-xs mt-1 flex items-center">
                              Download <ChevronRight className="h-3 w-3 ml-1" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Courses */}
            
          </div>
        </main>
      </div>
    </div>
  );
}