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

  'targets.insert'(path, name, id){
    var target = {
        // name of the target, unique within a database
        'name': name,
        // width of the target in scene unit
        'width': 32.0,
        // the base64 encoded binary recognition image data
        'image': util.encodeFileBase64(path),
        // indicates whether or not the target is active for query
        'active_flag': true,
        // the base64 encoded application metadata associated with the target
        'application_metadata': util.encodeBase64('some metadata about your image')
    };

    client.addTarget(target, Meteor.bindEnvironment(function(error,result){
      if(error){
        console.error(result);
      } else {
        console.log(result.target_id);
        Images.update({ _id: id }, {$set: {"meta.vuforia_id": result.target_id}})
      }
    }));

  },
  'targets.retrieve'(meta, id){
    console.log("inside test", meta)
    client.retrieveTarget(meta.vuforia_id, Meteor.bindEnvironment(function(error, result){
      if(error){
        console.log(error)
      } else {
        console.log(result.target_record)
        Images.update({ _id: id }, {$set: {"meta.vuforia_response": result.target_record}})        
      }
    }))
  },
  'targets.destroy'(id) {
    const img = Images.findOne({_id: id})
    client.deleteTarget(img.meta.vuforia_id, Meteor.bindEnvironment(function(err, result){
      if(err){
        console.log(err)
      } else {
        console.log(result)
        img.remove();
      }
    }))
  }
});
