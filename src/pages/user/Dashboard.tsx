import React from 'react';
import { Play, Clock, Award } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        {!user?.hasPremiumAccess && (
          <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <p className="text-indigo-700">
              Upgrade to Premium to access all courses!
              <Link to="/payment" className="ml-2 font-semibold underline">
                Upgrade now
              </Link>
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Play className="h-6 w-6 text-blue-500" />
            <h2 className="ml-2 text-lg font-semibold">Continue Learning</h2>
          </div>
          <div className="space-y-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    JavaScript Fundamentals
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    60%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div className="w-[60%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
              </div>
            </div>
          </div>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            Resume Course
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 text-green-500" />
            <h2 className="ml-2 text-lg font-semibold">Learning Stats</h2>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Hours this week: <span className="font-semibold">4.5</span></p>
            <p className="text-sm text-gray-600">Completed courses: <span className="font-semibold">2</span></p>
            <p className="text-sm text-gray-600">In progress: <span className="font-semibold">1</span></p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Award className="h-6 w-6 text-yellow-500" />
            <h2 className="ml-2 text-lg font-semibold">Achievements</h2>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">🏆 Course Completion Master</p>
            <p className="text-sm text-gray-600">⭐ Perfect Attendance - 7 days</p>
            <p className="text-sm text-gray-600">🎯 Quick Learner</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recommended Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Advanced React Patterns', duration: '2h 30m', level: 'Advanced' },
            { title: 'TypeScript Essentials', duration: '1h 45m', level: 'Intermediate' },
            { title: 'Node.js Fundamentals', duration: '3h 15m', level: 'Beginner' },
          ].map((course, index) => (
            <div key={index} className="border rounded-lg p-4 hover:border-indigo-500 transition cursor-pointer">
              <h3 className="font-semibold text-gray-900">{course.title}</h3>
              <p className="text-sm text-gray-500 mt-1">Duration: {course.duration}</p>
              <p className="text-sm text-gray-500">Level: {course.level}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}