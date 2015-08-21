Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
   return Posts.find({}, options);
});

Meteor.publish('singlePost', function(id) {
  check(id, String);
  return Posts.find(id);
});

Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
    return Notifications.find({userId: this.userId, read: false});
});

Meteor.publish('userData', function() {
   if (this.userId) {
       return Meteor.users.find({_id: this.userId },
           {
               fields: {
                    'points': true
               }
           });
   } else {
       this.ready();
   }
});
