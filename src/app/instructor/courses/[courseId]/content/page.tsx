'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast, Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface Section {
  id?: string;
  courseId: string;
  title: string;
  order: number;
}

interface Lecture {
  id?: string;
  sectionId: string;
  title: string;
  type: 'video' | 'document' | 'quiz';
  contentUrl: string;
  duration: number;
  isPreview: boolean;
  order: number;
}

interface PageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default function CourseContent({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const { courseId } = resolvedParams;
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editingLecture, setEditingLecture] = useState<Lecture | null>(null);

  useEffect(() => {
    fetchCourseContent();
  }, [courseId]);

  const fetchCourseContent = async () => {
    try {
      // TODO: Backend Integration
      // const response = await fetch(`/api/courses/${courseId}/content`);
      // const data = await response.json();
      // setSections(data.sections);
      // setLectures(data.lectures);
    } catch (error) {
      console.error('Error fetching course content:', error);
      toast.error('Failed to load course content');
    }
  };

  const handleAddSection = () => {
    const newSection: Section = {
      courseId,
      title: 'New Section',
      order: sections.length,
    };
    setSections([...sections, newSection]);
    setEditingSection(newSection);
  };

  const handleAddLecture = (sectionId: string) => {
    const newLecture: Lecture = {
      sectionId,
      title: 'New Lecture',
      type: 'video',
      contentUrl: '',
      duration: 0,
      isPreview: false,
      order: lectures.filter(l => l.sectionId === sectionId).length,
    };
    setLectures([...lectures, newLecture]);
    setEditingLecture(newLecture);
  };

  const handleSaveSection = async (section: Section) => {
    try {
      toast.error('Backend integration not implemented');
      setEditingSection(null);
      fetchCourseContent();
    } catch (error) {
      console.error('Error saving section:', error);
      toast.error('Failed to save section');
    }
  };

  const handleSaveLecture = async (lecture: Lecture) => {
    try {
      toast.error('Backend integration not implemented');
      setEditingLecture(null);
      fetchCourseContent();
    } catch (error) {
      console.error('Error saving lecture:', error);
      toast.error('Failed to save lecture');
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm('Are you sure you want to delete this section? All lectures in this section will also be deleted.')) {
      return;
    }
    try {
      toast.error('Backend integration not implemented');
      fetchCourseContent();
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error('Failed to delete section');
    }
  };

  const handleDeleteLecture = async (lectureId: string) => {
    if (!confirm('Are you sure you want to delete this lecture?')) {
      return;
    }
    try {
      toast.error('Backend integration not implemented');
      fetchCourseContent();
    } catch (error) {
      console.error('Error deleting lecture:', error);
      toast.error('Failed to delete lecture');
    }
  };

  const handleReorderSection = async (sectionId: string, direction: 'up' | 'down') => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (
      (direction === 'up' && sectionIndex === 0) ||
      (direction === 'down' && sectionIndex === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const newIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
    [newSections[sectionIndex], newSections[newIndex]] = [newSections[newIndex], newSections[sectionIndex]];
    newSections.forEach((section, index) => {
      section.order = index;
    });

    setSections(newSections);
    // TODO: Backend Integration - Update section orders
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-12">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Course Content
              </h1>
              <p className="text-gray-600 text-lg">Organize your course content into sections and lectures</p>
            </div>
            <Button 
              onClick={handleAddSection} 
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl px-6 py-3 rounded-xl"
            >
              <FaPlus className="text-lg" /> Add Section
            </Button>
          </div>

          <div className="space-y-10">
            {sections.map((section, index) => (
              <motion.div
                key={section.id || `section-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 rounded-2xl p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {editingSection?.id === section.id ? (
                  <div className="space-y-4">
                    <Input
                      value={editingSection?.title ?? ''}
                      onChange={(e) => {
                        if (editingSection) {
                          setEditingSection({
                            ...editingSection,
                            title: e.target.value,
                            courseId: editingSection.courseId,
                            order: editingSection.order
                          });
                        }
                      }}
                      placeholder="Section Title"
                      className="text-lg border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => editingSection && handleSaveSection(editingSection)}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setEditingSection(null)}
                        className="border-2 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-800">{section.title}</h3>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingSection(section)}
                        className="hover:bg-blue-50 border-2 border-blue-200"
                      >
                        <FaEdit className="text-blue-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => section.id && handleDeleteSection(section.id)}
                        className="hover:bg-red-50 border-2 border-red-200"
                      >
                        <FaTrash className="text-red-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => section.id && handleReorderSection(section.id, 'up')}
                        className="hover:bg-gray-50 border-2 border-gray-200"
                      >
                        <FaArrowUp className="text-gray-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => section.id && handleReorderSection(section.id, 'down')}
                        className="hover:bg-gray-50 border-2 border-gray-200"
                      >
                        <FaArrowDown className="text-gray-600" />
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => section.id && handleAddLecture(section.id)}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        <FaPlus /> Add Lecture
                      </Button>
                    </div>
                  </div>
                )}

                <div className="mt-8 space-y-4">
                  {lectures
                    .filter(lecture => lecture.sectionId === section.id)
                    .map((lecture, index) => (
                      <motion.div
                        key={lecture.id || `lecture-${section.id}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100"
                      >
                        {editingLecture?.id === lecture.id ? (
                          <div className="flex-1 space-y-4">
                            <Input
                              value={editingLecture?.title ?? ''}
                              onChange={(e) => {
                                if (editingLecture) {
                                  setEditingLecture({
                                    ...editingLecture,
                                    title: e.target.value,
                                    sectionId: editingLecture.sectionId,
                                    type: editingLecture.type,
                                    contentUrl: editingLecture.contentUrl,
                                    duration: editingLecture.duration,
                                    isPreview: editingLecture.isPreview,
                                    order: editingLecture.order
                                  });
                                }
                              }}
                              placeholder="Lecture Title"
                              className="text-base border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />
                            <div className="flex gap-3">
                              <Button 
                                onClick={() => editingLecture && handleSaveLecture(editingLecture)}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                              >
                                Save Changes
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => setEditingLecture(null)}
                                className="border-2 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-6 flex-1">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-800">{lecture.title}</h4>
                              <div className="flex items-center gap-3 mt-1">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  lecture.type === 'video' 
                                    ? 'bg-blue-100 text-blue-700'
                                    : lecture.type === 'document'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-green-100 text-green-700'
                                }`}>
                                  {lecture.type.charAt(0).toUpperCase() + lecture.type.slice(1)}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {lecture.duration} minutes
                                </span>
                                {lecture.isPreview && (
                                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                                    Preview
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setEditingLecture(lecture)}
                                className="hover:bg-blue-50 border-2 border-blue-200"
                              >
                                <FaEdit className="text-blue-600" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => lecture.id && handleDeleteLecture(lecture.id)}
                                className="hover:bg-red-50 border-2 border-red-200"
                              >
                                <FaTrash className="text-red-600" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
} 