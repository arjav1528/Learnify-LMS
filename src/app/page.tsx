'use client';

import React, { useState } from "react";
import Image from 'next/image'; // Import Next.js Image component
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-purple-700">
                  Learnify
                </span>
              </div>
              {/* Removed menu items here */}
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              {/* Removed search box here */}
              <SignInButton
                fallbackRedirectUrl={"/complete-profile"}
              >
                <button
                id="signInButton"
                onClick={() =>
                  document
                    .getElementById("signInModal")?.classList.remove("hidden")
                }
                className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-800 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Sign In
              </button>
              </SignInButton>
              
              {/* Sign In Modal remains unchanged */}
              <SignUpButton
                fallbackRedirectUrl={"/complete-profile"}>
                <button className="bg-white text-purple-700 border border-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 cursor-pointer"
              >
                <i
                  className={`fas ${showMobileMenu ? "fa-times" : "fa-bars"} text-xl`}
                ></i>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* You may want to update mobile menu options too */}
              <div className="px-3 py-3 space-y-2">
                <SignInButton>
                  fallbackRedirectUrl={"/complete-profile"}
                  <button className="w-full bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-800 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  fallbackRedirectUrl={"/complete-profile"}
                  <button className="w-full bg-white text-purple-700 border border-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors duration-200!rounded-button whitespace-nowrap cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>

              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg" // Ensure this path is correct relative to your public directory
            alt="Hero Background"
            fill
            className="object-cover object-top"
            priority // Add priority for LCP improvement
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-20 md:py-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Unlock Your Potential with Expert-Led Courses
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/90 max-w-lg">
                  Join thousands of students learning from industry experts.
                  Advance your career with our flexible, high-quality online
                  courses.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <SignUpButton
                    fallbackRedirectUrl={"/complete-profile"}>
                    <button className="bg-white text-purple-700 px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-100 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                      Get Started
                    </button>
                  </SignUpButton>
                  <button className="bg-transparent text-white border border-white px-6 py-3 rounded-lg text-base font-medium hover:bg-white/10 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                    <i className="fas fa-play-circle mr-2"></i> How it works
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700">1,200+</div>
              <div className="mt-2 text-sm text-gray-500">
                Courses Available
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700">15,000+</div>
              <div className="mt-2 text-sm text-gray-500">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700">250+</div>
              <div className="mt-2 text-sm text-gray-500">
                Expert Instructors
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700">98%</div>
              <div className="mt-2 text-sm text-gray-500">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Explore Top Categories
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the perfect course from our wide range of categories
              designed to help you achieve your goals
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              {
                name: "Web Development",
                icon: "fa-code",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=200&fit=crop",
              },
              {
                name: "Data Science",
                icon: "fa-chart-bar",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
              },
              {
                name: "Business",
                icon: "fa-briefcase",
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&h=200&fit=crop",
              },
              {
                name: "Design",
                icon: "fa-palette",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop",
              },
              {
                name: "Marketing",
                icon: "fa-bullhorn",
                image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=200&h=200&fit=crop",
              },
              {
                name: "Personal Development",
                icon: "fa-brain",
                image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=200&fit=crop",
              },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Courses
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Handpicked courses to get you started on your learning journey
              </p>
            </div>
            <div className="hidden md:block">
              <button className="text-purple-700 hover:text-purple-800 font-medium flex items-center cursor-pointer">
                Browse All Courses <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Complete Web Development Bootcamp",
                instructor: "Sarah Johnson",
                rating: 4.9,
                students: 15680,
                price: "$89.99",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
              },
              {
                title: "Data Science: Python for Beginners",
                instructor: "Michael Chen",
                rating: 4.8,
                students: 8750,
                price: "$79.99",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
              },
              {
                title: "UI/UX Design Masterclass",
                instructor: "Emma Rodriguez",
                rating: 4.9,
                students: 12380,
                price: "$94.99",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
              },
              {
                title: "Digital Marketing Strategy",
                instructor: "James Wilson",
                rating: 4.7,
                students: 9650,
                price: "$69.99",
                image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=225&fit=crop",
              },
              {
                title: "Business Leadership & Management",
                instructor: "Alexandra Lee",
                rating: 4.8,
                students: 7820,
                price: "$84.99",
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=225&fit=crop",
              },
              {
                title: "Machine Learning Fundamentals",
                instructor: "David Park",
                rating: 4.9,
                students: 11250,
                price: "$99.99",
                image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=225&fit=crop",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="absolute top-3 right-3 bg-purple-700 text-white text-sm font-medium px-2 py-1 rounded">
                    {course.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    by {course.instructor}
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      <i className="fas fa-star"></i>
                      <span className="ml-1 text-sm font-medium text-gray-900">
                        {course.rating}
                      </span>
                    </div>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-600">
                      {course.students.toLocaleString()} students
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button className="text-purple-700 hover:text-purple-800 cursor-pointer">
                      <i className="far fa-heart text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <button className="bg-white text-purple-700 border border-purple-700 px-6 py-3 rounded-lg text-base font-medium hover:bg-purple-50 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer">
              Browse All Courses
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our students who have transformed their careers through
              our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emily Thompson",
                role: "Web Developer",
                image: "https://via.placeholder.com/100x100/6366f1/ffffff?text=ET",
                text: "The web development bootcamp completely changed my career path. I went from knowing nothing about coding to landing a job as a junior developer in just 6 months. The instructors were incredibly supportive and the course content was comprehensive and up-to-date.",
              },
              {
                name: "Marcus Johnson",
                role: "Data Analyst",
                image: "https://via.placeholder.com/100x100/6366f1/ffffff?text=MJ",
                text: "I've taken several data science courses on this platform, and they've all been exceptional. The hands-on projects really helped me apply what I learned, and I was able to build a portfolio that impressed my employers. Now I'm working as a data analyst at a tech company I love.",
              },
              {
                name: "Sophia Garcia",
                role: "UX Designer",
                image: "https://via.placeholder.com/100x100/6366f1/ffffff?text=SG",
                text: "The UI/UX Design Masterclass was exactly what I needed to transition into design. The instructor broke down complex concepts into easy-to-understand modules, and the community support was incredible. I'm now freelancing as a UX designer and loving every minute of it.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
                <div className="mt-4 flex text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
              Join thousands of students already learning on our platform. Get
              unlimited access to all courses.
            </p>
            <div className="mt-8">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-purple-700 px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-100 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">Learnify</div>
              <p className="text-gray-400 mb-4">
                The leading platform for online education and professional
                development.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Instructors
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Events
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Information</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Learnify. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <div className="flex items-center text-gray-400">
                <i className="fab fa-cc-visa text-xl"></i>
              </div>
              <div className="flex items-center text-gray-400">
                <i className="fab fa-cc-mastercard text-xl"></i>
              </div>
              <div className="flex items-center text-gray-400">
                <i className="fab fa-cc-paypal text-xl"></i>
              </div>
              <div className="flex items-center text-gray-400">
                <i className="fab fa-cc-apple-pay text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}