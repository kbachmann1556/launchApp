import './new-target.html';
import { Meteor } from 'meteor/meteor';

Template.newTarget.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.newTarget.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  imageFile: function() {
    return Images.findOne();
  }
});

Template.newTarget.events({
  'submit #add-target': function (e, template) {
    e.preventDefault();
    console.log(e.target.target_name.value);
    if (e.target.image_file.files && e.target.image_file.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      
      var upload = Images.insert({
        file: e.target.image_file.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic',
        meta: { targetName: e.target.target_name.value, createdAt: new Date() }
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          alert('File "' + fileObj.name + '" successfully uploaded');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  },
  'click .launchable-orange'(e){
      Meteor.call('targets.insert');    
  }
});