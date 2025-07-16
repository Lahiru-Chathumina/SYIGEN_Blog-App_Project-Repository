import BlogCard from './BlogCard'

const dummyPosts = [
  { title: 'First Blog Post', summary: 'This is a sample blog...', author: 'Lahiru' },
  { title: 'Another Blog', summary: 'Second post content...', author: 'Nimali' },
]

export default function BlogList() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {dummyPosts.map((post, index) => (
        <BlogCard key={index} {...post} />
      ))}
    </div>
  )
}
