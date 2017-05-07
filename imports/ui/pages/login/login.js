import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './login.html'

Template.login.helpers({
    loggedIn: function(){
        if(Meteor.user()){
            return true;
        } else {
            return false;
        }

    }
})