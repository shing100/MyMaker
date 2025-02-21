import db from "~/db"
import { posts, postUpvotes, topics } from "./schema"
import { create } from "domain";
import { count, eq } from "drizzle-orm";
import { profiles } from "../users/schema";


export const getTopics = async () => {
    const allTopics = await db
        .select({
            name: topics.name,
            slug: topics.slug,
        })
        .from(topics);
    return allTopics;
}


export const getPosts = async () => {
    const allPosts = await db
        .select({
            id: posts.post_id,
            title: posts.title,
            created_at: posts.created_at,
            topic: topics.name,
            auther: profiles.name,
            autherAvatarUrl: profiles.avatar,
            username: profiles.username,
            upvotes: count(postUpvotes.post_id),
        })
        .from(posts)
        .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
        .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
        .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
        .groupBy(posts.post_id, topics.name, profiles.name, profiles.avatar, profiles.username)
        .orderBy(posts.post_id);
    return allPosts;
}