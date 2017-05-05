import './side-nav.html';


Tracker.autorun(function() {
  FlowRouter.watchPathChange();
  var currentContext = FlowRouter.current();
  // do anything with the current context
  // or anything you wish
});


Template.sideNav.onCreated(function(){
  this.current = "hello"; 
})

Template.sideNav.helpers({
  attributes: "Something",
  "something": function(){
    return Template.instance().current
  }
});

Template.sideNav.events({
  'click .icon' (event){
    console.log(event)
  },
})