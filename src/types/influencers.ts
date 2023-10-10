export type User = {
  id: string;
  username: string;
  client: string;
  media: string;
  actions?: Action[];
};

export type Action = {
  action: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
};
