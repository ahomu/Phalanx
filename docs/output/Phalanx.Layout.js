Ext.data.JsonP.Phalanx_Layout({"tagname":"class","name":"Phalanx.Layout","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"abstract":true},"private":null,"id":"class-Phalanx.Layout","members":{"cfg":[],"property":[{"name":"$el","tagname":"property","owner":"Phalanx.Layout","meta":{},"id":"property-S-el"},{"name":"_assignedMap","tagname":"property","owner":"Phalanx.Layout","meta":{"private":true},"id":"property-_assignedMap"},{"name":"el","tagname":"property","owner":"Phalanx.Layout","meta":{},"id":"property-el"},{"name":"regions","tagname":"property","owner":"Phalanx.Layout","meta":{},"id":"property-regions"}],"method":[{"name":"constructor","tagname":"method","owner":"Phalanx.Layout","meta":{},"id":"method-constructor"},{"name":"assign","tagname":"method","owner":"Phalanx.Layout","meta":{},"id":"method-assign"},{"name":"destroy","tagname":"method","owner":"Phalanx.Layout","meta":{},"id":"method-destroy"},{"name":"getRegionView","tagname":"method","owner":"Phalanx.Layout","meta":{},"id":"method-getRegionView"},{"name":"initialize","tagname":"method","owner":"Phalanx.Layout","meta":{"abstract":true},"id":"method-initialize"},{"name":"onChange","tagname":"method","owner":"Phalanx.Layout","meta":{"abstract":true},"id":"method-onChange"},{"name":"onCreate","tagname":"method","owner":"Phalanx.Layout","meta":{"abstract":true},"id":"method-onCreate"},{"name":"onDestroy","tagname":"method","owner":"Phalanx.Layout","meta":{"abstract":true},"id":"method-onDestroy"},{"name":"setElement","tagname":"method","owner":"Phalanx.Layout","meta":{},"id":"method-setElement"},{"name":"withdraw","tagname":"method","owner":"Phalanx.Layout","meta":{},"id":"method-withdraw"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":460,"files":[{"filename":"phalanx.debug.js","href":"phalanx.debug.html#Phalanx-Layout"}],"html_meta":{"abstract":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/phalanx.debug.html#Phalanx-Layout' target='_blank'>phalanx.debug.js</a></div></pre><div class='doc-contents'>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-S-el' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-property-S-el' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-property-S-el' class='name not-expandable'>$el</a><span> : jQuery|Zepto</span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-_assignedMap' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-property-_assignedMap' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-property-_assignedMap' class='name expandable'>_assignedMap</a><span> : Object</span><strong class='private signature' >private</strong></div><div class='description'><div class='short'>Correspondence table of the region name and assigned View. ...</div><div class='long'><p>Correspondence table of the region name and assigned View.</p>\n\n<pre><code>laput.assign(regionName, <a href=\"#!/api/Phalanx.View\" rel=\"Phalanx.View\" class=\"docClass\">Phalanx.View</a>);\n// layout._assignedMap =&gt; { regionName: <a href=\"#!/api/Phalanx.View\" rel=\"Phalanx.View\" class=\"docClass\">Phalanx.View</a> }\n</code></pre>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-el' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-property-el' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-property-el' class='name not-expandable'>el</a><span> : HTMLElement</span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-regions' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-property-regions' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-property-regions' class='name expandable'>regions</a><span> : Object</span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{}</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Phalanx.Layout-method-constructor' class='name expandable'>Phalanx.Layout</a>( <span class='pre'>options</span> ) : <a href=\"#!/api/Phalanx.Layout\" rel=\"Phalanx.Layout\" class=\"docClass\">Phalanx.Layout</a></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Phalanx.Layout\" rel=\"Phalanx.Layout\" class=\"docClass\">Phalanx.Layout</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-assign' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-assign' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-assign' class='name expandable'>assign</a>( <span class='pre'>regionName, newView</span> )</div><div class='description'><div class='short'>Assign new View to element in layout. ...</div><div class='long'><p>Assign new View to element in layout.\nAnd destroy old View automatically.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>regionName</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>newView</span> : View<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>When the layout is destroyed, View which encloses also destroy all. ...</div><div class='long'><p>When the layout is destroyed, View which encloses also destroy all.</p>\n</div></div></div><div id='method-getRegionView' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-getRegionView' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-getRegionView' class='name expandable'>getRegionView</a>( <span class='pre'>regionName</span> ) : View</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>regionName</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>View</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-initialize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-initialize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-initialize' class='name expandable'>initialize</a>( <span class='pre'></span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-onChange' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-onChange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-onChange' class='name expandable'>onChange</a>( <span class='pre'>regionName, newView, oldView</span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>regionName</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>newView</span> : View<div class='sub-desc'>\n</div></li><li><span class='pre'>oldView</span> : View<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onCreate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-onCreate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-onCreate' class='name expandable'>onCreate</a>( <span class='pre'></span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-onDestroy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-onDestroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-onDestroy' class='name expandable'>onDestroy</a>( <span class='pre'></span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-setElement' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-setElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-setElement' class='name expandable'>setElement</a>( <span class='pre'>element</span> )</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : HTMLElement<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-withdraw' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Layout'>Phalanx.Layout</span><br/><a href='source/phalanx.debug.html#Phalanx-Layout-method-withdraw' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Layout-method-withdraw' class='name expandable'>withdraw</a>( <span class='pre'>regionName</span> ) : View</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>regionName</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>View</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"});