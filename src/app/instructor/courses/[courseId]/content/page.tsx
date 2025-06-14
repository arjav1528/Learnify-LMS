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
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaUpload } from 'react-icons/fa';

// Types based on models
type LectureType = 'video' | 'pdf' | 'quiz' | 'assignment';

interface Section {
  id?: string;
  title: string;
  order: number;
  lectures: Lecture[];
}

interface Lecture {
  id?: string;
  title: string;
  type: LectureType;
  contentUrl: string;
  duration: number;
  isPreview: boolean;
  order: number;
  sectionId?: string;
  file?: File;
}

export default function CourseContent({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editingLecture, setEditingLecture] = useState<Lecture | null>(null);

  useEffect(() => {
    // TODO: Backend Integration
    // Fetch course sections and lectures
    // Example:
    // const fetchContent = async () => {
    //   const response = await fetch(`/api/courses/${resolvedParams.courseId}/content`);
    //   const data = await response.json();
    //   setSections(data.sections);
    // };
    // fetchContent();
  }, [resolvedParams.courseId]);

  const handleAddSection = () => {
    const newSection: Section = {
      title: 'New Section',
      order: sections.length,
      lectures: [],
    };
    setSections([...sections, newSection]);
    setEditingSection(newSection);
  };

  const handleEditSection = (section: Section) => {
    setEditingSection(section);
  };

  const handleDeleteSection = (sectionId: string) => {
    // TODO: Backend Integration
    setSections(sections.filter(section => section.id !== sectionId));
    toast.success('Section deleted successfully');
  };

  const handleAddLecture = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    const newLecture: Lecture = {
      title: 'New Lecture',
      type: 'video',
      contentUrl: '',
      duration: 0,
      isPreview: false,
      order: section.lectures.length,
      sectionId,
    };

    const updatedSections = sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          lectures: [...s.lectures, newLecture],
        };
      }
      return s;
    });

    setSections(updatedSections);
    setEditingLecture(newLecture);
  };

  const handleEditLecture = (lecture: Lecture) => {
    setEditingLecture(lecture);
  };

  const handleDeleteLecture = (sectionId: string, lectureId: string) => {
    // TODO: Backend Integration
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lectures: section.lectures.filter(lecture => lecture.id !== lectureId),
        };
      }
      return section;
    });
    setSections(updatedSections);
    toast.success('Lecture deleted successfully');
  };

  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === sectionId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];

    // Update order
    newSections.forEach((section, idx) => {
      section.order = idx;
    });

    setSections(newSections);
  };

  const handleMoveLecture = (sectionId: string, lectureId: string, direction: 'up' | 'down') => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    const index = section.lectures.findIndex(l => l.id === lectureId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === section.lectures.length - 1)
    ) {
      return;
    }

    const newSections = sections.map(s => {
      if (s.id === sectionId) {
        const newLectures = [...s.lectures];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [newLectures[index], newLectures[newIndex]] = [newLectures[newIndex], newLectures[index]];

        // Update order
        newLectures.forEach((lecture, idx) => {
          lecture.order = idx;
        });

        return {
          ...s,
          lectures: newLectures,
        };
      }
      return s;
    });

    setSections(newSections);
  };

  const handleSaveSection = async (section: Section) => {
    setIsLoading(true);
    try {
      // TODO: Backend Integration
      // Example:
      // const response = await fetch(`/api/courses/${resolvedParams.courseId}/sections${section.id ? `/${section.id}` : ''}`, {
      //   method: section.id ? 'PUT' : 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(section),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to save section');
      // }

      toast.success('Section saved successfully');
      setEditingSection(null);
    } catch (error) {
      console.error('Error saving section:', error);
      toast.error('Failed to save section');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLecture = async (sectionId: string, lecture: Lecture) => {
    setIsLoading(true);
    try {
      if (!lecture.file) {
        toast.error('Please upload a file');
        setIsLoading(false);
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', lecture.file);
      formData.append('type', lecture.type);
      formData.append('title', lecture.title);
      formData.append('duration', lecture.duration.toString());
      formData.append('isPreview', lecture.isPreview.toString());
      formData.append('sectionId', sectionId);

      // TODO: Backend Integration
      // Example:
      // const response = await fetch(`/api/courses/${resolvedParams.courseId}/lectures/upload`, {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to upload lecture');
      // }

      toast.success('Lecture uploaded successfully');
      setEditingLecture(null);
    } catch (error) {
      console.error('Error uploading lecture:', error);
      toast.error('Failed to upload lecture');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Course Content</h1>
          <Button onClick={handleAddSection} className="bg-purple-600 hover:bg-purple-700">
            <FaPlus className="mr-2" /> Add Section
          </Button>
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveSection(section.id!, 'up')}
                      disabled={index === 0}
                    >
                      <FaArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveSection(section.id!, 'down')}
                      disabled={index === sections.length - 1}
                    >
                      <FaArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditSection(section)}
                    >
                      <FaEdit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSection(section.id!)}
                    >
                      <FaTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {section.lectures.map((lecture, lIndex) => (
                    <div
                      key={lecture.id || lIndex}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">#{lIndex + 1}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">{lecture.title}</h3>
                          <p className="text-sm text-gray-500">
                            {lecture.type} • {lecture.duration} minutes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMoveLecture(section.id!, lecture.id!, 'up')}
                          disabled={lIndex === 0}
                        >
                          <FaArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMoveLecture(section.id!, lecture.id!, 'down')}
                          disabled={lIndex === section.lectures.length - 1}
                        >
                          <FaArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditLecture(lecture)}
                        >
                          <FaEdit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteLecture(section.id!, lecture.id!)}
                        >
                          <FaTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleAddLecture(section.id!)}
                  variant="outline"
                  className="mt-4 w-full"
                >
                  <FaPlus className="mr-2" /> Add Lecture
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section Edit Modal */}
      {editingSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Section</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="sectionTitle">Section Title</Label>
                <Input
                  id="sectionTitle"
                  value={editingSection.title}
                  onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setEditingSection(null)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleSaveSection(editingSection)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Lecture Edit Modal */}
      {editingLecture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Lecture</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="lectureTitle">Lecture Title</Label>
                <Input
                  id="lectureTitle"
                  value={editingLecture.title}
                  onChange={(e) => setEditingLecture({ ...editingLecture, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="lectureType">Type</Label>
                <Select
                  value={editingLecture.type}
                  onValueChange={(value) => setEditingLecture({ ...editingLecture, type: value as LectureType })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fileUpload">Upload Content</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept={
                            editingLecture.type === 'video'
                              ? 'video/*'
                              : editingLecture.type === 'pdf'
                              ? '.pdf'
                              : editingLecture.type === 'quiz'
                              ? '.json'
                              : '.doc,.docx,.pdf'
                          }
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setEditingLecture({ ...editingLecture, file });
                            }
                          }}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {editingLecture.type === 'video'
                        ? 'MP4, WebM up to 500MB'
                        : editingLecture.type === 'pdf'
                        ? 'PDF up to 50MB'
                        : editingLecture.type === 'quiz'
                        ? 'JSON up to 1MB'
                        : 'DOC, DOCX, PDF up to 50MB'}
                    </p>
                    {editingLecture.file && (
                      <p className="text-sm text-gray-500 mt-2">
                        Selected file: {editingLecture.file.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="0"
                  value={editingLecture.duration}
                  onChange={(e) => setEditingLecture({ ...editingLecture, duration: parseInt(e.target.value) })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPreview"
                  checked={editingLecture.isPreview}
                  onChange={(e) => setEditingLecture({ ...editingLecture, isPreview: e.target.checked })}
                />
                <Label htmlFor="isPreview">Preview Lecture</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setEditingLecture(null)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleSaveLecture(editingLecture.sectionId!, editingLecture)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Toaster position="bottom-right" />
    </div>
  );
} 