ALTER TABLE "agents" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "model" text DEFAULT 'gpt-4' NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "status" text DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "avatar_type" text DEFAULT 'icon' NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "avatar_icon" text DEFAULT 'bot' NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "avatar_gradient" text DEFAULT 'blue-purple' NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "avatar_image_url" text;