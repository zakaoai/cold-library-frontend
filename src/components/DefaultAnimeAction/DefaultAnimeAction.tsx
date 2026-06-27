import useMyRequest from "@/hooks/containers/Activite/Request/useMyRequest"

import RequestButton from "@/components/RequestButton/RequestButton"
import useUpdateAnimeListState from "@/hooks/components/useUpdateAnimeListState"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import { ComponentType, useMemo, type Dispatch, type SetStateAction } from "react"
import InLibraryStateButtonGeneric from "../InLibraryStateButtonGeneric/InLibraryStateButtonGeneric"
import type IInLibraryStateButtonGeneric from "../InLibraryStateButtonGeneric/interface/InLibraryStateButtonGeneric"
import withAuthorization from "../Secure/withAuthorization"

interface IDefaultAnimeAction<Anime> {
  anime: AnimeDTO
  setAnimeListState: Dispatch<SetStateAction<Anime[]>>
  renderRow?: boolean
}

const DefaultAnimeAction = <T extends AnimeDTO>({ anime, setAnimeListState }: IDefaultAnimeAction<T>) => {
  const { createRequest, myOpenedRequestMap } = useMyRequest()
  const { updateAnime } = useUpdateAnimeListState(setAnimeListState)
  const request = useMemo(() => myOpenedRequestMap[anime.malId], [anime.malId, myOpenedRequestMap])

  return (
    <>
      <SecuredInLibraryStateButton anime={anime} updateAnime={updateAnime} />
      <RequestButton request={request} createRequest={createRequest} animeInServer={anime} />
    </>
  )
}

const SecuredInLibraryStateButton = withAuthorization(
  InLibraryStateButtonGeneric as ComponentType<IInLibraryStateButtonGeneric<AnimeDTO>>,
  { minLevel: "admin" }
)

export default DefaultAnimeAction
