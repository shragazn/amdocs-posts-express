import { sql } from "@vercel/postgres";
import { User } from "@/types/influencers";

export const getInfluencers = async (client?: string) => {
  let query = `SELECT * FROM influencers`;
  if (client) {
    query += ` WHERE client = '${client}'`;
  }
  const { rows } = await sql.query<Partial<User>>(query);
  return rows;
};

export const getInfluencer = async (id: string) => {
  const query = `SELECT * FROM influencers WHERE id = '${id}'`;
  const { rows } = await sql.query<Partial<User>>(query);
  return rows;
};

export const deleteInfluencer = async (id: string) => {
  const query = `DELETE FROM influencers WHERE id = '${id}' RETURNING *`;
  const { rows } = await sql.query<Partial<User>>(query);
  return rows;
};
