import type SearchFormValues from "@/interfaces/containers/Activite/Search/SearchFormValues"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import type DataListHolderWithPagination from "@/interfaces/services/DataListHolderWithPagination"
import AnimeServices from "@/services/AnimeService"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useEffect, useState, type ChangeEvent as ReactChangeEvent } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import useLibrary from "../AnimeLibrary/useLibrary"

const useAnimeSearch = () => {
  useLibrary()

  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get("page")
  const [pageMax, setPageMax] = useState<number | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState<number | undefined>(page !== null ? +page : undefined)

  const form = useForm<SearchFormValues, unknown>({ defaultValues: { search: searchParams.get("search") ?? "" } })

  const [animes, setAnimes] = useState<AnimeDTO[]>([])

  const [error, setError] = useState<string | undefined>(undefined)

  const searchAnimeCall = useCallback(
    async ({ search, page }: { search: string; page: number | undefined }) => {
      // navigate({ pathname: SiteMap.RECHERCHE.path, search: `?search=${search}` })
      setSearchParams(prev => {
        prev.set("search", search)
        console.log(page)
        if (page !== undefined) prev.set("page", page?.toString())
        else prev.delete("page")
        return prev
      })
      return await AnimeServices.searchAnime(search, page)
    },
    [setSearchParams]
  )

  const onSuccessSearchAnime = useCallback(
    (result: DataListHolderWithPagination<AnimeDTO>) => {
      console.log(result.pagination)
      setAnimes(result.data)
      setPageMax(result.pagination.last_visible_page)
      setCurrentPage(result.pagination.current_page)
    },
    [setAnimes]
  )
  const onErrorSearchAnime = useCallback(() => {
    setError("Une erreur est survenue lors de la recherche")
  }, [setError])

  const { isPending, mutate: searchAnime } = useMutation<
    DataListHolderWithPagination<AnimeDTO>,
    unknown,
    { search: string; page: number | undefined }
  >({
    mutationFn: searchAnimeCall,
    onSuccess: onSuccessSearchAnime,
    onError: onErrorSearchAnime
  })

  useEffect(() => {
    const search = searchParams.get("search")
    if (search !== null) {
      console.log("INITSEARCH")
      searchAnime({ search, page: currentPage })
    }
  }, [])

  const updateAnime = (updatedAnime: Partial<AnimeDTO> & Pick<AnimeDTO, "malId">) => {
    setAnimes(animes =>
      animes.map(anime => (anime.malId === updatedAnime.malId ? { ...anime, ...updatedAnime } : anime))
    )
  }

  const handleChange = useCallback(
    (_event: ReactChangeEvent<unknown>, page: number) => {
      searchAnime({ search: form.getValues("search"), page })
    },
    [form, searchAnime]
  )

  return { animes, error, isFetching: isPending, form, searchAnime, updateAnime, pageMax, currentPage, handleChange }
}

export default useAnimeSearch
