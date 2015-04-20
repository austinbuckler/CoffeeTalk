Comments = new Meteor.Collection('comments');

Meteor.methods({
   commentInsert: function(commentAttributes) {
       check(this.userId, String);
       check(commentAttributes, {
          postId: String,
           body: String
       });
       var user = Meteor.user();
       var post = Posts.findOne(commentAttributes.postId);
       if (!post) {
           throw new Meteor.Error('invalid-comment', 'You must comment on a post');
       }
       comment = _.extend(commentAttributes, {
          userId: user._id,
           author: user.screenName,
           submitted: new Date()
       });

       // using the $inc operator, we can increment a numerical field by x.
       Posts.update(comment.postId, { $inc: { commentCount: 1 }});

       comment._id = Comments.insert(comment);

       createCommentNotifications(comment);
       return comment._id;
   }
});