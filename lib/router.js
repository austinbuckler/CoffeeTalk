Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe('posts'), Meteor.subscribe('notifications')];
    }
});

Router.route('/', { name: 'postsList' });
Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function() {
        return Meteor.subscribe('comments', this.params._id);
    },
    data: function() {
        return Posts.findOne(this.params._id); // find the post with the corresponding id given in the parameters.
    }
});
Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function() {
        return Posts.findOne(this.params._id);
    }
});
Router.route('/profileEdit', {
  name: 'profileEdit',
  data: function() {
    return Meteor.user();
  }
});
Router.route('/submit', { name: 'postSubmit' });

var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next(); // continue with the request.
    }
}

Router.onBeforeAction('dataNotFound', { only: 'postPage' });
Router.onBeforeAction(requireLogin, { only: 'postSubmit' });
Router.onBeforeAction(requireLogin, { only: 'profileEdit' });
