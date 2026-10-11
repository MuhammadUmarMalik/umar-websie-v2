import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { comments } from "@/lib/schema";
import { isAuthenticated } from "@/lib/auth";

async function updateStatus(formData: FormData) {
  "use server";
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
  const id = formData.get("id") as string;
  const status = formData.get("status") as "approved" | "rejected";
  if (!id || !["approved", "rejected"].includes(status)) return;
  await db.update(comments).set({ status }).where(eq(comments.id, id));
  revalidatePath("/admin/comments");
}

async function deleteComment(formData: FormData) {
  "use server";
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
  const id = formData.get("id") as string;
  if (!id) return;
  await db.delete(comments).where(eq(comments.id, id));
  revalidatePath("/admin/comments");
}

export default async function CommentsPage() {
  const rows = await db
    .select()
    .from(comments)
    .orderBy(comments.createdAt);

  const pending = rows.filter((c) => c.status === "pending");
  const rest = rows.filter((c) => c.status !== "pending");

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold">Comments</h1>

      {pending.length > 0 && (
        <>
          <h2 className="mb-3 text-lg font-semibold text-warning">
            Pending ({pending.length})
          </h2>
          <CommentList comments={pending} />
        </>
      )}

      <h2 className="mb-3 mt-8 text-lg font-semibold">
        All Comments ({rest.length})
      </h2>
      <CommentList comments={rest} />
    </div>
  );
}

function CommentList({
  comments: items,
}: {
  comments: (typeof comments.$inferSelect)[];
}) {
  if (items.length === 0) {
    return <p className="text-sm text-text-secondary">No comments.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((c) => (
        <div
          key={c.id}
          className="rounded-xl border border-border bg-bg-card p-4"
        >
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
            <span className="font-medium text-text-primary">{c.name}</span>
            <span>&middot;</span>
            <span>{c.email}</span>
            <span>&middot;</span>
            <span>on /{c.postSlug}</span>
            <span>&middot;</span>
            <span>{c.createdAt?.toLocaleDateString()}</span>
            <span
              className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${
                c.status === "approved"
                  ? "bg-success/10 text-success"
                  : c.status === "rejected"
                    ? "bg-danger/10 text-danger"
                    : "bg-warning/10 text-warning"
              }`}
            >
              {c.status}
            </span>
          </div>

          <p className="mb-3 text-sm whitespace-pre-wrap">{c.body}</p>

          <div className="flex gap-2">
            {c.status !== "approved" && (
              <form action={updateStatus}>
                <input type="hidden" name="id" value={c.id} />
                <input type="hidden" name="status" value="approved" />
                <button
                  type="submit"
                  className="rounded-lg bg-success/10 px-3 py-1 text-xs font-medium text-success transition-colors hover:bg-success/20"
                >
                  Approve
                </button>
              </form>
            )}
            {c.status !== "rejected" && (
              <form action={updateStatus}>
                <input type="hidden" name="id" value={c.id} />
                <input type="hidden" name="status" value="rejected" />
                <button
                  type="submit"
                  className="rounded-lg bg-warning/10 px-3 py-1 text-xs font-medium text-warning transition-colors hover:bg-warning/20"
                >
                  Reject
                </button>
              </form>
            )}
            <form action={deleteComment}>
              <input type="hidden" name="id" value={c.id} />
              <button
                type="submit"
                className="rounded-lg bg-danger/10 px-3 py-1 text-xs font-medium text-danger transition-colors hover:bg-danger/20"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
