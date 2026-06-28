import ContextLayout from "@/containers/Layout/ContextLayout"
import Layout from "@/containers/Layout/Layout"
import SiteMap from "@/routes/SiteMap"
import { Navigate, Route } from "react-router"

import ProtectedLayout from "@/containers/Layout/ProtectedLayout"

import Logout from "@/containers/Activite/Logout/Logout"
import { lazy } from "react"
import RootBoundary from "./RootBoundary"

const AnimeEpisodeActivity = lazy(async () => await import("@/containers/Activite/AnimeEpisode/AnimeEpisodeActivity"))
const HomeActivity = lazy(async () => await import("@/containers/Activite/Home/HomeActivity"))
const SearchActivity = lazy(async () => await import("@/containers/Activite/Search/SearchActivity"))
const TrackedTorrentActivity = lazy(
  async () => await import("@/containers/Activite/TrackedTorrent/TrackedTorrentActivity")
)
const ProfileActivity = lazy(async () => await import("@/containers/Activite/Profile/ProfileActivity"))
const AnimeLibraryActivity = lazy(async () => await import("@/containers/Activite/AnimeLibrary/AnimeLibraryActivity"))
const MyAnimeListActivity = lazy(async () => await import("@/containers/Activite/MyAnimeList/MyAnimeListActivity"))
const AdminLogActivity = lazy(async () => await import("@/containers/Activite/AdminLog/AdminLogActivity"))
const RequestActivity = lazy(async () => await import("@/containers/Activite/Request/RequestActivity"))
const SeasonActivity = lazy(async () => await import("@/containers/Activite/Season/SeasonActivity"))

const AppRouter = () => (
  <Route element={<ContextLayout />}>
    <Route element={<Layout />}>
      <Route index path={SiteMap.ACCUEIL.path} element={<HomeActivity />} />
      <Route element={<ProtectedLayout />} errorElement={<RootBoundary />}>
        <Route path={SiteMap.RECHERCHE.path} element={<SearchActivity />} />
        <Route path={SiteMap.LIBRAIRIE.path} Component={AnimeLibraryActivity} />
        <Route path={SiteMap.EPISODE.path} element={<AnimeEpisodeActivity />} />
        <Route path={SiteMap.TORRENT.path} element={<TrackedTorrentActivity />} />
        <Route path={SiteMap.PROFILE.path} element={<ProfileActivity />} />
        <Route path={SiteMap.MYANIMELIST.path} element={<MyAnimeListActivity />} />
        <Route path={SiteMap.ADMIN_LOG.path} element={<AdminLogActivity />} />
        <Route path={SiteMap.REQUEST.path} element={<RequestActivity />} />
        <Route path={SiteMap.SEASON.path} element={<SeasonActivity />} />
      </Route>
      <Route path={SiteMap.LOGOUT.path} element={<Logout />} />
    </Route>

    <Route path="*" element={<Navigate replace to={SiteMap.ACCUEIL.path} />} />
  </Route>
)

export default AppRouter
