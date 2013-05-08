/**
 * @abstract
 * @class
 * @extends Backbone.View
 */
var View = defineClass({
  /**
   * @constructor
   * @param {Object} options
   */
  constructor: function(options) {
    options || (options = {});

    this._baseInitialize();

    Backbone.View.apply(this, arguments);
  }
});

_.extend(View.prototype, Backbone.View.prototype, {
  /**
   * @property {String}
   */
  name: UNDEFINED_UNIQUE_NAME,

  /**
   *     events: {
   *       'click .js_event_selector': 'someMethodName'
   *     }
   *     // $('.js_event_selector').click() => someMethod()
   *
   * @property {Object}
   */
  events: {},

  /**
   *     ui: {
   *       partOf: '.js_ui_selector'
   *     }
   *     // view.ui.partOf => element.js_ui_selector
   *
   * @property {Object}
   */
  ui: {},

  /**
   *     components: {
   *       likeBtn: LikeBtnComponent
   *     }
   *     // <button data-component="likeBtn"></button> => LikeBtnComponent
   *
   * @property {Object}
   */
  components: {},

  /**
   * @private
   * @method _baseInitialize
   */
  _baseInitialize: function() {

  },

  /**
   * @abstract
   */
  initialize: function() {},

  /**
   * From the selector defined by this.ui, caching to explore the elements.
   */
  setupUi: function() {
    var name, selector;

    for (name in this.ui) {
      selector = this.ui[name];
      this.ui[name] = this.$el.find(selector);
    }
  },

  /**
   * Release ui elements reference.
   */
  teardownUi: function() {
    var name;

    for (name in this.ui) {
      this.ui[key] = null;
      delete this.ui[key];
    }
  },

  /**
   *
   */
  destroy: function() {

    // TODO destroy unused components

    this.onDestroy();
  },

  /**
   * @abstract
   * @chainable
   * @param {String} html
   * @return {*}
   */
  render: function(html) { this.el.innerHTML = html; return this; },

  /**
   * @abstract
   * @param {HTMLElement} el
   */
  onAttach: function(el) {},

  /**
   * @abstract
   * @param {HTMLElement} el
   */
  onDetach: function(el) {}
});
