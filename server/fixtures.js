if (Posts.find().count() === 0) {
    var now = new Date().getTime();

    Posts.insert({
        title: 'Bill Gates is worth 1 Trillion dollars as of 04.06.2015',
        author: 'Jack Daniels',
        url: 'http://google.com/',
        submitted: new Date(now - 7 * 3600 * 100),
        commentCount: 0
    });

    Posts.insert({
        title: 'Hacker News is being updated!',
        author: 'Burt Reynolds',
        url: 'http://news.ycombinator.com/',
        submitted: new Date(now - 7 * 3600 * 100),
        commentCount: 0
    });

    Posts.insert({
        title: 'Meteor is a new and innovative way to create applications!',
        author: 'Austin Buckler',
        url: 'http://meteor.com/',
        submitted: new Date(now - 9 * 3600 * 100),
        commentCount: 0
    });

    Posts.insert({
        title: 'The downfall of reddit, the frontpage of the internet.',
        author: 'Austin Buckler',
        url: 'http://reddit.com/',
        submitted: new Date(now - 4 * 3600 * 100),
        commentCount: 0
    });
}
