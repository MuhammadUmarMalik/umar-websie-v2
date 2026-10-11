import { count, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { likes, comments } from "@/lib/schema";
import { getAllPosts } from "@/lib/blog";

export default async function AdminDashboard() {
  const posts = getAllPosts();

  const [likeCount] = await db.select({ value: count() }).from(likes);
  const [commentCount] = await db.select({ value: count() }).from(comments);
  const [pendingCount] = await db
    .select({ value: count() })
    .from(comments)
    .where(eq(comments.status, "pending"));

  const stats = [
    { label: "Posts", value: posts.length },
    { label: "Total Likes", value: likeCount?.value ?? 0 },
    { label: "Total Comments", value: commentCount?.value ?? 0 },
    { label: "Pending Comments", value: pendingCount?.value ?? 0 },
  ];

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-bg-card p-5"
          >
            <p className="text-sm text-text-secondary">{s.label}</p>
            <p className="mt-1 text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-10 font-display text-xl font-bold">Recent Posts</h2>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-bg-secondary text-text-secondary">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Tags</th>
              <th className="px-4 py-3 font-medium">Read Time</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{post.title}</td>
                <td className="px-4 py-3 text-text-secondary">
                  {new Date(post.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  {post.tags.slice(0, 3).join(", ")}
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  {post.readingMinutes} min
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
