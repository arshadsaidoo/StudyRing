import { Accounts } from 'meteor/accounts-base'
import { changeUsername } from "../../collections/users/methods.js";

Template.AccountSettings.onCreated(function(){
    var self = this;
    self.autorun(function (){
        self.subscribe('profilePictures');
    });
});

Template.ChangePassword.events({
    'submit form': function(event){
        event.preventDefault();
        console.log(event);
        var oldPass = event.target.oldPassword.value;
        var newPass = event.target.newPassword.value;
        var newPass2 = event.target.newPassword2.value;
        if(newPass==newPass2){
            Accounts.changePassword(oldPass, newPass, function(error){
              if (error) {
                console.log("ERROR" + error.reason);
              }
              else{
                console.log("Password Changed");
              }
            });
        }
        else{
          console.log("New passwords do not match")
        }
    }
});

Template.ChangeUsername.events({
    'submit form': function(event){
      event.preventDefault();
      var newUsername = event.target.newUsername.value;
      changeUsername.call({ id: Meteor.userId(), newUsername });
    }
});

Template.AccountSettings.events({
    'click .fa-close': function() {
        Session.set('changeSettings', false);
    }
});

Template.AccountSettings.events({
    'click .change-settings': () => {
        Session.set('changeSettings', true);
    }
});
