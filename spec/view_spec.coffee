describe 'Phalanx.View is units of controller element', ->

  Layout = Phalanx.Layout.extend
    regions:
      header : '#header'
      content: '#content'
      footer : '#footer'

  View = Phalanx.View.extend
    ui:
      nav: null
      ad : null

  fixture = null

  beforeEach ->
    fixtures.load 'layout_spec.html'
    fixture = fixtures.window().document

  afterEach ->
    fixtures.cleanUp()

  it 'has `el` & `$el` when assign to the layout', ->
    layout = new Layout el: $('#layout', fixture)
    view = new View

    layout.assign 'content', view

    expect(view.el).to.be $('#content', fixture)[0]
    expect(view.$el[0]).to.be $('#content', fixture)[0]

  it 'call `onSetElement` when create view with `el`', ->
    View.prototype.onSetElement = sinon.spy()
    view = new View el: $('#content', fixture)
    expect(view.onSetElement.calledOnce).to.be true

  it 'call `onSetElement` when assign view in the layout', ->
    layout = new Layout el: $('#layout', fixture)
    view = new View
    view.onSetElement = sinon.spy()

    layout.assign 'content', view
    expect(view.onSetElement.calledOnce).to.be true

  it 'undefined component name is specified when throw Error', ->
    expect(->
      new (View.extend
        components:
          dummy: undefined
      )
    ).to.throwError()

  context 'mixed-in LifecycleCallbacks', ->

    it 'call `onCreate` & `initialize` when create layout', ->
      View.prototype.onCreate = sinon.spy()
      View.prototype.initialize = sinon.spy()

      view = new View

      expect(view.onCreate.calledOnce).to.be true
      expect(view.initialize.calledOnce).to.be true

    it 'call `onDestroy` when destroy view', ->
      view = new View
      view.onDestroy = sinon.spy()
      view.destroy()
      expect(view.onDestroy.calledOnce).to.be true


    it 'call `onDestroy` when assign new view in the layout', ->
      layout = new Layout el: $('#layout', fixture)
      view = new View
      newView = new View
      view.onDestroy = sinon.spy()

      layout.assign 'content', view
      expect(view.onDestroy.calledOnce).to.be false

      layout.assign 'content', newView
      expect(view.onDestroy.calledOnce).to.be true

  context 'mixed-in UiLookupable', ->

    it 'has `ui` & `$ui` property references', ->

      view = new View el: $('#header', fixture)

      expect(view.$ui.nav[0]).to.be $('[data-ui="nav"]', view.$el)[0]
      expect(view.ui.ad).to.be $('[data-ui="ad"]', view.$el)[0]

    it 'release `ui` property references', ->
      view = new View el: $('#header', fixture)

      expect(view.ui.nav).to.be $('[data-ui="nav"]', view.$el)[0]
      expect(view.$ui.ad[0]).to.be $('[data-ui="ad"]', view.$el)[0]

      view.releaseUi()
      expect(view.ui.nav).to.be null
      expect(view.ui.ad).to.be null
      expect(view.$ui.nav).to.be null
      expect(view.$ui.ad).to.be null

  context 'persistently View', ->

    it 'call `onPause` when change & pausing on Layout', ->
      layout = new Layout el: $('#layout', fixture)

      viewA = new View
      viewA.persistent = true

      viewB = new View
      viewA.onPause = sinon.spy();

      layout.assign 'header', viewA
      layout.assign 'header', viewB

      expect(_.compact(_.values(viewA.ui)).length).to.be 0
      expect(_.compact(_.values(viewA.$ui)).length).to.be 0
      expect(viewA.onPause.calledOnce).to.be true

    it 'call `onPause` when change & resuming on Layout', ->
      layout = new Layout el: $('#layout', fixture)

      viewA = new View
      viewA.persistent = true

      viewB = new View
      viewA.onResume = sinon.spy();

      layout.assign 'header', viewA
      layout.assign 'header', viewB
      layout.assign 'header', viewA

      expect(_.compact(_.values(viewA.ui)).length).to.be 2
      expect(_.compact(_.values(viewA.$ui)).length).to.be 2
      expect(viewA.onResume.calledOnce).to.be true