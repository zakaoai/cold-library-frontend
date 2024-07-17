import AnimeRowRead from "@/components/AnimeRowRead/AnimeRowRead"
import type { AnimeDTO } from "@/interfaces/services/AnimeService/AnimeDTO"
import DefaultAnimeAction from "../DefaultAnimeAction/DefaultAnimeAction"
import type IDefaultAnimeRenderRow from "./interface/DefaultAnimeRenderRow"

const DefaultAnimeRenderRow = <T extends AnimeDTO>({
  anime,
  setAnimeListState,
  selectedGenres,
  animeRowRead
}: IDefaultAnimeRenderRow<T>) => (
  <AnimeRowRead
    selectedGenres={selectedGenres}
    imageHeight="120px"
    anime={anime}
    actionTableCell={<DefaultAnimeAction anime={anime} setAnimeListState={setAnimeListState} renderRow />}
    {...animeRowRead}
  />
)

export default DefaultAnimeRenderRow
