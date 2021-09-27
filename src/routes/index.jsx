import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Menu from "../containers/Menu/Menu";
import AnimeLibraryActivity from "containers/Activite/AnimeLibrary/AnimeLibraryActivity";

/* Composant de page NotFound */

/* Liste des Path à utiliser */
import HomeActivity from "../containers/Activite/Home/HomeActivity";
import SearchActivity from "containers/Activite/Search/SearchActivity";
import AnimeEpisodeActivity from "containers/Activite/AnimeEpisode/AnimeEpisodeActivity";
import TrackedTorrent from "containers/Activite/TrackedTorrent/TrackedTorrent";

import SiteMap from "./SiteMap";

const Routing = () => (
  <>
    <Menu />
    <Switch>
      <Route path={SiteMap.ACCUEIL.path}>
        <HomeActivity />
      </Route>
      <Route path={SiteMap.RECHERCHE.path}>
        <SearchActivity />
      </Route>
      <Route path={SiteMap.LIBRAIRIE.path}>
        <AnimeLibraryActivity />
      </Route>
      <Route path={SiteMap.EPISODE.path}>
        <AnimeEpisodeActivity />
      </Route>
      <Route path={SiteMap.TORRENT.path}>
        <TrackedTorrent />
      </Route>
      <Route path="*">
        <Redirect to={SiteMap.ACCUEIL.path} />
      </Route>
    </Switch>
  </>
);

export default Routing;
