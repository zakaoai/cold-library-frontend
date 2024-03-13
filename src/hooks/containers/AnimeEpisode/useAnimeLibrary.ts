import { type AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"
import ResponseError from "@/interfaces/services/ResponseError"
import AnimeServices from "@/services/AnimeService"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"

const useAnimeLibrary = (malId: number) => {
  const [anime, setAnime] = useState<AnimeDTO | undefined>(undefined)

  const { data, isFetched, isFetching } = useQuery({
    queryKey: ["animeLibrary"],
    queryFn: async () => await AnimeServices.get(malId),
    retry: false
  })

  useEffect(() => {
    if (isFetched && data != undefined) {
      setAnime(data)
    }
  }, [data, isFetched])

  const updateAnime = useCallback(
    (updatedAnime: AnimeDTO | AnimeInServerDTO) => {
      if (anime !== undefined) setAnime({ ...anime, ...updatedAnime })
    },
    [anime]
  )

  const updateAnimeInfosCall = useCallback(() => AnimeServices.update(malId), [malId])
  const onSuccessUpdateAnimeInfos = useCallback(
    (updatedAnime: AnimeDTO) => {
      updateAnime(updatedAnime)
    },
    [updateAnime]
  )
  const onErrorUpdateAnimeInfos = useCallback(
    (error: ResponseError) => {
      console.error(
        "Une erreur est survenue lors de la mise à jour des informations de l'anime %s de l'anime %s avec le status %s",
        malId,
        error?.response?.status
      )
    },
    [malId]
  )

  const { mutate: updateAnimeInfos } = useMutation<AnimeDTO, ResponseError>({
    mutationFn: updateAnimeInfosCall,
    onSuccess: onSuccessUpdateAnimeInfos,
    onError: onErrorUpdateAnimeInfos
  })

  return {
    anime,
    isFetching,
    updateAnime,
    updateAnimeInfos
  }
}

export default useAnimeLibrary
