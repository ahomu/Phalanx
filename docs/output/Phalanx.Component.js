Ext.data.JsonP.Phalanx_Component({"tagname":"class","name":"Phalanx.Component","extends":null,"mixins":["Phalanx.Trait.LifecycleCallbacks","Phalanx.Trait.Observable","Phalanx.Trait.UiLookupable"],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"abstract":true},"private":null,"id":"class-Phalanx.Component","members":{"cfg":[],"property":[{"name":"$ui","tagname":"property","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"property-S-ui"},{"name":"el","tagname":"property","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"property-el"},{"name":"events","tagname":"property","owner":"Phalanx.Component","meta":{},"id":"property-events"},{"name":"id","tagname":"property","owner":"Phalanx.Component","meta":{},"id":"property-id"},{"name":"params","tagname":"property","owner":"Phalanx.Component","meta":{},"id":"property-params"},{"name":"ui","tagname":"property","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"property-ui"},{"name":"uid","tagname":"property","owner":"Phalanx.Component","meta":{},"id":"property-uid"}],"method":[{"name":"constructor","tagname":"method","owner":"Phalanx.Component","meta":{},"id":"method-constructor"},{"name":"destroy","tagname":"method","owner":"Phalanx.Component","meta":{},"id":"method-destroy"},{"name":"initialize","tagname":"method","owner":"Phalanx.Trait.LifecycleCallbacks","meta":{"abstract":true},"id":"method-initialize"},{"name":"lookupUi","tagname":"method","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"method-lookupUi"},{"name":"onCreate","tagname":"method","owner":"Phalanx.Trait.LifecycleCallbacks","meta":{"abstract":true},"id":"method-onCreate"},{"name":"onDestroy","tagname":"method","owner":"Phalanx.Trait.LifecycleCallbacks","meta":{"abstract":true},"id":"method-onDestroy"},{"name":"onPause","tagname":"method","owner":"Phalanx.Trait.LifecycleCallbacks","meta":{"abstract":true},"id":"method-onPause"},{"name":"onResume","tagname":"method","owner":"Phalanx.Trait.LifecycleCallbacks","meta":{"abstract":true},"id":"method-onResume"},{"name":"onSetElement","tagname":"method","owner":"Phalanx.Component","meta":{"abstract":true},"id":"method-onSetElement"},{"name":"releaseUi","tagname":"method","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"method-releaseUi"},{"name":"setElement","tagname":"method","owner":"Phalanx.Component","meta":{},"id":"method-setElement"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":965,"files":[{"filename":"phalanx.debug.js","href":"phalanx.debug.html#Phalanx-Component"}],"html_meta":{"abstract":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Mixins</h4><div class='dependency'><a href='#!/api/Phalanx.Trait.LifecycleCallbacks' rel='Phalanx.Trait.LifecycleCallbacks' class='docClass'>Phalanx.Trait.LifecycleCallbacks</a></div><div class='dependency'><a href='#!/api/Phalanx.Trait.Observable' rel='Phalanx.Trait.Observable' class='docClass'>Phalanx.Trait.Observable</a></div><div class='dependency'><a href='#!/api/Phalanx.Trait.UiLookupable' rel='Phalanx.Trait.UiLookupable' class='docClass'>Phalanx.Trait.UiLookupable</a></div><h4>Files</h4><div class='dependency'><a href='source/phalanx.debug.html#Phalanx-Component' target='_blank'>phalanx.debug.js</a></div></pre><div class='doc-contents'>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-S-ui' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.UiLookupable' rel='Phalanx.Trait.UiLookupable' class='defined-in docClass'>Phalanx.Trait.UiLookupable</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-property-S-ui' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-property-S-ui' class='name expandable'>$ui</a><span> : Object.<String, jQuery></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-el' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.UiLookupable' rel='Phalanx.Trait.UiLookupable' class='defined-in docClass'>Phalanx.Trait.UiLookupable</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-property-el' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-property-el' class='name not-expandable'>el</a><span> : HTMLElement|jQuery</span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-events' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Component'>Phalanx.Component</span><br/><a href='source/phalanx.debug.html#Phalanx-Component-property-events' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Component-property-events' class='name expandable'>events</a><span> : Object.&lt;String, String|Function&gt;</span></div><div class='description'><div class='short'>events: {\n      'click .js_event_selector': 'someMethod'\n    }\n    // $('.js_event_selector').click() => someMethod() ...</div><div class='long'><p>events: {\n      'click .js_event_selector': 'someMethod'\n    }\n    // $('.js_event_selector').click() => someMethod()</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-id' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Component'>Phalanx.Component</span><br/><a href='source/phalanx.debug.html#Phalanx-Component-property-id' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Component-property-id' class='name not-expandable'>id</a><span> : Object</span></div><div class='description'><div class='short'><p>If exists element having <code>data-id</code> attribute</p>\n</div><div class='long'><p>If exists element having <code>data-id</code> attribute</p>\n</div></div></div><div id='property-params' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Component'>Phalanx.Component</span><br/><a href='source/phalanx.debug.html#Phalanx-Component-property-params' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Component-property-params' class='name expandable'>params</a><span> : Object</span></div><div class='description'><div class='short'>placeholder of instance parameters ...</div><div class='long'><p>placeholder of instance parameters</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-ui' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.UiLookupable' rel='Phalanx.Trait.UiLookupable' class='defined-in docClass'>Phalanx.Trait.UiLookupable</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-property-ui' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-property-ui' class='name expandable'>ui</a><span> : Object.<String, Null></span></div><div class='description'><div class='short'>ui: {\n      hoge: null\n    }\n    // view.ui.hoge => [data-ui=\"hoge\"] ...</div><div class='long'><p>ui: {\n      hoge: null\n    }\n    // view.ui.hoge => [data-ui=\"hoge\"]</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-uid' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Component'>Phalanx.Component</span><br/><a href='source/phalanx.debug.html#Phalanx-Component-property-uid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Component-property-uid' class='name not-expandable'>uid</a><span> : Number</span></div><div class='description'><div class='short'><p>instance's unique id nubmer</p>\n</div><div class='long'><p>instance's unique id nubmer</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Component'>Phalanx.Component</span><br/><a href='source/phalanx.debug.html#Phalanx-Component-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Phalanx.Component-method-constructor' class='name expandable'>Phalanx.Component</a>( <span class='pre'>el</span> ) : <a href=\"#!/api/Phalanx.Component\" rel=\"Phalanx.Component\" class=\"docClass\">Phalanx.Component</a></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>el</span> : HTMLElement<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Phalanx.Component\" rel=\"Phalanx.Component\" class=\"docClass\">Phalanx.Component</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Component'>Phalanx.Component</span><br/><a href='source/phalanx.debug.html#Phalanx-Component-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Component-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Destory this component ...</div><div class='long'><p>Destory this component</p>\n</div></div></div><div id='method-initialize' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.LifecycleCallbacks' rel='Phalanx.Trait.LifecycleCallbacks' class='defined-in docClass'>Phalanx.Trait.LifecycleCallbacks</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-LifecycleCallbacks-method-initialize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.LifecycleCallbacks-method-initialize' class='name expandable'>initialize</a>( <span class='pre'></span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'>It is called as a common initialization process. ...</div><div class='long'><p>It is called as a common initialization process. (derived from Backbone)\nIn Layout, View, Component...After set initial element &amp; Before event delegation.</p>\n</div></div></div><div id='method-lookupUi' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.UiLookupable' rel='Phalanx.Trait.UiLookupable' class='defined-in docClass'>Phalanx.Trait.UiLookupable</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-method-lookupUi' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-method-lookupUi' class='name expandable'>lookupUi</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>From the selector defined by this.ui, caching to explore the elements. ...</div><div class='long'><p>From the selector defined by this.ui, caching to explore the elements.</p>\n</div></div></div><div id='method-onCreate' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.LifecycleCallbacks' rel='Phalanx.Trait.LifecycleCallbacks' class='defined-in docClass'>Phalanx.Trait.LifecycleCallbacks</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-LifecycleCallbacks-method-onCreate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.LifecycleCallbacks-method-onCreate' class='name expandable'>onCreate</a>( <span class='pre'></span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'>It is called the first instance is created. ...</div><div class='long'><p>It is called the first instance is created.</p>\n</div></div></div><div id='method-onDestroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.LifecycleCallbacks' rel='Phalanx.Trait.LifecycleCallbacks' class='defined-in docClass'>Phalanx.Trait.LifecycleCallbacks</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-LifecycleCallbacks-method-onDestroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.LifecycleCallbacks-method-onDestroy' class='name expandable'>onDestroy</a>( <span class='pre'></span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'>It is called when destroying the instance. ...</div><div class='long'><p>It is called when destroying the instance.</p>\n</div></div></div><div id='method-onPause' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.LifecycleCallbacks' rel='Phalanx.Trait.LifecycleCallbacks' class='defined-in docClass'>Phalanx.Trait.LifecycleCallbacks</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-LifecycleCallbacks-method-onPause' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.LifecycleCallbacks-method-onPause' class='name expandable'>onPause</a>( <span class='pre'></span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-onResume' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.LifecycleCallbacks' rel='Phalanx.Trait.LifecycleCallbacks' class='defined-in docClass'>Phalanx.Trait.LifecycleCallbacks</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-LifecycleCallbacks-method-onResume' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.LifecycleCallbacks-method-onResume' class='name expandable'>onResume</a>( <span class='pre'></span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-onSetElement' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Component'>Phalanx.Component</span><br/><a href='source/phalanx.debug.html#Phalanx-Component-method-onSetElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Component-method-onSetElement' class='name expandable'>onSetElement</a>( <span class='pre'></span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Overrides: <a href='#!/api/Phalanx.Trait.LifecycleCallbacks-method-onSetElement' rel='Phalanx.Trait.LifecycleCallbacks-method-onSetElement' class='docClass'>Phalanx.Trait.LifecycleCallbacks.onSetElement</a></p></div></div></div><div id='method-releaseUi' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.UiLookupable' rel='Phalanx.Trait.UiLookupable' class='defined-in docClass'>Phalanx.Trait.UiLookupable</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-method-releaseUi' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-method-releaseUi' class='name expandable'>releaseUi</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Release ui elements reference. ...</div><div class='long'><p>Release ui elements reference.</p>\n</div></div></div><div id='method-setElement' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Component'>Phalanx.Component</span><br/><a href='source/phalanx.debug.html#Phalanx-Component-method-setElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Component-method-setElement' class='name expandable'>setElement</a>( <span class='pre'>element</span> )</div><div class='description'><div class='short'>Set managing domain element ...</div><div class='long'><p>Set managing domain element</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"});