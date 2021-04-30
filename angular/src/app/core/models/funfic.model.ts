import { Chapter } from './chapter.model';

export interface Funfic {
  id: number;
  name: string;
  author: string;
  genre: string;
  rating: number;
  scoreCount: number;
  shortDescription: string;
  createdAt: string;
  updatedAt?: string;
  chapters?: Chapter[];
  userId?: string;
  __typename?: string;
}
