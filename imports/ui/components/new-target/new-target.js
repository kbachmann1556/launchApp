import './new-target.html';
import { Meteor } from 'meteor/meteor';
import { Targets } from '../../../api/target.js'

Template.newTarget.events({
  'submit .add-target' (event, template){
    event.preventDefault();

    const target = (event.target.image_file);
    console.log(target)

    var reader = new FileReader();
    var file = template.find('#fileUpload').files[0]; // get the file

    reader.onload = function (event) {
      // event.target.result is the base64 string
      console.log(event.target.result)
    }

    // Meteor.call('targets.insert', target)

  },
})