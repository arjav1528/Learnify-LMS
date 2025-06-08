'use client';

import React, { useState } from "react";
import Image from 'next/image'; // Import Next.js Image component
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  // Remove unused state or comment it for later use
  // const [activeTab, setActiveTab] = useState("overview");
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
              <SignInButton>
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
              <SignUpButton>
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
                <button className="w-full bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-800 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                  Sign In
                </button>
                <button className="w-full bg-white text-purple-700 border border-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                  Sign Up
                </button>
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
                  <button className="bg-white text-purple-700 px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-100 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                    Get Started
                  </button>
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
                image:
                  "https://readdy.ai/api/search-image?query=Modern%20web%20development%20concept%20with%20clean%20design%2C%20code%20symbols%2C%20purple%20gradient%20background%2C%20minimalist%20style%2C%20professional%20look%2C%20suitable%20for%20a%20learning%20platform%20category%20icon&width=200&height=200&seq=cat-1&orientation=squarish",
              },
              {
                name: "Data Science",
                icon: "fa-chart-bar",
                image:
                  "https://readdy.ai/api/search-image?query=Data%20science%20concept%20with%20charts%2C%20graphs%2C%20data%20visualization%20elements%2C%20purple%20gradient%20background%2C%20minimalist%20style%2C%20professional%20look%2C%20suitable%20for%20a%20learning%20platform%20category%20icon&width=200&height=200&seq=cat-2&orientation=squarish",
              },
              {
                name: "Business",
                icon: "fa-briefcase",
                image:
                  "https://readdy.ai/api/search-image?query=Business%20and%20management%20concept%20with%20professional%20elements%2C%20briefcase%20icon%2C%20purple%20gradient%20background%2C%20minimalist%20style%2C%20clean%20design%2C%20suitable%20for%20a%20learning%20platform%20category%20icon&width=200&height=200&seq=cat-3&orientation=squarish",
              },
              {
                name: "Design",
                icon: "fa-palette",
                image:
                  "https://readdy.ai/api/search-image?query=Graphic%20and%20UI%20design%20concept%20with%20design%20tools%2C%20color%20palette%2C%20purple%20gradient%20background%2C%20minimalist%20style%2C%20professional%20look%2C%20suitable%20for%20a%20learning%20platform%20category%20icon&width=200&height=200&seq=cat-4&orientation=squarish",
              },
              {
                name: "Marketing",
                icon: "fa-bullhorn",
                image:
                  "https://readdy.ai/api/search-image?query=Digital%20marketing%20concept%20with%20megaphone%2C%20social%20media%20elements%2C%20purple%20gradient%20background%2C%20minimalist%20style%2C%20professional%20look%2C%20suitable%20for%20a%20learning%20platform%20category%20icon&width=200&height=200&seq=cat-5&orientation=squarish",
              },
              {
                name: "Personal Development",
                icon: "fa-brain",
                image:
                  "https://readdy.ai/api/search-image?query=Personal%20growth%20and%20development%20concept%20with%20brain%2C%20lightbulb%2C%20purple%20gradient%20background%2C%20minimalist%20style%2C%20professional%20look%2C%20suitable%20for%20a%20learning%20platform%20category%20icon&width=200&height=200&seq=cat-6&orientation=squarish",
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
                students: 15420,
                price: "$89.99",
                image:
                  "https://readdy.ai/api/search-image?query=Web%20development%20course%20thumbnail%20showing%20code%20editor%2C%20modern%20website%20design%2C%20clean%20interface%20with%20purple%20accents%2C%20professional%20look%2C%20suitable%20for%20online%20learning%20platform&width=400&height=225&seq=course-1&orientation=landscape",
              },
              {
                title: "Data Science: Python for Beginners",
                instructor: "Michael Chen",
                rating: 4.8,
                students: 8750,
                price: "$79.99",
                image:
                  "https://readdy.ai/api/search-image?query=Data%20science%20course%20thumbnail%20showing%20Python%20code%2C%20data%20visualization%20charts%2C%20clean%20interface%20with%20purple%20accents%2C%20professional%20look%2C%20suitable%20for%20online%20learning%20platform&width=400&height=225&seq=course-2&orientation=landscape",
              },
              {
                title: "UI/UX Design Masterclass",
                instructor: "Emma Rodriguez",
                rating: 4.9,
                students: 12380,
                price: "$94.99",
                image:
                  "https://readdy.ai/api/search-image?query=UI%20UX%20design%20course%20thumbnail%20showing%20design%20software%2C%20wireframes%2C%20color%20palettes%2C%20clean%20interface%20with%20purple%20accents%2C%20professional%20look%2C%20suitable%20for%20online%20learning%20platform&width=400&height=225&seq=course-3&orientation=landscape",
              },
              {
                title: "Digital Marketing Strategy",
                instructor: "James Wilson",
                rating: 4.7,
                students: 9650,
                price: "$69.99",
                image:
                  "https://readdy.ai/api/search-image?query=Digital%20marketing%20course%20thumbnail%20showing%20analytics%20dashboard%2C%20social%20media%20icons%2C%20clean%20interface%20with%20purple%20accents%2C%20professional%20look%2C%20suitable%20for%20online%20learning%20platform&width=400&height=225&seq=course-4&orientation=landscape",
              },
              {
                title: "Business Leadership & Management",
                instructor: "Alexandra Lee",
                rating: 4.8,
                students: 7820,
                price: "$84.99",
                image:
                  "https://readdy.ai/api/search-image?query=Business%20leadership%20course%20thumbnail%20showing%20professional%20meeting%2C%20leadership%20concepts%2C%20clean%20interface%20with%20purple%20accents%2C%20professional%20look%2C%20suitable%20for%20online%20learning%20platform&width=400&height=225&seq=course-5&orientation=landscape",
              },
              {
                title: "Machine Learning Fundamentals",
                instructor: "David Park",
                rating: 4.9,
                students: 11250,
                price: "$99.99",
                image:
                  "https://readdy.ai/api/search-image?query=Machine%20learning%20course%20thumbnail%20showing%20AI%20algorithms%2C%20neural%20networks%20visualization%2C%20clean%20interface%20with%20purple%20accents%2C%20professional%20look%2C%20suitable%20for%20online%20learning%20platform&width=400&height=225&seq=course-6&orientation=landscape",
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
                image:
                  "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20woman%20with%20a%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20suitable%20for%20a%20testimonial%2C%20natural%20lighting%2C%20professional%20appearance&width=100&height=100&seq=testimonial-1&orientation=squarish",
                text: "The web development bootcamp completely changed my career path. I went from knowing nothing about coding to landing a job as a junior developer in just 6 months. The instructors were incredibly supportive and the course content was comprehensive and up-to-date.",
              },
              {
                name: "Marcus Johnson",
                role: "Data Analyst",
                image:
                  "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20man%20with%20a%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20suitable%20for%20a%20testimonial%2C%20natural%20lighting%2C%20professional%20appearance&width=100&height=100&seq=testimonial-2&orientation=squarish",
                text: "I've taken several data science courses on this platform, and they've all been exceptional. The hands-on projects really helped me apply what I learned, and I was able to build a portfolio that impressed my employers. Now I'm working as a data analyst at a tech company I love.",
              },
              {
                name: "Sophia Garcia",
                role: "UX Designer",
                image:
                  "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20woman%20with%20a%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20suitable%20for%20a%20testimonial%2C%20natural%20lighting%2C%20professional%20appearance&width=100&height=100&seq=testimonial-3&orientation=squarish",
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