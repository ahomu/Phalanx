describe 'Phalanx.Layout is layout map of document', ->

  Layout = Phalanx.Layout.extend
    regions:
      header : '#header'
      content: '#content'
      footer : '#footer'

  Header  = Phalanx.View.extend()
  Content = Phalanx.View.extend()
  Footer  = Phalanx.View.extend()
  fixture = null

  beforeEach ->
    fixtures.load 'layout_spec.html'
    fixture = fixtures.window().document

  afterEach ->
    fixtures.cleanUp()
    Layout.prototype.onCreate = ->
    Layout.prototype.initialize = ->

  it 'assign view to the region', ->
    layout = new Layout el: $('#layout', fixture)
    header = new Header
    footer = new Footer

    layout.assign('header', header)
    expect(layout.getRegionView('header')).to.be header

    layout.assign('footer', footer)
    expect(layout.getRegionView('footer')).to.be footer

  it 'call `onChange` when change view of any region', ->
    layout = new Layout el: $('#layout', fixture)
    content = new Content
    newContent = new Content

    layout.onChange = sinon.spy((region, newV, oldV)->
      expect(region).to.be 'content'
      expect(newV).to.be content
      expect(oldV).to.be undefined
    )
    layout.assign 'content', content
    expect(layout.onChange.calledOnce).to.be true

    layout.onChange = sinon.spy((region, newV, oldV)->
      expect(region).to.be 'content'
      expect(newV).to.be newContent
      expect(oldV).to.be content
    )
    layout.assign 'content', newContent
    expect(layout.onChange.calledOnce).to.be true

  it 'has empty div element ( created without `el` )', ->
    layout = new Layout
    expect(layout.el).not.to.be undefined
    expect(layout.el.tagName.toUpperCase()).to.be 'DIV'
    expect(layout.el.parentNode).to.be null
    expect(layout.$el.is('div')).to.be true

  it 'has element ( created with `el` )', ->
    layout = new Layout el: $('#layout', fixture)

    expect(layout.el).not.to.be undefined
    expect(layout.el).to.be $('#layout', fixture)[0]
    expect(layout.$el[0]).to.be $('#layout', fixture)[0]

  it 'call `onSetElement` when create layout with `el`', ->
    Layout.prototype.onSetElement = sinon.spy()
    layout = new Layout el: $('#layout', fixture)
    expect(layout.onSetElement.calledOnce).to.be true

  it 'call `onSetElement` when assign layout in the parent layout', ->
    parent = new Layout el: $('#layout', fixture)
    layout = new (Phalanx.Layout.extend({}))
    layout.onSetElement = sinon.spy()

    parent.assign 'content', layout
    expect(layout.onSetElement.calledOnce).to.be true

  context 'mixed-in Observable', ->

    it 'has `Backbone.Events` interface', ->
      layout = new Layout el: $('#layout', fixture)
      spy = sinon.spy()

      layout.on 'test', spy
      layout.trigger 'test'
      expect(spy.calledOnce).to.be true

  context 'mixed-in LifecycleCallbacks', ->

    it 'call `onCreate` & `initialize` when create layout', ->
      Layout.prototype.onCreate = sinon.spy()
      Layout.prototype.initialize = sinon.spy()

      layout = new Layout el: $('#layout', fixture)

      expect(layout.onCreate.calledOnce).to.be true
      expect(layout.initialize.calledOnce).to.be true

    it 'call `onDestroy` when destroy layout', ->
      layout = new Layout el: $('#layout', fixture)
      layout.onDestroy = sinon.spy()
      layout.destroy()
      expect(layout.onDestroy.calledOnce).to.be true
