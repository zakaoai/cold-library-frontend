import type useUpdateAnimeState from "@/hooks/components/useUpdateAnimeState"
import type { AnimeInServerDTO } from "@/interfaces/services/AnimeService/AnimeInServerDTO"

export default interface InLibraryButton {
  updateAnimeState: ReturnType<typeof useUpdateAnimeState>
  anime: Partial<AnimeInServerDTO>
}
