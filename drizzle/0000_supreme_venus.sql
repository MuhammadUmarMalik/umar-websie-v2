CREATE TYPE "public"."comment_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."post_status" AS ENUM('draft', 'published', 'scheduled');--> statement-breakpoint
CREATE TABLE "comments" (
	"id" text PRIMARY KEY NOT NULL,
	"post_slug" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"body" text NOT NULL,
	"status" "comment_status" DEFAULT 'pending',
	"parent_id" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "likes" (
	"id" text PRIMARY KEY NOT NULL,
	"post_slug" text NOT NULL,
	"visitor_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "likes_post_visitor" UNIQUE("post_slug","visitor_id")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text DEFAULT '',
	"content" text DEFAULT '',
	"cover_image" text DEFAULT '',
	"cover_image_alt" text,
	"author" text DEFAULT 'Muhammad Umar Malik',
	"tags" text[] DEFAULT '{}',
	"status" "post_status" DEFAULT 'draft',
	"published_at" timestamp,
	"scheduled_at" timestamp,
	"views" integer DEFAULT 0,
	"seo_title" text,
	"meta_description" text,
	"focus_keyword" text,
	"canonical_url" text,
	"og_image" text,
	"noindex" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "comments_post_slug_idx" ON "comments" USING btree ("post_slug");--> statement-breakpoint
CREATE INDEX "comments_status_idx" ON "comments" USING btree ("status");--> statement-breakpoint
CREATE INDEX "likes_post_slug_idx" ON "likes" USING btree ("post_slug");