import React, { useState } from 'react';
import { storage, db } from '../../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { Upload, CheckCircle } from 'lucide-react';

export default function VideoUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !thumbnail) return;

    setUploading(true);
    
    try {
      // Upload thumbnail
      const thumbnailRef = ref(storage, `thumbnails/${Date.now()}-${thumbnail.name}`);
      const thumbnailSnapshot = await uploadBytesResumable(thumbnailRef, thumbnail);
      const thumbnailUrl = await getDownloadURL(thumbnailSnapshot.ref);

      // Upload video
      const videoRef = ref(storage, `videos/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(videoRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
          setUploading(false);
        },
        async () => {
          const videoUrl = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Save to Firestore
          await addDoc(collection(db, 'courses'), {
            title,
            description,
            videoUrl,
            thumbnailUrl,
            createdAt: new Date().toISOString()
          });

          setTitle('');
          setDescription('');
          setFile(null);
          setThumbnail(null);
          setUploadProgress(0);
          setUploading(false);
        }
      );
    } catch (error) {
      console.error('Error uploading:', error);
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Upload New Course</h1>
      
      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="mt-1 block w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Video File</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full"
            required
          />
        </div>

        {uploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Upload progress: {Math.round(uploadProgress)}%
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className={`flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {uploading ? (
            <>
              <Upload className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Uploading...
            </>
          ) : (
            <>
              <CheckCircle className="-ml-1 mr-2 h-5 w-5" />
              Upload Course
            </>
          )}
        </button>
      </form>
    </div>
  );
}