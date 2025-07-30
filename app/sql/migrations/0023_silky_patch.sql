ALTER TABLE "messages" RENAME COLUMN "profile_id" TO "sender_id";--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT "messages_profile_id_profiles_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "message_room_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_profiles_profile_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN "seen";