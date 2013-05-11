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
    el: '#view'
    components:
      btn: Button

  view = null
  component = null

  beforeEach ->
    loadFixtures 'component_spec.html'

  it 'created component has element', ->
    component = new Button '#component'
    expect(component.el).toBe $('#component')[0]
    expect(component.$el[0]).toBe $('#component')[0]

  it 'created component have unique id', ->
    component = new Button '#component'
    expect(component.uid).not.toBeNull
    expect(component.uid).toBe 1

  it 'created component delegate event from view', ->
    view = new View
    $btns = $('[data-btn]')
    $nums = $('[data-num]')

    # 要素をクリックしたときにコンポーネントが生成される
    $btns.eq(1).click()
    expect($btns.eq(1).parent()).toHaveAttr('data-component-uid')

    # クリックしたコンポーネントのテキストだけ加算されている
    expect($nums.eq(0).text()).toBe '0'
    expect($nums.eq(1).text()).toBe '1'
    expect($nums.eq(2).text()).toBe '0'

    # 関係ない要素をクリックしても大丈夫
    $nums.eq(2).click()
    $nums.eq(2).parent().click()
    expect($nums.eq(2).parent()).not.toHaveAttr('data-component-uid')