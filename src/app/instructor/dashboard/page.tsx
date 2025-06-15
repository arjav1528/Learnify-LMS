"use client";

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { 
  FaBook, 
  FaUsers, 
  FaChartLine, 
  FaMoneyBillWave,
  FaPlus,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { toast, Toaster } from 'react-hot-toast';

// Types based on models
interface Course {
  id?: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  isPublished: boolean;
  rating: number;
  totalDuration: number;
}

interface Analytics {
  totalStudents: number;
  totalRevenue: number;
  averageRating: number;
  totalCourses: number;
}

export default function InstructorDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState<Course[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalStudents: 0,
    totalRevenue: 0,
    averageRating: 0,
    totalCourses: 0
  });

  // Fetch instructor data
  React.useEffect(() => {
    toast.error('Backend integration not implemented');
  }, []);

  const handleCreateCourse = () => {
    toast.error('Course creation functionality not implemented');
  };

  const handleEditCourse = (courseId: string) => {
    toast.error('Course editing functionality not implemented');
  };

  const handleDeleteCourse = (courseId: string) => {
    toast.error('Course deletion functionality not implemented');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="rounded-xl bg-gradient-to-r from-purple-600 to-purple-400 p-6 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-1">Learnify Instructor</h1>
              <p className="text-purple-100">Welcome back, {user?.firstName || 'Instructor'}. Manage your courses and track your progress.</p>
            </div>
            <Button
              onClick={handleCreateCourse}
              className="mt-4 md:mt-0 bg-white text-purple-700 hover:bg-purple-100 px-6 py-2 rounded-lg font-semibold shadow transition-all duration-200 flex items-center"
            >
              <FaPlus className="mr-2" /> Create New Course
            </Button>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-8"></div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 bg-white">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full shadow">
                <FaBook className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-700">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalCourses}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 bg-white">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full shadow">
                <FaUsers className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-700">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalStudents}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 bg-white">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full shadow">
                <FaChartLine className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-700">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.averageRating.toFixed(1)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 bg-white">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full shadow">
                <FaMoneyBillWave className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-700">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${analytics.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white p-1 rounded-lg shadow-sm flex gap-2">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 text-black rounded-md px-4 py-2 font-medium">Overview</TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 text-black rounded-md px-4 py-2 font-medium">My Courses</TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 text-black rounded-md px-4 py-2 font-medium">Students</TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 text-black rounded-md px-4 py-2 font-medium">Revenue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview content */}
            <Card className="p-6 bg-white rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-black">Recent Activity</h2>
              <div className="text-gray-700 text-sm">No recent activity to display</div>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            {/* Courses list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.length === 0 ? (
                <div className="col-span-full">
                  <Card className="p-8 text-center bg-gradient-to-br from-purple-50 to-white">
                    <div className="mb-4">
                      <FaBook className="h-12 w-12 text-gray-400 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses Yet</h3>
                    <p className="text-gray-700 mb-4">Start your teaching journey by creating your first course</p>
                    <Button onClick={handleCreateCourse} className="bg-purple-600 hover:bg-purple-700">
                      <FaPlus className="mr-2" /> Create Your First Course
                    </Button>
                  </Card>
                </div>
              ) : (
                courses.map((course) => (
                  <Card
                    key={course.id}
                    className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 bg-white group"
                  >
                    <div className="aspect-video relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow ${
                          course.isPublished 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}>
                          {course.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">{course.title}</h3>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{course.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <span className="text-purple-600 font-semibold">${course.price}</span>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-2">⭐ {course.rating.toFixed(1)}</span>
                            <span>⏱️ {course.totalDuration}h</span>
                          </div>
                        </div>
                        <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCourse(course.id!)}
                            className="hover:bg-purple-50"
                          >
                            <FaEdit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCourse(course.id!)}
                            className="hover:bg-red-50 hover:text-red-600"
                          >
                            <FaTrash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            {/* Students list */}
            <Card className="p-6 bg-white rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-black">Enrolled Students</h2>
              <div className="text-gray-700 text-sm">No students enrolled yet</div>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            {/* Revenue analytics */}
            <Card className="p-6 bg-white rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-black">Revenue Analytics</h2>
              <div className="text-gray-700 text-sm">No revenue data available yet</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}