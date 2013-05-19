Ext.data.JsonP.Phalanx_Trait_UiLookupable({"tagname":"class","name":"Phalanx.Trait.UiLookupable","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{},"private":null,"id":"class-Phalanx.Trait.UiLookupable","members":{"cfg":[],"property":[{"name":"$ui","tagname":"property","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"property-S-ui"},{"name":"_uiLookpped","tagname":"property","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"property-_uiLookpped"},{"name":"ui","tagname":"property","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"property-ui"}],"method":[{"name":"lookupUi","tagname":"method","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"method-lookupUi"},{"name":"releaseUi","tagname":"method","owner":"Phalanx.Trait.UiLookupable","meta":{},"id":"method-releaseUi"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":239,"files":[{"filename":"phalanx.debug.js","href":"phalanx.debug.html#Phalanx-Trait-UiLookupable"}],"html_meta":{},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":["Phalanx.Component","Phalanx.View"],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Mixed into</h4><div class='dependency'><a href='#!/api/Phalanx.Component' rel='Phalanx.Component' class='docClass'>Phalanx.Component</a></div><div class='dependency'><a href='#!/api/Phalanx.View' rel='Phalanx.View' class='docClass'>Phalanx.View</a></div><h4>Files</h4><div class='dependency'><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable' target='_blank'>phalanx.debug.js</a></div></pre><div class='doc-contents'>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-S-ui' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Trait.UiLookupable'>Phalanx.Trait.UiLookupable</span><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-property-S-ui' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-property-S-ui' class='name expandable'>$ui</a><span> : Object.<String, jQuery></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-_uiLookpped' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Trait.UiLookupable'>Phalanx.Trait.UiLookupable</span><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-property-_uiLookpped' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-property-_uiLookpped' class='name expandable'>_uiLookpped</a><span> : Boolean</span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-ui' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Trait.UiLookupable'>Phalanx.Trait.UiLookupable</span><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-property-ui' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-property-ui' class='name expandable'>ui</a><span> : Object.<String, Null></span></div><div class='description'><div class='short'>ui: {\n\n  hoge: null\n}\n// view.ui.hoge =&gt; [data-ui=\"hoge\"] ...</div><div class='long'><p>ui: {</p>\n\n<pre><code>  hoge: null\n}\n// view.ui.hoge =&gt; [data-ui=\"hoge\"]\n</code></pre>\n<p>Defaults to: <code>{}</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-lookupUi' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Trait.UiLookupable'>Phalanx.Trait.UiLookupable</span><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-method-lookupUi' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-method-lookupUi' class='name expandable'>lookupUi</a>( <span class='pre'>element</span> )</div><div class='description'><div class='short'>From the selector defined by this.ui, caching to explore the elements. ...</div><div class='long'><p>From the selector defined by this.ui, caching to explore the elements.</p>\n\n<p>@params {HTMLElement|jQuery}</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-releaseUi' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Phalanx.Trait.UiLookupable'>Phalanx.Trait.UiLookupable</span><br/><a href='source/phalanx.debug.html#Phalanx-Trait-UiLookupable-method-releaseUi' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Phalanx.Trait.UiLookupable-method-releaseUi' class='name expandable'>releaseUi</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Release ui elements reference. ...</div><div class='long'><p>Release ui elements reference.</p>\n</div></div></div></div></div></div></div>"});