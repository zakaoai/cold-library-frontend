import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import AnimeLibraryActivity from "containers/Activite/AnimeLibrary/AnimeLibraryActivity";

/* Composant de page NotFound */

/* Liste des Path à utiliser */
import HomeActivity from "../containers/Activite/Home/HomeActivity";
import SearchActivity from "containers/Activite/Search/SearchActivity";
import AnimeEpisodeActivity from "containers/Activite/AnimeEpisode/AnimeEpisodeActivity";
import TrackedTorrent from "containers/Activite/TrackedTorrent/TrackedTorrent";

import SiteMap from "./SiteMap";
import Layout from "containers/Layout/Layout";

const Routing = () => (
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

export default Routing;
