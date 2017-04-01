import { Rings } from "../../collections/rings/rings.js";
import { togglePrivate, addNip, togglePublic, deleteRing, joinRing, leaveRing } from "../../collections/rings/methods.js";

Template.Rings.events({
    'click .new-ring': () => {
        Session.set('newRing', true);
    }
});

Template.Rings.onCreated(function(){
    var self = this;
    self.autorun(function (){
        self.subscribe('rings');
        self.subscribe('Users');
    });
});

Template.Rings.helpers({
    rings: ()=> {
        var regexp = new RegExp(Session.get('search/keyword'), 'i');
        var selector = {$or: [
            {name: regexp},
            {tags: {$elemMatch: {name: regexp}}}
        ]};
        return Rings.find(selector);
    },
    isOwner: function(s2){
      return (Meteor.userId()===s2);
    },
    isMember: function() {
        var id = this._id;
        var result = Meteor.users.findOne({_id: Meteor.user()._id, rings: id});
        if (result)
            return true;
        else
            return false;
    }
});


Template.RingInfo.onCreated(function(){
    this.editMode = new ReactiveVar(false);
    var self = this;
    self.autorun(function (){
        self.subscribe('rings');
        self.subscribe('allUsers');
    });
});


Template.RingInfo.events({
    'click .set-private': function(e) {
      e.preventDefault();
      Modal.show('RingSetNipModal');

        togglePrivate.call({
          id: this._id
         });
    },
    'click .set-public': function() {
        togglePublic.call({ id: this._id });
    },
    'click .fa-trash': function() {
        deleteRing.call({ id: this._id });
    },
    'click .fa-pencil': function(event, template) {
        template.editMode.set(!template.editMode.get());
    },
    'click .join-ring': function() {
        joinRing.call({ id: this._id });
    },
    'click .leave-ring': function() {
        leaveRing.call({ id: this._id });
    }
});

Template.RingSetNipModal.events({
  'submit form': function(e) {
    e.preventDefault();

    Modal.hide('RingSetNipModal');

    var nipCode = event.target.theNip.value;

    addNip.call({ nip: nipCode}  );
  }
});



Template.RingInfo.helpers({
    Rings() {
        return Rings;
    },
    updateRingId: function() {
        return this._id;
    },
    editMode: function() {
        return Template.instance().editMode.get();
    },
    userId: function () {
        return this.createdBy;
    },
    user: function() {
        var id = Rings.findOne({_id: this._id}).createdBy;
        return Meteor.users.findOne({_id: id});
    },
    isMember: function() {
        var id = this._id;
        var result = Meteor.users.findOne({_id: Meteor.user()._id, rings: id});
        if (result)
            return true;
        else
            return false;


    },
    isOwner: function(s2){
      return (Meteor.userId()===s2);
    }
});

Template.NewRing.helpers({
    Rings() {
        return Rings;
    }
});

Template.NewRing.events({
    'click .fa-close': function() {
        Session.set('newRing', false);
    }
});
