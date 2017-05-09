import './datatable.html'

Template.datatable.onCreated(function datatableOnCreated(){
    // Meteor.subscribe('files.images.all');
});

Template.datatable.helpers({
    isOwner(){
        return this.userId === Meteor.userId();
    },
    targets() {
        return Images.find().each()
    }
})