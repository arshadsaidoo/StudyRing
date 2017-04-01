import './MainForum.html';
import { UserDiscussion } from "../../collections/UserDiscussion.js";
import { userdiscussion } from "../../collections/UserDiscussion.js";


Template.MainForum.onCreated(function(){
    var self = this;
    self.autorun(function(){
      self.subscribe('userdiscussion');
    });
});

Template.MainForum.helpers({

    updateCommentId: function() {                                               //This returns the id of the selected comment
        return this._id;
    },
    editComment: function() {                                                   //This checks if the comment is in edit mode
        return Template.instance().editMode.get();
    },
    userId: function () {                                                       //This returns the id of the user who created the comment
        return this.createdBy;
    },
    comments: ()=> {
      return UserDiscussion.find({});
    }
});

Template.MainForum.events({
  'click .toggle-menu1': function() {
      console.log('click');
      Meteor.call('updateComment', this._id, inCommentSection);
    },

  'click .toggle-menu2': function() {
    console.log('click');
    Meteor.call('deleteComment', this._id);
  }
});
