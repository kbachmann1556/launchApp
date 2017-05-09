import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import moment from 'moment';
import "./dashboard.html";

import "../../components/side-nav/side-nav.js";
import "../../components/top-nav/top-nav.js";

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});