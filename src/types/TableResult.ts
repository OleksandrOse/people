import { Person } from "./Person";

export interface TableResult {
  count: number;
  next: string;
  previous: string;
  results: Person[];
}