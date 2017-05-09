import './detail.html'

Template.detail.helpers({
    singleTarget(){
        return Images.findOne({ _id: FlowRouter.getParam('id')});
    }
})