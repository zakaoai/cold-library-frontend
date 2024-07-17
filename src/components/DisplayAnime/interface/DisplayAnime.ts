import type { JSX, PropsWithChildren } from "react"

export default interface DisplayAnime<Anime> {
  animeList: Anime[]
  TableComponent: ({ children }: PropsWithChildren) => JSX.Element
  singleCardRender: (anime: Anime) => JSX.Element
  singleTableRender: (anime: Anime) => JSX.Element
}
