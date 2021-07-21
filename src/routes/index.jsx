import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Menu from "../containers/Menu/Menu";
import AnimeLibrary from "~/containers/Activite/AnimeLibrary/AnimeLibrary";

/* Composant de page NotFound */

/* Liste des Path à utiliser */
import Home from "../containers/Activite/Home";
import SearchActivity from "~/containers/Activite/SearchActivity";
import AnimeEpisode from "~/containers/Activite/AnimeEpisode";
import TrackedTorrent from "~/containers/Activite/TrackedTorrent";

import SiteMap from "./SiteMap";

const Routing = () => (
  <>
    <Menu />
    <Switch>
      <Route path={SiteMap.ACCUEIL.path}>
        <Home />
      </Route>
      <Route path={SiteMap.RECHERCHE.path}>
        <SearchActivity />
      </Route>
      <Route path={SiteMap.LIBRAIRIE.path}>
        <AnimeLibrary />
      </Route>
      <Route path={SiteMap.EPISODE.path}>
        <AnimeEpisode />
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
