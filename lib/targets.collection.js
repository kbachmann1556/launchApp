import { Meteor } from 'meteor/meteor';

this.Images = new Meteor.Files({
  debug: true,
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024*1024*10 && /png|jpg|jpeg/i.test(file.extension)) {
      // Meteor.call('targets.insert', file);
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  },
  onAfterUpload: function(file) {
    Meteor.call("targets.insert", file.path, file.meta.targetName, file._id, function(error, result){
      if(!error){
        console.log("No error", result);
      } else {
        console.log("Ouch an error", error);
      }
    })
    
  }
});

if (Meteor.isServer) {
  Images.denyClient();
  Meteor.publish('files.images.all', function () {
    return Images.find({
      $or: [
        { private: { $ne: true }},
        { owner: this.userId },
      ],
    }).cursor;
  });

} else {

  Meteor.subscribe('files.images.all');
}