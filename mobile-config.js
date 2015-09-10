App.info({
  id: 'co.lionhat.coffeetalk',
  name: 'CoffeeTalk',
  description: 'A light social networking website that allows users to curate content, and share links.',
  author: 'lionhat collective',
  email: 'buckleraustin@gmail.com',
  website: 'http://lionhat.co/'
});

App.icons({
  'iphone': 'public/favicon-60.png',
  'iphone_2x': 'public/favicon-120.png'
});

App.setPreference('SplashScreen', 'CDVSplashScreen')

App.accessRule('http://*');
App.accessRule('https://*');
