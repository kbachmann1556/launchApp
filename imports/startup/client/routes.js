import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
// Layouts
import '../../ui/layouts/body/body.js';
import '../../ui/layouts/dashboard/dashboard.js';

// Pages
import '../../ui/pages/home/home.js';
import '../../ui/pages/targets/targets.js';
import '../../ui/pages/detail/detail.js';
import '../../ui/pages/media/media.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/targets', {
  name: 'App.dashboard',
  action() {
    BlazeLayout.render('dashboard', { main: 'targets'});
  },
});

FlowRouter.route('/targets/:id', {
  name: 'App.detail',
  action() {
    BlazeLayout.render('dashboard', { main: 'detail'});
  },
});

FlowRouter.route('/media', {
  name: 'App.media',
  action() {
    BlazeLayout.render('dashboard', { main: 'media'});
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
