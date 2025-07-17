import PostCard from './components/PostCard';

export default function HomePage() {
  const post = {
    id: '1',
    title: 'Welcome to My Blog',
    description: 'This is your first post. Excited to start writing!',
    imageUrl: 'https://via.placeholder.com/600x300',
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to the Blog App</h1>
      <p className="mt-2 text-gray-700">This is the homepage.</p>
      <PostCard post={post} />
    </div>
  );
}
