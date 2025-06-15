// models.d.ts

export type Role = 'student' | 'instructor' | 'admin';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type LectureType = 'video' | 'pdf' | 'quiz' | 'assignment';
export type PaymentStatus = 'pending' | 'success' | 'failed';
export type Gateway = 'stripe' | 'razorpay';

export interface UserProfile {
  _id?: string;
  clerkId: string; // Clerk user ID
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  bio?: string;
  createdAt: Date;
}

export interface Category {
  _id?: string;
  name: string;
  slug: string;
}

export interface Tag {
  _id?: string;
  name: string;
}

export interface Course {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  language: string;
  level: CourseLevel;
  categoryId: string;
  instructorId: string;
  price: number;
  tags: string[]; // tag IDs
  isPublished: boolean;
  rating: number;
  totalDuration: number; // in minutes
  createdAt: Date;
}

export interface Section {
  _id?: string;
  courseId: string;
  title: string;
  order: number;
}

export interface Lecture {
  _id?: string;
  sectionId: string;
  title: string;
  type: LectureType;
  contentUrl: string;
  duration: number; // in minutes
  isPreview: boolean;
  order: number;
}

export interface Quiz {
  _id?: string;
  lectureId: string;
  questions: Question[];
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Enrollment {
  _id: string;
  studentId: string;
  courseId: string;
  enrolledAt: Date;
  progress: number; // 0 to 1
  completedAt?: Date;
}

export interface LectureProgress {
  _id?: string;
  enrollmentId: string;
  lectureId: string;
  watchedDuration: number; // in minutes
  isCompleted: boolean;
}

export interface Order {
  _id?: string;
  userId: string;
  courseId: string;
  amount: number;
  paymentStatus: PaymentStatus;
  gateway: Gateway;
  createdAt: Date;
}

export interface Review {
  _id?: string;
  courseId: string;
  userId: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: Date;
}

export interface Certificate {
  _id?: string;
  userId: string;
  courseId: string;
  certificateUrl: string;
  issuedAt: Date;
}
