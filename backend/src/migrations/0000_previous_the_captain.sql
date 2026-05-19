CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"role" "user_role_enum" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
