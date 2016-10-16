import React from 'react';
import {IndexRoute, Route} from 'react-router';

const Activities = {
  childRoutes: [{
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('app/Workouts/WorkoutViewPage.react'));
      });
    },
  }],
  path: 'activities',
};

const Login = {
  path: 'login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/Users/Login/Login.react'));
    });
  },
};

const Pages = {
  childRoutes: [{
    path: 'bootstrap',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('app/Pages/BootstrapPage.react'));
      });
    },
  }, {
    path: 'data',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('app/Pages/DataPage.react'));
      });
    },
  }, {
    path: 'garmin',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('app/Pages/GarminPage.react'));
      });
    },
  }, {
    path: 'react',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('app/Pages/ReactPage.react'));
      });
    },
  }],
  path: 'pages',
};

const Privacy = {
  path: 'privacy',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/Pages/PrivacyPage.react'));
    });
  },
};

const Shoes = {
  path: 'shoes',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/Shoes/ShoesPage.react'));
    });
  },
};

const Terms = {
  path: 'terms',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/Pages/TermsPage.react'));
    });
  },
};

const Users = {
  childRoutes: [{
    path: 'friends',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('app/Users/Friends/Friends.react'));
      });
    },
  }, {
    path: 'settings',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('app/Users/Settings/Settings.react'));
      });
    },
  }, {
    path: ':userId',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('app/Users/Profile/Profile.react'));
      });
    },
  }],
  path: 'users',
};

const Vdot = {
  path: 'vdot',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/Daniels/Daniels.react'));
    });
  },
};

const Home = {
  path: ':year/:month',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/Users/Home/Home.react'));
    });
  },
};

const NotFound = {
  path: '*',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/NotFoundPage.react'));
    });
  },
};

export default {
  childRoutes: [
    Activities,
    Login,
    Pages,
    Privacy,
    Shoes,
    Terms,
    Users,
    Vdot,
    Home,
    NotFound,
  ],
  component: require('app/App.react'),
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        done(null, require('app/Users/Home/Home.react'));
      });
    },
  },
  path: '/',
};
