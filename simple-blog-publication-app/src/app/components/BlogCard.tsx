interface BlogCardProps {
  title: string
  summary: string
  author: string
}

export default function BlogCard({ title, summary, author }: BlogCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">By {author}</p>
      <p>{summary}</p>
    </div>
  )
}
