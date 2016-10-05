import React from 'react';
import {IndexRoute, Route} from 'react-router';

import Activity from 'app/Workouts/WorkoutViewPage.react';
import App from 'app/App.react';
import Bootstrap from 'app/Pages/BootstrapPage.react';
import Daniels from 'app/Daniels/Daniels.react';
import Data from 'app/Pages/DataPage.react';
import Friends from 'app/Users/Friends/Friends.react';
import Garmin from 'app/Pages/GarminPage.react';
import Home from 'app/Users/Home/Home.react';
import Login from 'app/Users/Login/Login.react';
import NotFound from 'app/NotFoundPage.react';
import Privacy from 'app/Pages/PrivacyPage.react';
import Profile from 'app/Users/Profile/Profile.react';
import ReactPage from 'app/Pages/ReactPage.react';
import Settings from 'app/Users/Settings/Settings.react';
import Shoes from 'app/Shoes/ShoesPage.react';
import Terms from 'app/Pages/TermsPage.react';

const routes =
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="activities/:activityId" component={Activity} />
    <Route path="login" component={Login} />
    <Route path="pages">
      <Route path="bootstrap" component={Bootstrap} />
      <Route path="data" component={Data} />
      <Route path="garmin" component={Garmin} />
      <Route path="react" component={ReactPage} />
    </Route>
    <Route path="shoes" component={Shoes} />
    <Route path="users">
      <Route path="friends" component={Friends} />
      <Route path="settings" component={Settings} />
      <Route path=":userId" component={Profile} />
    </Route>
    <Route path="privacy" component={Privacy} />
    <Route path="terms" component={Terms} />
    <Route path="vdot" component={Daniels} />
    <Route path=":year/:month" component={Home} />
    <Route path="*" component={NotFound} />
  </Route>;

export default routes;
