ALTER TABLE "get_ideas" RENAME TO "gpt_ideas";--> statement-breakpoint
ALTER TABLE "gpt_ideas" DROP CONSTRAINT "get_ideas_claimed_by_profiles_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "gpt_ideas_likes" DROP CONSTRAINT "gpt_ideas_likes_gpt_idea_id_get_ideas_gpt_idea_id_fk";
--> statement-breakpoint
ALTER TABLE "gpt_ideas" ADD CONSTRAINT "gpt_ideas_claimed_by_profiles_profile_id_fk" FOREIGN KEY ("claimed_by") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gpt_ideas_likes" ADD CONSTRAINT "gpt_ideas_likes_gpt_idea_id_gpt_ideas_gpt_idea_id_fk" FOREIGN KEY ("gpt_idea_id") REFERENCES "public"."gpt_ideas"("gpt_idea_id") ON DELETE cascade ON UPDATE no action;