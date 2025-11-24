export type AccountProps = {
  id: number;
  name: string;
  email?: string;
  age: number;
  pictures: string;
  location: string;
  like_count?: number | null;
  dislike_count?: number | null;
}