describe 'Phalanx.Component is units of actionable ui', ->

  Button = Phalanx.Component.extend
    ui:
      btn: '[data-btn]'
      num: '[data-num]'
    events:
      'click [data-btn]': 'onClick'
    onClick: ->
      @ui.num.text(parseInt(@ui.num.text(), 10) + 1)

  View = Phalanx.View.extend
    components:
      btn: Button

  view = null
  component = null
  fixture = null

  beforeEach ->
    fixtures.load 'component_spec.html'
    fixture = fixtures.window().document

  afterEach ->
    fixtures.cleanUp()

  it 'created component has element', ->
    component = new Button $('#component1', fixture)
    expect(component.el).not.to.be undefined
    expect(component.el).to.be $('#component1', fixture)[0]
    expect(component.$el[0]).to.be $('#component1', fixture)[0]

  it 'created component have unique id', ->
    component = new Button $('#component2', fixture)
    expect(component.uid).not.to.be null
    expect(component.uid).to.be 1

  it 'created component delegate event from view', ->
    view = new View el: $('#view', fixture)
    $btns = $('[data-btn]', fixture)
    $nums = $('[data-num]', fixture)

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

  it 'created component has `Backbone.Events` interface', ->
    component = new Button $('#component', fixture)
    component.on 'test'