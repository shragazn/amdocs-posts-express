export type Post = {
  date: string;
  text: string | null;
  hashTags: string[];
  link: string | undefined;
  likes: number;
  comments: number;
  shares: number;
};
