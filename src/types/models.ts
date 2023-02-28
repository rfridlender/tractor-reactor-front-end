/* ---------===== custom props ====--------- */



/* ---------===== auth models =====--------- */

export interface Post {
  id: number;
  variety: string;
  year: number;
  brand: string;
  design: string;
  horsepower: number;
  reaction: string;
  rating: number;
  authorId: number;
  photo?: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  author: Profile
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Profile;
}

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number, photo: string };
  id: number;
  createdAt: string;
  updatedAt: string;
}
