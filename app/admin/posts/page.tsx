import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default async function AdminPostsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          + New Post
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-bg-secondary text-text-secondary">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Tags</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-medium text-accent hover:text-accent-hover"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                  {post.slug}
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  {new Date(post.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  {post.tags.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
