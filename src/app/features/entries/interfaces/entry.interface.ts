import { IMood } from './mood.interface';

export interface IEntry {
  _id: string;
  title: string;
  description: string;
  postedDate: Date;
  lastUpdated: string;
  mood: IMood;
  author: string;
  tags: string[];
  isTrashed: boolean;
  trashedDate?: string;
}

export interface ICreateEntryRequest {
  title: string;
  description: string;
  postedDate: string;
  lastUpdated: string;
  mood: IMood;
  author: string;
  tags: string[];
  isTrashed?: boolean;
  trashedDate?: string;
}
