import {TrackerTable} from './tracker/tracker.js';

var Router = Backbone.Router.extend({
  routes: {
    '':'home',
  },
  initialize: function(options) {
    this.view = null;
  },
  execute: function(callback, args, name) {
    if (this.view) {
      this.view.remove();
    }

    Backbone.Router.prototype.execute.call(this, callback, args, name);

    $('#main').html(this.view.el);
  },
  home: function() {
    this.view = new TrackerTable();
  },
  // Catch-all inspired by http://stackoverflow.com/a/6091703
  notFound: function() {
    // Since this function can called outside of normal routing
    // we may need to manually attach the view
    if (this.view) {
      this.view.remove();
      this.view = new NotFoundView();
      $('#main').html(this.view.el);
    }
    this.view = new NotFoundView();
  }
});

$(function() {
  console.log('js environment loaded');
  // Forward anchors to Backbone.navigate unless they have a target attr
  // Inspired by http://stackoverflow.com/a/12082118
  $(document).on('click', 'a:not([target])', function(e) {
    // TODO atRoot method in Backbone.history?
    var href = {prop: $(this).prop('href'), attr: $(this).attr('href')};
    var root = location.protocol + '//' + location.host + (Backbone.history.options ? Backbone.history.options.root : '');
    // Do nothing if the href is #
    if (href.attr === '#') {
      e.preventDefault();
      return;
    }
    if (href.prop && href.prop.slice(0, root.length) === root) {
      e.preventDefault();
      Backbone.history.navigate(href.attr, {trigger: true});
    }
  });

  new Router({})
  Backbone.history.start({pushState: true});
});
