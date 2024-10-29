import React from 'react';
import { Play, Clock, Star } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Link } from 'react-router-dom';

export default function Courses() {
  const { user } = useAuthStore();
  
  const courses = [
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Learn the basics of React including components, props, and state management.',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=640',
      duration: '2h 30m',
      level: 'Beginner',
      rating: 4.8,
      isPremium: true
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      description: 'Deep dive into advanced JavaScript concepts including closures, prototypes, and async programming.',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=640',
      duration: '3h 45m',
      level: 'Advanced',
      rating: 4.9,
      isPremium: true
    },
    {
      id: 3,
      title: 'CSS Mastery',
      description: 'Master CSS layouts, animations, and responsive design principles.',
      thumbnail: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?auto=format&fit=crop&q=80&w=640',
      duration: '2h 15m',
      level: 'Intermediate',
      rating: 4.7,
      isPremium: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Courses</h1>
        <div className="flex space-x-4">
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>All Categories</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Full Stack</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold text-gray-900">{course.title}</h2>
                {course.isPremium && !user?.hasPremiumAccess && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Premium
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
                <span className="text-sm font-medium text-indigo-600">{course.level}</span>
              </div>
              {course.isPremium && !user?.hasPremiumAccess ? (
                <Link
                  to="/payment"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition flex items-center justify-center"
                >
                  Unlock Premium
                </Link>
              ) : (
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition flex items-center justify-center">
                  <Play className="h-4 w-4 mr-2" />
                  Start Learning
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}