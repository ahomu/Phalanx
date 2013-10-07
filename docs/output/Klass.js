Ext.data.JsonP.Klass({"tagname":"class","name":"Klass","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"abstract":true},"private":null,"id":"class-Klass","members":{"cfg":[],"property":[],"method":[{"name":"callSuper","tagname":"method","owner":"Klass","meta":{},"id":"method-callSuper"},{"name":"create","tagname":"method","owner":"Klass","meta":{},"id":"method-create"},{"name":"extend","tagname":"method","owner":"Klass","meta":{},"id":"method-extend"},{"name":"mixin","tagname":"method","owner":"Klass","meta":{},"id":"method-mixin"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":34,"files":[{"filename":"phalanx.debug.js","href":"phalanx.debug.html#Klass"}],"html_meta":{"abstract":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/phalanx.debug.html#Klass' target='_blank'>phalanx.debug.js</a></div></pre><div class='doc-contents'><p>Base Class of OOP feature</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-callSuper' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Klass'>Klass</span><br/><a href='source/phalanx.debug.html#Klass-method-callSuper' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Klass-method-callSuper' class='name expandable'>callSuper</a>( <span class='pre'>methodName, args</span> )</div><div class='description'><div class='short'>Call a specific method of the super class\n\nvar SuperClass = Klass.of({\n  onCreate: function() {\n    alert('Yup!');\n  ...</div><div class='long'><p>Call a specific method of the super class</p>\n\n<pre><code>var SuperClass = Klass.of({\n  onCreate: function() {\n    alert('Yup!');\n  }\n});\nvar SubClass = SuperClass.extends({\n  onCreate: function() {\n    this.callSuper('onCreate', arguments); // =&gt; alert('Yup!')\n  }\n});\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>methodName</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>args</span> : Object|Arguments<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-create' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Klass'>Klass</span><br/><a href='source/phalanx.debug.html#Klass-method-create' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Klass-method-create' class='name expandable'>create</a>( <span class='pre'></span> ) : *</div><div class='description'><div class='short'>Method which can be used instead of the new statement\n\nvar instance = Klass.create(); ...</div><div class='long'><p>Method which can be used instead of the <code>new</code> statement</p>\n\n<pre><code>var instance = <a href=\"#!/api/Klass-method-create\" rel=\"Klass-method-create\" class=\"docClass\">Klass.create</a>();\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-extend' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Klass'>Klass</span><br/><a href='source/phalanx.debug.html#Klass-method-extend' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Klass-method-extend' class='name expandable'>extend</a>( <span class='pre'>constructor_or_child, [child]</span> ) : <a href=\"#!/api/Klass\" rel=\"Klass\" class=\"docClass\">Klass</a></div><div class='description'><div class='short'>By inheriting an existing class, you create a new class\n\nvar classDefinition = {\n  // ... ...</div><div class='long'><p>By inheriting an existing class, you create a new class</p>\n\n<pre><code>var classDefinition = {\n  // ...\n};\nvar ExtendedClass = SomeClass.extend(classDefinition) @see Backbone.View.extend\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>constructor_or_child</span> : Function|Object<div class='sub-desc'>\n</div></li><li><span class='pre'>child</span> : Object (optional)<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Klass\" rel=\"Klass\" class=\"docClass\">Klass</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-mixin' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Klass'>Klass</span><br/><a href='source/phalanx.debug.html#Klass-method-mixin' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Klass-method-mixin' class='name expandable'>mixin</a>( <span class='pre'>trait, [aliases]</span> ) : <a href=\"#!/api/Klass\" rel=\"Klass\" class=\"docClass\">Klass</a></div><div class='description'><div class='short'>Mixin the trait in the prototype of the class. ...</div><div class='long'><p>Mixin the trait in the <code>prototype</code> of the class.\nIs a feature that is for a simple mixin, not the exact trait.\nNot support multiple inheritance like \"Squeak Smalltalk\".</p>\n\n<pre><code>var classDefinition = {\n  // ...\n};\nvar ExtendedWithTrait = SomeClass.extend(classDefinition)\n                                 .mixin(AsyncCallbackTrait)\n                                 .mixin(ObservableTrait, {\n                                   method: 'aliasedMethod'\n                                 });\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>trait</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>aliases</span> : Object (optional)<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Klass\" rel=\"Klass\" class=\"docClass\">Klass</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"});