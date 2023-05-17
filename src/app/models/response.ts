import { Movie } from "./movie";

export interface Response {
  Search: Movie[]
  totalResult: string
  Response: string
}
