'use client';

import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import PostCard from './components/PostCard';

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error.message);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-indigo-700 tracking-wide">
            Welcome to the Blog App
          </h1>
          <p className="mt-3 text-lg text-indigo-600/80">
          </p>
        </header>

        <section>
          {loading ? (
            <p className="text-center text-gray-500">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts found.</p>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </section>
      </div>
    </main>
  );
}
