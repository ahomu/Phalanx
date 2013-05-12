describe '`defineClass` of basic OOP feture provider', ->
  Human = null

  beforeEach ->
    Human = Phalanx.defineClass
      constructor: (age, gender)->
        @age = age
        @gender = gender
      age: null
      gender: null
      say: ->
        'Hello'

  it 'can create new Class', ->
    john = new Human(27, 'male')

    expect(john.age).to.be(27)
    expect(john.gender).to.be('male')
    expect(john.say()).to.be('Hello')

    nancy = Human.create(24, 'female')
    expect(nancy.age).to.be(24)
    expect(nancy.gender).to.be('female')
    expect(nancy.say()).to.be('Hello')

  it 'can create new Class extends exsting Class', ->
    SuperMan = Human.extend
      beam: 'Beeeaaam!!'
      say: ->
        'Super! ' + @beam

    UltraMan = SuperMan.extend

      say: ->
        'Ultra! ' + @beam

    human    = new Human(20, 'male')
    superman = new SuperMan(20, 'female')
    ultraman = new UltraMan(40, 'unknown')

    expect(human.say()).to.be('Hello')
    expect(superman.say()).to.be('Super! '+superman.beam)
    expect(ultraman.say()).to.be('Ultra! '+ultraman.beam)

  it 'created class can mixin trait', ->
    BatWing =
      fly: ->
        'I can fly!'
      speed: 3000

    Batman = Human.extend(
      say: ->
        'Batman!'
      speed: 30
    ).with(BatWing, {fly: 'batmanFly'})

    bruce = new Batman(39, 'male')

    expect(bruce.say()).to.be('Batman!')
    expect(bruce.batmanFly()).to.be('I can fly!')
    expect(bruce.speed).to.be(3000)
    expect(Batman.speed).to.be.a('undefined')

  it 'created sub class can call super class method', ->
    HelloMan = Human.extend
      say: ->
        @super('say', arguments) + ' World'
      god: (ohmy)->
        ohmy + ' God'

    JesusMan = HelloMan.extend
#      say: ->
#        @super 'say', arguments
      god: ->
        @super 'god', arguments

    believer = new JesusMan(54, 'male')
    expect(believer.god('Oh my')).to.be('Oh my God')
