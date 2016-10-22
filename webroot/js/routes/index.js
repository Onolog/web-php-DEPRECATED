export default {
  childRoutes: [
    require('routes/ActivitiesRoute'),
    require('routes/FriendsRoute'),
    require('routes/LoginRoute'),
    require('routes/PagesRoute'),
    require('routes/PrivacyRoute'),
    require('routes/SettingsRoute'),
    require('routes/ShoesRoute'),
    require('routes/TermsRoute'),
    require('routes/UsersRoute'),
    require('routes/VdotRoute'),

    // Calendar must come next-to-last because of its params
    require('routes/CalendarRoute'),

    // Needs to be last since it's the catch-all
    require('routes/NotFoundRoute'),
  ],
  component: require('controllers/AppController.react'),

  // No index route since the server redirects
  path: '/',
};
