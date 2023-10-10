export type ReportMetaData = {
  id: string;
  from: string;
  to: string;
  type: "summary" | "detailed";
  createdAt: string;
  path: string;
};
