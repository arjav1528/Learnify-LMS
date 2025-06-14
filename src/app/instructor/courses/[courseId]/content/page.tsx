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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Course Content</h1>
            <Button onClick={handleAddSection} className="flex items-center gap-2">
              <FaPlus /> Add Section
            </Button>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={section.id || `section-${index}`} className="border rounded-lg p-4">
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
                    />
                    <div className="flex gap-2">
                      <Button onClick={() => editingSection && handleSaveSection(editingSection)}>Save</Button>
                      <Button variant="outline" onClick={() => setEditingSection(null)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingSection(section)}>
                        <FaEdit />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => section.id && handleDeleteSection(section.id)}>
                        <FaTrash />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => section.id && handleReorderSection(section.id, 'up')}>
                        <FaArrowUp />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => section.id && handleReorderSection(section.id, 'down')}>
                        <FaArrowDown />
                      </Button>
                      <Button size="sm" onClick={() => section.id && handleAddLecture(section.id)}>
                        <FaPlus /> Add Lecture
                      </Button>
                    </div>
                  </div>
                )}

                <div className="mt-4 space-y-2">
                  {lectures
                    .filter(lecture => lecture.sectionId === section.id)
                    .map((lecture, index) => (
                      <div key={lecture.id || `lecture-${section.id}-${index}`} className="flex justify-between items-center p-2 bg-gray-50 rounded">
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
                            />
                            <Select
                              value={editingLecture?.type ?? 'video'}
                              onValueChange={(value) => {
                                if (editingLecture) {
                                  setEditingLecture({
                                    ...editingLecture,
                                    type: value as 'video' | 'document' | 'quiz'
                                  });
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="document">Document</SelectItem>
                                <SelectItem value="quiz">Quiz</SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="flex gap-2">
                              <Button onClick={() => editingLecture && handleSaveLecture(editingLecture)}>Save</Button>
                              <Button variant="outline" onClick={() => setEditingLecture(null)}>Cancel</Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{lecture.title}</span>
                              <span className="text-sm text-gray-500">({lecture.type})</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => setEditingLecture(lecture)}>
                                <FaEdit />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => lecture.id && handleDeleteLecture(lecture.id)}>
                                <FaTrash />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
} 