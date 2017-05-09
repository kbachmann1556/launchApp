// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Links } from './links.js';
import vuforia from 'vuforiajs'
import { HTTP } from 'meteor/http';

const client = vuforia.client({
    'accessKey': '32f5b57b9da6544e4e50d9a154ee5f83c1383c35',
    'secretKey': 'f8058e384b7eba8099b6b32930cb252d5a43880d'
})

const util = vuforia.util();

Meteor.methods({
  'links.insert'(title, url) {
    check(url, String);
    check(title, String);

    return Links.insert({
      url,
      title,
      createdAt: new Date(),
    });
  },

  'targets.insert'(){
    const img_object = Images.findOne()
    console.log("here")
    var target = {

        // name of the target, unique within a database
        'name': 'test target name',
        // width of the target in scene unit
        'width': 32.0,
        // the base64 encoded binary recognition image data
        'image': util.encodeFileBase64(img_object.path),
        // indicates whether or not the target is active for query
        'active_flag': true,
        // the base64 encoded application metadata associated with the target
        'application_metadata': util.encodeBase64('some metadata about your image')
    };

    // console.log(target);

    // console.log(target)

    client.addTarget(target, function(error,result){
      if(error){
        console.error(result);
      } else {
        console.log(result);
      }
    })

    // client.listTargets(function(error, result){
    //   console.log(result)
    // })

    // client.retrieveTarget('9f1ceb654c024a49b78241ee28e3af38', function(error, result){
    //   console.log(result)
    // })
    // const update = {
    //   'active_flag' : false
    // }

    // client.updateTarget('9f1ceb654c024a49b78241ee28e3af38', update, function(error,result){
    //   console.log("Here",result)
    // })

  },
});
