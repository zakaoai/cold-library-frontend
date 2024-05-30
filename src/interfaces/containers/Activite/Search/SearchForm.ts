import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type DataListHolderWithPagination from "@/interfaces/services/DataListHolderWithPagination"
import { type UseMutateFunction } from "@tanstack/react-query"
import { type UseFormReturn } from "react-hook-form"
import type SearchFormValues from "./SearchFormValues"

export default interface SearchForm {
  searchAnime: UseMutateFunction<
    DataListHolderWithPagination<AnimeDTO>,
    unknown,
    { search: string; page: number | undefined },
    unknown
  >
  form: UseFormReturn<SearchFormValues, unknown>
}
