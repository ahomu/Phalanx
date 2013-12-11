describe 'Mixin Phalanx.Trait.EntityObserver then can observe events fired by property', ->

  Subject = Phalanx.defineClass({}).mixin(Phalanx.Trait.Observable)

  Observer = Phalanx.defineClass
    entityListeners:
      'foo subject': 'onFoo'
      'bar subject': 'onBar'
  .mixin(Phalanx.Trait.Observable)
  .mixin(Phalanx.Trait.EntityObserver)

  beforeEach ->

  afterEach ->

  it 'observe event fired by subject', ->
    obs = new Observer
    obs.subject = new Subject

    obs.onFoo = sinon.spy()
    obs.onBar = sinon.spy()

    expect(obs.onFoo.calledOnce).to.be false
    obs.listenToEntity()

    obs.subject.trigger 'foo'
    expect(obs.onFoo.calledOnce).to.be true

    obs.subject.trigger 'bar'
    expect(obs.onBar.calledOnce).to.be true
    obs.subject.trigger 'bar'
    expect(obs.onBar.calledTwice).to.be true

  it 'can stop observing', ->
    obs = new Observer
    obs.subject = new Subject

    obs.onFoo = sinon.spy()
    obs.onBar = sinon.spy()

    obs.listenToEntity()

    obs.subject.trigger 'foo'
    expect(obs.onFoo.calledOnce).to.be true

    obs.stopListeningEntity()

    obs.subject.trigger 'bar'
    expect(obs.onBar.calledOnce).to.be false
