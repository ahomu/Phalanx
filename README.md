Phalanx [![Build Status](https://drone.io/github.com/ahomu/Phalanx/status.png)](https://drone.io/github.com/ahomu/Phalanx/latest)
====

Phalanx is a [Backbone](https://github.com/documentcloud/backbone) wrapper library. Focusing to decouple view and manage ui component simply.

![Phalanx](http://upload.wikimedia.org/wikipedia/commons/3/32/Phalanx.png)

via. [Ancient Macedonian battle tactics - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Ancient_Macedonian_battle_tactics "Ancient Macedonian battle tactics - Wikipedia, the free encyclopedia")

##Getting started

###Basic view and component

This is UI component parts.

```js
var LikeBtnComponent = Phalanx.Component.extend({
  // Events are delegated to the View.
  events: {
    'click .js-like': 'doLike'
  },
  // Elements with the data-ui are auto stored when create component instance.
  ui: {
    count: null
  },
  // Increment like count when POST completed.
  doLike: function() {
    $.post('/api/like', {id: this.id}, function() {
      this.$ui.count.text(parseInt(this.$ui.count, 10) + 1);
    }.bind(this));
  }
});
```

View that contains multiple components.

```js
var ActivitiesListView = Phalanx.View.extend({
  // Specified name here, will specify as data-component attr in the HTML.
  components: {
    'likeBtn': LikeBtnComponent
  }
});

var listView = new ActivitiesListView({el: '#js-list'});
```

This is HTML.

```html
<section id="js-list">
  <ul>
    <li>
      <a>screen_name</a>
      <p>Lorem ipsum dolor sit amet, consectetur adipisici…</p>

      <!-- Events that have been delegated to occur, creation of component is delayed. -->
      <div data-component="likeBtn">      
        <button class="js-like"><button>
        <span data-ui="count">3</span>
      </div>
    </li>
    ...
    ..
    .
  </ul>
</section>
```

Split the screen, `Phalanx.View` to manage a certain areas and `Phalanx.Component` to manage small specific function.

###Declarative listening Component triggering events

Component triggered `success` event when $.get complete.

```js
var ReadMoreBtnComponent = Phalanx.Component.extend({
  events: {
    'click [data-ui="btn"]': 'onClickBtn'
  },
  onClickBtn: function(evt) {
    var href  = evt.currentTarget.getAttribute('href');

    $.get(href, function(resp) {
      this.trigger('success', resp);
    }.bind(this));
  }
});
```

View is listening to `success` event from `ReadMoreBtnComponent`.

```js
var ListView = Phalanx.View.extend({
  components: {
    'moreBtn': ReadMoreBtnComponent
  },
  listeners: {
    'success moreBtn': 'renderMore'
  },
  ui {
    list null
  }
  renderMore: function(html) {
    this.$ui.list.append(html);
  }
});

var listView = new ListView({el: '#js-list'});
```

This is HTML.

```html
<section id="js-list">
  <div data-ui="list">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </div>
  <p data-component="moreBtn">
    <a href="/api/path/to/list&page=2" data-ui="btn">Read more</a>
  </p>
</section>
```

Component plays a role in local without knowing of View. To receive the event, in conjunction with result of Component, View updates itself.

###Layout regions and assignment Views

```js
var RootLayout = Phalanx.Layout.extend({
  regions: {
    header : '#js-header',
    content: '#js-content',
    footer : '#js-footer'
  },
  onChange: function(regionName, newView, oldView) {
    // Called when regions view was changed.
  }
});

var rootLayout = new RootLayout({el: 'body'}),
    currentPage = '';

rootLayout.assign('header',  new HeaderView());
rootLayout.assign('content', new InitialView());
rootLayout.assign('footer',  new FooterView());

window.addEventListener('hashchange', function() {
  if (currentPage === location.hash.slice(1)) {
    return;
  }
  currentPage = location.hash.slice(1);

  // When a new View has been assigned, the old View is destroyed automatically.
  switch(currentPage)) {
    case '':
      layout.assign('content', new InitialView());
      break;
    case 'feed':
      layout.assign('content', new FeedView());
      break;
    case 'home':
      layout.assign('content', new HomeView());
      break;
    case 'inbox':
      layout.assign('content', new InboxView());
      break;
  }
});

```

This is HTML.

```html
<body>
  <header id="js-header">
    <!-- HEADER -->
  </header>
  <div id="js-content">
    <!-- MAIN CONTENT -->
  </div>
  <footer id="js-footer">
    <!-- FOOTER -->
  </footer>
</body>
```

The layout manage the elements in the page, what View have been assigned. Have the role of like a controller.

##Requirements

###Depend Libraries

- [documentcloud/backbone](https://github.com/documentcloud/backbone "documentcloud/backbone · GitHub")
  - [bestiejs/lodash](https://github.com/bestiejs/lodash "bestiejs/lodash · GitHub")
  - [jquery/jquery](https://github.com/jquery/jquery "jquery/jquery · GitHub") or [madrobby/zepto](https://github.com/madrobby/zepto "madrobby/zepto · GitHub")

###Document generator

Generating JavaScript API documents and introspection report.

- [senchalabs/jsduck](https://github.com/senchalabs/jsduck "senchalabs/jsduck · GitHub")
- [jsoverson/plato](https://github.com/jsoverson/plato "jsoverson/plato · GitHub")

```
npm install -g grunt-cli
npm install

grunt jsduck
grunt plato
```

###Automated spec runner

Using [mocha](http://visionmedia.github.io/mocha/) test framework with [expect.js](https://github.com/LearnBoost/expect.js/) and [sinon.js](http://sinonjs.org/).

- [airportyh/testem](https://github.com/airportyh/testem "airportyh/testem · GitHub")
- [jashkenas/coffee-script](https://github.com/jashkenas/coffee-script "jashkenas/coffee-script · GitHub")

```
bower install
gem install juicer
./lib/sinon/build

brew install phantomjs
npm install -g testem

testem #run specs
```

###Drone.io command (memo)

```
npm install bower
node_modules/bower/bin/bower install
gem install juicer
./lib/sinon/build
npm install
npm test
```

##TODO

- template declaration (assign Function or element's selector)
- support Component parameter from (DOM attributes | View's model or collection) declaration