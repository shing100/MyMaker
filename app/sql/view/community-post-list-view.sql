CREATE OR REPLACE VIEW community_post_list_view AS 
SELECT
    posts.post_id,
    posts.title,
    posts.created_at,
    topics.name AS topic,
    profiles.name AS author,
    profiles.avatar AS author_avatar,
    profiles.username AS author_username,
    posts.upvotes,
    topics.slug AS topic_slug
FROM posts
INNER JOIN topics USING (topic_id)
INNER JOIN profiles USING (profile_id);


-- after post upvote trigger

-- CREATE OR REPLACE VIEW community_post_list_view AS 
-- SELECT
--     posts.post_id,
--     posts.title,
--     posts.created_at,
--     topics.name AS topic,
--     profiles.name AS author,
--     profiles.avatar AS author_avatar,
--     profiles.username AS author_username,
--     posts.upvotes
-- FROM posts
-- INNER JOIN topics USING (topic_id)
-- INNER JOIN profiles USING (profile_id)
-- ;

-- SELECT * FROM community_post_list_view; 