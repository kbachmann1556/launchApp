import './datatable.html'

Template.datatable.helpers({
    isOwner(){
        return this.userId === Meteor.userId();
    },
    targets() {
        return Images.find().each()
    },
    vuforiaChecker(meta, id) {
        if(!meta.vuforia_response && meta.vuforia_id || meta.vuforia_response.tracking_rating === -1 && meta.vuforia_id){
            Meteor.call("targets.retrieve", meta, id)
        }
    },
    targetRating(num){
        if(num == -1){
            return "pending"
        } else if(num < 2){
            return "<div class='error-text'>*Rating Is Less Than 2. Upload a New Target.</div>"
        } else {
            let ratingHtml = ""
            for(let stars=0; stars < num; stars++){
                ratingHtml += "<i class='fa fa-star'></i>"
            }
            return ratingHtml;
        }
    }
})

Template.datatable.events({
    'click .deleteBtn'() {
        console.log(this)
    }
})