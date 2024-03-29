import type SearchFormValues from "@/interfaces/containers/Activite/Search/SearchFormValues"
import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import SiteMap from "@/routes/SiteMap"
import AnimeServices from "@/services/AnimeService"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"

const useAnimeSearch = () => {
  const { search: browserSearch } = useLocation()
  const searchParam = new URLSearchParams(browserSearch).get("search")

  const form = useForm<SearchFormValues, unknown>({ defaultValues: { search: searchParam || "" } })

  const navigate = useNavigate()

  const [animes, setAnimes] = useState<AnimeDTO[]>([])

  const [error, setError] = useState<string | undefined>(undefined)

  const searchAnimeCall = useCallback(
    async (search: string) => {
      navigate({ pathname: SiteMap.RECHERCHE.path, search: `?search=${search}` })
      return await AnimeServices.searchAnime(search)
    },
    [navigate]
  )

  const onSuccessSearchAnime = useCallback(
    (animes: AnimeDTO[]) => {
      setAnimes(animes)
    },
    [setAnimes]
  )
  const onErrorSearchAnime = useCallback(() => {
    setError("Une erreur est survenue lors de la recherche")
  }, [setError])

  const { isPending, mutate: searchAnime } = useMutation<AnimeDTO[], unknown, string>({
    mutationFn: searchAnimeCall,
    onSuccess: onSuccessSearchAnime,
    onError: onErrorSearchAnime
  })

  useEffect(() => {
    if (searchParam != null) {
      searchAnime(searchParam)
    }
  }, [])

  const updateAnime = (updatedAnime: Partial<AnimeDTO> & Pick<AnimeDTO, "malId">) => {
    setAnimes(animes =>
      animes.map(anime => (anime.malId === updatedAnime.malId ? { ...anime, ...updatedAnime } : anime))
    )
  }

  return { animes, error, isFetching: isPending, form, searchAnime, updateAnime }
}

export default useAnimeSearch
