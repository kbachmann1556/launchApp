import './detail.html'

Template.detail.onCreated(function(){
    this.oneTarget = FlowRouter.getParam('id');
})
Template.detail.helpers({
    singleTarget(){
        return Images.findOne({ _id: FlowRouter.getParam('id')});
    }
})

Template.detail.events({
    'click .delete'(){
        const remove = confirm("Are you sure you want to delete this target?")
        if(remove){
            Meteor.call("targets.destroy", Template.instance().oneTarget);
            FlowRouter.go("/targets");
        }
    }
})