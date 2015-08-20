
Template.profileEdit.created = function() {
    Session.set('profileEditErrors', {});
}
Template.profileEdit.helpers({
    errorMessage: function(field) {
        return Session.get('profileEditErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('profileEditErrors')[field] ? 'has-error' : '';
    }
});

Template.profileEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var user = Meteor.user();

    var userProps = {
      screenName: $(e.target).find('[name=screenName]').val()
    }
    console.log(userProps);

    Meteor.users.update(
      { _id: Meteor.userId() },
      { $set: { "profile": userProps } },
      function(error) {
        if (error) {
          throwError(error.reason);
        } else {
          Router.go('profileEdit');
        }
      }
    );
    // TODO: update all old posts to reflect screenName changes.
    // Posts.update(
    //   { "userId" : object.userId },
    //   { $set: { "author" : object.profile.screenName } },
    //   function(error) {
    //     if (error) { throwError(error.reason); } else {
    //       console.log("WE MADE IT!");
    //     }
    //   }
    // );
  }
});
