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
import '../../ui/pages/login/login.js';


AccountsTemplates.configureRoute('signIn', {
  redirect: function(){
    const user = Meteor.user();
    if(user){
      FlowRouter.go('/targets/');
    }
  }
});

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    FlowRouter.go('/sign-in');
  },
});

FlowRouter.route('/sign-in', {
  name: 'App.login',
  action() {
    BlazeLayout.render('App_body', { main: 'login' });
  },
});

FlowRouter.route('/targets', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],  
  name: 'App.dashboard',
  action() {
    BlazeLayout.render('dashboard', { main: 'targets'});
  },
});

FlowRouter.route('/targets/:id', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],  
  name: 'App.detail',
  action() {
    BlazeLayout.render('dashboard', { main: 'detail'});
  },
});

FlowRouter.route('/media', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],  
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
