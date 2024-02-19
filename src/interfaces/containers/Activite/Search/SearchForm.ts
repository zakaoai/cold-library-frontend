import { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { UseMutateFunction } from "@tanstack/react-query"
import { UseFormReturn } from "react-hook-form"
import SearchFormValues from "./SearchFormValues"

export default interface SearchForm {
  searchAnime: UseMutateFunction<AnimeDTO[], unknown, string, unknown>
  form: UseFormReturn<SearchFormValues, unknown>
}
