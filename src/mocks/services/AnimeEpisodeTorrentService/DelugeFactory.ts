import type DelugeEpisodeTorrent from "@/interfaces/services/AnimeEpisodeTorrentService/DelugeEpisodeTorrentDTO"
import { faker } from "@faker-js/faker"

const generateDelugeResponse = (): DelugeEpisodeTorrent => ({
  torrentHash: faker.string.alphanumeric(40),
  progress: faker.number.int(100),
  torrentId: faker.number.int(2000000)
})

export default generateDelugeResponse
