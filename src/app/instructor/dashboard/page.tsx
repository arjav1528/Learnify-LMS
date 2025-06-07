"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  BookOpen, 
  FilePlus,
  DollarSign,
  Star,
  UserRound, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Edit,
  Eye,
  Send,
  ChevronRight,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

export default function InstructorDashboard() {
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: BookOpen, label: 'My Courses', id: 'courses' },
    { icon: FilePlus, label: 'Create New Course', id: 'create' },
    { icon: DollarSign, label: 'Earnings', id: 'earnings' },
    { icon: Star, label: 'Reviews', id: 'reviews' },
    { icon: UserRound, label: 'Profile', id: 'profile' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: LogOut, label: 'Logout', id: 'logout' },
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      status: 'Published',
      enrollments: 1243,
      rating: 4.8,
      revenue: 11250,
      thumbnail: 'https://readdy.ai/api/search-image?query=Web%20development%20course%20thumbnail%20showing%20code%20editor%2C%20modern%20website%20design%2C%20clean%20interface%20with%20purple%20accents%2C%20professional%20look%2C%20suitable%20for%20online%20learning%20platform&width=400&height=225&seq=course-1&orientation=landscape',
    },
    {
      id: 2,
      title: 'Data Science: Python for Beginners',
      status: 'Published',
      enrollments: 875,
      rating: 4.7,
      revenue: 7925,
      thumbnail: 'https://readdy.ai/api/search-image?query=Data%20science%20course%20thumbnail%20showing%20Python%20code%2C%20data%20visualization%20charts%2C%20clean%20interface%20with%20purple%20accents%2C%20professional%20look%2C%20suitable%20for%20online%20learning%20platform&width=400&height=225&seq=course-2&orientation=landscape',
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      status: 'Draft',
      enrollments: 0,
      rating: 0,
      revenue: 0,
      thumbnail: 'https://readdy.ai/api/search-image?query=UI%20UX%20design%20course%20thumbnail%20showing%20design%20software%2C%20wireframes%2C%20color%20palettes%2C%20clean%20interface%20with%20purple%20accents%2C%20professional%20look%2C%20suitable%20for%20online%20learning%20platform&width=400&height=225&seq=course-3&orientation=landscape',
    },
  ];
  
  const recentReviews = [
    {
      id: 1,
      studentName: 'Emily Thompson',
      courseName: 'Complete Web Development Bootcamp',
      rating: 5,
      comment: 'This course completely changed my career path. The instructor explains complex concepts in simple terms.',
      date: 'May 28, 2025',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20woman%20with%20a%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20suitable%20for%20a%20testimonial%2C%20natural%20lighting%2C%20professional%20appearance&width=100&height=100&seq=testimonial-1&orientation=squarish',
    },
    {
      id: 2,
      studentName: 'Marcus Johnson',
      courseName: 'Data Science: Python for Beginners',
      rating: 4,
      comment: 'Great course content, but could use more real-world examples. Otherwise excellent explanations and resources.',
      date: 'May 25, 2025',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20man%20with%20a%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20suitable%20for%20a%20testimonial%2C%20natural%20lighting%2C%20professional%20appearance&width=100&height=100&seq=testimonial-2&orientation=squarish',
    },
  ];
  
  const recentEnrollments = [
    {
      id: 1,
      studentName: 'Alex Mitchell',
      courseName: 'Complete Web Development Bootcamp',
      date: 'June 5, 2025',
    },
    {
      id: 2,
      studentName: 'Sophia Rodriguez',
      courseName: 'Complete Web Development Bootcamp',
      date: 'June 4, 2025',
    },
    {
      id: 3,
      studentName: 'James Wilson',
      courseName: 'Data Science: Python for Beginners',
      date: 'June 3, 2025',
    },
  ];

  const monthlyRevenue = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1450 },
    { month: 'Mar', amount: 1800 },
    { month: 'Apr', amount: 2100 },
    { month: 'May', amount: 2400 },
    { month: 'Jun', amount: 1200 },
  ];

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const totalEarnings = courses.reduce((sum, course) => sum + course.revenue, 0);
  const totalStudents = courses.reduce((sum, course) => sum + course.enrollments, 0);
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(course => course.status === 'Published').length;

  // Chart height calculation based on max revenue
  const maxRevenue = Math.max(...monthlyRevenue.map(item => item.amount));
  const getBarHeight = (amount : number) => (amount / maxRevenue) * 100;

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
                <h1 className="text-xl font-semibold text-gray-900">Welcome back, Prof. Arjav 👋</h1>
                <p className="text-sm text-gray-500">Manage your courses and view analytics</p>
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
                    src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20man%20with%20a%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20suitable%20for%20a%20professor%2C%20natural%20lighting%2C%20professional%20appearance&width=100&height=100&seq=professor-1&orientation=squarish"
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
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Students</p>
                    <h3 className="text-2xl font-bold text-gray-900">{totalStudents}</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <UserRound className="h-6 w-6 text-purple-700" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Earnings</p>
                    <h3 className="text-2xl font-bold text-gray-900">${totalEarnings.toLocaleString()}</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-purple-700" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Courses</p>
                    <h3 className="text-2xl font-bold text-gray-900">{totalCourses}</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-purple-700" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Published Courses</p>
                    <h3 className="text-2xl font-bold text-gray-900">{publishedCourses}</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FilePlus className="h-6 w-6 text-purple-700" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dashboard Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Course Overview and Revenue */}
              <div className="lg:col-span-2 space-y-6">
                {/* Course Overview Section */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-800">Course Overview</h2>
                      <Button
                        className="bg-purple-700 hover:bg-purple-800 text-white"
                      >
                        <FilePlus className="h-4 w-4 mr-2" />
                        Create Course
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Course
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Students
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Rating
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Revenue
                            </th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {courses.map((course) => (
                            <tr key={course.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-12 w-20 relative">
                                    <Image
                                      src={course.thumbnail}
                                      alt={course.title}
                                      fill
                                      className="rounded object-cover"
                                    />
                                  </div>
                                  <div className="ml-4 max-w-[180px]">
                                    <div className="text-sm font-medium text-gray-900 truncate">{course.title}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  course.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {course.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                {course.enrollments.toLocaleString()}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                {course.rating > 0 ? (
                                  <div className="flex items-center">
                                    <span className="text-sm text-gray-900 mr-1">{course.rating}</span>
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  </div>
                                ) : (
                                  <span className="text-sm text-gray-400">N/A</span>
                                )}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${course.revenue.toLocaleString()}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <Button size="sm" variant="ghost" className="text-gray-600 hover:text-gray-900">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-gray-600 hover:text-gray-900">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                {/* Revenue Summary */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-800">Revenue Summary</h2>
                      <div className="text-sm text-gray-500">Last 6 months</div>
                    </div>
                    <div className="h-64">
                      <div className="flex h-full items-end">
                        {monthlyRevenue.map((item, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div 
                              className="bg-purple-600 rounded-t-md w-14 transition-all hover:bg-purple-700"
                              style={{ height: `${getBarHeight(item.amount)}%` }}
                            ></div>
                            <div className="mt-2 text-xs text-gray-600">{item.month}</div>
                            <div className="text-xs font-medium text-gray-800">${item.amount}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Current Balance</p>
                        <p className="text-xl font-bold text-gray-900">${(totalEarnings * 0.85).toLocaleString()}</p>
                      </div>
                      <Button className="bg-purple-700 hover:bg-purple-800 text-white">
                        Withdraw Funds
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Quick Actions, Student Activity, Reviews */}
              <div className="space-y-6">
                {/* Quick Actions Panel */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                      <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white">
                        <FilePlus className="h-4 w-4 mr-2" />
                        Create New Course
                      </Button>
                      <Button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Lecture
                      </Button>
                      <Button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
                        <Send className="h-4 w-4 mr-2" />
                        Send Announcement
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Recent Enrollments */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">Recent Enrollments</h2>
                      <span className="text-sm text-purple-700 hover:underline cursor-pointer flex items-center">
                        View all <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                    <div className="space-y-4">
                      {recentEnrollments.map((enrollment) => (
                        <div key={enrollment.id} className="border border-gray-100 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium text-gray-800">{enrollment.studentName}</p>
                              <p className="text-xs text-gray-500">enrolled in {enrollment.courseName}</p>
                            </div>
                            <div className="text-xs text-gray-500">{enrollment.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Recent Reviews */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">Recent Reviews</h2>
                      <span className="text-sm text-purple-700 hover:underline cursor-pointer flex items-center">
                        View all <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                    <div className="space-y-6">
                      {recentReviews.map((review) => (
                        <div key={review.id} className="pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                          <div className="flex items-center mb-2">
                            <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-200">
                              <Image
                                src={review.avatar}
                                alt={review.studentName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-800">{review.studentName}</p>
                              <p className="text-xs text-gray-500">{review.courseName}</p>
                            </div>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                            <span className="ml-2 text-xs text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-sm text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}