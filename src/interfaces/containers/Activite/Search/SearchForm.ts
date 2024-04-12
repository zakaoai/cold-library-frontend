import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { type UseMutateFunction } from "@tanstack/react-query"
import { type UseFormReturn } from "react-hook-form"
import type SearchFormValues from "./SearchFormValues"

export default interface SearchForm {
  searchAnime: UseMutateFunction<AnimeDTO[], unknown, string, unknown>
  form: UseFormReturn<SearchFormValues, unknown>
}
