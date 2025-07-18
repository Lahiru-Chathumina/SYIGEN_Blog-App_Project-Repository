'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export default function FomeCreate() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        router.push('/login');
      }
    };
    getUser();
  }, [router]);

  const handlePost = async () => {
    if (!title || !description || !imageFile) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    const fileName = `${uuidv4()}-${imageFile.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('postimage')
      .upload(`images/${fileName}`, imageFile, {
        contentType: imageFile.type,
      });

    if (uploadError) {
      setError('Error uploading image: ' + uploadError.message);
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase
      .storage
      .from('postimage')
      .getPublicUrl(`images/${fileName}`);

    const imageUrl = urlData.publicUrl;

    const { error: dbError } = await supabase.from('posts').insert([
      {
        user_id: user.id,
        user_email: user.email,
        title,
        description,
        image_url: imageUrl,
      },
    ]);

    if (dbError) {
      setError('Error saving post: ' + dbError.message);
    } else {
      router.push('/');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <input
        type="text"
        placeholder="Enter title..."
        className="w-full p-2 border mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write something..."
        className="w-full p-2 border mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handlePost}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
}
