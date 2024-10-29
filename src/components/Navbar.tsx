import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, BookOpen, Video, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8" />
              <span className="text-xl font-bold">EduTech</span>
            </Link>
            
            {isAdmin ? (
              <div className="flex space-x-4">
                <Link to="/admin" className="hover:text-indigo-200 transition">Dashboard</Link>
                <Link to="/admin/videos" className="hover:text-indigo-200 transition">Manage Videos</Link>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/dashboard" className="hover:text-indigo-200 transition">Dashboard</Link>
                <Link to="/courses" className="hover:text-indigo-200 transition">Courses</Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{user?.name}</span>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="flex items-center space-x-1 hover:text-indigo-200 transition"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}