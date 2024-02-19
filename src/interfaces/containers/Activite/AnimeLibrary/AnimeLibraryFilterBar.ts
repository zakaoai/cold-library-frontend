import useAnimeLibraryFilter from "@/hooks/containers/AnimeLibrary/useAnimeLibraryFilter"

export default interface AnimeLibraryFilterBar extends Pick<ReturnType<typeof useAnimeLibraryFilter>, "filtersState"> {}
