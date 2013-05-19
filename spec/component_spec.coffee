describe 'Phalanx.Component is units of actionable ui', ->

  Button = Phalanx.Component.extend
    ui:
      btn: null
      num: null
    events:
      'click [data-ui="btn"]': 'onClick'
    onClick: ->
      @$ui.num.text(parseInt(@$ui.num.text(), 10) + 1)

  View = Phalanx.View.extend
    components:
      btn: Button

  fixture = null

  beforeEach ->
    fixtures.load 'component_spec.html'
    fixture = fixtures.window().document

  afterEach ->
    fixtures.cleanUp()

  it 'has unique id', ->
    component = new Button $('#component2', fixture)
    expect(component.uid).not.to.be null
    expect(component.uid).to.be 0

  it 'has element', ->
    component = new Button $('#component1', fixture)
    expect(component.el).not.to.be undefined
    expect(component.el).to.be $('#component1', fixture)[0]
    expect(component.$el[0]).to.be $('#component1', fixture)[0]

  context 'component in the view', ->

    it 'receive delegated event', ->
      view = new View el: $('#view', fixture)
      $btns = $('[data-ui="btn"]', fixture)
      $nums = $('[data-ui="num"]', fixture)

      # 要素をクリックしたときにコンポーネントが生成される
      $btns.eq(1).click()
      expect($btns.eq(1).parent().attr('data-component-uid')).not.to.be undefined

      # クリックしたコンポーネントのテキストだけ加算されている
      expect($nums.eq(0).text()).to.be '0'
      expect($nums.eq(1).text()).to.be '1'
      expect($nums.eq(2).text()).to.be '0'

      # 関係ない要素をクリックしても大丈夫
      $nums.eq(2).click()
      $nums.eq(2).parent().click()
      expect($btns.eq(2).parent().attr('data-component-uid')).to.be undefined

    it 'call `onSetElement` when fired component events', ->
      view = new View el: $('#view', fixture)
      $btns = $('[data-ui="btn"]', fixture)

      Button.prototype.onSetElement = sinon.spy()

      $btns.eq(1).click()
      component = view.getComponent($btns.eq(1)[0])

      expect(component.onSetElement.calledOnce).to.be true

  context 'mixed-in LifecycleCallbacks', ->

    it 'call `onCreate` & `initialize` when fired component events', ->
      view = new View el: $('#view', fixture)
      $btns = $('[data-ui="btn"]', fixture)

      Button.prototype.onCreate = sinon.spy()
      Button.prototype.initialize = sinon.spy()

      $btns.eq(1).click()
      component = view.getComponent($btns.eq(1)[0])

      expect(component.onCreate.calledOnce).to.be true
      expect(component.initialize.calledOnce).to.be true

    it 'call `onDestroy` when parent view destroy', ->
      view = new View el: $('#view', fixture)
      $btns = $('[data-ui="btn"]', fixture)

      $btns.eq(1).click()
      component = view.getComponent($btns.eq(1)[0])
      spy = sinon.spy(component, 'onDestroy')

      view.destroy()
      expect(spy.calledOnce).to.be true

  context 'mixed-in UiLookupable', ->

    it 'has `ui` & `$ui` property references', ->
      component = new Button $('#component1', fixture)

      expect(component.$ui.btn[0]).to.be $('[data-ui="btn"]', component.$el)[0]
      expect(component.ui.num).to.be $('[data-ui="num"]', component.$el)[0]

    it 'release `ui` property references', ->
      component = new Button $('#component1', fixture)

      expect(component.ui.btn).to.be $('[data-ui="btn"]', component.$el)[0]
      expect(component.$ui.num[0]).to.be $('[data-ui="num"]', component.$el)[0]

      component.releaseUi()
      expect(component.ui.btn).to.be null
      expect(component.ui.num).to.be null
      expect(component.$ui.btn).to.be null
      expect(component.$ui.num).to.be null

  context 'mixed-in Observable', ->

    it 'has `Trait.Observable` interface', ->
      component = new Button $('#component1', fixture)
      spy = sinon.spy()

      component.on 'test', spy
      component.trigger 'test'
      expect(spy.calledOnce).to.be true
