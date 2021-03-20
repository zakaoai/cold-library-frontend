import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Menu from "../containers/Menu/Menu";
import Library from "~/containers/Activite/Library";

/* Composant de page NotFound */

/* Liste des Path à utiliser */
import Home from "../containers/Activite/Home";
import SearchActivity from "~/containers/Activite/SearchActivity";
import AnimeEpisode from "~/containers/Activite/AnimeEpisode";

const Routing = () => (
  <>
    <Menu />
    <Switch>
      <Route path="/app/home">
        <Home />
      </Route>
      <Route path="/app/search">
        <SearchActivity />
      </Route>
      <Route path="/app/library">
        <Library />
      </Route>
      <Route path="/app/anime/:malId">
        <AnimeEpisode />
      </Route>
      <Route path="*">
        <Redirect to="/app/home" />
      </Route>
    </Switch>
  </>
);

export default Routing;
