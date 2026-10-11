import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const postStatusEnum = pgEnum("post_status", [
  "draft",
  "published",
  "scheduled",
]);

export const commentStatusEnum = pgEnum("comment_status", [
  "pending",
  "approved",
  "rejected",
]);

export const posts = pgTable("posts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").default(""),
  content: text("content").default(""),
  coverImage: text("cover_image").default(""),
  coverImageAlt: text("cover_image_alt"),
  author: text("author").default("Muhammad Umar Malik"),
  tags: text("tags")
    .array()
    .default([]),
  status: postStatusEnum("status").default("draft"),
  publishedAt: timestamp("published_at"),
  scheduledAt: timestamp("scheduled_at"),
  views: integer("views").default(0),
  seoTitle: text("seo_title"),
  metaDescription: text("meta_description"),
  focusKeyword: text("focus_keyword"),
  canonicalUrl: text("canonical_url"),
  ogImage: text("og_image"),
  noindex: boolean("noindex").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const likes = pgTable(
  "likes",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    postSlug: text("post_slug").notNull(),
    visitorId: text("visitor_id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    unique("likes_post_visitor").on(t.postSlug, t.visitorId),
    index("likes_post_slug_idx").on(t.postSlug),
  ],
);

export const comments = pgTable(
  "comments",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    postSlug: text("post_slug").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    body: text("body").notNull(),
    status: commentStatusEnum("status").default("pending"),
    parentId: text("parent_id"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("comments_post_slug_idx").on(t.postSlug),
    index("comments_status_idx").on(t.status),
  ],
);
