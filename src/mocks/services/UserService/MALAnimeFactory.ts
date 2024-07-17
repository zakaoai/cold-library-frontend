import Season from "@/enums/Season"
import UserAnimeStatus from "@/enums/UserAnimeStatus"
import type MALAnime from "@/interfaces/services/UserService/MyAnimeList/MALAnime"
import { faker } from "@faker-js/faker"

const generateMALAnime = (): MALAnime => ({
  id: faker.number.int(),
  title: faker.lorem.words(3),
  main_picture: {
    medium: faker.image.url(),
    large: faker.image.url()
  },
  start_date: faker.date.past().toISOString(),
  end_date: faker.date.past().toISOString(),
  mean: faker.number.int({ min: 0, max: 100 }),
  rank: faker.number.int({ min: 0, max: 1000 }),
  popularity: faker.number.int({ min: 0, max: 10000 }),
  genres: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
    id: faker.number.int(),
    name: faker.lorem.words(2)
  })),
  media_type: faker.lorem.word(),
  status: faker.lorem.word(),
  num_episodes: faker.number.int({ min: 1, max: 1000 }),
  start_season: {
    year: faker.number.int({ min: 1900, max: 2100 }),
    season: faker.helpers.enumValue(Season)
  },
  broadcast: {
    day_of_the_week: faker.lorem.word(),
    start_time: faker.string.sample()
  },
  rating: faker.lorem.word(),
  userStatus: faker.helpers.enumValue(UserAnimeStatus)
})

export default generateMALAnime
