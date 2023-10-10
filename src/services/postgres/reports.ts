import { ReportMetaData } from "@/types/reports";
import { sql } from "@vercel/postgres";

export const createReport = async (reportMetaData: ReportMetaData) => {
  const query = `INSERT INTO reports (id, from, to, type, createdAt, path) VALUES ('${reportMetaData.id}', '${reportMetaData.from}', '${reportMetaData.to}', '${reportMetaData.type}', '${reportMetaData.createdAt}', '${reportMetaData.path}') RETURNING *`;
  const { rows } = await sql.query<Partial<ReportMetaData>>(query);
  return rows;
};

export const getReports = async (id: string) => {
  const query = `SELECT * FROM reports WHERE id = '${id}'`;
  const { rows } = await sql.query<Partial<ReportMetaData>>(query);
  return rows;
};

export const deleteReport = async (id: string) => {
  const query = `DELETE FROM reports WHERE id = '${id}' RETURNING *`;
  const { rows } = await sql.query<Partial<ReportMetaData>>(query);
  return rows;
};

export const updateReport = async (
  id: string,
  reportMetaData: Partial<ReportMetaData>
) => {
  const reportQuery = Object.entries(reportMetaData)
    .map(([key, value]) => `${key} = '${value}'`)
    .join(", ");
  const query = `UPDATE reports SET ${reportQuery} WHERE id = '${id}' RETURNING *`;
  const { rows } = await sql.query<Partial<ReportMetaData>>(query);
  return rows;
};
