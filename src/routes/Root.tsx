import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AnimeLibraryActivity from "@/containers/Activite/AnimeLibrary/AnimeLibraryActivity";

/* Composant de page NotFound */

/* Liste des Path à utiliser */
const AnimeEpisodeActivity = lazy(() => import("@/containers/Activite/AnimeEpisode/AnimeEpisodeActivity"));
const HomeActivity = lazy(() => import("@/containers/Activite/Home/HomeActivity"));
const SearchActivity = lazy(() => import("@/containers/Activite/Search/SearchActivity"));
const TrackedTorrent = lazy(() => import("@/containers/Activite/TrackedTorrent/TrackedTorrent"));

import Layout from "@/containers/Layout/Layout";
import SiteMap from "./SiteMap";

const Root = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path={SiteMap.ACCUEIL.path} element={<HomeActivity />} />
        <Route path={SiteMap.RECHERCHE.path} element={<SearchActivity />} />
        <Route path={SiteMap.LIBRAIRIE.path} element={<AnimeLibraryActivity />} />
        <Route path={SiteMap.EPISODE.path} element={<AnimeEpisodeActivity />} />
        <Route path={SiteMap.TORRENT.path} element={<TrackedTorrent />} />
      </Route>

      <Route path="*" element={<Navigate replace to={SiteMap.ACCUEIL.path} />} />
    </Routes>
  );
};

export default Root;
