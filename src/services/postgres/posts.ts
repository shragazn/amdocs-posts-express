import { User } from "@/types/influencers";
import { Post } from "@/types/posts";
import { sql } from "@vercel/postgres";

const toSqlPost = (post: Post & Pick<User, "id">) => {
  return `('${post.date}', '${post.text}', '${post.hashTags}', '${post.link}', '${post.likes}', '${post.comments}', '${post.shares}', '${post.id}')`;
};

export const createPosts = async (posts: (Post & Pick<User, "id">)[]) => {
  const postQuery = posts.map(toSqlPost).join(", ");
  const query = `INSERT INTO posts (date, text, hashTags, link, likes, comments, shares, userId) VALUES ${postQuery} RETURNING *`;
  const { rows } = await sql.query<Partial<Post>>(query);
  return rows;
};

export const createPost = async (post: Post & Pick<User, "id">) => {
  return createPosts([post]);
};

export const getPosts = async (userId: string) => {
  const query = `SELECT * FROM posts WHERE userId = '${userId}'`;
  const { rows } = await sql.query<Partial<Post>>(query);
  return rows;
};

export const getPost = async (id: string) => {
  const query = `SELECT * FROM posts WHERE id = '${id}'`;
  const { rows } = await sql.query<Partial<Post>>(query);
  return rows;
};

export const deletePosts = async (id: string) => {
  const query = `DELETE FROM posts WHERE id = '${id}' RETURNING *`;
  const { rows } = await sql.query<Partial<Post>>(query);
  return rows;
};

export const updatePost = async (id: string, post: Partial<Post>) => {
  const postQuery = Object.entries(post)
    .map(([key, value]) => `${key} = '${value}'`)
    .join(", ");
  const query = `UPDATE posts SET ${postQuery} WHERE id = '${id}' RETURNING *`;
  const { rows } = await sql.query<Partial<Post>>(query);
  return rows;
};
