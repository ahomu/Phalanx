Ext.data.JsonP.Phalanx_Layout({"tagname":"class","name":"Phalanx.Layout","extends":"Phalanx.View","mixins":["Phalanx.Trait.LifecycleCallbacks","Phalanx.Trait.Observable"],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"abstract":true},"private":null,"id":"class-Phalanx.Layout","members":{"cfg":[],"property":[{"name":"$ui","tagname":"property","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"property-S-ui"},{"name":"_assignedMap","tagname":"property","owner":"Phalanx.Layout","meta":{"private":true},"id":"property-_assignedMap"},{"name":"_createdComponents","tagname":"property","owner":"Phalanx.View","meta":{"private":true},"id":"property-_createdComponents"},{"name":"_processedListeners","tagname":"property","owner":"Phalanx.View","meta":{"private":true},"id":"property-_processedListeners"},{"name":"components","tagname":"property","owner":"Phalanx.View","meta":{},"id":"property-components"},{"name":"events","tagname":"property","owner":"Phalanx.Layout","meta":{},"id":"property-events"},{"name":"listeners","tagname":"property","owner":"Phalanx.View","meta":{},"id":"property-listeners"},{"name":"regions","tagname":"property","owner":"Phalanx.Layout","meta":{},"id":"property-regions"},{"name":"ui","tagname":"property","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"property-ui"}],"method":[{"name":"constructor","tagname":"method","owner":"Phalanx.Layout","meta":{},"id":"method-constructor"},{"name":"_getComponentEventClosure","tagname":"method","owner":"Phalanx.View","meta":{"private":true},"id":"method-_getComponentEventClosure"},{"name":"_getComponentEvents","tagname":"method","owner":"Phalanx.View","meta":{"private":true},"id":"method-_getComponentEvents"},{"name":"_listenToComponent","tagname":"method","owner":"Phalanx.View","meta":{"private":true},"id":"method-_listenToComponent"},{"name":"_newComponent","tagname":"method","owner":"Phalanx.View","meta":{"private":true},"id":"method-_newComponent"},{"name":"_processListeners","tagname":"method","owner":"Phalanx.View","meta":{"private":true},"id":"method-_processListeners"},{"name":"assign","tagname":"method","owner":"Phalanx.Layout","meta":{},"id":"method-assign"},{"name":"delegateEvents","tagname":"method","owner":"Phalanx.View","meta":{},"id":"method-delegateEvents"},{"name":"destroy","tagname":"method","owner":"Phalanx.View","meta":{},"id":"method-destroy"},{"name":"destroyComponents","tagname":"method","owner":"Phalanx.View","meta":{},"id":"method-destroyComponents"},{"name":"destroyRegions","tagname":"method","owner":"Phalanx.Layout","meta":{},"id":"method-destroyRegions"},{"name":"getComponent","tagname":"method","owner":"Phalanx.View","meta":{},"id":"method-getComponent"},{"name":"getRegionView","tagname":"method","owner":"Phalanx.Layout","meta":{},"id":"method-getRegionView"},{"name":"initialize","tagname":"method","owner":"Phalanx.Trait.LifecycleCallbacks","meta":{"abstract":true},"id":"method-initialize"},{"name":"lookupUi","tagname":"method","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"method-lookupUi"},{"name":"onChange","tagname":"method","owner":"Phalanx.Layout","meta":{"abstract":true},"id":"method-onChange"},{"name":"onCreate","tagname":"method","owner":"Phalanx.Trait.LifecycleCallbacks","meta":{"abstract":true},"id":"method-onCreate"},{"name":"onDestroy","tagname":"method","owner":"Phalanx.Trait.LifecycleCallbacks","meta":{"abstract":true},"id":"method-onDestroy"},{"name":"onSetElement","tagname":"method","owner":"Phalanx.View","meta":{"abstract":true},"id":"method-onSetElement"},{"name":"releaseUi","tagname":"method","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"method-releaseUi"},{"name":"render","tagname":"method","owner":"Phalanx.View","meta":{"abstract":true,"chainable":true},"id":"method-render"},{"name":"setElement","tagname":"method","owner":"Phalanx.View","meta":{},"id":"method-setElement"},{"name":"withdraw","tagname":"method","owner":"Phalanx.Layout","meta":{},"id":"method-withdraw"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":727,"files":[{"filename":"phalanx.debug.js","href":"phalanx.debug.html#Phalanx-Layout"}],"html_meta":{"abstract":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":["Backbone.View","Phalanx.View"],"subclasses":[],"mixedInto":[],"parentMixins":["Phalanx.Trait.LifecycleCallbacks","Phalanx.Trait.Observable","Phalanx.Trait.UiLookupable"],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Backbone.View<div class='subclass '><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='docClass'>Phalanx.View</a><div class='subclass '><strong>Phalanx.Layout</strong></div></div></div><h4>Mixins</h4><div class='dependency'><a href='#!/api/Phalanx.Trait.LifecycleCallbacks' rel='Phalanx.Trait.LifecycleCallbacks' class='docClass'>Phalanx.Trait.LifecycleCallbacks</a></div><div class='dependency'><a href='#!/api/Phalanx.Trait.Observable' rel='Phalanx.Trait.Observable' class='docClass'>Phalanx.Trait.Observable</a></div><h4>Inherited mixins</h4><div class='dependency'><a href='#!/api/Phalanx.Trait.LifecycleCallbacks' rel='Phalanx.Trait.LifecycleCallbacks' class='docClass'>Phalanx.Trait.LifecycleCallbacks</a></div><div class='dependency'><a href='#!/api/Phalanx.Trait.Observable' rel='Phalanx.Trait.Observable' class='docClass'>Phalanx.Trait.Observable</a></div><div class='dependency'><a href='#!/api/Phalanx.Trait.UiLookupable' rel='Phalanx.Trait.UiLookupable' class='docClass'>Phalanx.Trait.UiLookupable</a></div><h4>Files</h4><div class='dependency'><a href='source/phalanx.debug.html#Phalanx-Layout' target='_blank'>phalanx.debug.js</a></div></pre><div class='doc-contents'>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-S-ui' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.UiLookupable' rel='Phalanx.Trait.UiLookupable' class='defined-in docClass'>Phalanx.Trait.UiLookupable</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-property-S-ui' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-property-S-ui' class='name expandable'>$ui</a><span> : Object.<String, jQuery></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-_assignedMap' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-property-_assignedMap' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-property-_assignedMap' class='name expandable'>_assignedMap</a><span> : Object.&lt;String, <a href=\"#!/api/Phalanx.View\" rel=\"Phalanx.View\" class=\"docClass\">Phalanx.View</a>&gt;</span><strong class='private signature' >private</strong></div><div class='description'><div class='short'>Correspondence table of the region name and assigned View. ...</div><div class='long'><p>Correspondence table of the region name and assigned View.</p>\n\n<pre><code>laput.assign(regionName, <a href=\"#!/api/Phalanx.View\" rel=\"Phalanx.View\" class=\"docClass\">Phalanx.View</a>);\n// layout._assignedMap =&gt; { regionName: <a href=\"#!/api/Phalanx.View\" rel=\"Phalanx.View\" class=\"docClass\">Phalanx.View</a> }\n</code></pre>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-_createdComponents' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-property-_createdComponents' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-property-_createdComponents' class='name expandable'>_createdComponents</a><span> : Object.&lt;Number, <a href=\"#!/api/Phalanx.Component\" rel=\"Phalanx.Component\" class=\"docClass\">Phalanx.Component</a>&gt;</span><strong class='private signature' >private</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-_processedListeners' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-property-_processedListeners' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-property-_processedListeners' class='name expandable'>_processedListeners</a><span> : Object.<String, Object<String, String>></span><strong class='private signature' >private</strong></div><div class='description'><div class='short'>_processedListeners: {\n\n  'likeBtn': {\n    'customeEvent': 'receiveCustomEvent'\n  }\n} ...</div><div class='long'><p>_processedListeners: {</p>\n\n<pre><code>  'likeBtn': {\n    'customeEvent': 'receiveCustomEvent'\n  }\n}\n</code></pre>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-components' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-property-components' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-property-components' class='name expandable'>components</a><span> : Object.&lt;String, <a href=\"#!/api/Phalanx.Component\" rel=\"Phalanx.Component\" class=\"docClass\">Phalanx.Component</a>&gt;</span></div><div class='description'><div class='short'>components: {\n\n  likeBtn: LikeBtnComponent\n}\n// &lt;button data-component=\"likeBtn\"&gt;&lt;/button&gt; =&gt; LikeBtnC...</div><div class='long'><p>components: {</p>\n\n<pre><code>  likeBtn: LikeBtnComponent\n}\n// &lt;button data-component=\"likeBtn\"&gt;&lt;/button&gt; =&gt; LikeBtnComponent\n</code></pre>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-events' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-property-events' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-property-events' class='name expandable'>events</a><span> : Object.&lt;String, String|Function&gt;</span></div><div class='description'><div class='short'>events: {\n\n  'click .js_event_selector': 'someMethodName'\n}\n// $('.js_event_selector').click() =&gt; someMethod() ...</div><div class='long'><p>events: {</p>\n\n<pre><code>  'click .js_event_selector': 'someMethodName'\n}\n// $('.js_event_selector').click() =&gt; someMethod()\n</code></pre>\n<p>Defaults to: <code>{}</code></p><p>Overrides: <a href='#!/api/Phalanx.View-property-events' rel='Phalanx.View-property-events' class='docClass'>Phalanx.View.events</a></p></div></div></div><div id='property-listeners' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-property-listeners' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-property-listeners' class='name expandable'>listeners</a><span> : Object.&lt;String, String&gt;</span></div><div class='description'><div class='short'>listeners: {\n\n  'customEvent likeBtn': 'receiveCustomEvent'\n}\n// component.trigger('customEvent') =&gt; view.receiveC...</div><div class='long'><p>listeners: {</p>\n\n<pre><code>  'customEvent likeBtn': 'receiveCustomEvent'\n}\n// component.trigger('customEvent') =&gt; view.receiveCustomEvent()\n</code></pre>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-regions' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-property-regions' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-property-regions' class='name expandable'>regions</a><span> : Object.&lt;String, String&gt;</span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-ui' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.UiLookupable' rel='Phalanx.Trait.UiLookupable' class='defined-in docClass'>Phalanx.Trait.UiLookupable</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-property-ui' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-property-ui' class='name expandable'>ui</a><span> : Object.<String, Null></span></div><div class='description'><div class='short'>ui: {\n\n  hoge: null\n}\n// view.ui.hoge =&gt; [data-ui=\"hoge\"] ...</div><div class='long'><p>ui: {</p>\n\n<pre><code>  hoge: null\n}\n// view.ui.hoge =&gt; [data-ui=\"hoge\"]\n</code></pre>\n<p>Defaults to: <code>{}</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Phalanx.Layout-method-constructor' class='name expandable'>Phalanx.Layout</a>( <span class='pre'>options</span> ) : <a href=\"#!/api/Phalanx.Layout\" rel=\"Phalanx.Layout\" class=\"docClass\">Phalanx.Layout</a></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Phalanx.Layout\" rel=\"Phalanx.Layout\" class=\"docClass\">Phalanx.Layout</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href='#!/api/Phalanx.View-method-constructor' rel='Phalanx.View-method-constructor' class='docClass'>Phalanx.View.constructor</a></p></div></div></div><div id='method-_getComponentEventClosure' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-method-_getComponentEventClosure' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-method-_getComponentEventClosure' class='name expandable'>_getComponentEventClosure</a>( <span class='pre'>methodName</span> ) : Function<strong class='private signature' >private</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>methodName</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Function</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_getComponentEvents' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-method-_getComponentEvents' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-method-_getComponentEvents' class='name expandable'>_getComponentEvents</a>( <span class='pre'></span> ) : Object.&lt;String, String&gt;<strong class='private signature' >private</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object.&lt;String, String&gt;</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_listenToComponent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-method-_listenToComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-method-_listenToComponent' class='name expandable'>_listenToComponent</a>( <span class='pre'>component, componentName</span> )<strong class='private signature' >private</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>component</span> : <a href=\"#!/api/Phalanx.Component\" rel=\"Phalanx.Component\" class=\"docClass\">Phalanx.Component</a><div class='sub-desc'>\n</div></li><li><span class='pre'>componentName</span> : String<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_newComponent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-method-_newComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-method-_newComponent' class='name expandable'>_newComponent</a>( <span class='pre'>componentName, el</span> ) : <a href=\"#!/api/Phalanx.Component\" rel=\"Phalanx.Component\" class=\"docClass\">Phalanx.Component</a><strong class='private signature' >private</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>componentName</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>el</span> : HTMLElement<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Phalanx.Component\" rel=\"Phalanx.Component\" class=\"docClass\">Phalanx.Component</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_processListeners' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-method-_processListeners' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-method-_processListeners' class='name expandable'>_processListeners</a>( <span class='pre'></span> )<strong class='private signature' >private</strong></div><div class='description'><div class='short'>Converted to processed the listeners property. ...</div><div class='long'><p>Converted to processed the <code>listeners</code> property.\nCall at once when view instance created.</p>\n</div></div></div><div id='method-assign' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-assign' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-assign' class='name expandable'>assign</a>( <span class='pre'>regionName, newView</span> )</div><div class='description'><div class='short'>Assign new View to element in layout. ...</div><div class='long'><p>Assign new View to element in layout.\nAnd destroy old View automatically.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>regionName</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>newView</span> : <a href=\"#!/api/Phalanx.View\" rel=\"Phalanx.View\" class=\"docClass\">Phalanx.View</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-delegateEvents' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-method-delegateEvents' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-method-delegateEvents' class='name expandable'>delegateEvents</a>( <span class='pre'>[events]</span> )</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>events</span> : Object (optional)<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Destory and teadown View. ...</div><div class='long'><p>Destory and teadown View.</p>\n</div></div></div><div id='method-destroyComponents' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-method-destroyComponents' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-method-destroyComponents' class='name expandable'>destroyComponents</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Destroy all created componentns. ...</div><div class='long'><p>Destroy all created componentns.</p>\n</div></div></div><div id='method-destroyRegions' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-destroyRegions' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-destroyRegions' class='name expandable'>destroyRegions</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Destroy all regions assigned views. ...</div><div class='long'><p>Destroy all regions assigned views.</p>\n</div></div></div><div id='method-getComponent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-method-getComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-method-getComponent' class='name expandable'>getComponent</a>( <span class='pre'>el</span> ) : <a href=\"#!/api/Phalanx.Component\" rel=\"Phalanx.Component\" class=\"docClass\">Phalanx.Component</a></div><div class='description'><div class='short'>Flywieght component getter. ...</div><div class='long'><p>Flywieght component getter.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>el</span> : HTMLElement<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Phalanx.Component\" rel=\"Phalanx.Component\" class=\"docClass\">Phalanx.Component</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getRegionView' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-getRegionView' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-getRegionView' class='name expandable'>getRegionView</a>( <span class='pre'>regionName</span> ) : <a href=\"#!/api/Phalanx.View\" rel=\"Phalanx.View\" class=\"docClass\">Phalanx.View</a></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>regionName</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Phalanx.View\" rel=\"Phalanx.View\" class=\"docClass\">Phalanx.View</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-initialize' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.LifecycleCallbacks' rel='Phalanx.Trait.LifecycleCallbacks' class='defined-in docClass'>Phalanx.Trait.LifecycleCallbacks</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-LifecycleCallbacks-method-initialize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.LifecycleCallbacks-method-initialize' class='name expandable'>initialize</a>( <span class='pre'></span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'>It is called as a common initialization process. ...</div><div class='long'><p>It is called as a common initialization process. (derived from Backbone)</p>\n</div></div></div><div id='method-lookupUi' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.UiLookupable' rel='Phalanx.Trait.UiLookupable' class='defined-in docClass'>Phalanx.Trait.UiLookupable</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-method-lookupUi' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-method-lookupUi' class='name expandable'>lookupUi</a>( <span class='pre'>element</span> )</div><div class='description'><div class='short'>From the selector defined by this.ui, caching to explore the elements. ...</div><div class='long'><p>From the selector defined by this.ui, caching to explore the elements.</p>\n\n<p>@params {HTMLElement|jQuery}</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onChange' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-onChange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-onChange' class='name expandable'>onChange</a>( <span class='pre'>regionName, newView, oldView</span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>regionName</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>newView</span> : <a href=\"#!/api/Phalanx.View\" rel=\"Phalanx.View\" class=\"docClass\">Phalanx.View</a><div class='sub-desc'>\n</div></li><li><span class='pre'>oldView</span> : <a href=\"#!/api/Phalanx.View\" rel=\"Phalanx.View\" class=\"docClass\">Phalanx.View</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onCreate' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.LifecycleCallbacks' rel='Phalanx.Trait.LifecycleCallbacks' class='defined-in docClass'>Phalanx.Trait.LifecycleCallbacks</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-LifecycleCallbacks-method-onCreate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.LifecycleCallbacks-method-onCreate' class='name expandable'>onCreate</a>( <span class='pre'></span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'>It is called the first instance is created. ...</div><div class='long'><p>It is called the first instance is created.</p>\n</div></div></div><div id='method-onDestroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.LifecycleCallbacks' rel='Phalanx.Trait.LifecycleCallbacks' class='defined-in docClass'>Phalanx.Trait.LifecycleCallbacks</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-LifecycleCallbacks-method-onDestroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.LifecycleCallbacks-method-onDestroy' class='name expandable'>onDestroy</a>( <span class='pre'></span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'>It is called when destroying the instance. ...</div><div class='long'><p>It is called when destroying the instance.</p>\n</div></div></div><div id='method-onSetElement' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-method-onSetElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-method-onSetElement' class='name expandable'>onSetElement</a>( <span class='pre'>element</span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : HTMLElement<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-releaseUi' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.Trait.UiLookupable' rel='Phalanx.Trait.UiLookupable' class='defined-in docClass'>Phalanx.Trait.UiLookupable</a><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-method-releaseUi' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-method-releaseUi' class='name expandable'>releaseUi</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Release ui elements reference. ...</div><div class='long'><p>Release ui elements reference.</p>\n</div></div></div><div id='method-render' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-method-render' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-method-render' class='name expandable'>render</a>( <span class='pre'>html</span> ) : *<strong class='abstract signature' >abstract</strong><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>html</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setElement' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='defined-in docClass'>Phalanx.View</a><br/><a href='source/phalanx.debug.html#Phalanx-View-method-setElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.View-method-setElement' class='name expandable'>setElement</a>( <span class='pre'>element, delegate</span> )</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : HTMLElement<div class='sub-desc'>\n</div></li><li><span class='pre'>delegate</span> : Boolean<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-withdraw' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-withdraw' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-withdraw' class='name expandable'>withdraw</a>( <span class='pre'>regionName</span> )</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>regionName</span> : String<div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"});