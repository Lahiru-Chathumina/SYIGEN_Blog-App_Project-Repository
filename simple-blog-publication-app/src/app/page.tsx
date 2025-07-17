import PostCard from './components/PostCard';

export default function HomePage() {
  const post = {
    id: '1',
    title: 'Welcome to My Blog',
    description: 'This is your first post. Excited to start writing!',
    imageUrl: 'https://via.placeholder.com/600x300',
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-indigo-700 tracking-wide">
            Welcome to the Blog App
          </h1>
          <p className="mt-3 text-lg text-indigo-600/80">
            This is the homepage.
          </p>
        </header>

        <section>
          <PostCard post={post} />
        </section>
      </div>
    </main>
  );
}
