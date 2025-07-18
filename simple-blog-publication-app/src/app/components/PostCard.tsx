'use client';

import Link from 'next/link';

export default function PostCard({ post }: any) {
  const preview = post?.description
    ? post.description.length > 100
      ? post.description.slice(0, 100) + '...'
      : post.description
    : 'No description';

  return (
    <Link href={`/post/${post.id}`} className="block">
      <div className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white cursor-pointer">
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">{post.title || 'Untitled Post'}</h3>
        <p className="text-sm text-gray-500 mb-3">Uploaded by: {post.user?.email || 'Unknown User'}</p>
        <p className="text-gray-700 mb-4">{preview}</p>
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title || 'Post image'}
            className="rounded-md w-full max-h-64 object-cover"
            loading="lazy"
          />
        )}
      </div>
    </Link>
  );
}
