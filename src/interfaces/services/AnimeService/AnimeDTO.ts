import { AnimeType } from "@/enums/AnimeType";
import { StorageState } from "@/enums/StorageState";

export interface AnimeDTO {
  malId: number;
  title: string;
  url: string;
  imageUrl?: string;
  type?: AnimeType;
  nbEpisodes?: number;
  storageState?: StorageState;
  isComplete?: boolean;
  lastAvaibleEpisode?: number;
}
