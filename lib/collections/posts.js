Posts = new Meteor.Collection('posts');

Posts.allow({
   update: function(userId, post) {
       return ownsDocument(userId, post);
   },
   remove: function(userId, post) {
       return ownsDocument(userId, post);
   }
});

Posts.deny({
    update: function(userId, post, fieldNames, modifier) {
        var errors = validatePost(modifier.$set);
        return errors.title || errors.url;
    }
});

Posts.deny({
    update: function(userId, post, fieldNames) {
        // may only edit the following two fields:
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Meteor.methods({
   postInsert: function(postAttributes) {

       check(this.userId, String);
       check(postAttributes, {
           title: String,
           url: String
       });

       var errors = validatePost(postAttributes);
       if (errors.title || errors.url)
           throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

       var user = Meteor.user();
       var post = _.extend(postAttributes, {
           userId: user._id,
           author: user.profile.screenName,
           submitted: new Date(),
           commentCount: 0,
           upvoters: [],
           votes: 0
       });
       var postId = Posts.insert(post);
       Meteor.call('upvote', postId);
       return {
           _id: postId
       };
   },
    postDelete: function(post) {

        Meteor.users.update(
          { _id: Meteor.userId() },
          { $inc: {
              "points": -(Posts.findOne({ _id: post }).votes)
            }
          });
        Posts.remove(post);
    },
    upvote: function(postId) {
      check(this.userId, String);
      check(postId, String);
      var affected = Posts.update({
        _id: postId,
        upvoters: {$ne: this.userId}
      }, {
        $addToSet: {upvoters: this.userId},
        $inc: {votes: 1}
      });
      Meteor.users.update(
        { _id: Posts.findOne({_id: postId }).userId },
        { $inc: { "points": 1 }
      });
      if (! affected)
        throw new Meteor.Error('invalid', "You weren't able to upvote that post");
    }
});

validatePost = function (post) {
    var errors = {};
    if (!post.title)
        errors.title = "Please fill in a headline";
    if (!post.url)
        errors.url =  "Please fill in a URL";
    return errors;
}
