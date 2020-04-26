(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var StringChecks_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Helpers for validating various text string formats.
	 */
	var StringChecks = /** @class */ (function () {
	    function StringChecks() {
	    }
	    /**
	     * Tests whether the input string is a valid TSDoc tag name; if not, returns an error message.
	     * TSDoc tag names start with an at-sign ("@") followed by ASCII letters using
	     * "camelCase" capitalization.
	     */
	    StringChecks.explainIfInvalidTSDocTagName = function (tagName) {
	        if (tagName[0] !== '@') {
	            return 'A TSDoc tag name must start with an "@" symbol';
	        }
	        if (!StringChecks._tsdocTagNameRegExp.test(tagName)) {
	            return 'A TSDoc tag name must start with a letter and contain only letters and numbers';
	        }
	        return undefined;
	    };
	    /**
	     * Throws an exception if the input string is not a valid TSDoc tag name.
	     * TSDoc tag names start with an at-sign ("@") followed by ASCII letters using
	     * "camelCase" capitalization.
	     */
	    StringChecks.validateTSDocTagName = function (tagName) {
	        var explanation = StringChecks.explainIfInvalidTSDocTagName(tagName);
	        if (explanation) {
	            throw new Error(explanation);
	        }
	    };
	    /**
	     * Tests whether the input string is a URL form supported inside an "@link" tag; if not,
	     * returns an error message.
	     */
	    StringChecks.explainIfInvalidLinkUrl = function (url) {
	        if (url.length === 0) {
	            return 'The URL cannot be empty';
	        }
	        if (!StringChecks._urlSchemeRegExp.test(url)) {
	            return 'An @link URL must begin with a scheme comprised only of letters and numbers followed by "://".'
	                + ' (For general URLs, use an HTML "<a>" tag instead.)';
	        }
	        if (!StringChecks._urlSchemeAfterRegExp.test(url)) {
	            return 'An @link URL must have at least one character after "://"';
	        }
	        return undefined;
	    };
	    /**
	     * Tests whether the input string is a valid HTML element or attribute name.
	     */
	    StringChecks.explainIfInvalidHtmlName = function (htmlName) {
	        if (!StringChecks._htmlNameRegExp.test(htmlName)) {
	            return 'An HTML name must be an ASCII letter followed by zero or more letters, digits, or hyphens';
	        }
	        return undefined;
	    };
	    /**
	     * Throws an exception if the input string is a not valid HTML element or attribute name.
	     */
	    StringChecks.validateHtmlName = function (htmlName) {
	        var explanation = StringChecks.explainIfInvalidHtmlName(htmlName);
	        if (explanation) {
	            throw new Error(explanation);
	        }
	    };
	    /**
	     * Tests whether the input string is a valid NPM package name.
	     */
	    StringChecks.explainIfInvalidPackageName = function (packageName) {
	        if (packageName.length === 0) {
	            return 'The package name cannot be an empty string';
	        }
	        if (!StringChecks._validPackageNameRegExp.test(packageName)) {
	            return "The package name " + JSON.stringify(packageName) + " is not a valid package name";
	        }
	        return undefined;
	    };
	    /**
	     * Tests whether the input string is a valid declaration reference import path.
	     */
	    StringChecks.explainIfInvalidImportPath = function (importPath, prefixedByPackageName) {
	        if (importPath.length > 0) {
	            if (importPath.indexOf('//') >= 0) {
	                return 'An import path must not contain "//"';
	            }
	            if (importPath[importPath.length - 1] === '/') {
	                return 'An import path must not end with "/"';
	            }
	            if (!prefixedByPackageName) {
	                if (importPath[0] === '/') {
	                    return 'An import path must not start with "/" unless prefixed by a package name';
	                }
	            }
	        }
	        return undefined;
	    };
	    /**
	     * Returns true if the input string is a TSDoc system selector.
	     */
	    StringChecks.isSystemSelector = function (selector) {
	        return StringChecks._systemSelectors.has(selector);
	    };
	    /**
	     * Tests whether the input string is a valid ECMAScript identifier.
	     * A precise check is extremely complicated and highly dependent on the standard version
	     * and how faithfully the interpreter implements it, so here we use a conservative heuristic.
	     */
	    StringChecks.explainIfInvalidUnquotedIdentifier = function (identifier) {
	        if (identifier.length === 0) {
	            return 'The identifier cannot be an empty string';
	        }
	        if (StringChecks._identifierBadCharRegExp.test(identifier)) {
	            return 'The identifier cannot non-word characters';
	        }
	        if (StringChecks._identifierNumberStartRegExp.test(identifier)) {
	            return 'The identifier must not start with a number';
	        }
	        return undefined;
	    };
	    /**
	     * Tests whether the input string can be used without quotes as a member identifier in a declaration reference.
	     * If not, it should be enclosed in quotes.
	     */
	    StringChecks.explainIfInvalidUnquotedMemberIdentifier = function (identifier) {
	        var explanation = StringChecks.explainIfInvalidUnquotedIdentifier(identifier);
	        if (explanation !== undefined) {
	            return explanation;
	        }
	        if (StringChecks.isSystemSelector(identifier)) {
	            // We do this to avoid confusion about the declaration reference syntax rules.
	            // For example if someone were to see "MyClass.(static:instance)" it would be unclear which
	            // side the colon is the selector.
	            return "The identifier \"" + identifier + "\" must be quoted because it is a TSDoc system selector name";
	        }
	        return undefined;
	    };
	    StringChecks._tsdocTagNameRegExp = /^@[a-z][a-z0-9]*$/i;
	    StringChecks._urlSchemeRegExp = /^[a-z][a-z0-9]*\:\/\//i;
	    StringChecks._urlSchemeAfterRegExp = /^[a-z][a-z0-9]*\:\/\/./i;
	    // HTML element definitions:
	    // https://spec.commonmark.org/0.29/#tag-name
	    // https://www.w3.org/TR/html5/syntax.html#tag-name
	    // https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
	    //
	    // We use the CommonMark spec:
	    // "A tag name consists of an ASCII letter followed by zero or more ASCII letters, digits, or hyphens (-)."
	    StringChecks._htmlNameRegExp = /^[a-z]+[a-z0-9\-]*$/i;
	    // Note: In addition to letters, numbers, underscores, and dollar signs, modern ECMAScript
	    // also allows Unicode categories such as letters, combining marks, digits, and connector punctuation.
	    // These are mostly supported in all environments except IE11, so if someone wants it, we would accept
	    // a PR to allow them (although the test surface might be somewhat large).
	    StringChecks._identifierBadCharRegExp = /[^a-z0-9_$]/i;
	    // Identifiers most not start with a number.
	    StringChecks._identifierNumberStartRegExp = /^[0-9]/;
	    // For detailed notes about NPM package name syntax, see:
	    // tslint:disable-next-line:max-line-length
	    // https://github.com/Microsoft/web-build-tools/blob/a417ca25c63aca31dba43a34d39cc9cd529b9c78/libraries/node-core-library/src/PackageName.ts
	    StringChecks._validPackageNameRegExp = /^(?:@[a-z0-9\-_\.]+\/)?[a-z0-9\-_\.]+$/i;
	    StringChecks._systemSelectors = new Set([
	        // For classes:
	        'instance', 'static', 'constructor',
	        // For merged declarations:
	        'class', 'enum', 'function', 'interface', 'namespace', 'type', 'variable'
	    ]);
	    return StringChecks;
	}());
	exports.StringChecks = StringChecks;

	});

	unwrapExports(StringChecks_1);
	var StringChecks_2 = StringChecks_1.StringChecks;

	var DocNodeManager_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Part of the {@link TSDocConfiguration} object.
	 *
	 * @remarks
	 * If you define your own custom subclasses of `DocNode`, they must be registered with the `DocNodeManager`.
	 * Use {@link DocNodeManager.registerAllowableChildren} to specify which {@link DocNodeContainer} subclasses
	 * are allowed to contain your nodes.
	 */
	var DocNodeManager = /** @class */ (function () {
	    function DocNodeManager() {
	        this._docNodeDefinitionsByKind = new Map();
	        this._docNodeDefinitionsByConstructor = new Map();
	    }
	    /**
	     * Registers a list of {@link IDocNodeDefinition} objects to be used with the associated
	     * {@link TSDocConfiguration} object.
	     */
	    DocNodeManager.prototype.registerDocNodes = function (packageName, definitions) {
	        var packageNameError = StringChecks_1.StringChecks.explainIfInvalidPackageName(packageName);
	        if (packageNameError) {
	            throw new Error('Invalid NPM package name: ' + packageNameError);
	        }
	        for (var _i = 0, definitions_1 = definitions; _i < definitions_1.length; _i++) {
	            var definition = definitions_1[_i];
	            if (!DocNodeManager._nodeKindRegExp.test(definition.docNodeKind)) {
	                throw new Error("The DocNode kind " + JSON.stringify(definition.docNodeKind) + " is not a valid identifier."
	                    + " It must start with an underscore or letter, and be comprised of letters, numbers, and underscores");
	            }
	            var existingDefinition = this._docNodeDefinitionsByKind.get(definition.docNodeKind);
	            if (existingDefinition !== undefined) {
	                throw new Error("The DocNode kind \"" + definition.docNodeKind + "\" was already registered"
	                    + (" by " + existingDefinition.packageName));
	            }
	            existingDefinition = this._docNodeDefinitionsByConstructor.get(definition.constructor);
	            if (existingDefinition !== undefined) {
	                throw new Error("This DocNode constructor was already registered by " + existingDefinition.packageName
	                    + (" as " + existingDefinition.docNodeKind));
	            }
	            var newDefinition = {
	                docNodeKind: definition.docNodeKind,
	                constructor: definition.constructor,
	                packageName: packageName,
	                allowedChildKinds: new Set()
	            };
	            this._docNodeDefinitionsByKind.set(definition.docNodeKind, newDefinition);
	            this._docNodeDefinitionsByConstructor.set(definition.constructor, newDefinition);
	        }
	    };
	    /**
	     * Reports an error if the specified DocNode kind has not been registered.
	     */
	    DocNodeManager.prototype.throwIfNotRegisteredKind = function (docNodeKind) {
	        if (!this._docNodeDefinitionsByKind.has(docNodeKind)) {
	            throw new Error("The DocNode kind \"" + docNodeKind + "\" was not registered with this TSDocConfiguration");
	        }
	    };
	    /**
	     * For the given parent DocNode kind, registers the specified DocNode kinds as being allowable children of
	     * the parent.
	     *
	     * @remarks
	     * To prevent mistakes, `DocNodeContainer` will report an error if you try to add node that was not registered
	     * as an allowable child of the container.
	     */
	    DocNodeManager.prototype.registerAllowableChildren = function (parentKind, childKinds) {
	        var parentDefinition = this._getDefinition(parentKind);
	        for (var _i = 0, childKinds_1 = childKinds; _i < childKinds_1.length; _i++) {
	            var childKind = childKinds_1[_i];
	            this._getDefinition(childKind);
	            parentDefinition.allowedChildKinds.add(childKind);
	        }
	    };
	    /**
	     * Returns true if the specified DocNode kind has been registered as an allowable child of the specified
	     * parent DocNode kind.
	     */
	    DocNodeManager.prototype.isAllowedChild = function (parentKind, childKind) {
	        var parentDefinition = this._getDefinition(parentKind);
	        return parentDefinition.allowedChildKinds.has(childKind);
	    };
	    DocNodeManager.prototype._getDefinition = function (docNodeKind) {
	        var definition = this._docNodeDefinitionsByKind.get(docNodeKind);
	        if (definition === undefined) {
	            throw new Error("The DocNode kind \"" + docNodeKind + "\" was not registered with this TSDocConfiguration");
	        }
	        return definition;
	    };
	    // Matches an ASCII TypeScript-style identifier.
	    //
	    // Example: "_myIdentifier99"
	    DocNodeManager._nodeKindRegExp = /^[_a-z][_a-z0-9]*$/i;
	    return DocNodeManager;
	}());
	exports.DocNodeManager = DocNodeManager;

	});

	unwrapExports(DocNodeManager_1);
	var DocNodeManager_2 = DocNodeManager_1.DocNodeManager;

	var TSDocTagDefinition_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Determines the type of syntax for a TSDocTagDefinition
	 */
	var TSDocTagSyntaxKind;
	(function (TSDocTagSyntaxKind) {
	    /**
	     * The tag is intended to be an inline tag.  For example: `{@link}`.
	     */
	    TSDocTagSyntaxKind[TSDocTagSyntaxKind["InlineTag"] = 0] = "InlineTag";
	    /**
	     * The tag is intended to be a block tag that starts a new documentation
	     * section.  For example: `@remarks`
	     */
	    TSDocTagSyntaxKind[TSDocTagSyntaxKind["BlockTag"] = 1] = "BlockTag";
	    /**
	     * The tag is intended to be a modifier tag whose presences indicates
	     * an aspect of the associated API item.  For example: `@internal`
	     */
	    TSDocTagSyntaxKind[TSDocTagSyntaxKind["ModifierTag"] = 2] = "ModifierTag";
	})(TSDocTagSyntaxKind = exports.TSDocTagSyntaxKind || (exports.TSDocTagSyntaxKind = {}));
	/**
	 * Defines a TSDoc tag that will be understood by the TSDocParser.
	 */
	var TSDocTagDefinition = /** @class */ (function () {
	    function TSDocTagDefinition(parameters) {
	        StringChecks_1.StringChecks.validateTSDocTagName(parameters.tagName);
	        this.tagName = parameters.tagName;
	        this.tagNameWithUpperCase = parameters.tagName.toUpperCase();
	        this.syntaxKind = parameters.syntaxKind;
	        this.standardization = parameters.standardization
	            || "None" /* None */;
	        this.allowMultiple = !!parameters.allowMultiple;
	    }
	    return TSDocTagDefinition;
	}());
	exports.TSDocTagDefinition = TSDocTagDefinition;

	});

	unwrapExports(TSDocTagDefinition_1);
	var TSDocTagDefinition_2 = TSDocTagDefinition_1.TSDocTagSyntaxKind;
	var TSDocTagDefinition_3 = TSDocTagDefinition_1.TSDocTagDefinition;

	var StandardTags_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Tags whose meaning is defined by the TSDoc standard.
	 */
	var StandardTags = /** @class */ (function () {
	    function StandardTags() {
	    }
	    StandardTags._defineTag = function (parameters) {
	        return new TSDocTagDefinition_1.TSDocTagDefinition(parameters);
	    };
	    /**
	     * (Discretionary)
	     *
	     * Suggested meaning: Designates that an API item's release stage is "alpha".
	     * It is intended to be used by third-party developers eventually, but has not
	     * yet been released.  The tooling may trim the declaration from a public release.
	     *
	     * Example implementations: API Extractor
	     */
	    StandardTags.alpha = StandardTags._defineTag({
	        tagName: '@alpha',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.ModifierTag,
	        standardization: "Discretionary" /* Discretionary */
	    });
	    /**
	     * (Discretionary)
	     *
	     * Suggested meaning: Designates that an API item's release stage is "beta".
	     * It has been released to third-party developers experimentally for the purpose of
	     * collecting feedback.  The API should not be used in production, because its contract may
	     * change without notice.  The tooling may trim the declaration from a public release,
	     * but may include it in a developer preview release.
	     *
	     * Example implementations: API Extractor
	     *
	     * Synonyms: `@experimental`
	     */
	    StandardTags.beta = StandardTags._defineTag({
	        tagName: '@beta',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.ModifierTag,
	        standardization: "Discretionary" /* Discretionary */
	    });
	    /**
	     * (Core)
	     *
	     * This block tag communicates that an API item is no longer supported and may be removed
	     * in a future release.  The `@deprecated` tag is followed by a sentence describing
	     * the recommended alternative.  It recursively applies to members of the container.
	     * For example, if a class is deprecated, then so are all of its members.
	     */
	    StandardTags.deprecated = StandardTags._defineTag({
	        tagName: '@deprecated',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.BlockTag,
	        standardization: "Core" /* Core */
	    });
	    /**
	     * (Extended)
	     *
	     * This block tag is used to document the default value for a field or property,
	     * if a value is not assigned explicitly.
	     *
	     * @remarks
	     * This tag should only be used with fields or properties that are members of a class or interface.
	     */
	    StandardTags.defaultValue = StandardTags._defineTag({
	        tagName: '@defaultValue',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.BlockTag,
	        standardization: "Extended" /* Extended */
	    });
	    /**
	     * (Extended)
	     *
	     * When applied to a class or interface property, this indicates that the property
	     * returns an event object that event handlers can be attached to.  The event-handling
	     * API is implementation-defined, but typically the property return type would be a class
	     * with members such as `addHandler()` and `removeHandler()`.  A documentation tool can
	     * display such properties under an "Events" heading instead of the usual "Properties" heading.
	     */
	    StandardTags.eventProperty = StandardTags._defineTag({
	        tagName: '@eventProperty',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.ModifierTag,
	        standardization: "Extended" /* Extended */
	    });
	    /**
	     * (Extended)
	     *
	     * Indicates a documentation section that should be presented as an example
	     * illustrating how to use the API.  It may include a code sample.
	     */
	    StandardTags.example = StandardTags._defineTag({
	        tagName: '@example',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.BlockTag,
	        allowMultiple: true,
	        standardization: "Extended" /* Extended */
	    });
	    /**
	     * (Discretionary)
	     *
	     * Suggested meaning:  Same semantics as `@beta`, but used by tools that don't support
	     * an `@alpha` release stage.
	     *
	     * Example implementations: Angular API documenter
	     *
	     * Synonyms: `@beta`
	     */
	    StandardTags.experimental = StandardTags._defineTag({
	        tagName: '@experimental',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.ModifierTag,
	        standardization: "Discretionary" /* Discretionary */
	    });
	    /**
	     * (Extended)
	     *
	     * This inline tag is used to automatically generate an API item's documentation by
	     * copying it from another API item.  The inline tag parameter contains a reference
	     * to the other item, which may be an unrelated class, or even an import from a
	     * separate NPM package.
	     *
	     * TODO: The notation for API item references is still being standardized.  See this issue:
	     * https://github.com/microsoft/tsdoc/issues/9
	     */
	    StandardTags.inheritDoc = StandardTags._defineTag({
	        tagName: '@inheritDoc',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.InlineTag,
	        standardization: "Extended" /* Extended */
	    });
	    /**
	     * (Discretionary)
	     *
	     * Suggested meaning:  Designates that an API item is not planned to be used by
	     * third-party developers.  The tooling may trim the declaration from a public release.
	     * In some implementations, certain designated packages may be allowed to consume
	     * internal API items, e.g. because the packages are components of the same product.
	     *
	     * Example implementations: API Extractor
	     */
	    StandardTags.internal = StandardTags._defineTag({
	        tagName: '@internal',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.ModifierTag,
	        standardization: "Discretionary" /* Discretionary */
	    });
	    /**
	     * (Core)
	     *
	     * The `{@label}` inline tag is used to label a declaration, so that it can be referenced
	     * using a selector in the TSDoc declaration reference notation.
	     *
	     * TODO: The `{@label}` notation is still being standardized.  See this issue:
	     * https://github.com/microsoft/tsdoc/issues/9
	     */
	    StandardTags.label = StandardTags._defineTag({
	        tagName: '@label',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.InlineTag,
	        standardization: "Core" /* Core */
	    });
	    /**
	     * (Core)
	     *
	     * The `{@link}` inline tag is used to create hyperlinks to other pages in a
	     * documentation system or general internet URLs.  In particular, it supports
	     * expressions for referencing API items.
	     *
	     * TODO: The `{@link}` notation is still being standardized.  See this issue:
	     * https://github.com/microsoft/tsdoc/issues/9
	     */
	    StandardTags.link = StandardTags._defineTag({
	        tagName: '@link',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.InlineTag,
	        allowMultiple: true,
	        standardization: "Core" /* Core */
	    });
	    /**
	     * (Extended)
	     *
	     * This modifier has similar semantics to the `override` keyword in C# or Java.
	     * For a member function or property, explicitly indicates that this definition
	     * is overriding (i.e. redefining) the definition inherited from the base class.
	     * The base class definition would normally be marked as `virtual`.
	     *
	     * A documentation tool may enforce that the `@virtual`, `@override`, and/or `@sealed`
	     * modifiers are consistently applied, but this is not required by the TSDoc standard.
	     */
	    StandardTags.override = StandardTags._defineTag({
	        tagName: '@override',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.ModifierTag,
	        standardization: "Extended" /* Extended */
	    });
	    /**
	     * (Core)
	     *
	     * Used to indicate a doc comment that describes an entire NPM package (as opposed
	     * to an individual API item belonging to that package).  The `@packageDocumentation` comment
	     * is found in the *.d.ts file that acts as the entry point for the package, and it
	     * should be the first `/**` comment encountered in that file.  A comment containing a
	     * `@packageDocumentation` tag should never be used to describe an individual API item.
	     */
	    StandardTags.packageDocumentation = StandardTags._defineTag({
	        tagName: '@packageDocumentation',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.ModifierTag,
	        standardization: "Core" /* Core */
	    });
	    /**
	     * (Core)
	     *
	     * Used to document a function parameter.  The `@param` tag is followed by a parameter
	     * name, followed by a hyphen, followed by a description.  The TSDoc parser recognizes
	     * this syntax and will extract it into a DocParamBlock node.
	     */
	    StandardTags.param = StandardTags._defineTag({
	        tagName: '@param',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.BlockTag,
	        allowMultiple: true,
	        standardization: "Core" /* Core */
	    });
	    /**
	     * (Core)
	     *
	     * Starts a section of additional documentation content that is not intended for a
	     * public audience.  A tool must omit this entire section from the API reference web site,
	     * generated *.d.ts file, and any other outputs incorporating the content.
	     */
	    StandardTags.privateRemarks = StandardTags._defineTag({
	        tagName: '@privateRemarks',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.BlockTag,
	        standardization: "Core" /* Core */
	    });
	    /**
	     * (Discretionary)
	     *
	     * Suggested meaning: Designates that an API item's release stage is "public".
	     * It has been officially released to third-party developers, and its signature is
	     * guaranteed to be stable (e.g. following Semantic Versioning rules).
	     *
	     * Example implementations: API Extractor
	     */
	    StandardTags.public = StandardTags._defineTag({
	        tagName: '@public',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.ModifierTag,
	        standardization: "Discretionary" /* Discretionary */
	    });
	    /**
	     * (Extended)
	     *
	     * This modifier tag indicates that an API item should be documented as being read-only,
	     * even if the TypeScript type system may indicate otherwise.  For example, suppose a
	     * class property has a setter function that always throws an exception explaining that
	     * the property cannot be assigned; in this situation, the `@readonly` modifier can be
	     * added so that the property is shown as read-only in the documentation.
	     *
	     * Example implementations: API Extractor
	     */
	    StandardTags.readonly = StandardTags._defineTag({
	        tagName: '@readonly',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.ModifierTag,
	        standardization: "Extended" /* Extended */
	    });
	    /**
	     * (Core)
	     *
	     * The main documentation for an API item is separated into a brief "summary" section,
	     * optionally followed by a more detailed "remarks" section.  On a documentation web site,
	     * index pages (e.g. showing members of a class) will show only the brief summaries,
	     * whereas a detail pages (e.g. describing a single member) will show the summary followed
	     * by the remarks.  The `@remarks` block tag ends the summary section, and begins the
	     * remarks section for a doc comment.
	     */
	    StandardTags.remarks = StandardTags._defineTag({
	        tagName: '@remarks',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.BlockTag,
	        standardization: "Core" /* Core */
	    });
	    /**
	     * (Core)
	     *
	     * Used to document the return value for a function.
	     */
	    StandardTags.returns = StandardTags._defineTag({
	        tagName: '@returns',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.BlockTag,
	        standardization: "Core" /* Core */
	    });
	    /**
	     * (Extended)
	     *
	     * This modifier has similar semantics to the `sealed` keyword in C# or Java.
	     * For a class, indicates that subclasses must not inherit from the class.
	     * For a member function or property, indicates that subclasses must not override
	     * (i.e. redefine) the member.
	     *
	     * A documentation tool may enforce that the `@virtual`, `@override`, and/or `@sealed`
	     * modifiers are consistently applied, but this is not required by the TSDoc standard.
	     */
	    StandardTags.sealed = StandardTags._defineTag({
	        tagName: '@sealed',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.ModifierTag,
	        standardization: "Extended" /* Extended */
	    });
	    /**
	     * (Extended)
	     *
	     * Used to document an exception type that may be thrown by a function or property.
	     *
	     * @remarks
	     *
	     * A separate `@throws` block should be used to document each exception type.  This tag is for informational
	     * purposes only, and does not restrict other types from being thrown.  It is suggested, but not required,
	     * for the `@throws` block to start with a line containing only the name of the exception.
	     *
	     * For example:
	     *
	     * ```ts
	     * /**
	     *  * Retrieves metadata about a book from the catalog.
	     *  *
	     *  * @param isbnCode - the ISBN number for the book
	     *  * @returns the retrieved book object
	     *  *
	     *  * @throws {@link IsbnSyntaxError}
	     *  * This exception is thrown if the input is not a valid ISBN number.
	     *  *
	     *  * @throws {@link book-lib#BookNotFoundError}
	     *  * Thrown if the ISBN number is valid, but no such book exists in the catalog.
	     *  *
	     *  * @public
	     *  &#42;/
	     * function fetchBookByIsbn(isbnCode: string): Book;
	     * ```
	     */
	    StandardTags.throws = StandardTags._defineTag({
	        tagName: '@throws',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.BlockTag,
	        allowMultiple: true,
	        standardization: "Extended" /* Extended */
	    });
	    /**
	     * (Core)
	     *
	     * Used to document a generic parameter.  The `@typeParam` tag is followed by a parameter
	     * name, followed by a hyphen, followed by a description.  The TSDoc parser recognizes
	     * this syntax and will extract it into a DocParamBlock node.
	     */
	    StandardTags.typeParam = StandardTags._defineTag({
	        tagName: '@typeParam',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.BlockTag,
	        allowMultiple: true,
	        standardization: "Core" /* Core */
	    });
	    /**
	     * (Extended)
	     *
	     * This modifier has similar semantics to the `virtual` keyword in C# or Java.
	     * For a member function or property, explicitly indicates that subclasses may override
	     * (i.e. redefine) the member.
	     *
	     * A documentation tool may enforce that the `@virtual`, `@override`, and/or `@sealed`
	     * modifiers are consistently applied, but this is not required by the TSDoc standard.
	     */
	    StandardTags.virtual = StandardTags._defineTag({
	        tagName: '@virtual',
	        syntaxKind: TSDocTagDefinition_1.TSDocTagSyntaxKind.ModifierTag,
	        standardization: "Extended" /* Extended */
	    });
	    /**
	     * Returns the full list of all core tags.
	     */
	    StandardTags.allDefinitions = [
	        StandardTags.alpha,
	        StandardTags.beta,
	        StandardTags.deprecated,
	        StandardTags.defaultValue,
	        StandardTags.eventProperty,
	        StandardTags.example,
	        StandardTags.experimental,
	        StandardTags.inheritDoc,
	        StandardTags.internal,
	        StandardTags.label,
	        StandardTags.link,
	        StandardTags.override,
	        StandardTags.packageDocumentation,
	        StandardTags.param,
	        StandardTags.privateRemarks,
	        StandardTags.public,
	        StandardTags.readonly,
	        StandardTags.remarks,
	        StandardTags.returns,
	        StandardTags.sealed,
	        StandardTags.throws,
	        StandardTags.typeParam,
	        StandardTags.virtual
	    ];
	    return StandardTags;
	}());
	exports.StandardTags = StandardTags;

	});

	unwrapExports(StandardTags_1);
	var StandardTags_2 = StandardTags_1.StandardTags;

	var TSDocValidationConfiguration_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Part of the {@link TSDocConfiguration} object.
	 */
	var TSDocValidationConfiguration = /** @class */ (function () {
	    function TSDocValidationConfiguration() {
	        /**
	         * Set `ignoreUndefinedTags` to true to silently ignore unrecognized tags,
	         * instead of reporting a warning.
	         *
	         * @remarks
	         * Normally the parser will issue errors when it encounters tag names that do not
	         * have a corresponding definition in {@link TSDocConfiguration.tagDefinitions}.
	         * This helps to catch common mistakes such as a misspelled tag.
	         *
	         * @defaultValue `false`
	         */
	        this.ignoreUndefinedTags = false;
	        /**
	         * Set `reportUnsupportedTags` to true to issue a warning for tags that are not
	         * supported by your tool.
	         *
	         * @remarks
	         * The TSDoc standard defines may tags.  By default it assumes that if your tool does
	         * not implement one of these tags, then it will simply ignore it.  But sometimes this
	         * may be misleading for developers. (For example, they might write an `@example` block
	         * and then be surprised if it doesn't appear in the documentation output.).
	         *
	         * For a better experience, you can tell the parser which tags you support, and then it
	         * will issue warnings wherever unsupported tags are used.  This is done using
	         * {@link TSDocConfiguration.setSupportForTag}.  Note that calling that function
	         * automatically sets `reportUnsupportedTags` to true.
	         *
	         * @defaultValue `false`
	         */
	        this.reportUnsupportedTags = false;
	    }
	    return TSDocValidationConfiguration;
	}());
	exports.TSDocValidationConfiguration = TSDocValidationConfiguration;

	});

	unwrapExports(TSDocValidationConfiguration_1);
	var TSDocValidationConfiguration_2 = TSDocValidationConfiguration_1.TSDocValidationConfiguration;

	var BuiltInDocNodes_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var BuiltInDocNodes = /** @class */ (function () {
	    function BuiltInDocNodes() {
	    }
	    BuiltInDocNodes.register = function (configuration) {
	        var docNodeManager = configuration.docNodeManager;
	        docNodeManager.registerDocNodes('@microsoft/tsdoc', [
	            { docNodeKind: "Block" /* Block */, constructor: lib.DocBlock },
	            { docNodeKind: "BlockTag" /* BlockTag */, constructor: lib.DocBlockTag },
	            { docNodeKind: "CodeSpan" /* CodeSpan */, constructor: lib.DocCodeSpan },
	            { docNodeKind: "Comment" /* Comment */, constructor: lib.DocComment },
	            { docNodeKind: "DeclarationReference" /* DeclarationReference */, constructor: lib.DocDeclarationReference },
	            { docNodeKind: "ErrorText" /* ErrorText */, constructor: lib.DocErrorText },
	            { docNodeKind: "EscapedText" /* EscapedText */, constructor: lib.DocEscapedText },
	            { docNodeKind: "Excerpt" /* Excerpt */, constructor: lib.DocExcerpt },
	            { docNodeKind: "FencedCode" /* FencedCode */, constructor: lib.DocFencedCode },
	            { docNodeKind: "HtmlAttribute" /* HtmlAttribute */, constructor: lib.DocHtmlAttribute },
	            { docNodeKind: "HtmlEndTag" /* HtmlEndTag */, constructor: lib.DocHtmlEndTag },
	            { docNodeKind: "HtmlStartTag" /* HtmlStartTag */, constructor: lib.DocHtmlStartTag },
	            { docNodeKind: "InheritDocTag" /* InheritDocTag */, constructor: lib.DocInheritDocTag },
	            { docNodeKind: "InlineTag" /* InlineTag */, constructor: lib.DocInlineTag },
	            { docNodeKind: "LinkTag" /* LinkTag */, constructor: lib.DocLinkTag },
	            { docNodeKind: "MemberIdentifier" /* MemberIdentifier */, constructor: lib.DocMemberIdentifier },
	            { docNodeKind: "MemberReference" /* MemberReference */, constructor: lib.DocMemberReference },
	            { docNodeKind: "MemberSelector" /* MemberSelector */, constructor: lib.DocMemberSelector },
	            { docNodeKind: "MemberSymbol" /* MemberSymbol */, constructor: lib.DocMemberSymbol },
	            { docNodeKind: "Paragraph" /* Paragraph */, constructor: lib.DocParagraph },
	            { docNodeKind: "ParamBlock" /* ParamBlock */, constructor: lib.DocParamBlock },
	            { docNodeKind: "ParamCollection" /* ParamCollection */, constructor: lib.DocParamCollection },
	            { docNodeKind: "PlainText" /* PlainText */, constructor: lib.DocPlainText },
	            { docNodeKind: "Section" /* Section */, constructor: lib.DocSection },
	            { docNodeKind: "SoftBreak" /* SoftBreak */, constructor: lib.DocSoftBreak }
	        ]);
	        docNodeManager.registerAllowableChildren("Section" /* Section */, [
	            "FencedCode" /* FencedCode */,
	            "Paragraph" /* Paragraph */,
	            "HtmlStartTag" /* HtmlStartTag */,
	            "HtmlEndTag" /* HtmlEndTag */
	        ]);
	        docNodeManager.registerAllowableChildren("Paragraph" /* Paragraph */, [
	            "BlockTag" /* BlockTag */,
	            "CodeSpan" /* CodeSpan */,
	            "ErrorText" /* ErrorText */,
	            "EscapedText" /* EscapedText */,
	            "HtmlStartTag" /* HtmlStartTag */,
	            "HtmlEndTag" /* HtmlEndTag */,
	            "InlineTag" /* InlineTag */,
	            "LinkTag" /* LinkTag */,
	            "PlainText" /* PlainText */,
	            "SoftBreak" /* SoftBreak */
	        ]);
	    };
	    return BuiltInDocNodes;
	}());
	exports.BuiltInDocNodes = BuiltInDocNodes;

	});

	unwrapExports(BuiltInDocNodes_1);
	var BuiltInDocNodes_2 = BuiltInDocNodes_1.BuiltInDocNodes;

	var TSDocMessageId = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	// Exposed via TSDocConfiguration.allTsdocMessageIds()
	exports.allTsdocMessageIds = [
	    // To make comparisons easy, keep these in the same order as the enum above:
	    'tsdoc-config-file-not-found',
	    'tsdoc-config-unsupported-schema',
	    'tsdoc-config-schema-error',
	    'tsdoc-config-cyclic-extends',
	    'tsdoc-config-unresolved-extends',
	    'tsdoc-comment-not-found',
	    'tsdoc-comment-missing-opening-delimiter',
	    'tsdoc-comment-missing-closing-delimiter',
	    'tsdoc-extra-inheritdoc-tag',
	    'tsdoc-escape-right-brace',
	    'tsdoc-escape-greater-than',
	    'tsdoc-missing-deprecation-message',
	    'tsdoc-inheritdoc-incompatible-tag',
	    'tsdoc-inheritdoc-incompatible-summary',
	    'tsdoc-inline-tag-missing-braces',
	    'tsdoc-tag-should-not-have-braces',
	    'tsdoc-unsupported-tag',
	    'tsdoc-undefined-tag',
	    'tsdoc-param-tag-with-invalid-type',
	    'tsdoc-param-tag-with-invalid-optional-name',
	    'tsdoc-param-tag-with-invalid-name',
	    'tsdoc-param-tag-missing-hyphen',
	    'tsdoc-unnecessary-backslash',
	    'tsdoc-missing-tag',
	    'tsdoc-at-sign-in-word',
	    'tsdoc-at-sign-without-tag-name',
	    'tsdoc-malformed-inline-tag',
	    'tsdoc-characters-after-block-tag',
	    'tsdoc-malformed-tag-name',
	    'tsdoc-characters-after-inline-tag',
	    'tsdoc-inline-tag-missing-right-brace',
	    'tsdoc-inline-tag-unescaped-brace',
	    'tsdoc-inheritdoc-tag-syntax',
	    'tsdoc-link-tag-empty',
	    'tsdoc-link-tag-unescaped-text',
	    'tsdoc-link-tag-destination-syntax',
	    'tsdoc-link-tag-invalid-url',
	    'tsdoc-reference-missing-hash',
	    'tsdoc-reference-hash-syntax',
	    'tsdoc-reference-malformed-package-name',
	    'tsdoc-reference-malformed-import-path',
	    'tsdoc-missing-reference',
	    'tsdoc-reference-missing-dot',
	    'tsdoc-reference-selector-missing-parens',
	    'tsdoc-reference-missing-colon',
	    'tsdoc-reference-missing-right-paren',
	    'tsdoc-reference-symbol-syntax',
	    'tsdoc-reference-missing-right-bracket',
	    'tsdoc-reference-missing-quote',
	    'tsdoc-reference-empty-identifier',
	    'tsdoc-reference-missing-identifier',
	    'tsdoc-reference-unquoted-identifier',
	    'tsdoc-reference-missing-label',
	    'tsdoc-reference-selector-syntax',
	    'tsdoc-html-tag-missing-greater-than',
	    'tsdoc-html-tag-missing-equals',
	    'tsdoc-html-tag-missing-string',
	    'tsdoc-html-string-missing-quote',
	    'tsdoc-text-after-html-string',
	    'tsdoc-missing-html-end-tag',
	    'tsdoc-malformed-html-name',
	    'tsdoc-code-fence-opening-indent',
	    'tsdoc-code-fence-specifier-syntax',
	    'tsdoc-code-fence-closing-indent',
	    'tsdoc-code-fence-missing-delimiter',
	    'tsdoc-code-fence-closing-syntax',
	    'tsdoc-code-span-empty',
	    'tsdoc-code-span-missing-delimiter'
	];
	exports.allTsdocMessageIds.sort();
	exports.allTsdocMessageIdsSet = new Set(exports.allTsdocMessageIds);

	});

	unwrapExports(TSDocMessageId);
	var TSDocMessageId_1 = TSDocMessageId.allTsdocMessageIds;
	var TSDocMessageId_2 = TSDocMessageId.allTsdocMessageIdsSet;

	var TSDocConfiguration_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	/**
	 * Configuration for the TSDocParser.
	 */
	var TSDocConfiguration = /** @class */ (function () {
	    function TSDocConfiguration() {
	        this._tagDefinitions = [];
	        this._tagDefinitionsByName = new Map();
	        this._supportedTagDefinitions = new Set();
	        this._validation = new TSDocValidationConfiguration_1.TSDocValidationConfiguration();
	        this._docNodeManager = new DocNodeManager_1.DocNodeManager();
	        // Define all the standard tags
	        this.addTagDefinitions(StandardTags_1.StandardTags.allDefinitions);
	        // Register the built-in node kinds
	        BuiltInDocNodes_1.BuiltInDocNodes.register(this);
	    }
	    Object.defineProperty(TSDocConfiguration.prototype, "tagDefinitions", {
	        /**
	         * The TSDoc tags that are defined in this configuration.
	         *
	         * @remarks
	         * The subset of "supported" tags is tracked by {@link TSDocConfiguration.supportedTagDefinitions}.
	         */
	        get: function () {
	            return this._tagDefinitions;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TSDocConfiguration.prototype, "supportedTagDefinitions", {
	        /**
	         * Returns the subset of {@link TSDocConfiguration.tagDefinitions}
	         * that are supported in this configuration.
	         *
	         * @remarks
	         * This property is only used when
	         * {@link TSDocValidationConfiguration.reportUnsupportedTags} is enabled.
	         */
	        get: function () {
	            var _this = this;
	            return this.tagDefinitions.filter(function (x) { return _this.isTagSupported(x); });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TSDocConfiguration.prototype, "validation", {
	        /**
	         * Enable/disable validation checks performed by the parser.
	         */
	        get: function () {
	            return this._validation;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TSDocConfiguration.prototype, "docNodeManager", {
	        /**
	         * Register custom DocNode subclasses.
	         */
	        get: function () {
	            return this._docNodeManager;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Return the tag that was defined with the specified name, or undefined
	     * if not found.
	     */
	    TSDocConfiguration.prototype.tryGetTagDefinition = function (tagName) {
	        return this._tagDefinitionsByName.get(tagName.toUpperCase());
	    };
	    /**
	     * Return the tag that was defined with the specified name, or undefined
	     * if not found.
	     */
	    TSDocConfiguration.prototype.tryGetTagDefinitionWithUpperCase = function (alreadyUpperCaseTagName) {
	        return this._tagDefinitionsByName.get(alreadyUpperCaseTagName);
	    };
	    /**
	     * Define a new TSDoc tag to be recognized by the TSDocParser, and mark it as unsupported.
	     * Use {@link TSDocConfiguration.setSupportForTag} to mark it as supported.
	     *
	     * @remarks
	     * If a tag is "defined" this means that the parser recognizes it and understands its syntax.
	     * Whereas if a tag is "supported", this means it is defined AND the application implements the tag.
	     */
	    TSDocConfiguration.prototype.addTagDefinition = function (tagDefinition) {
	        var existingDefinition = this._tagDefinitionsByName.get(tagDefinition.tagNameWithUpperCase);
	        if (existingDefinition === tagDefinition) {
	            return;
	        }
	        if (existingDefinition) {
	            throw new Error("A tag is already defined using the name " + existingDefinition.tagName);
	        }
	        this._tagDefinitions.push(tagDefinition);
	        this._tagDefinitionsByName.set(tagDefinition.tagNameWithUpperCase, tagDefinition);
	    };
	    /**
	     * Calls {@link TSDocConfiguration.addTagDefinition} for a list of definitions,
	     * and optionally marks them as supported.
	     * @param tagDefinitions - the definitions to be added
	     * @param supported - if specified, calls the {@link TSDocConfiguration.setSupportForTag}
	     *    method to mark the definitions as supported or unsupported
	     */
	    TSDocConfiguration.prototype.addTagDefinitions = function (tagDefinitions, supported) {
	        for (var _i = 0, tagDefinitions_1 = tagDefinitions; _i < tagDefinitions_1.length; _i++) {
	            var tagDefinition = tagDefinitions_1[_i];
	            this.addTagDefinition(tagDefinition);
	            if (supported !== undefined) {
	                this.setSupportForTag(tagDefinition, supported);
	            }
	        }
	    };
	    /**
	     * Returns true if the tag is supported in this configuration.
	     */
	    TSDocConfiguration.prototype.isTagSupported = function (tagDefinition) {
	        this._requireTagToBeDefined(tagDefinition);
	        return this._supportedTagDefinitions.has(tagDefinition);
	    };
	    /**
	     * Specifies whether the tag definition is supported in this configuration.
	     * The parser may issue warnings for unsupported tags.
	     *
	     * @remarks
	     * If a tag is "defined" this means that the parser recognizes it and understands its syntax.
	     * Whereas if a tag is "supported", this means it is defined AND the application implements the tag.
	     *
	     * This function automatically sets {@link TSDocValidationConfiguration.reportUnsupportedTags}
	     * to true.
	     */
	    TSDocConfiguration.prototype.setSupportForTag = function (tagDefinition, supported) {
	        this._requireTagToBeDefined(tagDefinition);
	        if (supported) {
	            this._supportedTagDefinitions.add(tagDefinition);
	        }
	        else {
	            this._supportedTagDefinitions.delete(tagDefinition);
	        }
	        this.validation.reportUnsupportedTags = true;
	    };
	    /**
	     * Calls {@link TSDocConfiguration.setSupportForTag} for multiple tag definitions.
	     */
	    TSDocConfiguration.prototype.setSupportForTags = function (tagDefinitions, supported) {
	        for (var _i = 0, tagDefinitions_2 = tagDefinitions; _i < tagDefinitions_2.length; _i++) {
	            var tagDefinition = tagDefinitions_2[_i];
	            this.setSupportForTag(tagDefinition, supported);
	        }
	    };
	    /**
	     * Returns true if the specified {@link TSDocMessageId} string is implemented by this release of the TSDoc parser.
	     * This can be used to detect misspelled identifiers.
	     *
	     * @privateRemarks
	     *
	     * Why this API is associated with TSDocConfiguration:  In the future, if we enable support for custom extensions
	     * of the TSDoc parser, we may provide a way to register custom message identifiers.
	     */
	    TSDocConfiguration.prototype.isKnownMessageId = function (messageId) {
	        return TSDocMessageId.allTsdocMessageIdsSet.has(messageId);
	    };
	    Object.defineProperty(TSDocConfiguration.prototype, "allTsdocMessageIds", {
	        /**
	         * Returns the list of {@link TSDocMessageId} strings that are implemented by this release of the TSDoc parser.
	         *
	         * @privateRemarks
	         *
	         * Why this API is associated with TSDocConfiguration:  In the future, if we enable support for custom extensions
	         * of the TSDoc parser, we may provide a way to register custom message identifiers.
	         */
	        get: function () {
	            return TSDocMessageId.allTsdocMessageIds;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TSDocConfiguration.prototype._requireTagToBeDefined = function (tagDefinition) {
	        var matching = this._tagDefinitionsByName.get(tagDefinition.tagNameWithUpperCase);
	        if (matching) {
	            if (matching === tagDefinition) {
	                return;
	            }
	        }
	        throw new Error('The specified TSDocTagDefinition is not defined for this TSDocConfiguration');
	    };
	    return TSDocConfiguration;
	}());
	exports.TSDocConfiguration = TSDocConfiguration;

	});

	unwrapExports(TSDocConfiguration_1);
	var TSDocConfiguration_2 = TSDocConfiguration_1.TSDocConfiguration;

	var ModifierTagSet_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Represents a set of modifier tags that were extracted from a doc comment.
	 *
	 * @remarks
	 * TSDoc modifier tags are block tags that do not have any associated rich text content.
	 * Instead, their presence or absence acts as an on/off switch, indicating some aspect
	 * of the underlying API item.  For example, the `@internal` modifier indicates that a
	 * signature is internal (i.e. not part of the public API contract).
	 */
	var ModifierTagSet = /** @class */ (function () {
	    function ModifierTagSet() {
	        this._nodes = [];
	        // NOTE: To implement case insensitivity, the keys in this set are always upper-case.
	        // This convention makes the normalization more obvious (and as a general practice handles
	        // the Turkish "i" character correctly).
	        this._nodesByName = new Map();
	    }
	    Object.defineProperty(ModifierTagSet.prototype, "nodes", {
	        /**
	         * The original block tag nodes that defined the modifiers in this set, excluding duplicates.
	         */
	        get: function () {
	            return this._nodes;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Returns true if the set contains a DocBlockTag with the specified tag name.
	     * Note that synonyms are not considered.  The comparison is case-insensitive.
	     * @param modifierTagName - The name of the tag, including the `@` prefix  For example, `@internal`
	     */
	    ModifierTagSet.prototype.hasTagName = function (modifierTagName) {
	        return this._nodesByName.has(modifierTagName.toUpperCase());
	    };
	    /**
	     * Returns true if the set contains a DocBlockTag matching the specified tag definition.
	     * Note that synonyms are not considered.  The comparison is case-insensitive.
	     * The TSDocTagDefinition must be a modifier tag.
	     * @param tagName - The name of the tag, including the `@` prefix  For example, `@internal`
	     */
	    ModifierTagSet.prototype.hasTag = function (modifierTagDefinition) {
	        return !!this.tryGetTag(modifierTagDefinition);
	    };
	    /**
	     * Returns a DocBlockTag matching the specified tag definition, or undefined if no such
	     * tag was added to the set.  If there were multiple instances, returned object will be
	     * the first one to be added.
	     */
	    ModifierTagSet.prototype.tryGetTag = function (modifierTagDefinition) {
	        if (modifierTagDefinition.syntaxKind !== TSDocTagDefinition_1.TSDocTagSyntaxKind.ModifierTag) {
	            throw new Error('The tag definition is not a modifier tag');
	        }
	        return this._nodesByName.get(modifierTagDefinition.tagNameWithUpperCase);
	    };
	    /**
	     * Adds a new modifier tag to the set.  If a tag already exists with the same name,
	     * then no change is made, and the return value is false.
	     */
	    ModifierTagSet.prototype.addTag = function (blockTag) {
	        if (this._nodesByName.has(blockTag.tagNameWithUpperCase)) {
	            return false;
	        }
	        this._nodesByName.set(blockTag.tagNameWithUpperCase, blockTag);
	        this._nodes.push(blockTag);
	        return true;
	    };
	    return ModifierTagSet;
	}());
	exports.ModifierTagSet = ModifierTagSet;

	});

	unwrapExports(ModifierTagSet_1);
	var ModifierTagSet_2 = ModifierTagSet_1.ModifierTagSet;

	var StandardModifierTagSet_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Extends the ModifierTagSet base class with getters for modifiers that
	 * are part of the standardized core tags for TSDoc.
	 */
	var StandardModifierTagSet = /** @class */ (function (_super) {
	    __extends(StandardModifierTagSet, _super);
	    function StandardModifierTagSet() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    /**
	     * Returns true if the `@alpha` modifier tag was specified.
	     */
	    StandardModifierTagSet.prototype.isAlpha = function () {
	        return this.hasTag(StandardTags_1.StandardTags.alpha);
	    };
	    /**
	     * Returns true if the `@beta` modifier tag was specified.
	     */
	    StandardModifierTagSet.prototype.isBeta = function () {
	        return this.hasTag(StandardTags_1.StandardTags.beta);
	    };
	    /**
	     * Returns true if the `@eventProperty` modifier tag was specified.
	     */
	    StandardModifierTagSet.prototype.isEventProperty = function () {
	        return this.hasTag(StandardTags_1.StandardTags.eventProperty);
	    };
	    /**
	     * Returns true if the `@experimental` modifier tag was specified.
	     */
	    StandardModifierTagSet.prototype.isExperimental = function () {
	        return this.hasTag(StandardTags_1.StandardTags.experimental);
	    };
	    /**
	     * Returns true if the `@internal` modifier tag was specified.
	     */
	    StandardModifierTagSet.prototype.isInternal = function () {
	        return this.hasTag(StandardTags_1.StandardTags.internal);
	    };
	    /**
	     * Returns true if the `@override` modifier tag was specified.
	     */
	    StandardModifierTagSet.prototype.isOverride = function () {
	        return this.hasTag(StandardTags_1.StandardTags.override);
	    };
	    /**
	     * Returns true if the `@packageDocumentation` modifier tag was specified.
	     */
	    StandardModifierTagSet.prototype.isPackageDocumentation = function () {
	        return this.hasTag(StandardTags_1.StandardTags.packageDocumentation);
	    };
	    /**
	     * Returns true if the `@public` modifier tag was specified.
	     */
	    StandardModifierTagSet.prototype.isPublic = function () {
	        return this.hasTag(StandardTags_1.StandardTags.public);
	    };
	    /**
	     * Returns true if the `@readonly` modifier tag was specified.
	     */
	    StandardModifierTagSet.prototype.isReadonly = function () {
	        return this.hasTag(StandardTags_1.StandardTags.readonly);
	    };
	    /**
	     * Returns true if the `@sealed` modifier tag was specified.
	     */
	    StandardModifierTagSet.prototype.isSealed = function () {
	        return this.hasTag(StandardTags_1.StandardTags.sealed);
	    };
	    /**
	     * Returns true if the `@virtual` modifier tag was specified.
	     */
	    StandardModifierTagSet.prototype.isVirtual = function () {
	        return this.hasTag(StandardTags_1.StandardTags.virtual);
	    };
	    return StandardModifierTagSet;
	}(ModifierTagSet_1.ModifierTagSet));
	exports.StandardModifierTagSet = StandardModifierTagSet;

	});

	unwrapExports(StandardModifierTagSet_1);
	var StandardModifierTagSet_2 = StandardModifierTagSet_1.StandardModifierTagSet;

	var DocNode_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * The base class for the parser's Abstract Syntax Tree nodes.
	 */
	var DocNode = /** @class */ (function () {
	    function DocNode(parameters) {
	        this.configuration = parameters.configuration;
	    }
	    /**
	     * Returns the list of child nodes for this node.  This is useful for visitors that want
	     * to scan the tree looking for nodes of a specific type, without having to process
	     * intermediary nodes.
	     */
	    DocNode.prototype.getChildNodes = function () {
	        // Do this sanity check here, since the constructor cannot access abstract members
	        this.configuration.docNodeManager.throwIfNotRegisteredKind(this.kind);
	        return this.onGetChildNodes().filter(function (x) { return x !== undefined; });
	    };
	    /**
	     * Overridden by child classes to implement {@link DocNode.getChildNodes}.
	     * @virtual
	     */
	    DocNode.prototype.onGetChildNodes = function () {
	        return [];
	    };
	    /**
	     * A type guard that returns true if the input uses the `IDocNodeParsedParameters` (parser scenario).
	     *
	     * @remarks
	     * There are two scenarios for constructing `DocNode` objects.  The "builder scenario" constructs the object based on
	     * literal strings, does NOT create DocExcerpt child nodes, and generally uses the {@link IDocNodeParameters}
	     * hierarchy for its constructor parameters.  The "parser scenario" constructs the object by parsing a TypeScript
	     * source file, does create DocExcerpt child nodes, and generally uses the {@link IDocNodeParsedParameters} hierarchy.
	     */
	    DocNode.isParsedParameters = function (parameters) {
	        return parameters.parsed === true;
	    };
	    return DocNode;
	}());
	exports.DocNode = DocNode;

	});

	unwrapExports(DocNode_1);
	var DocNode_2 = DocNode_1.DocNode;

	var DocNodeContainer_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * DocNodeContainer is the base class for DocNode classes that allow arbitrary child nodes to be added by the consumer.
	 * The child classes are {@link DocParagraph} and {@link DocSection}.
	 */
	var DocNodeContainer = /** @class */ (function (_super) {
	    __extends(DocNodeContainer, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocNodeContainer(parameters, childNodes) {
	        var _this = _super.call(this, parameters) || this;
	        _this._nodes = [];
	        if (childNodes !== undefined && childNodes.length > 0) {
	            _this.appendNodes(childNodes);
	        }
	        return _this;
	    }
	    Object.defineProperty(DocNodeContainer.prototype, "nodes", {
	        /**
	         * The nodes that were added to this container.
	         */
	        get: function () {
	            return this._nodes;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Append a node to the container.
	     */
	    DocNodeContainer.prototype.appendNode = function (docNode) {
	        if (!this.configuration.docNodeManager.isAllowedChild(this.kind, docNode.kind)) {
	            throw new Error("The TSDocConfiguration does not allow a " + this.kind + " node to"
	                + (" contain a node of type " + docNode.kind));
	        }
	        this._nodes.push(docNode);
	    };
	    /**
	     * Append nodes to the container.
	     */
	    DocNodeContainer.prototype.appendNodes = function (docNodes) {
	        for (var _i = 0, docNodes_1 = docNodes; _i < docNodes_1.length; _i++) {
	            var docNode = docNodes_1[_i];
	            this.appendNode(docNode);
	        }
	    };
	    /**
	     * Remove all nodes from the container.
	     */
	    DocNodeContainer.prototype.clearNodes = function () {
	        this._nodes.length = 0;
	    };
	    /** @override */
	    DocNodeContainer.prototype.onGetChildNodes = function () {
	        return this._nodes;
	    };
	    return DocNodeContainer;
	}(DocNode_1.DocNode));
	exports.DocNodeContainer = DocNodeContainer;

	});

	unwrapExports(DocNodeContainer_1);
	var DocNodeContainer_2 = DocNodeContainer_1.DocNodeContainer;

	var DocParagraph_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Represents a paragraph of text, similar to a `<p>` element in HTML.
	 * Like CommonMark, the TSDoc syntax uses blank lines to delineate paragraphs
	 * instead of explicitly notating them.
	 */
	var DocParagraph = /** @class */ (function (_super) {
	    __extends(DocParagraph, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocParagraph(parameters, childNodes) {
	        return _super.call(this, parameters, childNodes) || this;
	    }
	    Object.defineProperty(DocParagraph.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "Paragraph" /* Paragraph */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return DocParagraph;
	}(DocNodeContainer_1.DocNodeContainer));
	exports.DocParagraph = DocParagraph;

	});

	unwrapExports(DocParagraph_1);
	var DocParagraph_2 = DocParagraph_1.DocParagraph;

	var DocSection_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Represents a general block of rich text.
	 */
	var DocSection = /** @class */ (function (_super) {
	    __extends(DocSection, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocSection(parameters, childNodes) {
	        return _super.call(this, parameters, childNodes) || this;
	    }
	    Object.defineProperty(DocSection.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "Section" /* Section */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * If the last item in DocSection.nodes is not a DocParagraph, a new paragraph
	     * is started.  Either way, the provided docNode will be appended to the paragraph.
	     */
	    DocSection.prototype.appendNodeInParagraph = function (docNode) {
	        var paragraphNode = undefined;
	        if (this.nodes.length > 0) {
	            var lastNode = this.nodes[this.nodes.length - 1];
	            if (lastNode.kind === "Paragraph" /* Paragraph */) {
	                paragraphNode = lastNode;
	            }
	        }
	        if (!paragraphNode) {
	            paragraphNode = new DocParagraph_1.DocParagraph({ configuration: this.configuration });
	            this.appendNode(paragraphNode);
	        }
	        paragraphNode.appendNode(docNode);
	    };
	    DocSection.prototype.appendNodesInParagraph = function (docNodes) {
	        for (var _i = 0, docNodes_1 = docNodes; _i < docNodes_1.length; _i++) {
	            var docNode = docNodes_1[_i];
	            this.appendNodeInParagraph(docNode);
	        }
	    };
	    return DocSection;
	}(DocNodeContainer_1.DocNodeContainer));
	exports.DocSection = DocSection;

	});

	unwrapExports(DocSection_1);
	var DocSection_2 = DocSection_1.DocSection;

	var DocBlock_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Represents a section that is introduced by a TSDoc block tag.
	 * For example, an `@example` block.
	 */
	var DocBlock = /** @class */ (function (_super) {
	    __extends(DocBlock, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocBlock(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        _this._blockTag = parameters.blockTag;
	        _this._content = new DocSection_1.DocSection({ configuration: _this.configuration });
	        return _this;
	    }
	    Object.defineProperty(DocBlock.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "Block" /* Block */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocBlock.prototype, "blockTag", {
	        /**
	         * The TSDoc tag that introduces this section.
	         */
	        get: function () {
	            return this._blockTag;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocBlock.prototype, "content", {
	        /**
	         * The TSDoc tag that introduces this section.
	         */
	        get: function () {
	            return this._content;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocBlock.prototype.onGetChildNodes = function () {
	        return [this.blockTag, this._content];
	    };
	    return DocBlock;
	}(DocNode_1.DocNode));
	exports.DocBlock = DocBlock;

	});

	unwrapExports(DocBlock_1);
	var DocBlock_2 = DocBlock_1.DocBlock;

	var Token_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Distinguishes different types of Token objects.
	 */
	var TokenKind;
	(function (TokenKind) {
	    /**
	     * A token representing the end of the input.  The Token.range will be an empty range
	     * at the end of the provided input.
	     */
	    TokenKind[TokenKind["EndOfInput"] = 2001] = "EndOfInput";
	    /**
	     * A token representing a virtual newline.
	     * The Token.range will be an empty range, because the actual newline character may
	     * be noncontiguous due to the doc comment delimiter trimming.
	     */
	    TokenKind[TokenKind["Newline"] = 2002] = "Newline";
	    /**
	     * A token representing one or more spaces and tabs (but not newlines or end of input).
	     */
	    TokenKind[TokenKind["Spacing"] = 2003] = "Spacing";
	    /**
	     * A token representing one or more ASCII letters, numbers, and underscores.
	     */
	    TokenKind[TokenKind["AsciiWord"] = 2004] = "AsciiWord";
	    /**
	     * A single ASCII character that behaves like punctuation, e.g. doesn't need whitespace
	     * around it when adjacent to a letter.  The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["OtherPunctuation"] = 2005] = "OtherPunctuation";
	    /**
	     * A token representing a sequence of non-ASCII printable characters that are not punctuation.
	     */
	    TokenKind[TokenKind["Other"] = 2006] = "Other";
	    /**
	     * The backslash character `\`.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["Backslash"] = 2007] = "Backslash";
	    /**
	     * The less-than character `<`.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["LessThan"] = 2008] = "LessThan";
	    /**
	     * The greater-than character `>`.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["GreaterThan"] = 2009] = "GreaterThan";
	    /**
	     * The equals character `=`.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["Equals"] = 2010] = "Equals";
	    /**
	     * The single-quote character `'`.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["SingleQuote"] = 2011] = "SingleQuote";
	    /**
	     * The double-quote character `"`.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["DoubleQuote"] = 2012] = "DoubleQuote";
	    /**
	     * The slash character `/`.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["Slash"] = 2013] = "Slash";
	    /**
	     * The hyphen character `-`.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["Hyphen"] = 2014] = "Hyphen";
	    /**
	     * The at-sign character `@`.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["AtSign"] = 2015] = "AtSign";
	    /**
	     * The left curly bracket character `{`.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["LeftCurlyBracket"] = 2016] = "LeftCurlyBracket";
	    /**
	     * The right curly bracket character `}`.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["RightCurlyBracket"] = 2017] = "RightCurlyBracket";
	    /**
	     * The backtick character.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["Backtick"] = 2018] = "Backtick";
	    /**
	     * The period character.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["Period"] = 2019] = "Period";
	    /**
	     * The colon character.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["Colon"] = 2020] = "Colon";
	    /**
	     * The comma character.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["Comma"] = 2021] = "Comma";
	    /**
	     * The left square bracket character.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["LeftSquareBracket"] = 2022] = "LeftSquareBracket";
	    /**
	     * The right square bracket character.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["RightSquareBracket"] = 2023] = "RightSquareBracket";
	    /**
	     * The pipe character `|`.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["Pipe"] = 2024] = "Pipe";
	    /**
	     * The left parenthesis character.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["LeftParenthesis"] = 2025] = "LeftParenthesis";
	    /**
	     * The right parenthesis character.
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["RightParenthesis"] = 2026] = "RightParenthesis";
	    /**
	     * The pound character ("#").
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["PoundSymbol"] = 2027] = "PoundSymbol";
	    /**
	     * The plus character ("+").
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["Plus"] = 2028] = "Plus";
	    /**
	     * The dollar sign character ("$").
	     * The Token.range will always be a string of length 1.
	     */
	    TokenKind[TokenKind["DollarSign"] = 2029] = "DollarSign";
	})(TokenKind = exports.TokenKind || (exports.TokenKind = {}));
	/**
	 * Represents a contiguous range of characters extracted from one of the doc comment lines
	 * being processed by the Tokenizer.  There is a token representing a newline, but otherwise
	 * a single token cannot span multiple lines.
	 */
	var Token = /** @class */ (function () {
	    function Token(kind, range, line) {
	        this.kind = kind;
	        this.range = range;
	        this.line = line;
	    }
	    Token.prototype.toString = function () {
	        if (this.kind === TokenKind.Newline) {
	            return '\n';
	        }
	        return this.range.toString();
	    };
	    return Token;
	}());
	exports.Token = Token;

	});

	unwrapExports(Token_1);
	var Token_2 = Token_1.TokenKind;
	var Token_3 = Token_1.Token;

	var DocExcerpt_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Represents a parsed token sequence.
	 *
	 * @remarks
	 * When a `DocNode` is created by parsing a doc comment, it will have `DocExcerpt` child nodes corresponding to
	 * the parsed syntax elements such as names, keywords, punctuation, and spaces.  These excerpts indicate the original
	 * coordinates of the syntax element, and thus can be used for syntax highlighting and precise error reporting.
	 * They could also be used to rewrite specific words in a source file (e.g. renaming a parameter) without disturbing
	 * any other characters in the file.
	 *
	 * Every parsed character will correspond to at most one DocExcerpt object.  In other words, excerpts never overlap.
	 * A given excerpt can span multiple comment lines, and it may contain gaps, for example to skip the `*` character
	 * that starts a new TSDoc comment line.
	 */
	var DocExcerpt = /** @class */ (function (_super) {
	    __extends(DocExcerpt, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocExcerpt(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (parameters.excerptKind === "Spacing" /* Spacing */) {
	            for (var _i = 0, _a = parameters.content.tokens; _i < _a.length; _i++) {
	                var token = _a[_i];
	                switch (token.kind) {
	                    case Token_1.TokenKind.Spacing:
	                    case Token_1.TokenKind.Newline:
	                    case Token_1.TokenKind.EndOfInput:
	                        break;
	                    default:
	                        throw new Error("The excerptKind=Spacing but the range contains a non-whitespace token");
	                }
	            }
	        }
	        _this._excerptKind = parameters.excerptKind;
	        _this._content = parameters.content;
	        return _this;
	    }
	    Object.defineProperty(DocExcerpt.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "Excerpt" /* Excerpt */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocExcerpt.prototype, "excerptKind", {
	        /**
	         * Indicates the kind of DocExcerpt.
	         */
	        get: function () {
	            return this._excerptKind;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocExcerpt.prototype, "content", {
	        /**
	         * The input token sequence corresponding to this excerpt.
	         * @remarks
	         * Note that a token sequence can span multiple input lines and may contain gaps, for example to skip the `*`
	         * character that starts a new TSDoc comment line.
	         */
	        get: function () {
	            return this._content;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return DocExcerpt;
	}(DocNode_1.DocNode));
	exports.DocExcerpt = DocExcerpt;

	});

	unwrapExports(DocExcerpt_1);
	var DocExcerpt_2 = DocExcerpt_1.DocExcerpt;

	var DocBlockTag_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * Represents a TSDoc block tag such as `@param` or `@public`.
	 */
	var DocBlockTag = /** @class */ (function (_super) {
	    __extends(DocBlockTag, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocBlockTag(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        StringChecks_1.StringChecks.validateTSDocTagName(parameters.tagName);
	        _this._tagName = parameters.tagName;
	        _this._tagNameWithUpperCase = parameters.tagName.toUpperCase();
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            _this._tagNameExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "BlockTag" /* BlockTag */,
	                content: parameters.tagNameExcerpt
	            });
	        }
	        return _this;
	    }
	    Object.defineProperty(DocBlockTag.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "BlockTag" /* BlockTag */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocBlockTag.prototype, "tagName", {
	        /**
	         * The TSDoc tag name.  TSDoc tag names start with an at-sign ("@") followed
	         * by ASCII letters using "camelCase" capitalization.
	         */
	        get: function () {
	            return this._tagName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocBlockTag.prototype, "tagNameWithUpperCase", {
	        /**
	         * The TSDoc tag name in all capitals, which is used for performing
	         * case-insensitive comparisons or lookups.
	         */
	        get: function () {
	            return this._tagNameWithUpperCase;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocBlockTag.prototype.onGetChildNodes = function () {
	        return [
	            this._tagNameExcerpt
	        ];
	    };
	    DocBlockTag.prototype.getTokenSequence = function () {
	        if (!this._tagNameExcerpt) {
	            throw new Error('DocBlockTag.getTokenSequence() failed because this object did not'
	                + ' originate from a parsed input');
	        }
	        return this._tagNameExcerpt.content;
	    };
	    return DocBlockTag;
	}(DocNode_1.DocNode));
	exports.DocBlockTag = DocBlockTag;

	});

	unwrapExports(DocBlockTag_1);
	var DocBlockTag_2 = DocBlockTag_1.DocBlockTag;

	var DocCodeSpan_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Represents CommonMark-style code span, i.e. code surrounded by
	 * backtick characters.
	 */
	var DocCodeSpan = /** @class */ (function (_super) {
	    __extends(DocCodeSpan, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocCodeSpan(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            _this._openingDelimiterExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "CodeSpan_OpeningDelimiter" /* CodeSpan_OpeningDelimiter */,
	                content: parameters.openingDelimiterExcerpt
	            });
	            _this._codeExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "CodeSpan_Code" /* CodeSpan_Code */,
	                content: parameters.codeExcerpt
	            });
	            _this._closingDelimiterExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "CodeSpan_ClosingDelimiter" /* CodeSpan_ClosingDelimiter */,
	                content: parameters.closingDelimiterExcerpt
	            });
	        }
	        else {
	            _this._code = parameters.code;
	        }
	        return _this;
	    }
	    Object.defineProperty(DocCodeSpan.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "CodeSpan" /* CodeSpan */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocCodeSpan.prototype, "code", {
	        /**
	         * The text that should be rendered as code, excluding the backtick delimiters.
	         */
	        get: function () {
	            if (this._code === undefined) {
	                this._code = this._codeExcerpt.content.toString();
	            }
	            return this._code;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocCodeSpan.prototype.onGetChildNodes = function () {
	        return [
	            this._openingDelimiterExcerpt,
	            this._codeExcerpt,
	            this._closingDelimiterExcerpt
	        ];
	    };
	    return DocCodeSpan;
	}(DocNode_1.DocNode));
	exports.DocCodeSpan = DocCodeSpan;

	});

	unwrapExports(DocCodeSpan_1);
	var DocCodeSpan_2 = DocCodeSpan_1.DocCodeSpan;

	var StringBuilder_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * This class allows a large text string to be constructed incrementally by appending small chunks.  The final
	 * string can be obtained by calling StringBuilder.toString().
	 *
	 * @remarks
	 * A naive approach might use the `+=` operator to append strings:  This would have the downside of copying
	 * the entire string each time a chunk is appended, resulting in `O(n^2)` bytes of memory being allocated
	 * (and later freed by the garbage  collector), and many of the allocations could be very large objects.
	 * StringBuilder avoids this overhead by accumulating the chunks in an array, and efficiently joining them
	 * when `getText()` is finally called.
	 */
	var StringBuilder = /** @class */ (function () {
	    function StringBuilder() {
	        this._chunks = [];
	    }
	    /** {@inheritdoc IStringBuilder.append} */
	    StringBuilder.prototype.append = function (text) {
	        this._chunks.push(text);
	    };
	    /** {@inheritdoc IStringBuilder.toString} */
	    StringBuilder.prototype.toString = function () {
	        if (this._chunks.length === 0) {
	            return '';
	        }
	        if (this._chunks.length > 1) {
	            var joined = this._chunks.join('');
	            this._chunks.length = 1;
	            this._chunks[0] = joined;
	        }
	        return this._chunks[0];
	    };
	    return StringBuilder;
	}());
	exports.StringBuilder = StringBuilder;

	});

	unwrapExports(StringBuilder_1);
	var StringBuilder_2 = StringBuilder_1.StringBuilder;

	var DocParamCollection_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Represents a collection of DocParamBlock objects and provides efficient operations for looking up the
	 * documentation for a specified parameter name.
	 */
	var DocParamCollection = /** @class */ (function (_super) {
	    __extends(DocParamCollection, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocParamCollection(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        _this._blocks = [];
	        return _this;
	    }
	    Object.defineProperty(DocParamCollection.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "ParamCollection" /* ParamCollection */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Provide an iterator for callers that support it.
	     */
	    DocParamCollection.prototype[Symbol.iterator] = function () {
	        return this._blocks[Symbol.iterator]();
	    };
	    Object.defineProperty(DocParamCollection.prototype, "blocks", {
	        /**
	         * Returns the blocks in this collection.
	         */
	        get: function () {
	            return this._blocks;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocParamCollection.prototype, "count", {
	        /**
	         * Returns the number of blocks in this collection.
	         */
	        get: function () {
	            return this._blocks.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Adds a new block to the collection.
	     */
	    DocParamCollection.prototype.add = function (docParamBlock) {
	        this._blocks.push(docParamBlock);
	        // Allocate the map on demand, since most DocComment parameter collections will be empty
	        if (this._blocksByName === undefined) {
	            this._blocksByName = new Map();
	        }
	        // The first block to be added takes precedence
	        if (!this._blocksByName.has(docParamBlock.parameterName)) {
	            this._blocksByName.set(docParamBlock.parameterName, docParamBlock);
	        }
	    };
	    /**
	     * Removes all blocks from the collection
	     */
	    DocParamCollection.prototype.clear = function () {
	        this._blocks.length = 0;
	        this._blocksByName = undefined;
	    };
	    /**
	     * Returns the first block whose `parameterName` matches the specified string.
	     *
	     * @remarks
	     * If the collection was parsed from an input containing errors, there could potentially be more than
	     * one DocParamBlock with the same name.  In this situation, tryGetBlockByName() will return the first match
	     * that it finds.
	     *
	     * This lookup is optimized using a dictionary.
	     */
	    DocParamCollection.prototype.tryGetBlockByName = function (parameterName) {
	        if (this._blocksByName) {
	            return this._blocksByName.get(parameterName);
	        }
	        return undefined;
	    };
	    /** @override */
	    DocParamCollection.prototype.onGetChildNodes = function () {
	        return this._blocks;
	    };
	    return DocParamCollection;
	}(DocNode_1.DocNode));
	exports.DocParamCollection = DocParamCollection;

	});

	unwrapExports(DocParamCollection_1);
	var DocParamCollection_2 = DocParamCollection_1.DocParamCollection;

	var TrimSpacesTransform_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Implementation of DocNodeTransforms.trimSpacesInParagraphNodes()
	 */
	var TrimSpacesTransform = /** @class */ (function () {
	    function TrimSpacesTransform() {
	    }
	    TrimSpacesTransform.transform = function (docParagraph) {
	        var transformedNodes = [];
	        // Whether the next nonempty node to be added needs a space before it
	        var pendingSpace = false;
	        // The DocPlainText node that we're currently accumulating
	        var accumulatedTextChunks = [];
	        var accumulatedNodes = [];
	        // We always trim leading whitespace for a paragraph.  This flag gets set to true
	        // as soon as nonempty content is encountered.
	        var finishedSkippingLeadingSpaces = false;
	        for (var _i = 0, _a = docParagraph.nodes; _i < _a.length; _i++) {
	            var node = _a[_i];
	            switch (node.kind) {
	                case "PlainText" /* PlainText */:
	                    var docPlainText = node;
	                    var text = docPlainText.text;
	                    var startedWithSpace = /^\s/.test(text);
	                    var endedWithSpace = /\s$/.test(text);
	                    var collapsedText = text.replace(/\s+/g, ' ').trim();
	                    if (startedWithSpace && finishedSkippingLeadingSpaces) {
	                        pendingSpace = true;
	                    }
	                    if (collapsedText.length > 0) {
	                        if (pendingSpace) {
	                            accumulatedTextChunks.push(' ');
	                            pendingSpace = false;
	                        }
	                        accumulatedTextChunks.push(collapsedText);
	                        accumulatedNodes.push(node);
	                        finishedSkippingLeadingSpaces = true;
	                    }
	                    if (endedWithSpace && finishedSkippingLeadingSpaces) {
	                        pendingSpace = true;
	                    }
	                    break;
	                case "SoftBreak" /* SoftBreak */:
	                    if (finishedSkippingLeadingSpaces) {
	                        pendingSpace = true;
	                    }
	                    accumulatedNodes.push(node);
	                    break;
	                default:
	                    if (pendingSpace) {
	                        accumulatedTextChunks.push(' ');
	                        pendingSpace = false;
	                    }
	                    // Push the accumulated text
	                    if (accumulatedTextChunks.length > 0) {
	                        // TODO: We should probably track the accumulatedNodes somehow, e.g. so we can map them back to the
	                        // original excerpts.  But we need a developer scenario before we can design this API.
	                        transformedNodes.push(new nodes.DocPlainText({
	                            configuration: docParagraph.configuration,
	                            text: accumulatedTextChunks.join('')
	                        }));
	                        accumulatedTextChunks.length = 0;
	                        accumulatedNodes.length = 0;
	                    }
	                    transformedNodes.push(node);
	                    finishedSkippingLeadingSpaces = true;
	            }
	        }
	        // Push the accumulated text
	        if (accumulatedTextChunks.length > 0) {
	            transformedNodes.push(new nodes.DocPlainText({
	                configuration: docParagraph.configuration,
	                text: accumulatedTextChunks.join('')
	            }));
	            accumulatedTextChunks.length = 0;
	            accumulatedNodes.length = 0;
	        }
	        var transformedParagraph = new nodes.DocParagraph({ configuration: docParagraph.configuration });
	        transformedParagraph.appendNodes(transformedNodes);
	        return transformedParagraph;
	    };
	    return TrimSpacesTransform;
	}());
	exports.TrimSpacesTransform = TrimSpacesTransform;

	});

	unwrapExports(TrimSpacesTransform_1);
	var TrimSpacesTransform_2 = TrimSpacesTransform_1.TrimSpacesTransform;

	var DocNodeTransforms_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Helper functions that transform DocNode trees.
	 */
	var DocNodeTransforms = /** @class */ (function () {
	    function DocNodeTransforms() {
	    }
	    /**
	     * trimSpacesInParagraphNodes() collapses extra spacing characters from plain text nodes.
	     *
	     * @remark
	     * This is useful when emitting HTML, where any number of spaces are equivalent
	     * to a single space.  It's also useful when emitting Markdown, where spaces
	     * can be misinterpreted as an indented code block.
	     *
	     * For example, we might transform this:
	     *
	     * ```
	     * nodes: [
	     *   { kind: PlainText, text: "   Here   are some   " },
	     *   { kind: SoftBreak }
	     *   { kind: PlainText, text: "   words" },
	     *   { kind: SoftBreak }
	     *   { kind: InlineTag, text: "{\@inheritDoc}" },
	     *   { kind: PlainText, text: "to process." },
	     *   { kind: PlainText, text: "  " },
	     *   { kind: PlainText, text: "  " }
	     * ]
	     * ```
	     *
	     * ...to this:
	     *
	     * ```
	     * nodes: [
	     *   { kind: PlainText, text: "Here are some " },
	     *   { kind: PlainText, text: "words " },
	     *   { kind: InlineTag, text: "{\@inheritDoc}" },
	     *   { kind: PlainText, text: "to process." }
	     * ]
	     * ```
	     *
	     * Note that in this example, `"words "` is not merged with the preceding node because
	     * its DocPlainText.excerpt cannot span multiple lines.
	     *
	     * @param docParagraph - a DocParagraph containing nodes to be transformed
	     * @returns The transformed child nodes.
	     */
	    DocNodeTransforms.trimSpacesInParagraph = function (docParagraph) {
	        return TrimSpacesTransform_1.TrimSpacesTransform.transform(docParagraph);
	    };
	    return DocNodeTransforms;
	}());
	exports.DocNodeTransforms = DocNodeTransforms;

	});

	unwrapExports(DocNodeTransforms_1);
	var DocNodeTransforms_2 = DocNodeTransforms_1.DocNodeTransforms;

	var TSDocEmitter_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var LineState;
	(function (LineState) {
	    LineState[LineState["Closed"] = 0] = "Closed";
	    LineState[LineState["StartOfLine"] = 1] = "StartOfLine";
	    LineState[LineState["MiddleOfLine"] = 2] = "MiddleOfLine";
	})(LineState || (LineState = {}));
	/**
	 * Renders a DocNode tree as a code comment.
	 */
	var TSDocEmitter = /** @class */ (function () {
	    function TSDocEmitter() {
	        this.eol = '\n';
	        // Whether to emit the /** */ framing
	        this._emitCommentFraming = true;
	        // This state machine is used by the writer functions to generate the /** */ framing around the emitted lines
	        this._lineState = LineState.Closed;
	        // State for _ensureLineSkipped()
	        this._previousLineHadContent = false;
	        // Normally a paragraph is precede by a blank line (unless it's the first thing written).
	        // But sometimes we want the paragraph to be attached to the previous element, e.g. when it's part of
	        // an "@param" block.  Setting _hangingParagraph=true accomplishes that.
	        this._hangingParagraph = false;
	    }
	    TSDocEmitter.prototype.renderComment = function (output, docComment) {
	        this._emitCommentFraming = true;
	        this._renderCompleteObject(output, docComment);
	    };
	    TSDocEmitter.prototype.renderHtmlTag = function (output, htmlTag) {
	        this._emitCommentFraming = false;
	        this._renderCompleteObject(output, htmlTag);
	    };
	    TSDocEmitter.prototype.renderDeclarationReference = function (output, declarationReference) {
	        this._emitCommentFraming = false;
	        this._renderCompleteObject(output, declarationReference);
	    };
	    TSDocEmitter.prototype._renderCompleteObject = function (output, docNode) {
	        this._output = output;
	        this._lineState = LineState.Closed;
	        this._previousLineHadContent = false;
	        this._hangingParagraph = false;
	        this._renderNode(docNode);
	        this._writeEnd();
	    };
	    TSDocEmitter.prototype._renderNode = function (docNode) {
	        var _this = this;
	        if (docNode === undefined) {
	            return;
	        }
	        switch (docNode.kind) {
	            case "Block" /* Block */:
	                var docBlock = docNode;
	                this._ensureLineSkipped();
	                this._renderNode(docBlock.blockTag);
	                if (docBlock.blockTag.tagNameWithUpperCase === StandardTags_1.StandardTags.returns.tagNameWithUpperCase) {
	                    this._writeContent(' ');
	                    this._hangingParagraph = true;
	                }
	                this._renderNode(docBlock.content);
	                break;
	            case "BlockTag" /* BlockTag */:
	                var docBlockTag = docNode;
	                if (this._lineState === LineState.MiddleOfLine) {
	                    this._writeContent(' ');
	                }
	                this._writeContent(docBlockTag.tagName);
	                break;
	            case "CodeSpan" /* CodeSpan */:
	                var docCodeSpan = docNode;
	                this._writeContent('`');
	                this._writeContent(docCodeSpan.code);
	                this._writeContent('`');
	                break;
	            case "Comment" /* Comment */:
	                var docComment = docNode;
	                this._renderNodes([
	                    docComment.summarySection,
	                    docComment.remarksBlock,
	                    docComment.privateRemarks,
	                    docComment.deprecatedBlock,
	                    docComment.params,
	                    docComment.typeParams,
	                    docComment.returnsBlock
	                ].concat(docComment.customBlocks, [
	                    docComment.inheritDocTag
	                ]));
	                if (docComment.modifierTagSet.nodes.length > 0) {
	                    this._ensureLineSkipped();
	                    this._renderNodes(docComment.modifierTagSet.nodes);
	                }
	                break;
	            case "DeclarationReference" /* DeclarationReference */:
	                var docDeclarationReference = docNode;
	                this._writeContent(docDeclarationReference.packageName);
	                this._writeContent(docDeclarationReference.importPath);
	                if (docDeclarationReference.packageName !== undefined || docDeclarationReference.importPath !== undefined) {
	                    this._writeContent('#');
	                }
	                this._renderNodes(docDeclarationReference.memberReferences);
	                break;
	            case "ErrorText" /* ErrorText */:
	                var docErrorText = docNode;
	                this._writeContent(docErrorText.text);
	                break;
	            case "EscapedText" /* EscapedText */:
	                var docEscapedText = docNode;
	                this._writeContent(docEscapedText.encodedText);
	                break;
	            case "FencedCode" /* FencedCode */:
	                var docFencedCode = docNode;
	                this._ensureAtStartOfLine();
	                this._writeContent('```');
	                this._writeContent(docFencedCode.language);
	                this._writeNewline();
	                this._writeContent(docFencedCode.code);
	                this._writeContent('```');
	                this._writeNewline();
	                this._writeNewline();
	                break;
	            case "HtmlAttribute" /* HtmlAttribute */:
	                var docHtmlAttribute = docNode;
	                this._writeContent(docHtmlAttribute.name);
	                this._writeContent(docHtmlAttribute.spacingAfterName);
	                this._writeContent('=');
	                this._writeContent(docHtmlAttribute.spacingAfterEquals);
	                this._writeContent(docHtmlAttribute.value);
	                this._writeContent(docHtmlAttribute.spacingAfterValue);
	                break;
	            case "HtmlEndTag" /* HtmlEndTag */:
	                var docHtmlEndTag = docNode;
	                this._writeContent('</');
	                this._writeContent(docHtmlEndTag.name);
	                this._writeContent('>');
	                break;
	            case "HtmlStartTag" /* HtmlStartTag */:
	                var docHtmlStartTag = docNode;
	                this._writeContent('<');
	                this._writeContent(docHtmlStartTag.name);
	                this._writeContent(docHtmlStartTag.spacingAfterName);
	                var needsSpace = docHtmlStartTag.spacingAfterName === undefined
	                    || docHtmlStartTag.spacingAfterName.length === 0;
	                for (var _i = 0, _a = docHtmlStartTag.htmlAttributes; _i < _a.length; _i++) {
	                    var attribute = _a[_i];
	                    if (needsSpace) {
	                        this._writeContent(' ');
	                    }
	                    this._renderNode(attribute);
	                    needsSpace = attribute.spacingAfterValue === undefined || attribute.spacingAfterValue.length === 0;
	                }
	                this._writeContent(docHtmlStartTag.selfClosingTag ? '/>' : '>');
	                break;
	            case "InheritDocTag" /* InheritDocTag */:
	                var docInheritDocTag_1 = docNode;
	                this._renderInlineTag(docInheritDocTag_1, function () {
	                    if (docInheritDocTag_1.declarationReference) {
	                        _this._writeContent(' ');
	                        _this._renderNode(docInheritDocTag_1.declarationReference);
	                    }
	                });
	                break;
	            case "InlineTag" /* InlineTag */:
	                var docInlineTag_1 = docNode;
	                this._renderInlineTag(docInlineTag_1, function () {
	                    if (docInlineTag_1.tagContent.length > 0) {
	                        _this._writeContent(' ');
	                        _this._writeContent(docInlineTag_1.tagContent);
	                    }
	                });
	                break;
	            case "LinkTag" /* LinkTag */:
	                var docLinkTag_1 = docNode;
	                this._renderInlineTag(docLinkTag_1, function () {
	                    if (docLinkTag_1.urlDestination !== undefined || docLinkTag_1.codeDestination !== undefined) {
	                        if (docLinkTag_1.urlDestination !== undefined) {
	                            _this._writeContent(' ');
	                            _this._writeContent(docLinkTag_1.urlDestination);
	                        }
	                        else if (docLinkTag_1.codeDestination !== undefined) {
	                            _this._writeContent(' ');
	                            _this._renderNode(docLinkTag_1.codeDestination);
	                        }
	                    }
	                    if (docLinkTag_1.linkText !== undefined) {
	                        _this._writeContent(' ');
	                        _this._writeContent('|');
	                        _this._writeContent(' ');
	                        _this._writeContent(docLinkTag_1.linkText);
	                    }
	                });
	                break;
	            case "MemberIdentifier" /* MemberIdentifier */:
	                var docMemberIdentifier = docNode;
	                if (docMemberIdentifier.hasQuotes) {
	                    this._writeContent('"');
	                    this._writeContent(docMemberIdentifier.identifier); // todo: encoding
	                    this._writeContent('"');
	                }
	                else {
	                    this._writeContent(docMemberIdentifier.identifier);
	                }
	                break;
	            case "MemberReference" /* MemberReference */:
	                var docMemberReference = docNode;
	                if (docMemberReference.hasDot) {
	                    this._writeContent('.');
	                }
	                if (docMemberReference.selector) {
	                    this._writeContent('(');
	                }
	                if (docMemberReference.memberSymbol) {
	                    this._renderNode(docMemberReference.memberSymbol);
	                }
	                else {
	                    this._renderNode(docMemberReference.memberIdentifier);
	                }
	                if (docMemberReference.selector) {
	                    this._writeContent(':');
	                    this._renderNode(docMemberReference.selector);
	                    this._writeContent(')');
	                }
	                break;
	            case "MemberSelector" /* MemberSelector */:
	                var docMemberSelector = docNode;
	                this._writeContent(docMemberSelector.selector);
	                break;
	            case "MemberSymbol" /* MemberSymbol */:
	                var docMemberSymbol = docNode;
	                this._writeContent('[');
	                this._renderNode(docMemberSymbol.symbolReference);
	                this._writeContent(']');
	                break;
	            case "Section" /* Section */:
	                var docSection = docNode;
	                this._renderNodes(docSection.nodes);
	                break;
	            case "Paragraph" /* Paragraph */:
	                var trimmedParagraph = DocNodeTransforms_1.DocNodeTransforms.trimSpacesInParagraph(docNode);
	                if (trimmedParagraph.nodes.length > 0) {
	                    if (this._hangingParagraph) {
	                        // If it's a hanging paragraph, then don't skip a line
	                        this._hangingParagraph = false;
	                    }
	                    else {
	                        this._ensureLineSkipped();
	                    }
	                    this._renderNodes(trimmedParagraph.nodes);
	                    this._writeNewline();
	                }
	                break;
	            case "ParamBlock" /* ParamBlock */:
	                var docParamBlock = docNode;
	                this._ensureLineSkipped();
	                this._renderNode(docParamBlock.blockTag);
	                this._writeContent(' ');
	                this._writeContent(docParamBlock.parameterName);
	                this._writeContent(' - ');
	                this._hangingParagraph = true;
	                this._renderNode(docParamBlock.content);
	                this._hangingParagraph = false;
	                break;
	            case "ParamCollection" /* ParamCollection */:
	                var docParamCollection = docNode;
	                this._renderNodes(docParamCollection.blocks);
	                break;
	            case "PlainText" /* PlainText */:
	                var docPlainText = docNode;
	                this._writeContent(docPlainText.text);
	                break;
	        }
	    };
	    TSDocEmitter.prototype._renderInlineTag = function (docInlineTagBase, writeInlineTagContent) {
	        this._writeContent('{');
	        this._writeContent(docInlineTagBase.tagName);
	        writeInlineTagContent();
	        this._writeContent('}');
	    };
	    TSDocEmitter.prototype._renderNodes = function (docNodes) {
	        for (var _i = 0, docNodes_1 = docNodes; _i < docNodes_1.length; _i++) {
	            var docNode = docNodes_1[_i];
	            this._renderNode(docNode);
	        }
	    };
	    // Calls _writeNewline() only if we're not already at the start of a new line
	    TSDocEmitter.prototype._ensureAtStartOfLine = function () {
	        if (this._lineState === LineState.MiddleOfLine) {
	            this._writeNewline();
	        }
	    };
	    // Calls _writeNewline() if needed to ensure that we have skipped at least one line
	    TSDocEmitter.prototype._ensureLineSkipped = function () {
	        this._ensureAtStartOfLine();
	        if (this._previousLineHadContent) {
	            this._writeNewline();
	        }
	    };
	    // Writes literal text content.  If it contains newlines, they will automatically be converted to
	    // _writeNewline() calls, to ensure that "*" is written at the start of each line.
	    TSDocEmitter.prototype._writeContent = function (content) {
	        if (content === undefined || content.length === 0) {
	            return;
	        }
	        var splitLines = content.split(/\r?\n/g);
	        if (splitLines.length > 1) {
	            var firstLine = true;
	            for (var _i = 0, splitLines_1 = splitLines; _i < splitLines_1.length; _i++) {
	                var line = splitLines_1[_i];
	                if (firstLine) {
	                    firstLine = false;
	                }
	                else {
	                    this._writeNewline();
	                }
	                this._writeContent(line);
	            }
	            return;
	        }
	        if (this._lineState === LineState.Closed) {
	            if (this._emitCommentFraming) {
	                this._output.append('/**' + this.eol
	                    + ' *');
	            }
	            this._lineState = LineState.StartOfLine;
	        }
	        if (this._lineState === LineState.StartOfLine) {
	            if (this._emitCommentFraming) {
	                this._output.append(' ');
	            }
	        }
	        this._output.append(content);
	        this._lineState = LineState.MiddleOfLine;
	        this._previousLineHadContent = true;
	    };
	    // Starts a new line, and inserts "/**" or "*" as appropriate.
	    TSDocEmitter.prototype._writeNewline = function () {
	        if (this._lineState === LineState.Closed) {
	            if (this._emitCommentFraming) {
	                this._output.append('/**' + this.eol
	                    + ' *');
	            }
	            this._lineState = LineState.StartOfLine;
	        }
	        this._previousLineHadContent = this._lineState === LineState.MiddleOfLine;
	        if (this._emitCommentFraming) {
	            this._output.append(this.eol + ' *');
	        }
	        else {
	            this._output.append(this.eol);
	        }
	        this._lineState = LineState.StartOfLine;
	        this._hangingParagraph = false;
	    };
	    // Closes the comment, adding the final "*/" delimiter
	    TSDocEmitter.prototype._writeEnd = function () {
	        if (this._lineState === LineState.MiddleOfLine) {
	            if (this._emitCommentFraming) {
	                this._writeNewline();
	            }
	        }
	        if (this._lineState !== LineState.Closed) {
	            if (this._emitCommentFraming) {
	                this._output.append('/' + this.eol);
	            }
	            this._lineState = LineState.Closed;
	        }
	    };
	    return TSDocEmitter;
	}());
	exports.TSDocEmitter = TSDocEmitter;

	});

	unwrapExports(TSDocEmitter_1);
	var TSDocEmitter_2 = TSDocEmitter_1.TSDocEmitter;

	var DocComment_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });





	/**
	 * Represents an entire documentation comment conforming to the TSDoc structure.
	 * This is the root of the DocNode tree.
	 */
	var DocComment = /** @class */ (function (_super) {
	    __extends(DocComment, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocComment(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        _this.summarySection = new DocSection_1.DocSection({ configuration: _this.configuration });
	        _this.remarksBlock = undefined;
	        _this.privateRemarks = undefined;
	        _this.deprecatedBlock = undefined;
	        _this.params = new DocParamCollection_1.DocParamCollection({ configuration: _this.configuration });
	        _this.typeParams = new DocParamCollection_1.DocParamCollection({ configuration: _this.configuration });
	        _this.returnsBlock = undefined;
	        _this.modifierTagSet = new StandardModifierTagSet_1.StandardModifierTagSet();
	        _this._customBlocks = [];
	        return _this;
	    }
	    Object.defineProperty(DocComment.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "Comment" /* Comment */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocComment.prototype, "customBlocks", {
	        /**
	         * The collection of all DocBlock nodes belonging to this doc comment.
	         */
	        get: function () {
	            return this._customBlocks;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Append an item to the customBlocks collection.
	     */
	    DocComment.prototype.appendCustomBlock = function (block) {
	        this._customBlocks.push(block);
	    };
	    /** @override */
	    DocComment.prototype.onGetChildNodes = function () {
	        return [
	            this.summarySection,
	            this.remarksBlock,
	            this.privateRemarks,
	            this.deprecatedBlock,
	            this.params.count > 0 ? this.params : undefined,
	            this.typeParams.count > 0 ? this.typeParams : undefined,
	            this.returnsBlock
	        ].concat(this.customBlocks, [
	            this.inheritDocTag
	        ], this.modifierTagSet.nodes);
	    };
	    /**
	     * Generates a doc comment corresponding to the `DocComment` tree.  The output is in a normalized form,
	     * and may ignore formatting/spacing from the original input.
	     *
	     * @remarks
	     * After parsing a string, and possibly modifying the result, `emitAsTsdoc()` can be used to render the result
	     * as a doc comment in a normalized format.  It can also be used to emit a `DocComment` tree that was constructed
	     * manually.
	     *
	     * This method is provided as convenience for simple use cases.  To customize the output, or if you need
	     * to render into a `StringBuilder, use the {@link TSDocEmitter} class instead.
	     */
	    DocComment.prototype.emitAsTsdoc = function () {
	        var stringBuilder = new StringBuilder_1.StringBuilder();
	        // eslint-disable-next-line @typescript-eslint/no-use-before-define
	        var emitter = new TSDocEmitter_1.TSDocEmitter();
	        emitter.renderComment(stringBuilder, this);
	        return stringBuilder.toString();
	    };
	    return DocComment;
	}(DocNode_1.DocNode));
	exports.DocComment = DocComment;
	// Circular reference


	});

	unwrapExports(DocComment_1);
	var DocComment_2 = DocComment_1.DocComment;

	var DocDeclarationReference_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * Represents a declaration reference.
	 *
	 * @remarks
	 * Declaration references are TSDoc expressions used by tags such as `{@link}`
	 * or `{@inheritDoc}` that need to refer to another declaration.
	 */
	var DocDeclarationReference = /** @class */ (function (_super) {
	    __extends(DocDeclarationReference, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocDeclarationReference(parameters) {
	        var _a;
	        var _this = _super.call(this, parameters) || this;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            if (parameters.packageNameExcerpt) {
	                _this._packageNameExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "DeclarationReference_PackageName" /* DeclarationReference_PackageName */,
	                    content: parameters.packageNameExcerpt
	                });
	            }
	            if (parameters.importPathExcerpt) {
	                _this._importPathExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "DeclarationReference_ImportPath" /* DeclarationReference_ImportPath */,
	                    content: parameters.importPathExcerpt
	                });
	            }
	            if (parameters.importHashExcerpt) {
	                _this._importHashExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "DeclarationReference_ImportHash" /* DeclarationReference_ImportHash */,
	                    content: parameters.importHashExcerpt
	                });
	            }
	            if (parameters.spacingAfterImportHashExcerpt) {
	                _this._spacingAfterImportHashExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterImportHashExcerpt
	                });
	            }
	        }
	        else {
	            _this._packageName = parameters.packageName;
	            _this._importPath = parameters.importPath;
	        }
	        _this._memberReferences = [];
	        if (parameters.memberReferences) {
	            (_a = _this._memberReferences).push.apply(_a, parameters.memberReferences);
	        }
	        return _this;
	    }
	    Object.defineProperty(DocDeclarationReference.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "DeclarationReference" /* DeclarationReference */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocDeclarationReference.prototype, "packageName", {
	        /**
	         * The optional package name, which may optionally include an NPM scope.
	         *
	         * Example: `"@scope/my-package"`
	         */
	        get: function () {
	            if (this._packageName === undefined) {
	                if (this._packageNameExcerpt !== undefined) {
	                    this._packageName = this._packageNameExcerpt.content.toString();
	                }
	            }
	            return this._packageName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocDeclarationReference.prototype, "importPath", {
	        /**
	         * The optional import path.  If a package name is provided, then if an import path is provided,
	         * the path must start with a "/" delimiter; otherwise paths are resolved relative to the source file
	         * containing the reference.
	         *
	         * Example: `"/path1/path2"`
	         * Example: `"./path1/path2"`
	         * Example: `"../path2/path2"`
	         */
	        get: function () {
	            if (this._importPath === undefined) {
	                if (this._importPathExcerpt !== undefined) {
	                    this._importPath = this._importPathExcerpt.content.toString();
	                }
	            }
	            return this._importPath;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocDeclarationReference.prototype, "memberReferences", {
	        /**
	         * The chain of member references that indicate the declaration being referenced.
	         * If this list is empty, then either the packageName or importPath must be provided,
	         * because the reference refers to a module.
	         */
	        get: function () {
	            return this._memberReferences;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Generates the TSDoc representation of this declaration reference.
	     */
	    DocDeclarationReference.prototype.emitAsTsdoc = function () {
	        var stringBuilder = new StringBuilder_1.StringBuilder();
	        // eslint-disable-next-line @typescript-eslint/no-use-before-define
	        var emitter = new TSDocEmitter_1.TSDocEmitter();
	        emitter.renderDeclarationReference(stringBuilder, this);
	        return stringBuilder.toString();
	    };
	    /** @override */
	    DocDeclarationReference.prototype.onGetChildNodes = function () {
	        return [
	            this._packageNameExcerpt,
	            this._importPathExcerpt,
	            this._importHashExcerpt,
	            this._spacingAfterImportHashExcerpt
	        ].concat(this._memberReferences);
	    };
	    return DocDeclarationReference;
	}(DocNode_1.DocNode));
	exports.DocDeclarationReference = DocDeclarationReference;
	// Circular reference


	});

	unwrapExports(DocDeclarationReference_1);
	var DocDeclarationReference_2 = DocDeclarationReference_1.DocDeclarationReference;

	var DocErrorText_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Represents a span of text that contained invalid markup.
	 * The characters should be rendered as plain text.
	 */
	var DocErrorText = /** @class */ (function (_super) {
	    __extends(DocErrorText, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocErrorText(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        _this._textExcerpt = new DocExcerpt_1.DocExcerpt({
	            configuration: _this.configuration,
	            excerptKind: "ErrorText" /* ErrorText */,
	            content: parameters.textExcerpt
	        });
	        _this._messageId = parameters.messageId;
	        _this._errorMessage = parameters.errorMessage;
	        _this._errorLocation = parameters.errorLocation;
	        return _this;
	    }
	    Object.defineProperty(DocErrorText.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "ErrorText" /* ErrorText */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocErrorText.prototype, "text", {
	        /**
	         * The characters that should be rendered as plain text because they
	         * could not be parsed successfully.
	         */
	        get: function () {
	            if (this._text === undefined) {
	                this._text = this._textExcerpt.content.toString();
	            }
	            return this._text;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocErrorText.prototype, "textExcerpt", {
	        get: function () {
	            if (this._textExcerpt) {
	                return this._textExcerpt.content;
	            }
	            else {
	                return undefined;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocErrorText.prototype, "messageId", {
	        /**
	         * The TSDoc error message identifier.
	         */
	        get: function () {
	            return this._messageId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocErrorText.prototype, "errorMessage", {
	        /**
	         * A description of why the character could not be parsed.
	         */
	        get: function () {
	            return this._errorMessage;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocErrorText.prototype, "errorLocation", {
	        /**
	         * The range of characters that caused the error.  In general these may be
	         * somewhat farther ahead in the input stream from the DocErrorText node itself.
	         *
	         * @remarks
	         * For example, for the malformed HTML tag `<a href="123" @ /a>`, the DocErrorText node
	         * will correspond to the `<` character that looked like an HTML tag, whereas the
	         * error location might be the `@` character that caused the trouble.
	         */
	        get: function () {
	            return this._errorLocation;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocErrorText.prototype.onGetChildNodes = function () {
	        return [
	            this._textExcerpt
	        ];
	    };
	    return DocErrorText;
	}(DocNode_1.DocNode));
	exports.DocErrorText = DocErrorText;

	});

	unwrapExports(DocErrorText_1);
	var DocErrorText_2 = DocErrorText_1.DocErrorText;

	var DocEscapedText_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * The style of escaping to be used with DocEscapedText.
	 */
	var EscapeStyle;
	(function (EscapeStyle) {
	    /**
	     * Use a backslash symbol to escape the character.
	     */
	    EscapeStyle[EscapeStyle["CommonMarkBackslash"] = 0] = "CommonMarkBackslash";
	})(EscapeStyle = exports.EscapeStyle || (exports.EscapeStyle = {}));
	/**
	 * Represents a text character that should be escaped as a TSDoc symbol.
	 * @remarks
	 * Note that renders will normally apply appropriate escaping when rendering
	 * DocPlainText in a format such as HTML or TSDoc.  The DocEscapedText node
	 * forces a specific escaping that may not be the default.
	 */
	var DocEscapedText = /** @class */ (function (_super) {
	    __extends(DocEscapedText, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocEscapedText(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        _this._escapeStyle = parameters.escapeStyle;
	        _this._encodedTextExcerpt = new DocExcerpt_1.DocExcerpt({
	            configuration: _this.configuration,
	            excerptKind: "EscapedText" /* EscapedText */,
	            content: parameters.encodedTextExcerpt
	        });
	        _this._decodedText = parameters.decodedText;
	        return _this;
	    }
	    Object.defineProperty(DocEscapedText.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "EscapedText" /* EscapedText */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocEscapedText.prototype, "escapeStyle", {
	        /**
	         * The style of escaping to be performed.
	         */
	        get: function () {
	            return this._escapeStyle;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocEscapedText.prototype, "encodedText", {
	        /**
	         * The text sequence including escapes.
	         */
	        get: function () {
	            if (this._encodedText === undefined) {
	                this._encodedText = this._encodedTextExcerpt.content.toString();
	            }
	            return this._encodedText;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocEscapedText.prototype, "decodedText", {
	        /**
	         * The text without escaping.
	         */
	        get: function () {
	            return this._decodedText;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocEscapedText.prototype.onGetChildNodes = function () {
	        return [
	            this._encodedTextExcerpt
	        ];
	    };
	    return DocEscapedText;
	}(DocNode_1.DocNode));
	exports.DocEscapedText = DocEscapedText;

	});

	unwrapExports(DocEscapedText_1);
	var DocEscapedText_2 = DocEscapedText_1.EscapeStyle;
	var DocEscapedText_3 = DocEscapedText_1.DocEscapedText;

	var DocFencedCode_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Represents CommonMark-style code fence, i.e. a block of program code that
	 * starts and ends with a line comprised of three backticks.  The opening delimiter
	 * can also specify a language for a syntax highlighter.
	 */
	var DocFencedCode = /** @class */ (function (_super) {
	    __extends(DocFencedCode, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocFencedCode(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            _this._openingFenceExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "FencedCode_OpeningFence" /* FencedCode_OpeningFence */,
	                content: parameters.openingFenceExcerpt
	            });
	            if (parameters.spacingAfterOpeningFenceExcerpt) {
	                _this._spacingAfterOpeningFenceExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterOpeningFenceExcerpt
	                });
	            }
	            if (parameters.languageExcerpt) {
	                _this._languageExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "FencedCode_Language" /* FencedCode_Language */,
	                    content: parameters.languageExcerpt
	                });
	            }
	            if (parameters.spacingAfterLanguageExcerpt) {
	                _this._spacingAfterLanguageExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterLanguageExcerpt
	                });
	            }
	            _this._codeExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "FencedCode_Code" /* FencedCode_Code */,
	                content: parameters.codeExcerpt
	            });
	            if (parameters.spacingBeforeClosingFenceExcerpt) {
	                _this._spacingBeforeClosingFenceExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingBeforeClosingFenceExcerpt
	                });
	            }
	            _this._closingFenceExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "FencedCode_ClosingFence" /* FencedCode_ClosingFence */,
	                content: parameters.closingFenceExcerpt
	            });
	            if (parameters.spacingAfterClosingFenceExcerpt) {
	                _this._spacingAfterClosingFenceExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterClosingFenceExcerpt
	                });
	            }
	        }
	        else {
	            _this._code = parameters.code;
	            _this._language = parameters.language;
	        }
	        return _this;
	    }
	    Object.defineProperty(DocFencedCode.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "FencedCode" /* FencedCode */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocFencedCode.prototype, "language", {
	        /**
	         * A name that can optionally be included after the opening code fence delimiter,
	         * on the same line as the three backticks.  This name indicates the programming language
	         * for the code, which a syntax highlighter may use to style the code block.
	         *
	         * @remarks
	         * The TSDoc standard requires that the language "ts" should be interpreted to mean TypeScript.
	         * Other languages names may be supported, but this is implementation dependent.
	         *
	         * CommonMark refers to this field as the "info string".
	         *
	         * @privateRemarks
	         * Examples of language strings supported by GitHub flavored markdown:
	         * https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml
	         */
	        get: function () {
	            if (this._language === undefined) {
	                if (this._languageExcerpt !== undefined) {
	                    this._language = this._languageExcerpt.content.toString();
	                }
	                else {
	                    this._language = '';
	                }
	            }
	            return this._language;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocFencedCode.prototype, "code", {
	        /**
	         * The text that should be rendered as code.
	         */
	        get: function () {
	            if (this._code === undefined) {
	                if (this._codeExcerpt !== undefined) {
	                    this._code = this._codeExcerpt.content.toString();
	                }
	            }
	            return this._code;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocFencedCode.prototype.onGetChildNodes = function () {
	        return [
	            this._openingFenceExcerpt,
	            this._spacingAfterOpeningFenceExcerpt,
	            this._languageExcerpt,
	            this._spacingAfterLanguageExcerpt,
	            this._codeExcerpt,
	            this._spacingBeforeClosingFenceExcerpt,
	            this._closingFenceExcerpt,
	            this._spacingAfterClosingFenceExcerpt
	        ];
	    };
	    return DocFencedCode;
	}(DocNode_1.DocNode));
	exports.DocFencedCode = DocFencedCode;

	});

	unwrapExports(DocFencedCode_1);
	var DocFencedCode_2 = DocFencedCode_1.DocFencedCode;

	var DocHtmlAttribute_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Represents an HTML attribute inside a DocHtmlStartTag or DocHtmlEndTag.
	 *
	 * Example: `href="#"` inside `<a href="#" />`
	 */
	var DocHtmlAttribute = /** @class */ (function (_super) {
	    __extends(DocHtmlAttribute, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocHtmlAttribute(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            _this._nameExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "HtmlAttribute_Name" /* HtmlAttribute_Name */,
	                content: parameters.nameExcerpt
	            });
	            if (parameters.spacingAfterNameExcerpt) {
	                _this._spacingAfterNameExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterNameExcerpt
	                });
	            }
	            _this._equalsExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "HtmlAttribute_Equals" /* HtmlAttribute_Equals */,
	                content: parameters.equalsExcerpt
	            });
	            if (parameters.spacingAfterEqualsExcerpt) {
	                _this._spacingAfterEqualsExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterEqualsExcerpt
	                });
	            }
	            _this._valueExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "HtmlAttribute_Value" /* HtmlAttribute_Value */,
	                content: parameters.valueExcerpt
	            });
	            if (parameters.spacingAfterValueExcerpt) {
	                _this._spacingAfterValueExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterValueExcerpt
	                });
	            }
	        }
	        else {
	            _this._name = parameters.name;
	            _this._spacingAfterName = parameters.spacingAfterName;
	            _this._spacingAfterEquals = parameters.spacingAfterEquals;
	            _this._value = parameters.value;
	            _this._spacingAfterValue = parameters.spacingAfterValue;
	        }
	        return _this;
	    }
	    Object.defineProperty(DocHtmlAttribute.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "HtmlAttribute" /* HtmlAttribute */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocHtmlAttribute.prototype, "name", {
	        /**
	         * The HTML attribute name.
	         */
	        get: function () {
	            if (this._name === undefined) {
	                this._name = this._nameExcerpt.content.toString();
	            }
	            return this._name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocHtmlAttribute.prototype, "spacingAfterName", {
	        /**
	         * Explicit whitespace that a renderer should insert after the HTML attribute name.
	         * If undefined, then the renderer can use a formatting rule to generate appropriate spacing.
	         */
	        get: function () {
	            if (this._spacingAfterName === undefined) {
	                if (this._spacingAfterNameExcerpt !== undefined) {
	                    this._spacingAfterName = this._spacingAfterNameExcerpt.content.toString();
	                }
	            }
	            return this._spacingAfterName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocHtmlAttribute.prototype, "spacingAfterEquals", {
	        /**
	         * Explicit whitespace that a renderer should insert after the "=".
	         * If undefined, then the renderer can use a formatting rule to generate appropriate spacing.
	         */
	        get: function () {
	            if (this._spacingAfterEquals === undefined) {
	                if (this._spacingAfterEqualsExcerpt !== undefined) {
	                    this._spacingAfterEquals = this._spacingAfterEqualsExcerpt.content.toString();
	                }
	            }
	            return this._spacingAfterEquals;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocHtmlAttribute.prototype, "value", {
	        /**
	         * The HTML attribute value.
	         */
	        get: function () {
	            if (this._value === undefined) {
	                this._value = this._valueExcerpt.content.toString();
	            }
	            return this._value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocHtmlAttribute.prototype, "spacingAfterValue", {
	        /**
	         * Explicit whitespace that a renderer should insert after the HTML attribute name.
	         * If undefined, then the renderer can use a formatting rule to generate appropriate spacing.
	         */
	        get: function () {
	            if (this._spacingAfterValue === undefined) {
	                if (this._spacingAfterValueExcerpt !== undefined) {
	                    this._spacingAfterValue = this._spacingAfterValueExcerpt.content.toString();
	                }
	            }
	            return this._spacingAfterValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocHtmlAttribute.prototype.onGetChildNodes = function () {
	        return [
	            this._nameExcerpt,
	            this._spacingAfterNameExcerpt,
	            this._equalsExcerpt,
	            this._spacingAfterEqualsExcerpt,
	            this._valueExcerpt,
	            this._spacingAfterValueExcerpt
	        ];
	    };
	    return DocHtmlAttribute;
	}(DocNode_1.DocNode));
	exports.DocHtmlAttribute = DocHtmlAttribute;

	});

	unwrapExports(DocHtmlAttribute_1);
	var DocHtmlAttribute_2 = DocHtmlAttribute_1.DocHtmlAttribute;

	var DocHtmlEndTag_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * Represents an HTML end tag.  Example: `</a>`
	 */
	var DocHtmlEndTag = /** @class */ (function (_super) {
	    __extends(DocHtmlEndTag, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocHtmlEndTag(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            _this._openingDelimiterExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "HtmlEndTag_OpeningDelimiter" /* HtmlEndTag_OpeningDelimiter */,
	                content: parameters.openingDelimiterExcerpt
	            });
	            _this._nameExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "HtmlEndTag_Name" /* HtmlEndTag_Name */,
	                content: parameters.nameExcerpt
	            });
	            if (parameters.spacingAfterNameExcerpt) {
	                _this._spacingAfterNameExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterNameExcerpt
	                });
	            }
	            _this._closingDelimiterExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "HtmlEndTag_ClosingDelimiter" /* HtmlEndTag_ClosingDelimiter */,
	                content: parameters.closingDelimiterExcerpt
	            });
	        }
	        else {
	            _this._name = parameters.name;
	        }
	        return _this;
	    }
	    Object.defineProperty(DocHtmlEndTag.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "HtmlEndTag" /* HtmlEndTag */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocHtmlEndTag.prototype, "name", {
	        /**
	         * The HTML element name.
	         */
	        get: function () {
	            if (this._name === undefined) {
	                this._name = this._nameExcerpt.content.toString();
	            }
	            return this._name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Generates the HTML for this tag.
	     */
	    DocHtmlEndTag.prototype.emitAsHtml = function () {
	        // NOTE: Here we're assuming that the TSDoc representation for a tag is also a valid HTML expression.
	        var stringBuilder = new StringBuilder_1.StringBuilder();
	        // eslint-disable-next-line @typescript-eslint/no-use-before-define
	        var emitter = new TSDocEmitter_1.TSDocEmitter();
	        emitter.renderHtmlTag(stringBuilder, this);
	        return stringBuilder.toString();
	    };
	    /** @override */
	    DocHtmlEndTag.prototype.onGetChildNodes = function () {
	        return [
	            this._openingDelimiterExcerpt,
	            this._nameExcerpt,
	            this._spacingAfterNameExcerpt,
	            this._closingDelimiterExcerpt
	        ];
	    };
	    return DocHtmlEndTag;
	}(DocNode_1.DocNode));
	exports.DocHtmlEndTag = DocHtmlEndTag;
	// Circular reference


	});

	unwrapExports(DocHtmlEndTag_1);
	var DocHtmlEndTag_2 = DocHtmlEndTag_1.DocHtmlEndTag;

	var DocHtmlStartTag_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * Represents an HTML start tag, which may or may not be self-closing.
	 *
	 * Example: `<a href="#" />`
	 */
	var DocHtmlStartTag = /** @class */ (function (_super) {
	    __extends(DocHtmlStartTag, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocHtmlStartTag(parameters) {
	        var _a;
	        var _this = _super.call(this, parameters) || this;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            _this._openingDelimiterExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "HtmlStartTag_OpeningDelimiter" /* HtmlStartTag_OpeningDelimiter */,
	                content: parameters.openingDelimiterExcerpt
	            });
	            _this._nameExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "HtmlStartTag_Name" /* HtmlStartTag_Name */,
	                content: parameters.nameExcerpt
	            });
	            if (parameters.spacingAfterNameExcerpt) {
	                _this._spacingAfterNameExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterNameExcerpt
	                });
	            }
	            _this._closingDelimiterExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "HtmlStartTag_ClosingDelimiter" /* HtmlStartTag_ClosingDelimiter */,
	                content: parameters.closingDelimiterExcerpt
	            });
	        }
	        else {
	            _this._name = parameters.name;
	            _this._spacingAfterName = parameters.spacingAfterName;
	        }
	        _this._htmlAttributes = [];
	        if (parameters.htmlAttributes) {
	            (_a = _this._htmlAttributes).push.apply(_a, parameters.htmlAttributes);
	        }
	        _this._selfClosingTag = !!parameters.selfClosingTag;
	        return _this;
	    }
	    Object.defineProperty(DocHtmlStartTag.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "HtmlStartTag" /* HtmlStartTag */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocHtmlStartTag.prototype, "name", {
	        /**
	         * The HTML element name.
	         */
	        get: function () {
	            if (this._name === undefined) {
	                this._name = this._nameExcerpt.content.toString();
	            }
	            return this._name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocHtmlStartTag.prototype, "htmlAttributes", {
	        /**
	         * The HTML attributes belonging to this HTML element.
	         */
	        get: function () {
	            return this._htmlAttributes;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocHtmlStartTag.prototype, "selfClosingTag", {
	        /**
	         * If true, then the HTML tag ends with "/>" instead of ">".
	         */
	        get: function () {
	            return this._selfClosingTag;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocHtmlStartTag.prototype, "spacingAfterName", {
	        /**
	         * Explicit whitespace that a renderer should insert after the HTML element name.
	         * If undefined, then the renderer can use a formatting rule to generate appropriate spacing.
	         */
	        get: function () {
	            if (this._spacingAfterName === undefined) {
	                if (this._spacingAfterNameExcerpt !== undefined) {
	                    this._spacingAfterName = this._spacingAfterNameExcerpt.content.toString();
	                }
	            }
	            return this._spacingAfterName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Generates the HTML for this tag.
	     */
	    DocHtmlStartTag.prototype.emitAsHtml = function () {
	        // NOTE: Here we're assuming that the TSDoc representation for a tag is also a valid HTML expression.
	        var stringBuilder = new StringBuilder_1.StringBuilder();
	        // eslint-disable-next-line @typescript-eslint/no-use-before-define
	        var emitter = new TSDocEmitter_1.TSDocEmitter();
	        emitter.renderHtmlTag(stringBuilder, this);
	        return stringBuilder.toString();
	    };
	    /** @override */
	    DocHtmlStartTag.prototype.onGetChildNodes = function () {
	        return [
	            this._openingDelimiterExcerpt,
	            this._nameExcerpt,
	            this._spacingAfterNameExcerpt
	        ].concat(this._htmlAttributes, [
	            this._closingDelimiterExcerpt
	        ]);
	    };
	    return DocHtmlStartTag;
	}(DocNode_1.DocNode));
	exports.DocHtmlStartTag = DocHtmlStartTag;
	// Circular reference


	});

	unwrapExports(DocHtmlStartTag_1);
	var DocHtmlStartTag_2 = DocHtmlStartTag_1.DocHtmlStartTag;

	var DocInlineTagBase_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * The abstract base class for {@link DocInlineTag}, {@link DocLink}, and {@link DocInheritDoc}.
	 */
	var DocInlineTagBase = /** @class */ (function (_super) {
	    __extends(DocInlineTagBase, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocInlineTagBase(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        StringChecks_1.StringChecks.validateTSDocTagName(parameters.tagName);
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            _this._openingDelimiterExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "InlineTag_OpeningDelimiter" /* InlineTag_OpeningDelimiter */,
	                content: parameters.openingDelimiterExcerpt
	            });
	            _this._tagNameExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "InlineTag_TagName" /* InlineTag_TagName */,
	                content: parameters.tagNameExcerpt
	            });
	            if (parameters.spacingAfterTagNameExcerpt) {
	                _this._spacingAfterTagNameExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterTagNameExcerpt
	                });
	            }
	            _this._closingDelimiterExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "InlineTag_ClosingDelimiter" /* InlineTag_ClosingDelimiter */,
	                content: parameters.closingDelimiterExcerpt
	            });
	        }
	        _this._tagName = parameters.tagName;
	        _this._tagNameWithUpperCase = parameters.tagName.toUpperCase();
	        return _this;
	    }
	    Object.defineProperty(DocInlineTagBase.prototype, "tagName", {
	        /**
	         * The TSDoc tag name.  TSDoc tag names start with an at-sign ("@") followed
	         * by ASCII letters using "camelCase" capitalization.
	         *
	         * @remarks
	         * For example, if the inline tag is `{@link Guid.toString | the toString() method}`
	         * then the tag name would be `@link`.
	         */
	        get: function () {
	            return this._tagName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocInlineTagBase.prototype, "tagNameWithUpperCase", {
	        /**
	         * The TSDoc tag name in all capitals, which is used for performing
	         * case-insensitive comparisons or lookups.
	         */
	        get: function () {
	            return this._tagNameWithUpperCase;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override @sealed */
	    DocInlineTagBase.prototype.onGetChildNodes = function () {
	        return [
	            this._openingDelimiterExcerpt,
	            this._tagNameExcerpt,
	            this._spacingAfterTagNameExcerpt
	        ].concat(this.getChildNodesForContent(), [
	            this._closingDelimiterExcerpt
	        ]);
	    };
	    return DocInlineTagBase;
	}(DocNode_1.DocNode));
	exports.DocInlineTagBase = DocInlineTagBase;

	});

	unwrapExports(DocInlineTagBase_1);
	var DocInlineTagBase_2 = DocInlineTagBase_1.DocInlineTagBase;

	var DocInheritDocTag_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Represents an `{@inheritDoc}` tag.
	 */
	var DocInheritDocTag = /** @class */ (function (_super) {
	    __extends(DocInheritDocTag, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocInheritDocTag(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (_this.tagNameWithUpperCase !== '@INHERITDOC') {
	            throw new Error('DocInheritDocTag requires the tag name to be "{@inheritDoc}"');
	        }
	        _this._declarationReference = parameters.declarationReference;
	        return _this;
	    }
	    Object.defineProperty(DocInheritDocTag.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "InheritDocTag" /* InheritDocTag */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocInheritDocTag.prototype, "declarationReference", {
	        /**
	         * The declaration that the documentation will be inherited from.
	         * If omitted, the documentation will be inherited from the parent class.
	         */
	        get: function () {
	            return this._declarationReference;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocInheritDocTag.prototype.getChildNodesForContent = function () {
	        return [
	            this._declarationReference
	        ];
	    };
	    return DocInheritDocTag;
	}(DocInlineTagBase_1.DocInlineTagBase));
	exports.DocInheritDocTag = DocInheritDocTag;

	});

	unwrapExports(DocInheritDocTag_1);
	var DocInheritDocTag_2 = DocInheritDocTag_1.DocInheritDocTag;

	var DocInlineTag_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * Represents a generic TSDoc inline tag, including custom tags.
	 *
	 * @remarks
	 * NOTE: Certain tags such as `{@link}` and `{@inheritDoc}` have specialized structures and parser rules,
	 * and thus are represented using {@link DocLinkTag} or {@link DocInheritDocTag} instead.  However, if the
	 * specialized parser rule encounters a syntax error, but the outer framing is correct, then the parser constructs
	 * a generic `DocInlineTag` instead of `DocErrorText`.  This means, for example, that it is possible sometimes for
	 * `DocInlineTag.tagName` to be `"@link"`.
	 */
	var DocInlineTag = /** @class */ (function (_super) {
	    __extends(DocInlineTag, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocInlineTag(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            if (parameters.tagContentExcerpt) {
	                _this._tagContentExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "InlineTag_TagContent" /* InlineTag_TagContent */,
	                    content: parameters.tagContentExcerpt
	                });
	            }
	        }
	        else {
	            _this._tagContent = parameters.tagContent;
	        }
	        return _this;
	    }
	    Object.defineProperty(DocInlineTag.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "InlineTag" /* InlineTag */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocInlineTag.prototype, "tagContent", {
	        /**
	         * The tag content.
	         * @remarks
	         * For example, if the tag is `{@myTag x=12.34 y=56.78 }` then the tag content
	         * would be `x=12.34 y=56.78 `, including the trailing space but not the leading space.
	         */
	        get: function () {
	            if (this._tagContent === undefined) {
	                if (this._tagContentExcerpt) {
	                    this._tagContent = this._tagContentExcerpt.content.toString();
	                }
	                else {
	                    return '';
	                }
	            }
	            return this._tagContent;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocInlineTag.prototype.getChildNodesForContent = function () {
	        return [
	            this._tagContentExcerpt
	        ];
	    };
	    return DocInlineTag;
	}(DocInlineTagBase_1.DocInlineTagBase));
	exports.DocInlineTag = DocInlineTag;

	});

	unwrapExports(DocInlineTag_1);
	var DocInlineTag_2 = DocInlineTag_1.DocInlineTag;

	var DocLinkTag_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * Represents an `{@link}` tag.
	 */
	var DocLinkTag = /** @class */ (function (_super) {
	    __extends(DocLinkTag, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocLinkTag(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (_this.tagNameWithUpperCase !== '@LINK') {
	            throw new Error('DocLinkTag requires the tag name to be "{@link}"');
	        }
	        _this._codeDestination = parameters.codeDestination;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            if (parameters.codeDestination !== undefined && parameters.urlDestinationExcerpt !== undefined) {
	                throw new Error('Either the codeDestination or the urlDestination may be specified, but not both');
	            }
	            if (parameters.urlDestinationExcerpt) {
	                _this._urlDestinationExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "LinkTag_UrlDestination" /* LinkTag_UrlDestination */,
	                    content: parameters.urlDestinationExcerpt
	                });
	            }
	            if (parameters.spacingAfterDestinationExcerpt) {
	                _this._spacingAfterDestinationExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterDestinationExcerpt
	                });
	            }
	            if (parameters.pipeExcerpt) {
	                _this._pipeExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "LinkTag_Pipe" /* LinkTag_Pipe */,
	                    content: parameters.pipeExcerpt
	                });
	            }
	            if (parameters.spacingAfterPipeExcerpt) {
	                _this._spacingAfterPipeExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterPipeExcerpt
	                });
	            }
	            if (parameters.linkTextExcerpt) {
	                _this._linkTextExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "LinkTag_LinkText" /* LinkTag_LinkText */,
	                    content: parameters.linkTextExcerpt
	                });
	            }
	            if (parameters.spacingAfterLinkTextExcerpt) {
	                _this._spacingAfterLinkTextExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterLinkTextExcerpt
	                });
	            }
	        }
	        else {
	            if (parameters.codeDestination !== undefined && parameters.urlDestination !== undefined) {
	                throw new Error('Either the codeDestination or the urlDestination may be specified, but not both');
	            }
	            _this._urlDestination = parameters.urlDestination;
	            _this._linkText = parameters.linkText;
	        }
	        return _this;
	    }
	    Object.defineProperty(DocLinkTag.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "LinkTag" /* LinkTag */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocLinkTag.prototype, "codeDestination", {
	        /**
	         * If the link tag refers to a declaration, this returns the declaration reference object;
	         * otherwise this property is undefined.
	         * @remarks
	         * Either the `codeDestination` or the `urlDestination` property will be defined, but never both.
	         */
	        get: function () {
	            return this._codeDestination;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocLinkTag.prototype, "urlDestination", {
	        /**
	         * If the link tag was an ordinary URI, this returns the URL string;
	         * otherwise this property is undefined.
	         * @remarks
	         * Either the `codeDestination` or the `urlDestination` property will be defined, but never both.
	         */
	        get: function () {
	            if (this._urlDestination === undefined) {
	                if (this._urlDestinationExcerpt !== undefined) {
	                    this._urlDestination = this._urlDestinationExcerpt.content.toString();
	                }
	            }
	            return this._urlDestination;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocLinkTag.prototype, "linkText", {
	        /**
	         * An optional text string that is the hyperlink text.  If omitted, the documentation
	         * renderer will use a default string based on the link itself (e.g. the URL text
	         * or the declaration identifier).
	         *
	         * @remarks
	         *
	         * In HTML, the hyperlink can include leading/trailing space characters around the link text.
	         * For example, this HTML will cause a web browser to `y` and also the space character before
	         * and after it:
	         *
	         * ```html
	         * x<a href="#Button"> y </a> z
	         * ```
	         *
	         * Unlike HTML, TSDoc trims leading/trailing spaces.  For example, this TSDoc will be
	         * displayed `xy z` and underline only the `y` character:
	         *
	         * ```
	         * x{@link Button | y } z
	         * ```
	         */
	        get: function () {
	            if (this._linkText === undefined) {
	                if (this._linkTextExcerpt !== undefined) {
	                    this._linkText = this._linkTextExcerpt.content.toString();
	                }
	            }
	            return this._linkText;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocLinkTag.prototype.getChildNodesForContent = function () {
	        return [
	            this._codeDestination,
	            this._urlDestinationExcerpt,
	            this._spacingAfterDestinationExcerpt,
	            this._pipeExcerpt,
	            this._spacingAfterPipeExcerpt,
	            this._linkTextExcerpt,
	            this._spacingAfterLinkTextExcerpt
	        ];
	    };
	    return DocLinkTag;
	}(DocInlineTagBase_1.DocInlineTagBase));
	exports.DocLinkTag = DocLinkTag;

	});

	unwrapExports(DocLinkTag_1);
	var DocLinkTag_2 = DocLinkTag_1.DocLinkTag;

	var DocMemberIdentifier_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * A member identifier is part of a {@link DocMemberReference}.
	 */
	var DocMemberIdentifier = /** @class */ (function (_super) {
	    __extends(DocMemberIdentifier, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocMemberIdentifier(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            if (parameters.leftQuoteExcerpt) {
	                _this._leftQuoteExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "MemberIdentifier_LeftQuote" /* MemberIdentifier_LeftQuote */,
	                    content: parameters.leftQuoteExcerpt
	                });
	            }
	            _this._identifierExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "MemberIdentifier_Identifier" /* MemberIdentifier_Identifier */,
	                content: parameters.identifierExcerpt
	            });
	            if (parameters.rightQuoteExcerpt) {
	                _this._rightQuoteExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "MemberIdentifier_RightQuote" /* MemberIdentifier_RightQuote */,
	                    content: parameters.rightQuoteExcerpt
	                });
	            }
	        }
	        else {
	            _this._identifier = parameters.identifier;
	        }
	        return _this;
	    }
	    /**
	     * Tests whether the input string can be used without quotes as a member identifier in a declaration reference.
	     * If not, {@link DocMemberIdentifier.hasQuotes} will be required.
	     *
	     * @remarks
	     * In order to be used without quotes, the string must follow the identifier syntax for ECMAScript / TypeScript,
	     * and it must not be one of the reserved words used for system selectors (such as `instance`, `static`,
	     * `constructor`, etc).
	     */
	    DocMemberIdentifier.isValidIdentifier = function (identifier) {
	        return !StringChecks_1.StringChecks.explainIfInvalidUnquotedMemberIdentifier(identifier);
	    };
	    Object.defineProperty(DocMemberIdentifier.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "MemberIdentifier" /* MemberIdentifier */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocMemberIdentifier.prototype, "identifier", {
	        /**
	         * The identifier string without any quote encoding.
	         *
	         * @remarks
	         * If the value is not a valid ECMAScript identifier, it will be quoted as a
	         * string literal during rendering.
	         */
	        get: function () {
	            if (this._identifier === undefined) {
	                this._identifier = this._identifierExcerpt.content.toString();
	            }
	            return this._identifier;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocMemberIdentifier.prototype, "hasQuotes", {
	        /**
	         * Returns true if the identifier will be rendered as a quoted string literal
	         * instead of as a programming language identifier.  This is required if the
	         * `identifier` property is not a valid ECMAScript identifier.
	         */
	        get: function () {
	            if (this._identifierExcerpt) {
	                return !!this._leftQuoteExcerpt;
	            }
	            else {
	                return !DocMemberIdentifier.isValidIdentifier(this.identifier);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocMemberIdentifier.prototype.onGetChildNodes = function () {
	        return [
	            this._leftQuoteExcerpt,
	            this._identifierExcerpt,
	            this._rightQuoteExcerpt
	        ];
	    };
	    return DocMemberIdentifier;
	}(DocNode_1.DocNode));
	exports.DocMemberIdentifier = DocMemberIdentifier;

	});

	unwrapExports(DocMemberIdentifier_1);
	var DocMemberIdentifier_2 = DocMemberIdentifier_1.DocMemberIdentifier;

	var DocMemberReference_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * A {@link DocDeclarationReference | declaration reference} includes a chain of
	 * member references represented using `DocMemberReference` nodes.
	 *
	 * @remarks
	 * For example, `example-library#ui.controls.Button.(render:static)` is a
	 * declaration reference that contains three member references:
	 * `ui`, `.controls`, and `.Button`, and `.(render:static)`.
	 */
	var DocMemberReference = /** @class */ (function (_super) {
	    __extends(DocMemberReference, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocMemberReference(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            _this._hasDot = !!parameters.dotExcerpt;
	            if (parameters.dotExcerpt) {
	                _this._dotExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "MemberReference_Dot" /* MemberReference_Dot */,
	                    content: parameters.dotExcerpt
	                });
	            }
	            if (parameters.spacingAfterDotExcerpt) {
	                _this._spacingAfterDotExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterDotExcerpt
	                });
	            }
	            if (parameters.leftParenthesisExcerpt) {
	                _this._leftParenthesisExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "MemberReference_LeftParenthesis" /* MemberReference_LeftParenthesis */,
	                    content: parameters.leftParenthesisExcerpt
	                });
	            }
	            if (parameters.spacingAfterLeftParenthesisExcerpt) {
	                _this._spacingAfterLeftParenthesisExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterLeftParenthesisExcerpt
	                });
	            }
	            if (parameters.spacingAfterMemberExcerpt) {
	                _this._spacingAfterMemberExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterMemberExcerpt
	                });
	            }
	            if (parameters.colonExcerpt) {
	                _this._colonExcerpt = new DocExcerpt_1.DocExcerpt({
	                    excerptKind: "MemberReference_Colon" /* MemberReference_Colon */,
	                    configuration: _this.configuration,
	                    content: parameters.colonExcerpt
	                });
	            }
	            if (parameters.spacingAfterColonExcerpt) {
	                _this._spacingAfterColonExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterColonExcerpt
	                });
	            }
	            if (parameters.spacingAfterSelectorExcerpt) {
	                _this._spacingAfterSelectorExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterSelectorExcerpt
	                });
	            }
	            if (parameters.rightParenthesisExcerpt) {
	                _this._rightParenthesisExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "MemberReference_RightParenthesis" /* MemberReference_RightParenthesis */,
	                    content: parameters.rightParenthesisExcerpt
	                });
	            }
	            if (parameters.spacingAfterRightParenthesisExcerpt) {
	                _this._spacingAfterRightParenthesisExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterRightParenthesisExcerpt
	                });
	            }
	        }
	        else {
	            _this._hasDot = parameters.hasDot;
	        }
	        _this._memberIdentifier = parameters.memberIdentifier;
	        _this._memberSymbol = parameters.memberSymbol;
	        _this._selector = parameters.selector;
	        return _this;
	    }
	    Object.defineProperty(DocMemberReference.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "MemberReference" /* MemberReference */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocMemberReference.prototype, "hasDot", {
	        /**
	         * True if this member reference is preceded by a dot (".") token.
	         * It should be false only for the first member in the chain.
	         */
	        get: function () {
	            return this._hasDot;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocMemberReference.prototype, "memberIdentifier", {
	        /**
	         * The identifier for the referenced member.
	         * @remarks
	         * Either `memberIdentifier` or `memberSymbol` may be specified, but not both.
	         */
	        get: function () {
	            return this._memberIdentifier;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocMemberReference.prototype, "memberSymbol", {
	        /**
	         * The ECMAScript 6 symbol expression, which may be used instead of an identifier
	         * to indicate the referenced member.
	         * @remarks
	         * Either `memberIdentifier` or `memberSymbol` may be specified, but not both.
	         */
	        get: function () {
	            return this._memberSymbol;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocMemberReference.prototype, "selector", {
	        /**
	         * A TSDoc selector, which may be optionally when the identifier or symbol is insufficient
	         * to unambiguously determine the referenced declaration.
	         */
	        get: function () {
	            return this._selector;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocMemberReference.prototype.onGetChildNodes = function () {
	        return [
	            this._dotExcerpt,
	            this._spacingAfterDotExcerpt,
	            this._leftParenthesisExcerpt,
	            this._spacingAfterLeftParenthesisExcerpt,
	            this._memberIdentifier,
	            this._memberSymbol,
	            this._spacingAfterMemberExcerpt,
	            this._colonExcerpt,
	            this._spacingAfterColonExcerpt,
	            this._selector,
	            this._spacingAfterSelectorExcerpt,
	            this._rightParenthesisExcerpt,
	            this._spacingAfterRightParenthesisExcerpt
	        ];
	    };
	    return DocMemberReference;
	}(DocNode_1.DocNode));
	exports.DocMemberReference = DocMemberReference;

	});

	unwrapExports(DocMemberReference_1);
	var DocMemberReference_2 = DocMemberReference_1.DocMemberReference;

	var DocMemberSelector_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 */
	var DocMemberSelector = /** @class */ (function (_super) {
	    __extends(DocMemberSelector, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocMemberSelector(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            _this._selectorExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "MemberSelector" /* MemberSelector */,
	                content: parameters.selectorExcerpt
	            });
	            _this._selector = parameters.selectorExcerpt.toString();
	        }
	        else {
	            _this._selector = parameters.selector;
	        }
	        _this._selectorKind = "error" /* Error */;
	        _this._errorMessage = undefined;
	        // The logic below will always either (1) assign selectorKind or (2) else assign an errorMessage
	        if (_this._selector.length === 0) {
	            _this._errorMessage = 'The selector cannot be an empty string';
	        }
	        else if (DocMemberSelector._likeIndexSelectorRegExp.test(_this._selector)) {
	            // It looks like an index selector
	            if (DocMemberSelector._indexSelectorRegExp.test(_this._selector)) {
	                _this._selectorKind = "index" /* Index */;
	            }
	            else {
	                _this._errorMessage = 'If the selector begins with a number, it must be a positive integer value';
	            }
	        }
	        else if (DocMemberSelector._likeLabelSelectorRegExp.test(_this._selector)) {
	            // It looks like a label selector
	            if (DocMemberSelector._labelSelectorRegExp.test(_this._selector)) {
	                _this._selectorKind = "label" /* Label */;
	            }
	            else {
	                _this._errorMessage = 'A label selector must be comprised of upper case letters, numbers,'
	                    + ' and underscores and must not start with a number';
	            }
	        }
	        else {
	            if (StringChecks_1.StringChecks.isSystemSelector(_this._selector)) {
	                _this._selectorKind = "system" /* System */;
	            }
	            else if (DocMemberSelector._likeSystemSelectorRegExp.test(_this._selector)) {
	                // It looks like a system selector, but is not
	                _this._errorMessage = "The selector " + JSON.stringify(_this._selector)
	                    + " is not a recognized TSDoc system selector name";
	            }
	            else {
	                // It doesn't look like anything we recognize
	                _this._errorMessage = 'Invalid syntax for selector';
	            }
	        }
	        return _this;
	    }
	    Object.defineProperty(DocMemberSelector.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "MemberSelector" /* MemberSelector */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocMemberSelector.prototype, "selector", {
	        /**
	         * The text representation of the selector.
	         *
	         * @remarks
	         * For system selectors, it will be a predefined lower case name.
	         * For label selectors, it will be an upper case name defined using the `{@label}` tag.
	         * For index selectors, it will be a positive integer.
	         */
	        get: function () {
	            return this._selector;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocMemberSelector.prototype, "selectorKind", {
	        /**
	         * Indicates the kind of selector.
	         */
	        get: function () {
	            return this._selectorKind;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocMemberSelector.prototype, "errorMessage", {
	        /**
	         * If the `selectorKind` is `SelectorKind.Error`, this string will be defined and provide
	         * more detail about why the string was not valid.
	         */
	        get: function () {
	            return this._errorMessage;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocMemberSelector.prototype.onGetChildNodes = function () {
	        return [
	            this._selectorExcerpt
	        ];
	    };
	    DocMemberSelector._likeIndexSelectorRegExp = /^[0-9]/;
	    DocMemberSelector._indexSelectorRegExp = /^[1-9][0-9]*$/;
	    DocMemberSelector._likeLabelSelectorRegExp = /^[A-Z_]/u;
	    DocMemberSelector._labelSelectorRegExp = /^[A-Z_][A-Z0-9_]+$/;
	    DocMemberSelector._likeSystemSelectorRegExp = /^[a-z]+$/u;
	    return DocMemberSelector;
	}(DocNode_1.DocNode));
	exports.DocMemberSelector = DocMemberSelector;

	});

	unwrapExports(DocMemberSelector_1);
	var DocMemberSelector_2 = DocMemberSelector_1.DocMemberSelector;

	var DocMemberSymbol_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Represents a reference to an ECMAScript 6 symbol that is used
	 * to identify a member declaration.
	 *
	 * @example
	 *
	 * In the declaration reference `{@link MyClass.([MySymbols.example]:instance)}`,
	 * the member symbol `[MySymbols.example]` might be used to reference a property
	 * of the class.
	 */
	var DocMemberSymbol = /** @class */ (function (_super) {
	    __extends(DocMemberSymbol, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocMemberSymbol(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            _this._leftBracketExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "DocMemberSymbol_LeftBracket" /* DocMemberSymbol_LeftBracket */,
	                content: parameters.leftBracketExcerpt
	            });
	            if (parameters.spacingAfterLeftBracketExcerpt) {
	                _this._spacingAfterLeftBracketExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterLeftBracketExcerpt
	                });
	            }
	            _this._rightBracketExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "DocMemberSymbol_RightBracket" /* DocMemberSymbol_RightBracket */,
	                content: parameters.rightBracketExcerpt
	            });
	        }
	        _this._symbolReference = parameters.symbolReference;
	        return _this;
	    }
	    Object.defineProperty(DocMemberSymbol.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "MemberSymbol" /* MemberSymbol */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocMemberSymbol.prototype, "symbolReference", {
	        /**
	         * The declaration reference for the ECMAScript 6 symbol that will act as
	         * the identifier for the member.
	         */
	        get: function () {
	            return this._symbolReference;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocMemberSymbol.prototype.onGetChildNodes = function () {
	        return [
	            this._leftBracketExcerpt,
	            this._spacingAfterLeftBracketExcerpt,
	            this._symbolReference,
	            this._rightBracketExcerpt
	        ];
	    };
	    return DocMemberSymbol;
	}(DocNode_1.DocNode));
	exports.DocMemberSymbol = DocMemberSymbol;

	});

	unwrapExports(DocMemberSymbol_1);
	var DocMemberSymbol_2 = DocMemberSymbol_1.DocMemberSymbol;

	var DocParamBlock_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * Represents a parsed `@param` or `@typeParam` block, which provides a description for a
	 * function parameter.
	 */
	var DocParamBlock = /** @class */ (function (_super) {
	    __extends(DocParamBlock, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocParamBlock(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        _this._parameterName = parameters.parameterName;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            if (parameters.spacingBeforeParameterNameExcerpt) {
	                _this._spacingBeforeParameterNameExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingBeforeParameterNameExcerpt
	                });
	            }
	            if (parameters.unsupportedJsdocTypeBeforeParameterNameExcerpt) {
	                _this._unsupportedJsdocTypeBeforeParameterNameExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "NonstandardText" /* NonstandardText */,
	                    content: parameters.unsupportedJsdocTypeBeforeParameterNameExcerpt
	                });
	            }
	            if (parameters.unsupportedJsdocOptionalNameOpenBracketExcerpt) {
	                _this._unsupportedJsdocOptionalNameOpenBracketExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "NonstandardText" /* NonstandardText */,
	                    content: parameters.unsupportedJsdocOptionalNameOpenBracketExcerpt
	                });
	            }
	            _this._parameterNameExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "ParamBlock_ParameterName" /* ParamBlock_ParameterName */,
	                content: parameters.parameterNameExcerpt
	            });
	            if (parameters.unsupportedJsdocOptionalNameRestExcerpt) {
	                _this._unsupportedJsdocOptionalNameRestExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "NonstandardText" /* NonstandardText */,
	                    content: parameters.unsupportedJsdocOptionalNameRestExcerpt
	                });
	            }
	            if (parameters.spacingAfterParameterNameExcerpt) {
	                _this._spacingAfterParameterNameExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterParameterNameExcerpt
	                });
	            }
	            if (parameters.unsupportedJsdocTypeAfterParameterNameExcerpt) {
	                _this._unsupportedJsdocTypeAfterParameterNameExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "NonstandardText" /* NonstandardText */,
	                    content: parameters.unsupportedJsdocTypeAfterParameterNameExcerpt
	                });
	            }
	            if (parameters.hyphenExcerpt) {
	                _this._hyphenExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "ParamBlock_Hyphen" /* ParamBlock_Hyphen */,
	                    content: parameters.hyphenExcerpt
	                });
	            }
	            if (parameters.spacingAfterHyphenExcerpt) {
	                _this._spacingAfterHyphenExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "Spacing" /* Spacing */,
	                    content: parameters.spacingAfterHyphenExcerpt
	                });
	            }
	            if (parameters.unsupportedJsdocTypeAfterHyphenExcerpt) {
	                _this._unsupportedJsdocTypeAfterHyphenExcerpt = new DocExcerpt_1.DocExcerpt({
	                    configuration: _this.configuration,
	                    excerptKind: "NonstandardText" /* NonstandardText */,
	                    content: parameters.unsupportedJsdocTypeAfterHyphenExcerpt
	                });
	            }
	        }
	        return _this;
	    }
	    Object.defineProperty(DocParamBlock.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "ParamBlock" /* ParamBlock */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocParamBlock.prototype, "parameterName", {
	        /**
	         * The name of the parameter that is being documented.
	         * For example "width" in `@param width - the width of the object`.
	         */
	        get: function () {
	            return this._parameterName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocParamBlock.prototype.onGetChildNodes = function () {
	        return [
	            this.blockTag,
	            this._spacingBeforeParameterNameExcerpt,
	            this._unsupportedJsdocTypeBeforeParameterNameExcerpt,
	            this._unsupportedJsdocOptionalNameOpenBracketExcerpt,
	            this._parameterNameExcerpt,
	            this._unsupportedJsdocOptionalNameRestExcerpt,
	            this._spacingAfterParameterNameExcerpt,
	            this._unsupportedJsdocTypeAfterParameterNameExcerpt,
	            this._hyphenExcerpt,
	            this._spacingAfterHyphenExcerpt,
	            this._unsupportedJsdocTypeAfterHyphenExcerpt,
	            this.content
	        ];
	    };
	    return DocParamBlock;
	}(DocBlock_1.DocBlock));
	exports.DocParamBlock = DocParamBlock;

	});

	unwrapExports(DocParamBlock_1);
	var DocParamBlock_2 = DocParamBlock_1.DocParamBlock;

	var DocPlainText_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Represents a span of comment text that is considered by the parser
	 * to contain no special symbols or meaning.
	 *
	 * @remarks
	 * The text content must not contain newline characters.
	 * Use DocSoftBreak to represent manual line splitting.
	 */
	var DocPlainText = /** @class */ (function (_super) {
	    __extends(DocPlainText, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocPlainText(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            _this._textExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "PlainText" /* PlainText */,
	                content: parameters.textExcerpt
	            });
	        }
	        else {
	            if (DocPlainText._newlineCharacterRegExp.test(parameters.text)) {
	                // Use DocSoftBreak to represent manual line splitting
	                throw new Error('The DocPlainText content must not contain newline characters');
	            }
	            _this._text = parameters.text;
	        }
	        return _this;
	    }
	    Object.defineProperty(DocPlainText.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "PlainText" /* PlainText */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocPlainText.prototype, "text", {
	        /**
	         * The text content.
	         */
	        get: function () {
	            if (this._text === undefined) {
	                this._text = this._textExcerpt.content.toString();
	            }
	            return this._text;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DocPlainText.prototype, "textExcerpt", {
	        get: function () {
	            if (this._textExcerpt) {
	                return this._textExcerpt.content;
	            }
	            else {
	                return undefined;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocPlainText.prototype.onGetChildNodes = function () {
	        return [
	            this._textExcerpt
	        ];
	    };
	    // TODO: We should also prohibit "\r", but this requires updating LineExtractor
	    // to interpret a lone "\r" as a newline
	    DocPlainText._newlineCharacterRegExp = /[\n]/;
	    return DocPlainText;
	}(DocNode_1.DocNode));
	exports.DocPlainText = DocPlainText;

	});

	unwrapExports(DocPlainText_1);
	var DocPlainText_2 = DocPlainText_1.DocPlainText;

	var DocSoftBreak_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Instructs a renderer to insert an explicit newline in the output.
	 * (Normally the renderer uses a formatting rule to determine where
	 * lines should wrap.)
	 *
	 * @remarks
	 * In HTML, a soft break is represented as an ASCII newline character (which does not
	 * affect the web browser's view), whereas the hard break is the `<br />` element
	 * (which starts a new line in the web browser's view).
	 *
	 * TSDoc follows the same conventions, except the renderer avoids emitting
	 * two empty lines (because that could start a new CommonMark paragraph).
	 */
	var DocSoftBreak = /** @class */ (function (_super) {
	    __extends(DocSoftBreak, _super);
	    /**
	     * Don't call this directly.  Instead use {@link TSDocParser}
	     * @internal
	     */
	    function DocSoftBreak(parameters) {
	        var _this = _super.call(this, parameters) || this;
	        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
	            _this._softBreakExcerpt = new DocExcerpt_1.DocExcerpt({
	                configuration: _this.configuration,
	                excerptKind: "SoftBreak" /* SoftBreak */,
	                content: parameters.softBreakExcerpt
	            });
	        }
	        return _this;
	    }
	    Object.defineProperty(DocSoftBreak.prototype, "kind", {
	        /** @override */
	        get: function () {
	            return "SoftBreak" /* SoftBreak */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** @override */
	    DocSoftBreak.prototype.onGetChildNodes = function () {
	        return [
	            this._softBreakExcerpt
	        ];
	    };
	    return DocSoftBreak;
	}(DocNode_1.DocNode));
	exports.DocSoftBreak = DocSoftBreak;

	});

	unwrapExports(DocSoftBreak_1);
	var DocSoftBreak_2 = DocSoftBreak_1.DocSoftBreak;

	var nodes = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(DocBlock_1);
	__export(DocBlockTag_1);
	__export(DocCodeSpan_1);
	__export(DocComment_1);
	__export(DocDeclarationReference_1);
	__export(DocErrorText_1);
	__export(DocEscapedText_1);
	__export(DocExcerpt_1);
	__export(DocFencedCode_1);
	__export(DocHtmlAttribute_1);
	__export(DocHtmlEndTag_1);
	__export(DocHtmlStartTag_1);
	__export(DocInheritDocTag_1);
	__export(DocInlineTag_1);
	__export(DocInlineTagBase_1);
	__export(DocLinkTag_1);
	__export(DocMemberIdentifier_1);
	__export(DocMemberReference_1);
	__export(DocMemberSelector_1);
	__export(DocMemberSymbol_1);
	__export(DocNode_1);
	__export(DocNodeContainer_1);
	__export(DocParagraph_1);
	__export(DocParamBlock_1);
	__export(DocParamCollection_1);
	__export(DocPlainText_1);
	__export(DocSection_1);
	__export(DocSoftBreak_1);

	});

	unwrapExports(nodes);

	var PlainTextEmitter_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Renders a DocNode tree as plain text, without any rich text formatting or markup.
	 */
	var PlainTextEmitter = /** @class */ (function () {
	    function PlainTextEmitter() {
	    }
	    PlainTextEmitter.hasAnyTextContent = function (nodeOrNodes, requiredCharacters) {
	        if (requiredCharacters === undefined || requiredCharacters < 1) {
	            requiredCharacters = 1; // default
	        }
	        var nodes$1;
	        if (nodeOrNodes instanceof nodes.DocNode) {
	            nodes$1 = [nodeOrNodes];
	        }
	        else {
	            nodes$1 = nodeOrNodes;
	        }
	        var foundCharacters = PlainTextEmitter._scanTextContent(nodes$1, requiredCharacters, 0);
	        return foundCharacters >= requiredCharacters;
	    };
	    PlainTextEmitter._scanTextContent = function (nodes, requiredCharacters, foundCharacters) {
	        for (var _i = 0, nodes_2 = nodes; _i < nodes_2.length; _i++) {
	            var node = nodes_2[_i];
	            switch (node.kind) {
	                case "FencedCode" /* FencedCode */:
	                    var docFencedCode = node;
	                    foundCharacters += PlainTextEmitter._countNonSpaceCharacters(docFencedCode.code);
	                    break;
	                case "CodeSpan" /* CodeSpan */:
	                    var docCodeSpan = node;
	                    foundCharacters += PlainTextEmitter._countNonSpaceCharacters(docCodeSpan.code);
	                    break;
	                case "EscapedText" /* EscapedText */:
	                    var docEscapedText = node;
	                    foundCharacters += PlainTextEmitter._countNonSpaceCharacters(docEscapedText.decodedText);
	                    break;
	                case "LinkTag" /* LinkTag */:
	                    var docLinkTag = node;
	                    foundCharacters += PlainTextEmitter._countNonSpaceCharacters(docLinkTag.linkText || '');
	                    break;
	                case "PlainText" /* PlainText */:
	                    var docPlainText = node;
	                    foundCharacters += PlainTextEmitter._countNonSpaceCharacters(docPlainText.text);
	                    break;
	            }
	            if (foundCharacters >= requiredCharacters) {
	                break;
	            }
	            foundCharacters += PlainTextEmitter._scanTextContent(node.getChildNodes(), requiredCharacters, foundCharacters);
	            if (foundCharacters >= requiredCharacters) {
	                break;
	            }
	        }
	        return foundCharacters;
	    };
	    PlainTextEmitter._countNonSpaceCharacters = function (s) {
	        var count = 0;
	        var length = s.length;
	        var i = 0;
	        while (i < length) {
	            switch (s.charCodeAt(i)) {
	                case 32: // space
	                case 9: // tab
	                case 13: // CR
	                case 10: // LF
	                    break;
	                default:
	                    ++count;
	            }
	            ++i;
	        }
	        return count;
	    };
	    return PlainTextEmitter;
	}());
	exports.PlainTextEmitter = PlainTextEmitter;

	});

	unwrapExports(PlainTextEmitter_1);
	var PlainTextEmitter_2 = PlainTextEmitter_1.PlainTextEmitter;

	var TextRange_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Efficiently references a range of text from a string buffer.
	 */
	var TextRange = /** @class */ (function () {
	    function TextRange(buffer, pos, end) {
	        this.buffer = buffer;
	        this.pos = pos;
	        this.end = end;
	        this._validateBounds();
	    }
	    /**
	     * Constructs a TextRange that corresponds to an entire string object.
	     */
	    TextRange.fromString = function (buffer) {
	        return new TextRange(buffer, 0, buffer.length);
	    };
	    /**
	     * Constructs a TextRange that corresponds to an entire string object.
	     */
	    TextRange.fromStringRange = function (buffer, pos, end) {
	        return new TextRange(buffer, pos, end);
	    };
	    Object.defineProperty(TextRange.prototype, "length", {
	        /**
	         * Returns the length of the text range.
	         * @remarks
	         * This value is calculated as the `end` property minus the `pos` property.
	         */
	        get: function () {
	            return this.end - this.pos;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Constructs a TextRange that corresponds to a different range of an existing buffer.
	     */
	    TextRange.prototype.getNewRange = function (pos, end) {
	        return new TextRange(this.buffer, pos, end);
	    };
	    /**
	     * Returns true if the length of the range is zero.  Note that the object reference may not
	     * be equal to `TextRange.empty`, and the buffer may be different.
	     */
	    TextRange.prototype.isEmpty = function () {
	        return this.pos === this.end;
	    };
	    /**
	     * Returns the range from the associated string buffer.
	     */
	    TextRange.prototype.toString = function () {
	        return this.buffer.substring(this.pos, this.end);
	    };
	    /**
	     * Returns a debugging dump of the range, indicated via custom delimiters.
	     * @remarks
	     * For example if the delimiters are "[" and "]", and the range is 3..5 inside "1234567",
	     * then the output would be "12[345]67".
	     */
	    TextRange.prototype.getDebugDump = function (posDelimiter, endDelimiter) {
	        return this.buffer.substring(0, this.pos)
	            + posDelimiter
	            + this.buffer.substring(this.pos, this.end)
	            + endDelimiter
	            + this.buffer.substring(this.end);
	    };
	    /**
	     * Calculates the line and column number for the specified offset into the buffer.
	     *
	     * @remarks
	     * This is a potentially expensive operation.
	     *
	     * @param index - an integer offset
	     * @param buffer - the buffer
	     */
	    TextRange.prototype.getLocation = function (index) {
	        if (index < 0 || index > this.buffer.length) {
	            // No match
	            return { line: 0, column: 0 };
	        }
	        // TODO: Consider caching or optimizing this somehow
	        var line = 1;
	        var column = 1;
	        var currentIndex = 0;
	        while (currentIndex < index) {
	            var current = this.buffer[currentIndex];
	            ++currentIndex;
	            if (current === '\r') { // CR
	                // Ignore '\r' and assume it will always have an accompanying '\n'
	                continue;
	            }
	            if (current === '\n') { // LF
	                ++line;
	                column = 1;
	            }
	            else {
	                // NOTE: For consistency with the TypeScript compiler, a tab character is assumed
	                // to advance by one column
	                ++column;
	            }
	        }
	        return { line: line, column: column };
	    };
	    TextRange.prototype._validateBounds = function () {
	        if (this.pos < 0) {
	            throw new Error('TextRange.pos cannot be negative');
	        }
	        if (this.end < 0) {
	            throw new Error('TextRange.end cannot be negative');
	        }
	        if (this.end < this.pos) {
	            throw new Error('TextRange.end cannot be smaller than TextRange.pos');
	        }
	        if (this.pos > this.buffer.length) {
	            throw new Error('TextRange.pos cannot exceed the associated text buffer length');
	        }
	        if (this.end > this.buffer.length) {
	            throw new Error('TextRange.end cannot exceed the associated text buffer length');
	        }
	    };
	    /**
	     * Used to represent an empty or unknown range.
	     */
	    TextRange.empty = new TextRange('', 0, 0);
	    return TextRange;
	}());
	exports.TextRange = TextRange;

	});

	unwrapExports(TextRange_1);
	var TextRange_2 = TextRange_1.TextRange;

	var ParserMessage_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Represents an error or warning that occurred during parsing.
	 */
	var ParserMessage = /** @class */ (function () {
	    function ParserMessage(parameters) {
	        this.messageId = parameters.messageId;
	        this.unformattedText = parameters.messageText;
	        this.textRange = parameters.textRange;
	        this.tokenSequence = parameters.tokenSequence;
	        this.docNode = parameters.docNode;
	        this._text = undefined;
	    }
	    /**
	     * Generates a line/column prefix.  Example with line=2 and column=5
	     * and message="An error occurred":
	     * ```
	     * "(2,5): An error occurred"
	     * ```
	     */
	    ParserMessage._formatMessageText = function (message, range) {
	        if (!message) {
	            message = 'An unknown error occurred';
	        }
	        if (range.pos !== 0 || range.end !== 0) {
	            // NOTE: This currently a potentially expensive operation, since TSDoc currently doesn't
	            // have a full newline analysis for the input buffer.
	            var location = range.getLocation(range.pos);
	            if (location.line) {
	                return "(" + location.line + "," + location.column + "): " + message;
	            }
	        }
	        return message;
	    };
	    Object.defineProperty(ParserMessage.prototype, "text", {
	        /**
	         * The message text.
	         */
	        get: function () {
	            if (this._text === undefined) {
	                // NOTE: This currently a potentially expensive operation, since TSDoc currently doesn't
	                // have a full newline analysis for the input buffer.
	                this._text = ParserMessage._formatMessageText(this.unformattedText, this.textRange);
	            }
	            return this._text;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ParserMessage.prototype.toString = function () {
	        return this.text;
	    };
	    return ParserMessage;
	}());
	exports.ParserMessage = ParserMessage;

	});

	unwrapExports(ParserMessage_1);
	var ParserMessage_2 = ParserMessage_1.ParserMessage;

	var ParserMessageLog_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Used to report errors and warnings that occurred during parsing.
	 */
	var ParserMessageLog = /** @class */ (function () {
	    function ParserMessageLog() {
	        this._messages = [];
	    }
	    Object.defineProperty(ParserMessageLog.prototype, "messages", {
	        /**
	         * The unfiltered list of all messages.
	         */
	        get: function () {
	            return this._messages;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Append a message to the log.
	     */
	    ParserMessageLog.prototype.addMessage = function (parserMessage) {
	        this._messages.push(parserMessage);
	    };
	    /**
	     * Append a message associated with a TextRange.
	     */
	    ParserMessageLog.prototype.addMessageForTextRange = function (messageId, messageText, textRange) {
	        this.addMessage(new ParserMessage_1.ParserMessage({
	            messageId: messageId,
	            messageText: messageText,
	            textRange: textRange
	        }));
	    };
	    /**
	     * Append a message associated with a TokenSequence.
	     */
	    ParserMessageLog.prototype.addMessageForTokenSequence = function (messageId, messageText, tokenSequence, docNode) {
	        this.addMessage(new ParserMessage_1.ParserMessage({
	            messageId: messageId,
	            messageText: messageText,
	            textRange: tokenSequence.getContainingTextRange(),
	            tokenSequence: tokenSequence,
	            docNode: docNode
	        }));
	    };
	    /**
	     * Append a message associated with a TokenSequence.
	     */
	    ParserMessageLog.prototype.addMessageForDocErrorText = function (docErrorText) {
	        var tokenSequence;
	        if (docErrorText.textExcerpt) {
	            // If there is an excerpt directly associated with the DocErrorText, highlight that:
	            tokenSequence = docErrorText.textExcerpt;
	        }
	        else {
	            // Otherwise we can use the errorLocation, but typically that is meant to give additional
	            // details, not to indicate the primary location of the problem.
	            tokenSequence = docErrorText.errorLocation;
	        }
	        this.addMessage(new ParserMessage_1.ParserMessage({
	            messageId: docErrorText.messageId,
	            messageText: docErrorText.errorMessage,
	            textRange: tokenSequence.getContainingTextRange(),
	            tokenSequence: tokenSequence,
	            docNode: docErrorText
	        }));
	    };
	    return ParserMessageLog;
	}());
	exports.ParserMessageLog = ParserMessageLog;

	});

	unwrapExports(ParserMessageLog_1);
	var ParserMessageLog_2 = ParserMessageLog_1.ParserMessageLog;

	var ParserContext_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * An internal data structure that tracks all the state being built up by the various
	 * parser stages.
	 */
	var ParserContext = /** @class */ (function () {
	    function ParserContext(configuration, sourceRange) {
	        /**
	         * The text range starting from the opening `/**` and ending with
	         * the closing `*\/` delimiter.
	         */
	        this.commentRange = TextRange_1.TextRange.empty;
	        /**
	         * The text ranges corresponding to the lines of content inside the comment.
	         */
	        this.lines = [];
	        /**
	         * A complete list of all tokens that were extracted from the input lines.
	         */
	        this.tokens = [];
	        this.configuration = configuration;
	        this.sourceRange = sourceRange;
	        this.docComment = new nodes.DocComment({ configuration: this.configuration });
	        this.log = new ParserMessageLog_1.ParserMessageLog();
	    }
	    return ParserContext;
	}());
	exports.ParserContext = ParserContext;

	});

	unwrapExports(ParserContext_1);
	var ParserContext_2 = ParserContext_1.ParserContext;

	var TokenSequence_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Represents a sequence of tokens extracted from `ParserContext.tokens`.
	 * This sequence is defined by a starting index and ending index into that array.
	 */
	var TokenSequence = /** @class */ (function () {
	    function TokenSequence(parameters) {
	        this.parserContext = parameters.parserContext;
	        this._startIndex = parameters.startIndex;
	        this._endIndex = parameters.endIndex;
	        this._validateBounds();
	    }
	    /**
	     * Constructs a TokenSequence object with no tokens.
	     */
	    TokenSequence.createEmpty = function (parserContext) {
	        return new TokenSequence({ parserContext: parserContext, startIndex: 0, endIndex: 0 });
	    };
	    Object.defineProperty(TokenSequence.prototype, "startIndex", {
	        /**
	         * The starting index into the associated `ParserContext.tokens` list.
	         */
	        get: function () {
	            return this._startIndex;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TokenSequence.prototype, "endIndex", {
	        /**
	         * The (non-inclusive) ending index into the associated `ParserContext.tokens` list.
	         */
	        get: function () {
	            return this._endIndex;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TokenSequence.prototype, "tokens", {
	        get: function () {
	            return this.parserContext.tokens.slice(this._startIndex, this._endIndex);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Constructs a TokenSequence that corresponds to a different range of tokens,
	     * e.g. a subrange.
	     */
	    TokenSequence.prototype.getNewSequence = function (startIndex, endIndex) {
	        return new TokenSequence({
	            parserContext: this.parserContext,
	            startIndex: startIndex,
	            endIndex: endIndex
	        });
	    };
	    /**
	     * Returns a TextRange that includes all tokens in the sequence (including any additional
	     * characters between doc comment lines).
	     */
	    TokenSequence.prototype.getContainingTextRange = function () {
	        if (this.isEmpty()) {
	            return TextRange_1.TextRange.empty;
	        }
	        return this.parserContext.sourceRange.getNewRange(this.parserContext.tokens[this._startIndex].range.pos, this.parserContext.tokens[this._endIndex - 1].range.end);
	    };
	    TokenSequence.prototype.isEmpty = function () {
	        return this._startIndex === this._endIndex;
	    };
	    /**
	     * Returns the concatenated text of all the tokens.
	     */
	    TokenSequence.prototype.toString = function () {
	        return this.tokens.map(function (x) { return x.toString(); }).join('');
	    };
	    TokenSequence.prototype._validateBounds = function () {
	        if (this.startIndex < 0) {
	            throw new Error('TokenSequence.startIndex cannot be negative');
	        }
	        if (this.endIndex < 0) {
	            throw new Error('TokenSequence.endIndex cannot be negative');
	        }
	        if (this.endIndex < this.startIndex) {
	            throw new Error('TokenSequence.endIndex cannot be smaller than TokenSequence.startIndex');
	        }
	        if (this.startIndex > this.parserContext.tokens.length) {
	            throw new Error('TokenSequence.startIndex cannot exceed the associated token array');
	        }
	        if (this.endIndex > this.parserContext.tokens.length) {
	            throw new Error('TokenSequence.endIndex cannot exceed the associated token array');
	        }
	    };
	    return TokenSequence;
	}());
	exports.TokenSequence = TokenSequence;

	});

	unwrapExports(TokenSequence_1);
	var TokenSequence_2 = TokenSequence_1.TokenSequence;

	var LineExtractor_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	// Internal parser state
	var State;
	(function (State) {
	    // Initial state, looking for "/*"
	    State[State["BeginComment1"] = 0] = "BeginComment1";
	    // Looking for "*" or "* " after "/*"
	    State[State["BeginComment2"] = 1] = "BeginComment2";
	    // Like State.CollectingLine except immediately after the "/**"
	    State[State["CollectingFirstLine"] = 2] = "CollectingFirstLine";
	    // Collecting characters until we reach a newline
	    State[State["CollectingLine"] = 3] = "CollectingLine";
	    // After a newline, looking for the "*" that begins a new line, or the "*/" to end the comment
	    State[State["AdvancingLine"] = 4] = "AdvancingLine";
	    // Exiting the parser loop
	    State[State["Done"] = 5] = "Done";
	})(State || (State = {}));
	/**
	 * The main API for parsing TSDoc comments.
	 */
	var LineExtractor = /** @class */ (function () {
	    function LineExtractor() {
	    }
	    /**
	     * This step parses an entire code comment from slash-star-star until star-slash,
	     * and extracts the content lines.  The lines are stored in IDocCommentParameters.lines
	     * and the overall text range is assigned to IDocCommentParameters.range.
	     */
	    LineExtractor.extract = function (parserContext) {
	        var range = parserContext.sourceRange;
	        var buffer = range.buffer;
	        var commentRangeStart = 0;
	        var commentRangeEnd = 0;
	        // These must be set before entering CollectingFirstLine, CollectingLine, or AdvancingLine
	        var collectingLineStart = 0;
	        var collectingLineEnd = 0;
	        var nextIndex = range.pos;
	        var state = State.BeginComment1;
	        var lines = [];
	        while (state !== State.Done) {
	            if (nextIndex >= range.end) {
	                // reached the end of the input
	                switch (state) {
	                    case State.BeginComment1:
	                    case State.BeginComment2:
	                        parserContext.log.addMessageForTextRange("tsdoc-comment-not-found" /* CommentNotFound */, 'Expecting a "/**" comment', range);
	                        return false;
	                    default:
	                        parserContext.log.addMessageForTextRange("tsdoc-comment-missing-closing-delimiter" /* CommentMissingClosingDelimiter */, 'Unexpected end of input', range);
	                        return false;
	                }
	            }
	            var current = buffer[nextIndex];
	            var currentIndex = nextIndex;
	            ++nextIndex;
	            var next = nextIndex < range.end ? buffer[nextIndex] : '';
	            switch (state) {
	                case State.BeginComment1:
	                    if (current === '/' && next === '*') {
	                        commentRangeStart = currentIndex;
	                        ++nextIndex; // skip the star
	                        state = State.BeginComment2;
	                    }
	                    else if (!LineExtractor._whitespaceCharacterRegExp.test(current)) {
	                        parserContext.log.addMessageForTextRange("tsdoc-comment-missing-opening-delimiter" /* CommentOpeningDelimiterSyntax */, 'Expecting a leading "/**"', range.getNewRange(currentIndex, currentIndex + 1));
	                        return false;
	                    }
	                    break;
	                case State.BeginComment2:
	                    if (current === '*') {
	                        if (next === ' ') {
	                            ++nextIndex; // Discard the space after the star
	                        }
	                        collectingLineStart = nextIndex;
	                        collectingLineEnd = nextIndex;
	                        state = State.CollectingFirstLine;
	                    }
	                    else {
	                        parserContext.log.addMessageForTextRange("tsdoc-comment-missing-opening-delimiter" /* CommentOpeningDelimiterSyntax */, 'Expecting a leading "/**"', range.getNewRange(currentIndex, currentIndex + 1));
	                        return false;
	                    }
	                    break;
	                case State.CollectingFirstLine:
	                case State.CollectingLine:
	                    if (current === '\n') {
	                        // Ignore an empty line if it is immediately after the "/**"
	                        if (state !== State.CollectingFirstLine || collectingLineEnd > collectingLineStart) {
	                            // Record the line that we collected
	                            lines.push(range.getNewRange(collectingLineStart, collectingLineEnd));
	                        }
	                        collectingLineStart = nextIndex;
	                        collectingLineEnd = nextIndex;
	                        state = State.AdvancingLine;
	                    }
	                    else if (current === '*' && next === '/') {
	                        if (collectingLineEnd > collectingLineStart) {
	                            lines.push(range.getNewRange(collectingLineStart, collectingLineEnd));
	                        }
	                        collectingLineStart = 0;
	                        collectingLineEnd = 0;
	                        ++nextIndex; // skip the slash
	                        commentRangeEnd = nextIndex;
	                        state = State.Done;
	                    }
	                    else if (!LineExtractor._whitespaceCharacterRegExp.test(current)) {
	                        collectingLineEnd = nextIndex;
	                    }
	                    break;
	                case State.AdvancingLine:
	                    if (current === '*') {
	                        if (next === '/') {
	                            collectingLineStart = 0;
	                            collectingLineEnd = 0;
	                            ++nextIndex; // skip the slash
	                            commentRangeEnd = nextIndex;
	                            state = State.Done;
	                        }
	                        else {
	                            // Discard the "*" at the start of a line
	                            if (next === ' ') {
	                                ++nextIndex; // Discard the space after the star
	                            }
	                            collectingLineStart = nextIndex;
	                            collectingLineEnd = nextIndex;
	                            state = State.CollectingLine;
	                        }
	                    }
	                    else if (current === '\n') {
	                        // Blank line
	                        lines.push(range.getNewRange(currentIndex, currentIndex));
	                        collectingLineStart = nextIndex;
	                    }
	                    else if (!LineExtractor._whitespaceCharacterRegExp.test(current)) {
	                        // If the star is missing, then start the line here
	                        // Example: "/**\nL1*/"
	                        // (collectingLineStart was the start of this line)
	                        collectingLineEnd = currentIndex;
	                        state = State.CollectingLine;
	                    }
	                    break;
	            }
	        }
	        /**
	         * Only fill in these if we successfully scanned a comment
	         */
	        parserContext.commentRange = range.getNewRange(commentRangeStart, commentRangeEnd);
	        parserContext.lines = lines;
	        return true;
	    };
	    LineExtractor._whitespaceCharacterRegExp = /^\s$/;
	    return LineExtractor;
	}());
	exports.LineExtractor = LineExtractor;

	});

	unwrapExports(LineExtractor_1);
	var LineExtractor_2 = LineExtractor_1.LineExtractor;

	var Tokenizer_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var Tokenizer = /** @class */ (function () {
	    function Tokenizer() {
	    }
	    /**
	     * Given a list of input lines, this returns an array of extracted tokens.
	     * The last token will always be TokenKind.EndOfInput.
	     */
	    Tokenizer.readTokens = function (lines) {
	        Tokenizer._ensureInitialized();
	        var tokens = [];
	        var lastLine = undefined;
	        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
	            var line = lines_1[_i];
	            Tokenizer._pushTokensForLine(tokens, line);
	            lastLine = line;
	        }
	        if (lastLine) {
	            tokens.push(new Token_1.Token(Token_1.TokenKind.EndOfInput, lastLine.getNewRange(lastLine.end, lastLine.end), lastLine));
	        }
	        else {
	            tokens.push(new Token_1.Token(Token_1.TokenKind.EndOfInput, TextRange_1.TextRange.empty, TextRange_1.TextRange.empty));
	        }
	        return tokens;
	    };
	    /**
	     * Returns true if the token is a CommonMark punctuation character.
	     * These are basically all the ASCII punctuation characters.
	     */
	    Tokenizer.isPunctuation = function (tokenKind) {
	        Tokenizer._ensureInitialized();
	        return Tokenizer._punctuationTokens[tokenKind] || false;
	    };
	    Tokenizer._pushTokensForLine = function (tokens, line) {
	        var buffer = line.buffer;
	        var end = line.end;
	        var bufferIndex = line.pos;
	        var tokenKind = undefined;
	        var tokenPos = bufferIndex;
	        while (bufferIndex < end) {
	            // Read a character and determine its kind
	            var charCode = buffer.charCodeAt(bufferIndex);
	            var characterKind = Tokenizer._charCodeMap[charCode];
	            if (characterKind === undefined) {
	                characterKind = Token_1.TokenKind.Other;
	            }
	            // Can we append to an existing token?  Yes if:
	            // 1. There is an existing token, AND
	            // 2. It is the same kind of token, AND
	            // 3. It's not punctuation (which is always one character)
	            if (tokenKind !== undefined
	                && characterKind === tokenKind
	                && Tokenizer._isMultiCharacterToken(tokenKind)) ;
	            else {
	                // Is there a previous completed token to push?
	                if (tokenKind !== undefined) {
	                    tokens.push(new Token_1.Token(tokenKind, line.getNewRange(tokenPos, bufferIndex), line));
	                }
	                tokenPos = bufferIndex;
	                tokenKind = characterKind;
	            }
	            ++bufferIndex;
	        }
	        // Is there a previous completed token to push?
	        if (tokenKind !== undefined) {
	            tokens.push(new Token_1.Token(tokenKind, line.getNewRange(tokenPos, bufferIndex), line));
	        }
	        tokens.push(new Token_1.Token(Token_1.TokenKind.Newline, line.getNewRange(line.end, line.end), line));
	    };
	    /**
	     * Returns true if the token can be comprised of multiple characters
	     */
	    Tokenizer._isMultiCharacterToken = function (kind) {
	        switch (kind) {
	            case Token_1.TokenKind.Spacing:
	            case Token_1.TokenKind.AsciiWord:
	            case Token_1.TokenKind.Other:
	                return true;
	        }
	        return false;
	    };
	    Tokenizer._ensureInitialized = function () {
	        if (Tokenizer._charCodeMap) {
	            return;
	        }
	        Tokenizer._charCodeMap = {};
	        Tokenizer._punctuationTokens = {};
	        // All Markdown punctuation characters
	        var punctuation = Tokenizer._commonMarkPunctuationCharacters;
	        for (var i = 0; i < punctuation.length; ++i) {
	            var charCode = punctuation.charCodeAt(i);
	            Tokenizer._charCodeMap[charCode] = Token_1.TokenKind.OtherPunctuation;
	        }
	        // Special symbols
	        // !"#$%&\'()*+,\-.\/:;<=>?@[\\]^_`{|}~
	        var specialMap = {
	            '\\': Token_1.TokenKind.Backslash,
	            '<': Token_1.TokenKind.LessThan,
	            '>': Token_1.TokenKind.GreaterThan,
	            '=': Token_1.TokenKind.Equals,
	            '\'': Token_1.TokenKind.SingleQuote,
	            '"': Token_1.TokenKind.DoubleQuote,
	            '/': Token_1.TokenKind.Slash,
	            '-': Token_1.TokenKind.Hyphen,
	            '@': Token_1.TokenKind.AtSign,
	            '{': Token_1.TokenKind.LeftCurlyBracket,
	            '}': Token_1.TokenKind.RightCurlyBracket,
	            '`': Token_1.TokenKind.Backtick,
	            '.': Token_1.TokenKind.Period,
	            ':': Token_1.TokenKind.Colon,
	            ',': Token_1.TokenKind.Comma,
	            '[': Token_1.TokenKind.LeftSquareBracket,
	            ']': Token_1.TokenKind.RightSquareBracket,
	            '|': Token_1.TokenKind.Pipe,
	            '(': Token_1.TokenKind.LeftParenthesis,
	            ')': Token_1.TokenKind.RightParenthesis,
	            '#': Token_1.TokenKind.PoundSymbol,
	            '+': Token_1.TokenKind.Plus,
	            '$': Token_1.TokenKind.DollarSign
	        };
	        for (var _i = 0, _a = Object.getOwnPropertyNames(specialMap); _i < _a.length; _i++) {
	            var key = _a[_i];
	            Tokenizer._charCodeMap[key.charCodeAt(0)] = specialMap[key];
	            Tokenizer._punctuationTokens[specialMap[key]] = true;
	        }
	        Tokenizer._punctuationTokens[Token_1.TokenKind.OtherPunctuation] = true;
	        var word = Tokenizer._wordCharacters;
	        for (var i = 0; i < word.length; ++i) {
	            var charCode = word.charCodeAt(i);
	            Tokenizer._charCodeMap[charCode] = Token_1.TokenKind.AsciiWord;
	        }
	        Tokenizer._charCodeMap[' '.charCodeAt(0)] = Token_1.TokenKind.Spacing;
	        Tokenizer._charCodeMap['\t'.charCodeAt(0)] = Token_1.TokenKind.Spacing;
	    };
	    Tokenizer._commonMarkPunctuationCharacters = '!"#$%&\'()*+,\-.\/:;<=>?@[\\]^`{|}~';
	    Tokenizer._wordCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
	    return Tokenizer;
	}());
	exports.Tokenizer = Tokenizer;

	});

	unwrapExports(Tokenizer_1);
	var Tokenizer_2 = Tokenizer_1.Tokenizer;

	var TokenReader_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Manages a stream of tokens that are read by the parser.
	 *
	 * @remarks
	 * Use TokenReader.readToken() to read a token and advance the stream pointer.
	 * Use TokenReader.peekToken() to preview the next token.
	 * Use TokenReader.createMarker() and backtrackToMarker() to rewind to an earlier point.
	 * Whenever readToken() is called, the token is added to an accumulated TokenSequence
	 * that can be extracted by calling extractAccumulatedSequence().
	 */
	var TokenReader = /** @class */ (function () {
	    function TokenReader(parserContext, embeddedTokenSequence) {
	        this._parserContext = parserContext;
	        this.tokens = parserContext.tokens;
	        if (embeddedTokenSequence) {
	            if (embeddedTokenSequence.parserContext !== this._parserContext) {
	                throw new Error('The embeddedTokenSequence must use the same parser context');
	            }
	            this._readerStartIndex = embeddedTokenSequence.startIndex;
	            this._readerEndIndex = embeddedTokenSequence.endIndex;
	        }
	        else {
	            this._readerStartIndex = 0;
	            this._readerEndIndex = this.tokens.length;
	        }
	        this._currentIndex = this._readerStartIndex;
	        this._accumulatedStartIndex = this._readerStartIndex;
	    }
	    /**
	     * Extracts and returns the TokenSequence that was accumulated so far by calls to readToken().
	     * The next call to readToken() will start a new accumulated sequence.
	     */
	    TokenReader.prototype.extractAccumulatedSequence = function () {
	        if (this._accumulatedStartIndex === this._currentIndex) {
	            // If this happens, it indicates a parser bug:
	            throw new Error('Parser assertion failed: The queue should not be empty when'
	                + ' extractAccumulatedSequence() is called');
	        }
	        var sequence = new TokenSequence_1.TokenSequence({
	            parserContext: this._parserContext,
	            startIndex: this._accumulatedStartIndex,
	            endIndex: this._currentIndex
	        });
	        this._accumulatedStartIndex = this._currentIndex;
	        return sequence;
	    };
	    /**
	     * Returns true if the accumulated sequence has any tokens yet.  This will be false
	     * when the TokenReader starts, and it will be false immediately after a call
	     * to extractAccumulatedSequence().  Otherwise, it will become true whenever readToken()
	     * is called.
	     */
	    TokenReader.prototype.isAccumulatedSequenceEmpty = function () {
	        return this._accumulatedStartIndex === this._currentIndex;
	    };
	    /**
	     * Like extractAccumulatedSequence(), but returns undefined if nothing has been
	     * accumulated yet.
	     */
	    TokenReader.prototype.tryExtractAccumulatedSequence = function () {
	        if (this.isAccumulatedSequenceEmpty()) {
	            return undefined;
	        }
	        return this.extractAccumulatedSequence();
	    };
	    /**
	     * Asserts that isAccumulatedSequenceEmpty() should return false.  If not, an exception
	     * is throw indicating a parser bug.
	     */
	    TokenReader.prototype.assertAccumulatedSequenceIsEmpty = function () {
	        if (!this.isAccumulatedSequenceEmpty()) {
	            // If this happens, it indicates a parser bug:
	            var sequence = new TokenSequence_1.TokenSequence({
	                parserContext: this._parserContext,
	                startIndex: this._accumulatedStartIndex,
	                endIndex: this._currentIndex
	            });
	            var tokenStrings = sequence.tokens.map(function (x) { return x.toString(); });
	            throw new Error('Parser assertion failed: The queue should be empty, but it contains:\n'
	                + JSON.stringify(tokenStrings));
	        }
	    };
	    /**
	     * Returns the next token that would be returned by _readToken(), without
	     * consuming anything.
	     */
	    TokenReader.prototype.peekToken = function () {
	        return this.tokens[this._currentIndex];
	    };
	    /**
	     * Returns the TokenKind for the next token that would be returned by _readToken(), without
	     * consuming anything.
	     */
	    TokenReader.prototype.peekTokenKind = function () {
	        if (this._currentIndex >= this._readerEndIndex) {
	            return Token_1.TokenKind.EndOfInput;
	        }
	        return this.tokens[this._currentIndex].kind;
	    };
	    /**
	     * Like peekTokenKind(), but looks ahead two tokens.
	     */
	    TokenReader.prototype.peekTokenAfterKind = function () {
	        if (this._currentIndex + 1 >= this._readerEndIndex) {
	            return Token_1.TokenKind.EndOfInput;
	        }
	        return this.tokens[this._currentIndex + 1].kind;
	    };
	    /**
	     * Like peekTokenKind(), but looks ahead three tokens.
	     */
	    TokenReader.prototype.peekTokenAfterAfterKind = function () {
	        if (this._currentIndex + 2 >= this._readerEndIndex) {
	            return Token_1.TokenKind.EndOfInput;
	        }
	        return this.tokens[this._currentIndex + 2].kind;
	    };
	    /**
	     * Extract the next token from the input stream and return it.
	     * The token will also be appended to the accumulated sequence, which can
	     * later be accessed via extractAccumulatedSequence().
	     */
	    TokenReader.prototype.readToken = function () {
	        if (this._currentIndex >= this._readerEndIndex) {
	            // If this happens, it's a parser bug
	            throw new Error('Cannot read past end of stream');
	        }
	        var token = this.tokens[this._currentIndex];
	        if (token.kind === Token_1.TokenKind.EndOfInput) {
	            // We don't allow reading the EndOfInput token, because we want _peekToken()
	            // to be always guaranteed to return a valid result.
	            // If this happens, it's a parser bug
	            throw new Error('The EndOfInput token cannot be read');
	        }
	        this._currentIndex++;
	        return token;
	    };
	    /**
	     * Returns the kind of the token immediately before the current token.
	     */
	    TokenReader.prototype.peekPreviousTokenKind = function () {
	        if (this._currentIndex === 0) {
	            return Token_1.TokenKind.EndOfInput;
	        }
	        return this.tokens[this._currentIndex - 1].kind;
	    };
	    /**
	     * Remembers the current position in the stream.
	     */
	    TokenReader.prototype.createMarker = function () {
	        return this._currentIndex;
	    };
	    /**
	     * Rewinds the stream pointer to a previous position in the stream.
	     */
	    TokenReader.prototype.backtrackToMarker = function (marker) {
	        if (marker > this._currentIndex) {
	            // If this happens, it's a parser bug
	            throw new Error('The marker has expired');
	        }
	        this._currentIndex = marker;
	        if (marker < this._accumulatedStartIndex) {
	            this._accumulatedStartIndex = marker;
	        }
	    };
	    return TokenReader;
	}());
	exports.TokenReader = TokenReader;

	});

	unwrapExports(TokenReader_1);
	var TokenReader_2 = TokenReader_1.TokenReader;

	var NodeParser_1 = createCommonjsModule(function (module, exports) {
	/* eslint-disable max-lines */
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });









	function isFailure(resultOrFailure) {
	    return resultOrFailure !== undefined && Object.hasOwnProperty.call(resultOrFailure, 'failureMessage');
	}
	/**
	 * The main parser for TSDoc comments.
	 */
	var NodeParser = /** @class */ (function () {
	    function NodeParser(parserContext) {
	        this._parserContext = parserContext;
	        this._configuration = parserContext.configuration;
	        this._currentSection = parserContext.docComment.summarySection;
	    }
	    NodeParser.prototype.parse = function () {
	        var tokenReader = new TokenReader_1.TokenReader(this._parserContext);
	        var done = false;
	        while (!done) {
	            // Extract the next token
	            switch (tokenReader.peekTokenKind()) {
	                case Token_1.TokenKind.EndOfInput:
	                    done = true;
	                    break;
	                case Token_1.TokenKind.Newline:
	                    this._pushAccumulatedPlainText(tokenReader);
	                    tokenReader.readToken();
	                    this._pushNode(new nodes.DocSoftBreak({
	                        parsed: true,
	                        configuration: this._configuration,
	                        softBreakExcerpt: tokenReader.extractAccumulatedSequence()
	                    }));
	                    break;
	                case Token_1.TokenKind.Backslash:
	                    this._pushAccumulatedPlainText(tokenReader);
	                    this._pushNode(this._parseBackslashEscape(tokenReader));
	                    break;
	                case Token_1.TokenKind.AtSign:
	                    this._pushAccumulatedPlainText(tokenReader);
	                    this._parseAndPushBlock(tokenReader);
	                    break;
	                case Token_1.TokenKind.LeftCurlyBracket: {
	                    this._pushAccumulatedPlainText(tokenReader);
	                    var marker = tokenReader.createMarker();
	                    var docNode = this._parseInlineTag(tokenReader);
	                    var docComment = this._parserContext.docComment;
	                    if (docNode instanceof nodes.DocInheritDocTag) {
	                        // The @inheritDoc tag is irregular because it looks like an inline tag, but
	                        // it actually represents the entire comment body
	                        var tagEndMarker = tokenReader.createMarker() - 1;
	                        if (docComment.inheritDocTag === undefined) {
	                            this._parserContext.docComment.inheritDocTag = docNode;
	                        }
	                        else {
	                            this._pushNode(this._backtrackAndCreateErrorRange(tokenReader, marker, tagEndMarker, "tsdoc-extra-inheritdoc-tag" /* ExtraInheritDocTag */, 'A doc comment cannot have more than one @inheritDoc tag'));
	                        }
	                    }
	                    else {
	                        this._pushNode(docNode);
	                    }
	                    break;
	                }
	                case Token_1.TokenKind.RightCurlyBracket:
	                    this._pushAccumulatedPlainText(tokenReader);
	                    this._pushNode(this._createError(tokenReader, "tsdoc-escape-right-brace" /* EscapeRightBrace */, 'The "}" character should be escaped using a backslash to avoid confusion with a TSDoc inline tag'));
	                    break;
	                case Token_1.TokenKind.LessThan:
	                    this._pushAccumulatedPlainText(tokenReader);
	                    // Look ahead two tokens to see if this is "<a>" or "</a>".
	                    if (tokenReader.peekTokenAfterKind() === Token_1.TokenKind.Slash) {
	                        this._pushNode(this._parseHtmlEndTag(tokenReader));
	                    }
	                    else {
	                        this._pushNode(this._parseHtmlStartTag(tokenReader));
	                    }
	                    break;
	                case Token_1.TokenKind.GreaterThan:
	                    this._pushAccumulatedPlainText(tokenReader);
	                    this._pushNode(this._createError(tokenReader, "tsdoc-escape-greater-than" /* EscapeGreaterThan */, 'The ">" character should be escaped using a backslash to avoid confusion with an HTML tag'));
	                    break;
	                case Token_1.TokenKind.Backtick:
	                    this._pushAccumulatedPlainText(tokenReader);
	                    if (tokenReader.peekTokenAfterKind() === Token_1.TokenKind.Backtick
	                        && tokenReader.peekTokenAfterAfterKind() === Token_1.TokenKind.Backtick) {
	                        this._pushNode(this._parseFencedCode(tokenReader));
	                    }
	                    else {
	                        this._pushNode(this._parseCodeSpan(tokenReader));
	                    }
	                    break;
	                default:
	                    // If nobody recognized this token, then accumulate plain text
	                    tokenReader.readToken();
	                    break;
	            }
	        }
	        this._pushAccumulatedPlainText(tokenReader);
	        this._performValidationChecks();
	    };
	    NodeParser.prototype._performValidationChecks = function () {
	        var docComment = this._parserContext.docComment;
	        if (docComment.deprecatedBlock) {
	            if (!PlainTextEmitter_1.PlainTextEmitter.hasAnyTextContent(docComment.deprecatedBlock)) {
	                this._parserContext.log.addMessageForTokenSequence("tsdoc-missing-deprecation-message" /* MissingDeprecationMessage */, "The " + docComment.deprecatedBlock.blockTag.tagName + " block must include a deprecation message,"
	                    + " e.g. describing the recommended alternative", docComment.deprecatedBlock.blockTag.getTokenSequence(), docComment.deprecatedBlock);
	            }
	        }
	        if (docComment.inheritDocTag) {
	            if (docComment.remarksBlock) {
	                this._parserContext.log.addMessageForTokenSequence("tsdoc-inheritdoc-incompatible-tag" /* InheritDocIncompatibleTag */, "A \"" + docComment.remarksBlock.blockTag.tagName + "\" block must not be used, because that"
	                    + " content is provided by the @inheritDoc tag", docComment.remarksBlock.blockTag.getTokenSequence(), docComment.remarksBlock.blockTag);
	            }
	            if (PlainTextEmitter_1.PlainTextEmitter.hasAnyTextContent(docComment.summarySection)) {
	                this._parserContext.log.addMessageForTextRange("tsdoc-inheritdoc-incompatible-summary" /* InheritDocIncompatibleSummary */, 'The summary section must not have any content, because that'
	                    + ' content is provided by the @inheritDoc tag', this._parserContext.commentRange);
	            }
	        }
	    };
	    NodeParser.prototype._validateTagDefinition = function (tagDefinition, tagName, expectingInlineTag, tokenSequenceForErrorContext, nodeForErrorContext) {
	        if (tagDefinition) {
	            var isInlineTag = tagDefinition.syntaxKind === TSDocTagDefinition_1.TSDocTagSyntaxKind.InlineTag;
	            if (isInlineTag !== expectingInlineTag) {
	                // The tag is defined, but it is used incorrectly
	                if (expectingInlineTag) {
	                    this._parserContext.log.addMessageForTokenSequence("tsdoc-inline-tag-missing-braces" /* InlineTagMissingBraces */, "The TSDoc tag \"" + tagName + "\" is an inline tag; it must be enclosed in \"{ }\" braces", tokenSequenceForErrorContext, nodeForErrorContext);
	                }
	                else {
	                    this._parserContext.log.addMessageForTokenSequence("tsdoc-tag-should-not-have-braces" /* TagShouldNotHaveBraces */, "The TSDoc tag \"" + tagName + "\" is not an inline tag; it must not be enclosed in \"{ }\" braces", tokenSequenceForErrorContext, nodeForErrorContext);
	                }
	            }
	            else {
	                if (this._parserContext.configuration.validation.reportUnsupportedTags) {
	                    if (!this._parserContext.configuration.isTagSupported(tagDefinition)) {
	                        // The tag is defined, but not supported
	                        this._parserContext.log.addMessageForTokenSequence("tsdoc-unsupported-tag" /* UnsupportedTag */, "The TSDoc tag \"" + tagName + "\" is not supported by this tool", tokenSequenceForErrorContext, nodeForErrorContext);
	                    }
	                }
	            }
	        }
	        else {
	            // The tag is not defined
	            if (!this._parserContext.configuration.validation.ignoreUndefinedTags) {
	                this._parserContext.log.addMessageForTokenSequence("tsdoc-undefined-tag" /* UndefinedTag */, "The TSDoc tag \"" + tagName + "\" is not defined in this configuration", tokenSequenceForErrorContext, nodeForErrorContext);
	            }
	        }
	    };
	    NodeParser.prototype._pushAccumulatedPlainText = function (tokenReader) {
	        if (!tokenReader.isAccumulatedSequenceEmpty()) {
	            this._pushNode(new nodes.DocPlainText({
	                parsed: true,
	                configuration: this._configuration,
	                textExcerpt: tokenReader.extractAccumulatedSequence()
	            }));
	        }
	    };
	    NodeParser.prototype._parseAndPushBlock = function (tokenReader) {
	        var docComment = this._parserContext.docComment;
	        var configuration = this._parserContext.configuration;
	        var modifierTagSet = docComment.modifierTagSet;
	        var parsedBlockTag = this._parseBlockTag(tokenReader);
	        if (parsedBlockTag.kind !== "BlockTag" /* BlockTag */) {
	            this._pushNode(parsedBlockTag);
	            return;
	        }
	        var docBlockTag = parsedBlockTag;
	        // Do we have a definition for this tag?
	        var tagDefinition = configuration.tryGetTagDefinitionWithUpperCase(docBlockTag.tagNameWithUpperCase);
	        this._validateTagDefinition(tagDefinition, docBlockTag.tagName, /* expectingInlineTag */ false, docBlockTag.getTokenSequence(), docBlockTag);
	        if (tagDefinition) {
	            switch (tagDefinition.syntaxKind) {
	                case TSDocTagDefinition_1.TSDocTagSyntaxKind.BlockTag:
	                    if (docBlockTag.tagNameWithUpperCase === StandardTags_1.StandardTags.param.tagNameWithUpperCase) {
	                        var docParamBlock = this._parseParamBlock(tokenReader, docBlockTag, StandardTags_1.StandardTags.param.tagName);
	                        this._parserContext.docComment.params.add(docParamBlock);
	                        this._currentSection = docParamBlock.content;
	                        return;
	                    }
	                    else if (docBlockTag.tagNameWithUpperCase === StandardTags_1.StandardTags.typeParam.tagNameWithUpperCase) {
	                        var docParamBlock = this._parseParamBlock(tokenReader, docBlockTag, StandardTags_1.StandardTags.typeParam.tagName);
	                        this._parserContext.docComment.typeParams.add(docParamBlock);
	                        this._currentSection = docParamBlock.content;
	                        return;
	                    }
	                    else {
	                        var newBlock = new nodes.DocBlock({
	                            configuration: this._configuration,
	                            blockTag: docBlockTag
	                        });
	                        this._addBlockToDocComment(newBlock);
	                        this._currentSection = newBlock.content;
	                    }
	                    return;
	                case TSDocTagDefinition_1.TSDocTagSyntaxKind.ModifierTag:
	                    // The block tag was recognized as a modifier, so add it to the modifier tag set
	                    // and do NOT call currentSection.appendNode(parsedNode)
	                    modifierTagSet.addTag(docBlockTag);
	                    return;
	            }
	        }
	        this._pushNode(docBlockTag);
	    };
	    NodeParser.prototype._addBlockToDocComment = function (block) {
	        var docComment = this._parserContext.docComment;
	        switch (block.blockTag.tagNameWithUpperCase) {
	            case StandardTags_1.StandardTags.remarks.tagNameWithUpperCase:
	                docComment.remarksBlock = block;
	                break;
	            case StandardTags_1.StandardTags.privateRemarks.tagNameWithUpperCase:
	                docComment.privateRemarks = block;
	                break;
	            case StandardTags_1.StandardTags.deprecated.tagNameWithUpperCase:
	                docComment.deprecatedBlock = block;
	                break;
	            case StandardTags_1.StandardTags.returns.tagNameWithUpperCase:
	                docComment.returnsBlock = block;
	                break;
	            default:
	                docComment.appendCustomBlock(block);
	        }
	    };
	    /**
	     * Used by `_parseParamBlock()`, this parses a JSDoc expression remainder like `string}` or `="]"]` from
	     * an input like `@param {string} [x="]"] - the X value`.  It detects nested balanced pairs of delimiters
	     * and escaped string literals.
	     */
	    NodeParser.prototype._tryParseJSDocTypeOrValueRest = function (tokenReader, openKind, closeKind, startMarker) {
	        var quoteKind;
	        var openCount = 1;
	        while (openCount > 0) {
	            var tokenKind = tokenReader.peekTokenKind();
	            switch (tokenKind) {
	                case openKind:
	                    // ignore open bracket/brace inside of a quoted string
	                    if (quoteKind === undefined)
	                        openCount++;
	                    break;
	                case closeKind:
	                    // ignore close bracket/brace inside of a quoted string
	                    if (quoteKind === undefined)
	                        openCount--;
	                    break;
	                case Token_1.TokenKind.Backslash:
	                    // ignore backslash outside of quoted string
	                    if (quoteKind !== undefined) {
	                        // skip the backslash and the next character.
	                        tokenReader.readToken();
	                        tokenKind = tokenReader.peekTokenKind();
	                    }
	                    break;
	                case Token_1.TokenKind.DoubleQuote:
	                case Token_1.TokenKind.SingleQuote:
	                case Token_1.TokenKind.Backtick:
	                    if (quoteKind === tokenKind) {
	                        // exit quoted string if quote character matches.
	                        quoteKind = undefined;
	                    }
	                    else if (quoteKind === undefined) {
	                        // start quoted string if not in a quoted string.
	                        quoteKind = tokenKind;
	                    }
	                    break;
	            }
	            // give up at end of input and backtrack to start.
	            if (tokenKind === Token_1.TokenKind.EndOfInput) {
	                tokenReader.backtrackToMarker(startMarker);
	                return undefined;
	            }
	            tokenReader.readToken();
	        }
	        return tokenReader.tryExtractAccumulatedSequence();
	    };
	    /**
	     * Used by `_parseParamBlock()`, this parses a JSDoc expression like `{string}` from
	     * an input like `@param {string} x - the X value`.
	     */
	    NodeParser.prototype._tryParseUnsupportedJSDocType = function (tokenReader, docBlockTag, tagName) {
	        tokenReader.assertAccumulatedSequenceIsEmpty();
	        // do not parse `{@...` as a JSDoc type
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.LeftCurlyBracket ||
	            tokenReader.peekTokenAfterKind() === Token_1.TokenKind.AtSign) {
	            return undefined;
	        }
	        var startMarker = tokenReader.createMarker();
	        tokenReader.readToken(); // read the "{"
	        var jsdocTypeExcerpt = this._tryParseJSDocTypeOrValueRest(tokenReader, Token_1.TokenKind.LeftCurlyBracket, Token_1.TokenKind.RightCurlyBracket, startMarker);
	        if (jsdocTypeExcerpt) {
	            this._parserContext.log.addMessageForTokenSequence("tsdoc-param-tag-with-invalid-type" /* ParamTagWithInvalidType */, 'The ' + tagName + ' block should not include a JSDoc-style \'{type}\'', jsdocTypeExcerpt, docBlockTag);
	            var spacingAfterJsdocTypeExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	            if (spacingAfterJsdocTypeExcerpt) {
	                jsdocTypeExcerpt = jsdocTypeExcerpt.getNewSequence(jsdocTypeExcerpt.startIndex, spacingAfterJsdocTypeExcerpt.endIndex);
	            }
	        }
	        return jsdocTypeExcerpt;
	    };
	    /**
	     * Used by `_parseParamBlock()`, this parses a JSDoc expression remainder like `=[]]` from
	     * an input like `@param {string} [x=[]] - the X value`.
	     */
	    NodeParser.prototype._tryParseJSDocOptionalNameRest = function (tokenReader) {
	        tokenReader.assertAccumulatedSequenceIsEmpty();
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.EndOfInput) {
	            var startMarker = tokenReader.createMarker();
	            return this._tryParseJSDocTypeOrValueRest(tokenReader, Token_1.TokenKind.LeftSquareBracket, Token_1.TokenKind.RightSquareBracket, startMarker);
	        }
	        return undefined;
	    };
	    NodeParser.prototype._parseParamBlock = function (tokenReader, docBlockTag, tagName) {
	        var startMarker = tokenReader.createMarker();
	        var spacingBeforeParameterNameExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        // Skip past a JSDoc type (i.e., '@param {type} paramName') if found, and report a warning.
	        var unsupportedJsdocTypeBeforeParameterNameExcerpt = this._tryParseUnsupportedJSDocType(tokenReader, docBlockTag, tagName);
	        // Parse opening of invalid JSDoc optional parameter name (e.g., '[')
	        var unsupportedJsdocOptionalNameOpenBracketExcerpt;
	        if (tokenReader.peekTokenKind() === Token_1.TokenKind.LeftSquareBracket) {
	            tokenReader.readToken(); // read the "["
	            unsupportedJsdocOptionalNameOpenBracketExcerpt = tokenReader.extractAccumulatedSequence();
	        }
	        var parameterName = '';
	        var done = false;
	        while (!done) {
	            switch (tokenReader.peekTokenKind()) {
	                case Token_1.TokenKind.AsciiWord:
	                case Token_1.TokenKind.Period:
	                case Token_1.TokenKind.DollarSign:
	                    parameterName += tokenReader.readToken();
	                    break;
	                default:
	                    done = true;
	                    break;
	            }
	        }
	        var explanation = StringChecks_1.StringChecks.explainIfInvalidUnquotedIdentifier(parameterName);
	        if (explanation !== undefined) {
	            tokenReader.backtrackToMarker(startMarker);
	            var errorParamBlock = new nodes.DocParamBlock({
	                configuration: this._configuration,
	                blockTag: docBlockTag,
	                parameterName: ''
	            });
	            var errorMessage = parameterName.length > 0
	                ? 'The ' + tagName + ' block should be followed by a valid parameter name: ' + explanation
	                : 'The ' + tagName + ' block should be followed by a parameter name';
	            this._parserContext.log.addMessageForTokenSequence("tsdoc-param-tag-with-invalid-name" /* ParamTagWithInvalidName */, errorMessage, docBlockTag.getTokenSequence(), docBlockTag);
	            return errorParamBlock;
	        }
	        var parameterNameExcerpt = tokenReader.extractAccumulatedSequence();
	        // Parse closing of invalid JSDoc optional parameter name (e.g., ']', '=default]').
	        var unsupportedJsdocOptionalNameRestExcerpt;
	        if (unsupportedJsdocOptionalNameOpenBracketExcerpt) {
	            unsupportedJsdocOptionalNameRestExcerpt = this._tryParseJSDocOptionalNameRest(tokenReader);
	            var errorSequence = unsupportedJsdocOptionalNameOpenBracketExcerpt;
	            if (unsupportedJsdocOptionalNameRestExcerpt) {
	                errorSequence = docBlockTag.getTokenSequence().getNewSequence(unsupportedJsdocOptionalNameOpenBracketExcerpt.startIndex, unsupportedJsdocOptionalNameRestExcerpt.endIndex);
	            }
	            this._parserContext.log.addMessageForTokenSequence("tsdoc-param-tag-with-invalid-optional-name" /* ParamTagWithInvalidOptionalName */, 'The ' + tagName + ' should not include a JSDoc-style optional name; it must not be enclosed in \'[ ]\' brackets.', errorSequence, docBlockTag);
	        }
	        var spacingAfterParameterNameExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        // Skip past a trailing JSDoc type (i.e., '@param paramName {type}') if found, and report a warning.
	        var unsupportedJsdocTypeAfterParameterNameExcerpt = this._tryParseUnsupportedJSDocType(tokenReader, docBlockTag, tagName);
	        // TODO: Warn if there is no space before or after the hyphen
	        var hyphenExcerpt;
	        var spacingAfterHyphenExcerpt;
	        var unsupportedJsdocTypeAfterHyphenExcerpt;
	        if (tokenReader.peekTokenKind() === Token_1.TokenKind.Hyphen) {
	            tokenReader.readToken();
	            hyphenExcerpt = tokenReader.extractAccumulatedSequence();
	            // TODO: Only read one space
	            spacingAfterHyphenExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	            // Skip past a JSDoc type (i.e., '@param paramName - {type}') if found, and report a warning.
	            unsupportedJsdocTypeAfterHyphenExcerpt = this._tryParseUnsupportedJSDocType(tokenReader, docBlockTag, tagName);
	        }
	        else {
	            this._parserContext.log.addMessageForTokenSequence("tsdoc-param-tag-missing-hyphen" /* ParamTagMissingHyphen */, 'The ' + tagName + ' block should be followed by a parameter name and then a hyphen', docBlockTag.getTokenSequence(), docBlockTag);
	        }
	        return new nodes.DocParamBlock({
	            parsed: true,
	            configuration: this._configuration,
	            blockTag: docBlockTag,
	            spacingBeforeParameterNameExcerpt: spacingBeforeParameterNameExcerpt,
	            unsupportedJsdocTypeBeforeParameterNameExcerpt: unsupportedJsdocTypeBeforeParameterNameExcerpt,
	            unsupportedJsdocOptionalNameOpenBracketExcerpt: unsupportedJsdocOptionalNameOpenBracketExcerpt,
	            parameterNameExcerpt: parameterNameExcerpt,
	            parameterName: parameterName,
	            unsupportedJsdocOptionalNameRestExcerpt: unsupportedJsdocOptionalNameRestExcerpt,
	            spacingAfterParameterNameExcerpt: spacingAfterParameterNameExcerpt,
	            unsupportedJsdocTypeAfterParameterNameExcerpt: unsupportedJsdocTypeAfterParameterNameExcerpt,
	            hyphenExcerpt: hyphenExcerpt,
	            spacingAfterHyphenExcerpt: spacingAfterHyphenExcerpt,
	            unsupportedJsdocTypeAfterHyphenExcerpt: unsupportedJsdocTypeAfterHyphenExcerpt
	        });
	    };
	    NodeParser.prototype._pushNode = function (docNode) {
	        if (this._configuration.docNodeManager.isAllowedChild("Paragraph" /* Paragraph */, docNode.kind)) {
	            this._currentSection.appendNodeInParagraph(docNode);
	        }
	        else {
	            this._currentSection.appendNode(docNode);
	        }
	    };
	    NodeParser.prototype._parseBackslashEscape = function (tokenReader) {
	        tokenReader.assertAccumulatedSequenceIsEmpty();
	        var marker = tokenReader.createMarker();
	        tokenReader.readToken(); // read the backslash
	        if (tokenReader.peekTokenKind() === Token_1.TokenKind.EndOfInput) {
	            return this._backtrackAndCreateError(tokenReader, marker, "tsdoc-unnecessary-backslash" /* UnnecessaryBackslash */, 'A backslash must precede another character that is being escaped');
	        }
	        var escapedToken = tokenReader.readToken(); // read the escaped character
	        // In CommonMark, a backslash is only allowed before a punctuation
	        // character.  In all other contexts, the backslash is interpreted as a
	        // literal character.
	        if (!Tokenizer_1.Tokenizer.isPunctuation(escapedToken.kind)) {
	            return this._backtrackAndCreateError(tokenReader, marker, "tsdoc-unnecessary-backslash" /* UnnecessaryBackslash */, 'A backslash can only be used to escape a punctuation character');
	        }
	        var encodedTextExcerpt = tokenReader.extractAccumulatedSequence();
	        return new nodes.DocEscapedText({
	            parsed: true,
	            configuration: this._configuration,
	            escapeStyle: nodes.EscapeStyle.CommonMarkBackslash,
	            encodedTextExcerpt: encodedTextExcerpt,
	            decodedText: escapedToken.toString()
	        });
	    };
	    NodeParser.prototype._parseBlockTag = function (tokenReader) {
	        tokenReader.assertAccumulatedSequenceIsEmpty();
	        var marker = tokenReader.createMarker();
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.AtSign) {
	            return this._backtrackAndCreateError(tokenReader, marker, "tsdoc-missing-tag" /* MissingTag */, 'Expecting a TSDoc tag starting with "@"');
	        }
	        // "@one" is a valid TSDoc tag at the start of a line, but "@one@two" is
	        // a syntax error.  For two tags it should be "@one @two", or for literal text it
	        // should be "\@one\@two".
	        switch (tokenReader.peekPreviousTokenKind()) {
	            case Token_1.TokenKind.EndOfInput:
	            case Token_1.TokenKind.Spacing:
	            case Token_1.TokenKind.Newline:
	                break;
	            default:
	                return this._backtrackAndCreateError(tokenReader, marker, "tsdoc-at-sign-in-word" /* AtSignInWord */, 'The "@" character looks like part of a TSDoc tag; use a backslash to escape it');
	        }
	        // Include the "@" as part of the tagName
	        var tagName = tokenReader.readToken().toString();
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.AsciiWord) {
	            return this._backtrackAndCreateError(tokenReader, marker, "tsdoc-at-sign-without-tag-name" /* AtSignWithoutTagName */, 'Expecting a TSDoc tag name after "@"; if it is not a tag, use a backslash to escape this character');
	        }
	        var tagNameMarker = tokenReader.createMarker();
	        while (tokenReader.peekTokenKind() === Token_1.TokenKind.AsciiWord) {
	            tagName += tokenReader.readToken().toString();
	        }
	        switch (tokenReader.peekTokenKind()) {
	            case Token_1.TokenKind.Spacing:
	            case Token_1.TokenKind.Newline:
	            case Token_1.TokenKind.EndOfInput:
	                break;
	            default:
	                var badCharacter = tokenReader.peekToken().range.toString()[0];
	                return this._backtrackAndCreateError(tokenReader, marker, "tsdoc-characters-after-block-tag" /* CharactersAfterBlockTag */, "The token \"" + tagName + "\" looks like a TSDoc tag but contains an invalid character"
	                    + (" " + JSON.stringify(badCharacter) + "; if it is not a tag, use a backslash to escape the \"@\""));
	        }
	        if (StringChecks_1.StringChecks.explainIfInvalidTSDocTagName(tagName)) {
	            var failure = this._createFailureForTokensSince(tokenReader, "tsdoc-malformed-tag-name" /* MalformedTagName */, 'A TSDoc tag name must start with a letter and contain only letters and numbers', tagNameMarker);
	            return this._backtrackAndCreateErrorForFailure(tokenReader, marker, '', failure);
	        }
	        return new nodes.DocBlockTag({
	            parsed: true,
	            configuration: this._configuration,
	            tagName: tagName,
	            tagNameExcerpt: tokenReader.extractAccumulatedSequence()
	        });
	    };
	    NodeParser.prototype._parseInlineTag = function (tokenReader) {
	        tokenReader.assertAccumulatedSequenceIsEmpty();
	        var marker = tokenReader.createMarker();
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.LeftCurlyBracket) {
	            return this._backtrackAndCreateError(tokenReader, marker, "tsdoc-missing-tag" /* MissingTag */, 'Expecting a TSDoc tag starting with "{"');
	        }
	        tokenReader.readToken();
	        var openingDelimiterExcerpt = tokenReader.extractAccumulatedSequence();
	        // For inline tags, if we handle errors by backtracking to the "{"  token, then the main loop
	        // will then interpret the "@" as a block tag, which is almost certainly incorrect.  So the
	        // DocErrorText needs to include both the "{" and "@" tokens.
	        // We will use _backtrackAndCreateErrorRangeForFailure() for that.
	        var atSignMarker = tokenReader.createMarker();
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.AtSign) {
	            return this._backtrackAndCreateError(tokenReader, marker, "tsdoc-malformed-inline-tag" /* MalformedInlineTag */, 'Expecting a TSDoc tag starting with "{@"');
	        }
	        // Include the "@" as part of the tagName
	        var tagName = tokenReader.readToken().toString();
	        while (tokenReader.peekTokenKind() === Token_1.TokenKind.AsciiWord) {
	            tagName += tokenReader.readToken().toString();
	        }
	        if (tagName === '@') {
	            // This is an unusual case
	            var failure = this._createFailureForTokensSince(tokenReader, "tsdoc-malformed-inline-tag" /* MalformedInlineTag */, 'Expecting a TSDoc inline tag name after the "{@" characters', atSignMarker);
	            return this._backtrackAndCreateErrorRangeForFailure(tokenReader, marker, atSignMarker, '', failure);
	        }
	        if (StringChecks_1.StringChecks.explainIfInvalidTSDocTagName(tagName)) {
	            var failure = this._createFailureForTokensSince(tokenReader, "tsdoc-malformed-tag-name" /* MalformedTagName */, 'A TSDoc tag name must start with a letter and contain only letters and numbers', atSignMarker);
	            return this._backtrackAndCreateErrorRangeForFailure(tokenReader, marker, atSignMarker, '', failure);
	        }
	        var tagNameExcerpt = tokenReader.extractAccumulatedSequence();
	        var spacingAfterTagNameExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        if (spacingAfterTagNameExcerpt === undefined) {
	            // If there were no spaces at all, that's an error unless it's the degenerate "{@tag}" case
	            if (tokenReader.peekTokenKind() !== Token_1.TokenKind.RightCurlyBracket) {
	                var badCharacter = tokenReader.peekToken().range.toString()[0];
	                var failure = this._createFailureForToken(tokenReader, "tsdoc-characters-after-inline-tag" /* CharactersAfterInlineTag */, "The character " + JSON.stringify(badCharacter) + " cannot appear after the TSDoc tag name; expecting a space");
	                return this._backtrackAndCreateErrorRangeForFailure(tokenReader, marker, atSignMarker, '', failure);
	            }
	        }
	        var done = false;
	        while (!done) {
	            switch (tokenReader.peekTokenKind()) {
	                case Token_1.TokenKind.EndOfInput:
	                    return this._backtrackAndCreateErrorRange(tokenReader, marker, atSignMarker, "tsdoc-inline-tag-missing-right-brace" /* InlineTagMissingRightBrace */, 'The TSDoc inline tag name is missing its closing "}"');
	                case Token_1.TokenKind.Backslash:
	                    // http://usejsdoc.org/about-block-inline-tags.html
	                    // "If your tag's text includes a closing curly brace (}), you must escape it with
	                    // a leading backslash (\)."
	                    tokenReader.readToken(); // discard the backslash
	                    // In CommonMark, a backslash is only allowed before a punctuation
	                    // character.  In all other contexts, the backslash is interpreted as a
	                    // literal character.
	                    if (!Tokenizer_1.Tokenizer.isPunctuation(tokenReader.peekTokenKind())) {
	                        var failure = this._createFailureForToken(tokenReader, "tsdoc-unnecessary-backslash" /* UnnecessaryBackslash */, 'A backslash can only be used to escape a punctuation character');
	                        return this._backtrackAndCreateErrorRangeForFailure(tokenReader, marker, atSignMarker, 'Error reading inline TSDoc tag: ', failure);
	                    }
	                    tokenReader.readToken();
	                    break;
	                case Token_1.TokenKind.LeftCurlyBracket: {
	                    var failure = this._createFailureForToken(tokenReader, "tsdoc-inline-tag-unescaped-brace" /* InlineTagUnescapedBrace */, 'The "{" character must be escaped with a backslash when used inside a TSDoc inline tag');
	                    return this._backtrackAndCreateErrorRangeForFailure(tokenReader, marker, atSignMarker, '', failure);
	                }
	                case Token_1.TokenKind.RightCurlyBracket:
	                    done = true;
	                    break;
	                default:
	                    tokenReader.readToken();
	                    break;
	            }
	        }
	        var tagContentExcerpt = tokenReader.tryExtractAccumulatedSequence();
	        // Read the right curly bracket
	        tokenReader.readToken();
	        var closingDelimiterExcerpt = tokenReader.extractAccumulatedSequence();
	        var docInlineTagParsedParameters = {
	            parsed: true,
	            configuration: this._configuration,
	            openingDelimiterExcerpt: openingDelimiterExcerpt,
	            tagNameExcerpt: tagNameExcerpt,
	            tagName: tagName,
	            spacingAfterTagNameExcerpt: spacingAfterTagNameExcerpt,
	            tagContentExcerpt: tagContentExcerpt,
	            closingDelimiterExcerpt: closingDelimiterExcerpt
	        };
	        var tagNameWithUpperCase = tagName.toUpperCase();
	        // Create a new TokenReader that will reparse the tokens corresponding to the tagContent.
	        var embeddedTokenReader = new TokenReader_1.TokenReader(this._parserContext, tagContentExcerpt ? tagContentExcerpt : TokenSequence_1.TokenSequence.createEmpty(this._parserContext));
	        var docNode;
	        switch (tagNameWithUpperCase) {
	            case StandardTags_1.StandardTags.inheritDoc.tagNameWithUpperCase:
	                docNode = this._parseInheritDocTag(docInlineTagParsedParameters, embeddedTokenReader);
	                break;
	            case StandardTags_1.StandardTags.link.tagNameWithUpperCase:
	                docNode = this._parseLinkTag(docInlineTagParsedParameters, embeddedTokenReader);
	                break;
	            default:
	                docNode = new nodes.DocInlineTag(docInlineTagParsedParameters);
	        }
	        // Validate the tag
	        var tagDefinition = this._parserContext.configuration.tryGetTagDefinitionWithUpperCase(tagNameWithUpperCase);
	        this._validateTagDefinition(tagDefinition, tagName, /* expectingInlineTag */ true, tagNameExcerpt, docNode);
	        return docNode;
	    };
	    NodeParser.prototype._parseInheritDocTag = function (docInlineTagParsedParameters, embeddedTokenReader) {
	        // If an error occurs, then return a generic DocInlineTag instead of DocInheritDocTag
	        var errorTag = new nodes.DocInlineTag(docInlineTagParsedParameters);
	        var parameters = __assign({}, docInlineTagParsedParameters);
	        if (embeddedTokenReader.peekTokenKind() !== Token_1.TokenKind.EndOfInput) {
	            parameters.declarationReference = this._parseDeclarationReference(embeddedTokenReader, docInlineTagParsedParameters.tagNameExcerpt, errorTag);
	            if (!parameters.declarationReference) {
	                return errorTag;
	            }
	            if (embeddedTokenReader.peekTokenKind() !== Token_1.TokenKind.EndOfInput) {
	                embeddedTokenReader.readToken();
	                this._parserContext.log.addMessageForTokenSequence("tsdoc-inheritdoc-tag-syntax" /* InheritDocTagSyntax */, 'Unexpected character after declaration reference', embeddedTokenReader.extractAccumulatedSequence(), errorTag);
	                return errorTag;
	            }
	        }
	        return new nodes.DocInheritDocTag(parameters);
	    };
	    NodeParser.prototype._parseLinkTag = function (docInlineTagParsedParameters, embeddedTokenReader) {
	        // If an error occurs, then return a generic DocInlineTag instead of DocInheritDocTag
	        var errorTag = new nodes.DocInlineTag(docInlineTagParsedParameters);
	        var parameters = __assign({}, docInlineTagParsedParameters);
	        if (!docInlineTagParsedParameters.tagContentExcerpt) {
	            this._parserContext.log.addMessageForTokenSequence("tsdoc-link-tag-empty" /* LinkTagEmpty */, 'The @link tag content is missing', parameters.tagNameExcerpt, errorTag);
	            return errorTag;
	        }
	        // Is the link destination a URL or a declaration reference?
	        //
	        // The JSDoc "@link" tag allows URLs, however supporting full URLs would be highly
	        // ambiguous, for example "microsoft.windows.camera:" is an actual valid URI scheme,
	        // and even the common "mailto:example.com" looks suspiciously like a declaration reference.
	        // In practice JSDoc URLs are nearly always HTTP or HTTPS, so it seems fairly reasonable to
	        // require the URL to have "://" and a scheme without any punctuation in it.  If a more exotic
	        // URL is needed, the HTML "<a>" tag can always be used.
	        // We start with a fairly broad classifier heuristic, and then the parsers will refine this:
	        // 1. Does it start with "//"?
	        // 2. Does it contain "://"?
	        var looksLikeUrl = embeddedTokenReader.peekTokenKind() === Token_1.TokenKind.Slash
	            && embeddedTokenReader.peekTokenAfterKind() === Token_1.TokenKind.Slash;
	        var marker = embeddedTokenReader.createMarker();
	        var done = looksLikeUrl;
	        while (!done) {
	            switch (embeddedTokenReader.peekTokenKind()) {
	                // An URI scheme can contain letters, numbers, minus, plus, and periods
	                case Token_1.TokenKind.AsciiWord:
	                case Token_1.TokenKind.Period:
	                case Token_1.TokenKind.Hyphen:
	                case Token_1.TokenKind.Plus:
	                    embeddedTokenReader.readToken();
	                    break;
	                case Token_1.TokenKind.Colon:
	                    embeddedTokenReader.readToken();
	                    // Once we a reach a colon, then it's a URL only if we see "://"
	                    looksLikeUrl = embeddedTokenReader.peekTokenKind() === Token_1.TokenKind.Slash
	                        && embeddedTokenReader.peekTokenAfterKind() === Token_1.TokenKind.Slash;
	                    done = true;
	                    break;
	                default:
	                    done = true;
	            }
	        }
	        embeddedTokenReader.backtrackToMarker(marker);
	        // Is the hyperlink a URL or a declaration reference?
	        if (looksLikeUrl) {
	            // It starts with something like "http://", so parse it as a URL
	            if (!this._parseLinkTagUrlDestination(embeddedTokenReader, parameters, docInlineTagParsedParameters.tagNameExcerpt, errorTag)) {
	                return errorTag;
	            }
	        }
	        else {
	            // Otherwise, assume it's a declaration reference
	            if (!this._parseLinkTagCodeDestination(embeddedTokenReader, parameters, docInlineTagParsedParameters.tagNameExcerpt, errorTag)) {
	                return errorTag;
	            }
	        }
	        if (embeddedTokenReader.peekTokenKind() === Token_1.TokenKind.Spacing) {
	            // The above parser rules should have consumed any spacing before the pipe
	            throw new Error('Unconsumed spacing encountered after construct');
	        }
	        if (embeddedTokenReader.peekTokenKind() === Token_1.TokenKind.Pipe) {
	            // Read the link text
	            embeddedTokenReader.readToken();
	            parameters.pipeExcerpt = embeddedTokenReader.extractAccumulatedSequence();
	            parameters.spacingAfterPipeExcerpt = this._tryReadSpacingAndNewlines(embeddedTokenReader);
	            // Read everything until the end
	            // NOTE: Because we're using an embedded TokenReader, the TokenKind.EndOfInput occurs
	            // when we reach the "}", not the end of the original input
	            done = false;
	            var spacingAfterLinkTextMarker = undefined;
	            while (!done) {
	                switch (embeddedTokenReader.peekTokenKind()) {
	                    case Token_1.TokenKind.EndOfInput:
	                        done = true;
	                        break;
	                    case Token_1.TokenKind.Pipe:
	                    case Token_1.TokenKind.LeftCurlyBracket:
	                        var badCharacter = embeddedTokenReader.readToken().toString();
	                        this._parserContext.log.addMessageForTokenSequence("tsdoc-link-tag-unescaped-text" /* LinkTagUnescapedText */, "The \"" + badCharacter + "\" character may not be used in the link text without escaping it", embeddedTokenReader.extractAccumulatedSequence(), errorTag);
	                        return errorTag;
	                    case Token_1.TokenKind.Spacing:
	                    case Token_1.TokenKind.Newline:
	                        embeddedTokenReader.readToken();
	                        break;
	                    default:
	                        // We found a non-spacing character, so move the spacingAfterLinkTextMarker
	                        spacingAfterLinkTextMarker = embeddedTokenReader.createMarker() + 1;
	                        embeddedTokenReader.readToken();
	                }
	            }
	            var linkTextAndSpacing = embeddedTokenReader.tryExtractAccumulatedSequence();
	            if (linkTextAndSpacing) {
	                if (spacingAfterLinkTextMarker === undefined) {
	                    // We never found any non-spacing characters, so everything is trailing spacing
	                    parameters.spacingAfterLinkTextExcerpt = linkTextAndSpacing;
	                }
	                else if (spacingAfterLinkTextMarker >= linkTextAndSpacing.endIndex) {
	                    // We found no trailing spacing, so everything we found is the text
	                    parameters.linkTextExcerpt = linkTextAndSpacing;
	                }
	                else {
	                    // Split the trailing spacing from the link text
	                    parameters.linkTextExcerpt = linkTextAndSpacing.getNewSequence(linkTextAndSpacing.startIndex, spacingAfterLinkTextMarker);
	                    parameters.spacingAfterLinkTextExcerpt = linkTextAndSpacing.getNewSequence(spacingAfterLinkTextMarker, linkTextAndSpacing.endIndex);
	                }
	            }
	        }
	        else if (embeddedTokenReader.peekTokenKind() !== Token_1.TokenKind.EndOfInput) {
	            embeddedTokenReader.readToken();
	            this._parserContext.log.addMessageForTokenSequence("tsdoc-link-tag-destination-syntax" /* LinkTagDestinationSyntax */, 'Unexpected character after link destination', embeddedTokenReader.extractAccumulatedSequence(), errorTag);
	            return errorTag;
	        }
	        return new nodes.DocLinkTag(parameters);
	    };
	    NodeParser.prototype._parseLinkTagUrlDestination = function (embeddedTokenReader, parameters, tokenSequenceForErrorContext, nodeForErrorContext) {
	        // Simply accumulate everything up to the next space. We won't try to implement a proper
	        // URI parser here.
	        var urlDestination = '';
	        var done = false;
	        while (!done) {
	            switch (embeddedTokenReader.peekTokenKind()) {
	                case Token_1.TokenKind.Spacing:
	                case Token_1.TokenKind.Newline:
	                case Token_1.TokenKind.EndOfInput:
	                case Token_1.TokenKind.Pipe:
	                case Token_1.TokenKind.RightCurlyBracket:
	                    done = true;
	                    break;
	                default:
	                    urlDestination += embeddedTokenReader.readToken();
	                    break;
	            }
	        }
	        if (urlDestination.length === 0) {
	            // This should be impossible since the caller ensures that peekTokenKind() === TokenKind.AsciiWord
	            throw new Error('Missing URL in _parseLinkTagUrlDestination()');
	        }
	        var urlDestinationExcerpt = embeddedTokenReader.extractAccumulatedSequence();
	        var invalidUrlExplanation = StringChecks_1.StringChecks.explainIfInvalidLinkUrl(urlDestination);
	        if (invalidUrlExplanation) {
	            this._parserContext.log.addMessageForTokenSequence("tsdoc-link-tag-invalid-url" /* LinkTagInvalidUrl */, invalidUrlExplanation, urlDestinationExcerpt, nodeForErrorContext);
	            return false;
	        }
	        parameters.urlDestinationExcerpt = urlDestinationExcerpt;
	        parameters.spacingAfterDestinationExcerpt = this._tryReadSpacingAndNewlines(embeddedTokenReader);
	        return true;
	    };
	    NodeParser.prototype._parseLinkTagCodeDestination = function (embeddedTokenReader, parameters, tokenSequenceForErrorContext, nodeForErrorContext) {
	        parameters.codeDestination = this._parseDeclarationReference(embeddedTokenReader, tokenSequenceForErrorContext, nodeForErrorContext);
	        return !!parameters.codeDestination;
	    };
	    NodeParser.prototype._parseDeclarationReference = function (tokenReader, tokenSequenceForErrorContext, nodeForErrorContext) {
	        tokenReader.assertAccumulatedSequenceIsEmpty();
	        // The package name can contain characters that look like a member reference.  This means we need to scan forwards
	        // to see if there is a "#".  However, we need to be careful not to match a "#" that is part of a quoted expression.
	        var marker = tokenReader.createMarker();
	        var hasHash = false;
	        // A common mistake is to forget the "#" for package name or import path.  The telltale sign
	        // of this is mistake is that we see path-only characters such as "@" or "/" in the beginning
	        // where this would be a syntax error for a member reference.
	        var lookingForImportCharacters = true;
	        var sawImportCharacters = false;
	        var done = false;
	        while (!done) {
	            switch (tokenReader.peekTokenKind()) {
	                case Token_1.TokenKind.DoubleQuote:
	                case Token_1.TokenKind.EndOfInput:
	                case Token_1.TokenKind.LeftCurlyBracket:
	                case Token_1.TokenKind.LeftParenthesis:
	                case Token_1.TokenKind.LeftSquareBracket:
	                case Token_1.TokenKind.Newline:
	                case Token_1.TokenKind.Pipe:
	                case Token_1.TokenKind.RightCurlyBracket:
	                case Token_1.TokenKind.RightParenthesis:
	                case Token_1.TokenKind.RightSquareBracket:
	                case Token_1.TokenKind.SingleQuote:
	                case Token_1.TokenKind.Spacing:
	                    done = true;
	                    break;
	                case Token_1.TokenKind.PoundSymbol:
	                    hasHash = true;
	                    done = true;
	                    break;
	                case Token_1.TokenKind.Slash:
	                case Token_1.TokenKind.AtSign:
	                    if (lookingForImportCharacters) {
	                        sawImportCharacters = true;
	                    }
	                    tokenReader.readToken();
	                    break;
	                case Token_1.TokenKind.AsciiWord:
	                case Token_1.TokenKind.Period:
	                case Token_1.TokenKind.Hyphen:
	                    // It's a character that looks like part of a package name or import path,
	                    // so don't set lookingForImportCharacters = false
	                    tokenReader.readToken();
	                    break;
	                default:
	                    // Once we reach something other than AsciiWord and Period, then the meaning of
	                    // slashes and at-signs is no longer obvious.
	                    lookingForImportCharacters = false;
	                    tokenReader.readToken();
	            }
	        }
	        if (!hasHash && sawImportCharacters) {
	            // We saw characters that will be a syntax error if interpreted as a member reference,
	            // but would make sense as a package name or import path, but we did not find a "#"
	            this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-missing-hash" /* ReferenceMissingHash */, 'The declaration reference appears to contain a package name or import path,'
	                + ' but it is missing the "#" delimiter', tokenReader.extractAccumulatedSequence(), nodeForErrorContext);
	            return undefined;
	        }
	        tokenReader.backtrackToMarker(marker);
	        var packageNameExcerpt;
	        var importPathExcerpt;
	        var importHashExcerpt;
	        var spacingAfterImportHashExcerpt;
	        if (hasHash) {
	            // If it starts with a "." then it's a relative path, not a package name
	            if (tokenReader.peekTokenKind() !== Token_1.TokenKind.Period) {
	                // Read the package name:
	                var scopedPackageName = tokenReader.peekTokenKind() === Token_1.TokenKind.AtSign;
	                var finishedScope = false;
	                done = false;
	                while (!done) {
	                    switch (tokenReader.peekTokenKind()) {
	                        case Token_1.TokenKind.EndOfInput:
	                            // If hasHash=true, then we are expecting to stop when we reach the hash
	                            throw new Error('Expecting pound symbol');
	                        case Token_1.TokenKind.Slash:
	                            // Stop at the first slash, unless this is a scoped package, in which case we stop at the second slash
	                            if (scopedPackageName && !finishedScope) {
	                                tokenReader.readToken();
	                                finishedScope = true;
	                            }
	                            else {
	                                done = true;
	                            }
	                            break;
	                        case Token_1.TokenKind.PoundSymbol:
	                            done = true;
	                            break;
	                        default:
	                            tokenReader.readToken();
	                    }
	                }
	                if (!tokenReader.isAccumulatedSequenceEmpty()) {
	                    packageNameExcerpt = tokenReader.extractAccumulatedSequence();
	                    // Check that the packageName is syntactically valid
	                    var explanation = StringChecks_1.StringChecks.explainIfInvalidPackageName(packageNameExcerpt.toString());
	                    if (explanation) {
	                        this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-malformed-package-name" /* ReferenceMalformedPackageName */, explanation, packageNameExcerpt, nodeForErrorContext);
	                        return undefined;
	                    }
	                }
	            }
	            // Read the import path:
	            done = false;
	            while (!done) {
	                switch (tokenReader.peekTokenKind()) {
	                    case Token_1.TokenKind.EndOfInput:
	                        // If hasHash=true, then we are expecting to stop when we reach the hash
	                        throw new Error('Expecting pound symbol');
	                    case Token_1.TokenKind.PoundSymbol:
	                        done = true;
	                        break;
	                    default:
	                        tokenReader.readToken();
	                }
	            }
	            if (!tokenReader.isAccumulatedSequenceEmpty()) {
	                importPathExcerpt = tokenReader.extractAccumulatedSequence();
	                // Check that the importPath is syntactically valid
	                var explanation = StringChecks_1.StringChecks.explainIfInvalidImportPath(importPathExcerpt.toString(), !!packageNameExcerpt);
	                if (explanation) {
	                    this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-malformed-import-path" /* ReferenceMalformedImportPath */, explanation, importPathExcerpt, nodeForErrorContext);
	                    return undefined;
	                }
	            }
	            // Read the import hash
	            if (tokenReader.peekTokenKind() !== Token_1.TokenKind.PoundSymbol) {
	                // The above logic should have left us at the PoundSymbol
	                throw new Error('Expecting pound symbol');
	            }
	            tokenReader.readToken();
	            importHashExcerpt = tokenReader.extractAccumulatedSequence();
	            spacingAfterImportHashExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	            if (packageNameExcerpt === undefined && importPathExcerpt === undefined) {
	                this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-hash-syntax" /* ReferenceHashSyntax */, 'The hash character must be preceded by a package name or import path', importHashExcerpt, nodeForErrorContext);
	                return undefined;
	            }
	        }
	        // Read the member references:
	        var memberReferences = [];
	        done = false;
	        while (!done) {
	            switch (tokenReader.peekTokenKind()) {
	                case Token_1.TokenKind.Period:
	                case Token_1.TokenKind.LeftParenthesis:
	                case Token_1.TokenKind.AsciiWord:
	                case Token_1.TokenKind.Colon:
	                case Token_1.TokenKind.LeftSquareBracket:
	                case Token_1.TokenKind.DoubleQuote:
	                    var expectingDot = memberReferences.length > 0;
	                    var memberReference = this._parseMemberReference(tokenReader, expectingDot, tokenSequenceForErrorContext, nodeForErrorContext);
	                    if (!memberReference) {
	                        return undefined;
	                    }
	                    memberReferences.push(memberReference);
	                    break;
	                default:
	                    done = true;
	            }
	        }
	        if (packageNameExcerpt === undefined && importPathExcerpt === undefined && memberReferences.length === 0) {
	            // We didn't find any parts of a declaration reference
	            this._parserContext.log.addMessageForTokenSequence("tsdoc-missing-reference" /* MissingReference */, 'Expecting a declaration reference', tokenSequenceForErrorContext, nodeForErrorContext);
	            return undefined;
	        }
	        return new nodes.DocDeclarationReference({
	            parsed: true,
	            configuration: this._configuration,
	            packageNameExcerpt: packageNameExcerpt,
	            importPathExcerpt: importPathExcerpt,
	            importHashExcerpt: importHashExcerpt,
	            spacingAfterImportHashExcerpt: spacingAfterImportHashExcerpt,
	            memberReferences: memberReferences
	        });
	    };
	    NodeParser.prototype._parseMemberReference = function (tokenReader, expectingDot, tokenSequenceForErrorContext, nodeForErrorContext) {
	        var parameters = {
	            parsed: true,
	            configuration: this._configuration
	        };
	        // Read the dot operator
	        if (expectingDot) {
	            if (tokenReader.peekTokenKind() !== Token_1.TokenKind.Period) {
	                this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-missing-dot" /* ReferenceMissingDot */, 'Expecting a period before the next component of a declaration reference', tokenSequenceForErrorContext, nodeForErrorContext);
	                return undefined;
	            }
	            tokenReader.readToken();
	            parameters.dotExcerpt = tokenReader.extractAccumulatedSequence();
	            parameters.spacingAfterDotExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        }
	        // Read the left parenthesis if there is one
	        if (tokenReader.peekTokenKind() === Token_1.TokenKind.LeftParenthesis) {
	            tokenReader.readToken();
	            parameters.leftParenthesisExcerpt = tokenReader.extractAccumulatedSequence();
	            parameters.spacingAfterLeftParenthesisExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        }
	        // Read the member identifier or symbol
	        if (tokenReader.peekTokenKind() === Token_1.TokenKind.LeftSquareBracket) {
	            parameters.memberSymbol = this._parseMemberSymbol(tokenReader, nodeForErrorContext);
	            if (!parameters.memberSymbol) {
	                return undefined;
	            }
	        }
	        else {
	            parameters.memberIdentifier = this._parseMemberIdentifier(tokenReader, tokenSequenceForErrorContext, nodeForErrorContext);
	            if (!parameters.memberIdentifier) {
	                return undefined;
	            }
	        }
	        parameters.spacingAfterMemberExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        // Read the colon
	        if (tokenReader.peekTokenKind() === Token_1.TokenKind.Colon) {
	            tokenReader.readToken();
	            parameters.colonExcerpt = tokenReader.extractAccumulatedSequence();
	            parameters.spacingAfterColonExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	            if (!parameters.leftParenthesisExcerpt) {
	                // In the current TSDoc draft standard, a member reference with a selector requires the parentheses.
	                // It would be reasonable to make the parentheses optional, and we are contemplating simplifying the
	                // notation in the future.  But for now the parentheses are required.
	                this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-selector-missing-parens" /* ReferenceSelectorMissingParens */, 'Syntax error in declaration reference: the member selector must be enclosed in parentheses', parameters.colonExcerpt, nodeForErrorContext);
	                return undefined;
	            }
	            // If there is a colon, then read the selector
	            parameters.selector = this._parseMemberSelector(tokenReader, parameters.colonExcerpt, nodeForErrorContext);
	            if (!parameters.selector) {
	                return undefined;
	            }
	            parameters.spacingAfterSelectorExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        }
	        else {
	            if (parameters.leftParenthesisExcerpt) {
	                this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-missing-colon" /* ReferenceMissingColon */, 'Expecting a colon after the identifier because the expression is in parentheses', parameters.leftParenthesisExcerpt, nodeForErrorContext);
	                return undefined;
	            }
	        }
	        // Read the right parenthesis
	        if (parameters.leftParenthesisExcerpt) {
	            if (tokenReader.peekTokenKind() !== Token_1.TokenKind.RightParenthesis) {
	                this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-missing-right-paren" /* ReferenceMissingRightParen */, 'Expecting a matching right parenthesis', parameters.leftParenthesisExcerpt, nodeForErrorContext);
	                return undefined;
	            }
	            tokenReader.readToken();
	            parameters.rightParenthesisExcerpt = tokenReader.extractAccumulatedSequence();
	            parameters.spacingAfterRightParenthesisExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        }
	        return new nodes.DocMemberReference(parameters);
	    };
	    NodeParser.prototype._parseMemberSymbol = function (tokenReader, nodeForErrorContext) {
	        // Read the "["
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.LeftSquareBracket) {
	            // This should be impossible since the caller ensures that peekTokenKind() === TokenKind.LeftSquareBracket
	            throw new Error('Expecting "["');
	        }
	        tokenReader.readToken();
	        var leftBracketExcerpt = tokenReader.extractAccumulatedSequence();
	        var spacingAfterLeftBracketExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        // Read the declaration reference
	        var declarationReference = this._parseDeclarationReference(tokenReader, leftBracketExcerpt, nodeForErrorContext);
	        if (!declarationReference) {
	            this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-symbol-syntax" /* ReferenceSymbolSyntax */, 'Missing declaration reference in symbol reference', leftBracketExcerpt, nodeForErrorContext);
	            return undefined;
	        }
	        // (We don't need to worry about spacing here since _parseDeclarationReference() absorbs trailing spaces)
	        // Read the "]"
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.RightSquareBracket) {
	            this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-missing-right-bracket" /* ReferenceMissingRightBracket */, 'Missing closing square bracket for symbol reference', leftBracketExcerpt, nodeForErrorContext);
	            return undefined;
	        }
	        tokenReader.readToken();
	        var rightBracketExcerpt = tokenReader.extractAccumulatedSequence();
	        return new nodes.DocMemberSymbol({
	            parsed: true,
	            configuration: this._configuration,
	            leftBracketExcerpt: leftBracketExcerpt,
	            spacingAfterLeftBracketExcerpt: spacingAfterLeftBracketExcerpt,
	            symbolReference: declarationReference,
	            rightBracketExcerpt: rightBracketExcerpt
	        });
	    };
	    NodeParser.prototype._parseMemberIdentifier = function (tokenReader, tokenSequenceForErrorContext, nodeForErrorContext) {
	        var leftQuoteExcerpt = undefined;
	        var rightQuoteExcerpt = undefined;
	        // Is this a quoted identifier?
	        if (tokenReader.peekTokenKind() === Token_1.TokenKind.DoubleQuote) {
	            // Read the opening '"'
	            tokenReader.readToken();
	            leftQuoteExcerpt = tokenReader.extractAccumulatedSequence();
	            // Read the text inside the quotes
	            while (tokenReader.peekTokenKind() !== Token_1.TokenKind.DoubleQuote) {
	                if (tokenReader.peekTokenKind() === Token_1.TokenKind.EndOfInput) {
	                    this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-missing-quote" /* ReferenceMissingQuote */, 'Unexpected end of input inside quoted member identifier', leftQuoteExcerpt, nodeForErrorContext);
	                    return undefined;
	                }
	                tokenReader.readToken();
	            }
	            if (tokenReader.isAccumulatedSequenceEmpty()) {
	                this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-empty-identifier" /* ReferenceEmptyIdentifier */, 'The quoted identifier cannot be empty', leftQuoteExcerpt, nodeForErrorContext);
	                return undefined;
	            }
	            var identifierExcerpt = tokenReader.extractAccumulatedSequence();
	            // Read the closing '""
	            tokenReader.readToken(); // read the quote
	            rightQuoteExcerpt = tokenReader.extractAccumulatedSequence();
	            return new nodes.DocMemberIdentifier({
	                parsed: true,
	                configuration: this._configuration,
	                leftQuoteExcerpt: leftQuoteExcerpt,
	                identifierExcerpt: identifierExcerpt,
	                rightQuoteExcerpt: rightQuoteExcerpt
	            });
	        }
	        else {
	            // Otherwise assume it's a valid TypeScript identifier
	            var done = false;
	            while (!done) {
	                switch (tokenReader.peekTokenKind()) {
	                    case Token_1.TokenKind.AsciiWord:
	                    case Token_1.TokenKind.DollarSign:
	                        tokenReader.readToken();
	                        break;
	                    default:
	                        done = true;
	                        break;
	                }
	            }
	            if (tokenReader.isAccumulatedSequenceEmpty()) {
	                this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-missing-identifier" /* ReferenceMissingIdentifier */, 'Syntax error in declaration reference: expecting a member identifier', tokenSequenceForErrorContext, nodeForErrorContext);
	                return undefined;
	            }
	            var identifierExcerpt = tokenReader.extractAccumulatedSequence();
	            var identifier = identifierExcerpt.toString();
	            var explanation = StringChecks_1.StringChecks.explainIfInvalidUnquotedMemberIdentifier(identifier);
	            if (explanation) {
	                this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-unquoted-identifier" /* ReferenceUnquotedIdentifier */, explanation, identifierExcerpt, nodeForErrorContext);
	                return undefined;
	            }
	            return new nodes.DocMemberIdentifier({
	                parsed: true,
	                configuration: this._configuration,
	                leftQuoteExcerpt: leftQuoteExcerpt,
	                identifierExcerpt: identifierExcerpt,
	                rightQuoteExcerpt: rightQuoteExcerpt
	            });
	        }
	    };
	    NodeParser.prototype._parseMemberSelector = function (tokenReader, tokenSequenceForErrorContext, nodeForErrorContext) {
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.AsciiWord) {
	            this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-missing-label" /* ReferenceMissingLabel */, 'Expecting a selector label after the colon', tokenSequenceForErrorContext, nodeForErrorContext);
	        }
	        var selector = tokenReader.readToken().toString();
	        var selectorExcerpt = tokenReader.extractAccumulatedSequence();
	        var docMemberSelector = new nodes.DocMemberSelector({
	            parsed: true,
	            configuration: this._configuration,
	            selectorExcerpt: selectorExcerpt,
	            selector: selector
	        });
	        if (docMemberSelector.errorMessage) {
	            this._parserContext.log.addMessageForTokenSequence("tsdoc-reference-selector-syntax" /* ReferenceSelectorSyntax */, docMemberSelector.errorMessage, selectorExcerpt, nodeForErrorContext);
	            return undefined;
	        }
	        return docMemberSelector;
	    };
	    NodeParser.prototype._parseHtmlStartTag = function (tokenReader) {
	        tokenReader.assertAccumulatedSequenceIsEmpty();
	        var marker = tokenReader.createMarker();
	        // Read the "<" delimiter
	        var lessThanToken = tokenReader.readToken();
	        if (lessThanToken.kind !== Token_1.TokenKind.LessThan) {
	            // This would be a parser bug -- the caller of _parseHtmlStartTag() should have verified this while
	            // looking ahead
	            throw new Error('Expecting an HTML tag starting with "<"');
	        }
	        // NOTE: CommonMark does not permit whitespace after the "<"
	        var openingDelimiterExcerpt = tokenReader.extractAccumulatedSequence();
	        // Read the element name
	        var nameExcerpt = this._parseHtmlName(tokenReader);
	        if (isFailure(nameExcerpt)) {
	            return this._backtrackAndCreateErrorForFailure(tokenReader, marker, 'Invalid HTML element: ', nameExcerpt);
	        }
	        var spacingAfterNameExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        var htmlAttributes = [];
	        // Read the attributes until we see a ">" or "/>"
	        while (tokenReader.peekTokenKind() === Token_1.TokenKind.AsciiWord) {
	            // Read the attribute
	            var attributeNode = this._parseHtmlAttribute(tokenReader);
	            if (isFailure(attributeNode)) {
	                return this._backtrackAndCreateErrorForFailure(tokenReader, marker, 'The HTML element has an invalid attribute: ', attributeNode);
	            }
	            htmlAttributes.push(attributeNode);
	        }
	        // Read the closing "/>" or ">" as the Excerpt.suffix
	        tokenReader.assertAccumulatedSequenceIsEmpty();
	        var endDelimiterMarker = tokenReader.createMarker();
	        var selfClosingTag = false;
	        if (tokenReader.peekTokenKind() === Token_1.TokenKind.Slash) {
	            tokenReader.readToken();
	            selfClosingTag = true;
	        }
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.GreaterThan) {
	            var failure = this._createFailureForTokensSince(tokenReader, "tsdoc-html-tag-missing-greater-than" /* HtmlTagMissingGreaterThan */, 'Expecting an attribute or ">" or "/>"', endDelimiterMarker);
	            return this._backtrackAndCreateErrorForFailure(tokenReader, marker, 'The HTML tag has invalid syntax: ', failure);
	        }
	        tokenReader.readToken();
	        var closingDelimiterExcerpt = tokenReader.extractAccumulatedSequence();
	        // NOTE: We don't read excerptParameters.separator here, since if there is any it
	        // will be represented as DocPlainText.
	        return new nodes.DocHtmlStartTag({
	            parsed: true,
	            configuration: this._configuration,
	            openingDelimiterExcerpt: openingDelimiterExcerpt,
	            nameExcerpt: nameExcerpt,
	            spacingAfterNameExcerpt: spacingAfterNameExcerpt,
	            htmlAttributes: htmlAttributes,
	            selfClosingTag: selfClosingTag,
	            closingDelimiterExcerpt: closingDelimiterExcerpt
	        });
	    };
	    NodeParser.prototype._parseHtmlAttribute = function (tokenReader) {
	        tokenReader.assertAccumulatedSequenceIsEmpty();
	        // Read the attribute name
	        var nameExcerpt = this._parseHtmlName(tokenReader);
	        if (isFailure(nameExcerpt)) {
	            return nameExcerpt;
	        }
	        var spacingAfterNameExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        // Read the equals
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.Equals) {
	            return this._createFailureForToken(tokenReader, "tsdoc-html-tag-missing-equals" /* HtmlTagMissingEquals */, 'Expecting "=" after HTML attribute name');
	        }
	        tokenReader.readToken();
	        var equalsExcerpt = tokenReader.extractAccumulatedSequence();
	        var spacingAfterEqualsExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        // Read the attribute value
	        var attributeValue = this._parseHtmlString(tokenReader);
	        if (isFailure(attributeValue)) {
	            return attributeValue;
	        }
	        var valueExcerpt = tokenReader.extractAccumulatedSequence();
	        var spacingAfterValueExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        return new nodes.DocHtmlAttribute({
	            parsed: true,
	            configuration: this._configuration,
	            nameExcerpt: nameExcerpt,
	            spacingAfterNameExcerpt: spacingAfterNameExcerpt,
	            equalsExcerpt: equalsExcerpt,
	            spacingAfterEqualsExcerpt: spacingAfterEqualsExcerpt,
	            valueExcerpt: valueExcerpt,
	            spacingAfterValueExcerpt: spacingAfterValueExcerpt
	        });
	    };
	    NodeParser.prototype._parseHtmlString = function (tokenReader) {
	        var marker = tokenReader.createMarker();
	        var quoteTokenKind = tokenReader.peekTokenKind();
	        if (quoteTokenKind !== Token_1.TokenKind.DoubleQuote && quoteTokenKind !== Token_1.TokenKind.SingleQuote) {
	            return this._createFailureForToken(tokenReader, "tsdoc-html-tag-missing-string" /* HtmlTagMissingString */, 'Expecting an HTML string starting with a single-quote or double-quote character');
	        }
	        tokenReader.readToken();
	        var textWithoutQuotes = '';
	        for (;;) {
	            var peekedTokenKind = tokenReader.peekTokenKind();
	            // Did we find the matching token?
	            if (peekedTokenKind === quoteTokenKind) {
	                tokenReader.readToken(); // extract the quote
	                break;
	            }
	            if (peekedTokenKind === Token_1.TokenKind.EndOfInput || peekedTokenKind === Token_1.TokenKind.Newline) {
	                return this._createFailureForToken(tokenReader, "tsdoc-html-string-missing-quote" /* HtmlStringMissingQuote */, 'The HTML string is missing its closing quote', marker);
	            }
	            textWithoutQuotes += tokenReader.readToken().toString();
	        }
	        // The next attribute cannot start immediately after this one
	        if (tokenReader.peekTokenKind() === Token_1.TokenKind.AsciiWord) {
	            return this._createFailureForToken(tokenReader, "tsdoc-text-after-html-string" /* TextAfterHtmlString */, 'The next character after a closing quote must be spacing or punctuation');
	        }
	        return textWithoutQuotes;
	    };
	    NodeParser.prototype._parseHtmlEndTag = function (tokenReader) {
	        tokenReader.assertAccumulatedSequenceIsEmpty();
	        var marker = tokenReader.createMarker();
	        // Read the "</" delimiter
	        var lessThanToken = tokenReader.peekToken();
	        if (lessThanToken.kind !== Token_1.TokenKind.LessThan) {
	            return this._backtrackAndCreateError(tokenReader, marker, "tsdoc-missing-html-end-tag" /* MissingHtmlEndTag */, 'Expecting an HTML tag starting with "</"');
	        }
	        tokenReader.readToken();
	        var slashToken = tokenReader.peekToken();
	        if (slashToken.kind !== Token_1.TokenKind.Slash) {
	            return this._backtrackAndCreateError(tokenReader, marker, "tsdoc-missing-html-end-tag" /* MissingHtmlEndTag */, 'Expecting an HTML tag starting with "</"');
	        }
	        tokenReader.readToken();
	        // NOTE: Spaces are not permitted here
	        // https://www.w3.org/TR/html5/syntax.html#end-tags
	        var openingDelimiterExcerpt = tokenReader.extractAccumulatedSequence();
	        // Read the tag name
	        var nameExcerpt = this._parseHtmlName(tokenReader);
	        if (isFailure(nameExcerpt)) {
	            return this._backtrackAndCreateErrorForFailure(tokenReader, marker, 'Expecting an HTML element name: ', nameExcerpt);
	        }
	        var spacingAfterNameExcerpt = this._tryReadSpacingAndNewlines(tokenReader);
	        // Read the closing ">"
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.GreaterThan) {
	            var failure = this._createFailureForToken(tokenReader, "tsdoc-html-tag-missing-greater-than" /* HtmlTagMissingGreaterThan */, 'Expecting a closing ">" for the HTML tag');
	            return this._backtrackAndCreateErrorForFailure(tokenReader, marker, '', failure);
	        }
	        tokenReader.readToken();
	        var closingDelimiterExcerpt = tokenReader.extractAccumulatedSequence();
	        return new nodes.DocHtmlEndTag({
	            parsed: true,
	            configuration: this._configuration,
	            openingDelimiterExcerpt: openingDelimiterExcerpt,
	            nameExcerpt: nameExcerpt,
	            spacingAfterNameExcerpt: spacingAfterNameExcerpt,
	            closingDelimiterExcerpt: closingDelimiterExcerpt
	        });
	    };
	    /**
	     * Parses an HTML name such as an element name or attribute name.
	     */
	    NodeParser.prototype._parseHtmlName = function (tokenReader) {
	        var marker = tokenReader.createMarker();
	        if (tokenReader.peekTokenKind() === Token_1.TokenKind.Spacing) {
	            return this._createFailureForTokensSince(tokenReader, "tsdoc-malformed-html-name" /* MalformedHtmlName */, 'A space is not allowed here', marker);
	        }
	        var done = false;
	        while (!done) {
	            switch (tokenReader.peekTokenKind()) {
	                case Token_1.TokenKind.Hyphen:
	                case Token_1.TokenKind.Period:
	                case Token_1.TokenKind.AsciiWord:
	                    tokenReader.readToken();
	                    break;
	                default:
	                    done = true;
	                    break;
	            }
	        }
	        var excerpt = tokenReader.tryExtractAccumulatedSequence();
	        if (!excerpt) {
	            return this._createFailureForToken(tokenReader, "tsdoc-malformed-html-name" /* MalformedHtmlName */, 'Expecting an HTML name');
	        }
	        var htmlName = excerpt.toString();
	        var explanation = StringChecks_1.StringChecks.explainIfInvalidHtmlName(htmlName);
	        if (explanation) {
	            return this._createFailureForTokensSince(tokenReader, "tsdoc-malformed-html-name" /* MalformedHtmlName */, explanation, marker);
	        }
	        return excerpt;
	    };
	    NodeParser.prototype._parseFencedCode = function (tokenReader) {
	        tokenReader.assertAccumulatedSequenceIsEmpty();
	        var startMarker = tokenReader.createMarker();
	        var endOfOpeningDelimiterMarker = startMarker + 2;
	        switch (tokenReader.peekPreviousTokenKind()) {
	            case Token_1.TokenKind.Newline:
	            case Token_1.TokenKind.EndOfInput:
	                break;
	            default:
	                return this._backtrackAndCreateErrorRange(tokenReader, startMarker, 
	                // include the three backticks so they don't get reinterpreted as a code span
	                endOfOpeningDelimiterMarker, "tsdoc-code-fence-opening-indent" /* CodeFenceOpeningIndent */, 'The opening backtick for a code fence must appear at the start of the line');
	        }
	        // Read the opening ``` delimiter
	        var openingDelimiter = '';
	        openingDelimiter += tokenReader.readToken();
	        openingDelimiter += tokenReader.readToken();
	        openingDelimiter += tokenReader.readToken();
	        if (openingDelimiter !== '```') {
	            // This would be a parser bug -- the caller of _parseFencedCode() should have verified this while
	            // looking ahead to distinguish code spans/fences
	            throw new Error('Expecting three backticks');
	        }
	        var openingFenceExcerpt = tokenReader.extractAccumulatedSequence();
	        // Read any spaces after the delimiter,
	        // but NOT the Newline since that goes with the spacingAfterLanguageExcerpt
	        while (tokenReader.peekTokenKind() === Token_1.TokenKind.Spacing) {
	            tokenReader.readToken();
	        }
	        var spacingAfterOpeningFenceExcerpt = tokenReader.tryExtractAccumulatedSequence();
	        // Read the language specifier (if present) and newline
	        var done = false;
	        var startOfPaddingMarker = undefined;
	        while (!done) {
	            switch (tokenReader.peekTokenKind()) {
	                case Token_1.TokenKind.Spacing:
	                case Token_1.TokenKind.Newline:
	                    if (startOfPaddingMarker === undefined) {
	                        // Starting a new run of spacing characters
	                        startOfPaddingMarker = tokenReader.createMarker();
	                    }
	                    if (tokenReader.peekTokenKind() === Token_1.TokenKind.Newline) {
	                        done = true;
	                    }
	                    tokenReader.readToken();
	                    break;
	                case Token_1.TokenKind.Backtick:
	                    var failure = this._createFailureForToken(tokenReader, "tsdoc-code-fence-specifier-syntax" /* CodeFenceSpecifierSyntax */, 'The language specifier cannot contain backtick characters');
	                    return this._backtrackAndCreateErrorRangeForFailure(tokenReader, startMarker, endOfOpeningDelimiterMarker, 'Error parsing code fence: ', failure);
	                case Token_1.TokenKind.EndOfInput:
	                    var failure2 = this._createFailureForToken(tokenReader, "tsdoc-code-fence-missing-delimiter" /* CodeFenceMissingDelimiter */, 'Missing closing delimiter');
	                    return this._backtrackAndCreateErrorRangeForFailure(tokenReader, startMarker, endOfOpeningDelimiterMarker, 'Error parsing code fence: ', failure2);
	                default:
	                    // more non-spacing content
	                    startOfPaddingMarker = undefined;
	                    tokenReader.readToken();
	                    break;
	            }
	        }
	        // At this point, we must have accumulated at least a newline token.
	        // Example: "pov-ray sdl    \n"
	        var restOfLineExcerpt = tokenReader.extractAccumulatedSequence();
	        // Example: "pov-ray sdl"
	        var languageExcerpt = restOfLineExcerpt.getNewSequence(restOfLineExcerpt.startIndex, startOfPaddingMarker);
	        // Example: "    \n"
	        var spacingAfterLanguageExcerpt = restOfLineExcerpt.getNewSequence(startOfPaddingMarker, restOfLineExcerpt.endIndex);
	        // Read the code content until we see the closing ``` delimiter
	        var codeEndMarker = -1;
	        var closingFenceStartMarker = -1;
	        done = false;
	        var tokenBeforeDelimiter;
	        while (!done) {
	            switch (tokenReader.peekTokenKind()) {
	                case Token_1.TokenKind.EndOfInput:
	                    var failure2 = this._createFailureForToken(tokenReader, "tsdoc-code-fence-missing-delimiter" /* CodeFenceMissingDelimiter */, 'Missing closing delimiter');
	                    return this._backtrackAndCreateErrorRangeForFailure(tokenReader, startMarker, endOfOpeningDelimiterMarker, 'Error parsing code fence: ', failure2);
	                case Token_1.TokenKind.Newline:
	                    tokenBeforeDelimiter = tokenReader.readToken();
	                    codeEndMarker = tokenReader.createMarker();
	                    while (tokenReader.peekTokenKind() === Token_1.TokenKind.Spacing) {
	                        tokenBeforeDelimiter = tokenReader.readToken();
	                    }
	                    if (tokenReader.peekTokenKind() !== Token_1.TokenKind.Backtick) {
	                        break;
	                    }
	                    closingFenceStartMarker = tokenReader.createMarker();
	                    tokenReader.readToken(); // first backtick
	                    if (tokenReader.peekTokenKind() !== Token_1.TokenKind.Backtick) {
	                        break;
	                    }
	                    tokenReader.readToken(); // second backtick
	                    if (tokenReader.peekTokenKind() !== Token_1.TokenKind.Backtick) {
	                        break;
	                    }
	                    tokenReader.readToken(); // third backtick
	                    done = true;
	                    break;
	                default:
	                    tokenReader.readToken();
	                    break;
	            }
	        }
	        if (tokenBeforeDelimiter.kind !== Token_1.TokenKind.Newline) {
	            this._parserContext.log.addMessageForTextRange("tsdoc-code-fence-closing-indent" /* CodeFenceClosingIndent */, 'The closing delimiter for a code fence must not be indented', tokenBeforeDelimiter.range);
	        }
	        // Example: "code 1\ncode 2\n  ```"
	        var codeAndDelimiterExcerpt = tokenReader.extractAccumulatedSequence();
	        // Example: "code 1\ncode 2\n"
	        var codeExcerpt = codeAndDelimiterExcerpt.getNewSequence(codeAndDelimiterExcerpt.startIndex, codeEndMarker);
	        // Example: "  "
	        var spacingBeforeClosingFenceExcerpt = codeAndDelimiterExcerpt.getNewSequence(codeEndMarker, closingFenceStartMarker);
	        // Example: "```"
	        var closingFenceExcerpt = codeAndDelimiterExcerpt.getNewSequence(closingFenceStartMarker, codeAndDelimiterExcerpt.endIndex);
	        // Read the spacing and newline after the closing delimiter
	        done = false;
	        while (!done) {
	            switch (tokenReader.peekTokenKind()) {
	                case Token_1.TokenKind.Spacing:
	                    tokenReader.readToken();
	                    break;
	                case Token_1.TokenKind.Newline:
	                    done = true;
	                    tokenReader.readToken();
	                    break;
	                case Token_1.TokenKind.EndOfInput:
	                    done = true;
	                    break;
	                default:
	                    this._parserContext.log.addMessageForTextRange("tsdoc-code-fence-closing-syntax" /* CodeFenceClosingSyntax */, 'Unexpected characters after closing delimiter for code fence', tokenReader.peekToken().range);
	                    done = true;
	                    break;
	            }
	        }
	        // Example: "   \n"
	        var spacingAfterClosingFenceExcerpt = tokenReader.tryExtractAccumulatedSequence();
	        return new nodes.DocFencedCode({
	            parsed: true,
	            configuration: this._configuration,
	            openingFenceExcerpt: openingFenceExcerpt,
	            spacingAfterOpeningFenceExcerpt: spacingAfterOpeningFenceExcerpt,
	            languageExcerpt: languageExcerpt,
	            spacingAfterLanguageExcerpt: spacingAfterLanguageExcerpt,
	            codeExcerpt: codeExcerpt,
	            spacingBeforeClosingFenceExcerpt: spacingBeforeClosingFenceExcerpt,
	            closingFenceExcerpt: closingFenceExcerpt,
	            spacingAfterClosingFenceExcerpt: spacingAfterClosingFenceExcerpt
	        });
	    };
	    NodeParser.prototype._parseCodeSpan = function (tokenReader) {
	        tokenReader.assertAccumulatedSequenceIsEmpty();
	        var marker = tokenReader.createMarker();
	        // Parse the opening backtick
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.Backtick) {
	            // This would be a parser bug -- the caller of _parseCodeSpan() should have verified this while
	            // looking ahead to distinguish code spans/fences
	            throw new Error('Expecting a code span starting with a backtick character "`"');
	        }
	        tokenReader.readToken(); // read the backtick
	        var openingDelimiterExcerpt = tokenReader.extractAccumulatedSequence();
	        var codeExcerpt = undefined;
	        var closingDelimiterExcerpt = undefined;
	        // Parse the content backtick
	        for (;;) {
	            var peekedTokenKind = tokenReader.peekTokenKind();
	            // Did we find the matching token?
	            if (peekedTokenKind === Token_1.TokenKind.Backtick) {
	                if (tokenReader.isAccumulatedSequenceEmpty()) {
	                    return this._backtrackAndCreateErrorRange(tokenReader, marker, marker + 1, "tsdoc-code-span-empty" /* CodeSpanEmpty */, 'A code span must contain at least one character between the backticks');
	                }
	                codeExcerpt = tokenReader.extractAccumulatedSequence();
	                tokenReader.readToken();
	                closingDelimiterExcerpt = tokenReader.extractAccumulatedSequence();
	                break;
	            }
	            if (peekedTokenKind === Token_1.TokenKind.EndOfInput || peekedTokenKind === Token_1.TokenKind.Newline) {
	                return this._backtrackAndCreateError(tokenReader, marker, "tsdoc-code-span-missing-delimiter" /* CodeSpanMissingDelimiter */, 'The code span is missing its closing backtick');
	            }
	            tokenReader.readToken();
	        }
	        return new nodes.DocCodeSpan({
	            parsed: true,
	            configuration: this._configuration,
	            openingDelimiterExcerpt: openingDelimiterExcerpt,
	            codeExcerpt: codeExcerpt,
	            closingDelimiterExcerpt: closingDelimiterExcerpt
	        });
	    };
	    NodeParser.prototype._tryReadSpacingAndNewlines = function (tokenReader) {
	        var done = false;
	        do {
	            switch (tokenReader.peekTokenKind()) {
	                case Token_1.TokenKind.Spacing:
	                case Token_1.TokenKind.Newline:
	                    tokenReader.readToken();
	                    break;
	                default:
	                    done = true;
	                    break;
	            }
	        } while (!done);
	        return tokenReader.tryExtractAccumulatedSequence();
	    };
	    /**
	     * Read the next token, and report it as a DocErrorText node.
	     */
	    NodeParser.prototype._createError = function (tokenReader, messageId, errorMessage) {
	        tokenReader.readToken();
	        var textExcerpt = tokenReader.extractAccumulatedSequence();
	        var docErrorText = new nodes.DocErrorText({
	            parsed: true,
	            configuration: this._configuration,
	            textExcerpt: textExcerpt,
	            messageId: messageId,
	            errorMessage: errorMessage,
	            errorLocation: textExcerpt
	        });
	        this._parserContext.log.addMessageForDocErrorText(docErrorText);
	        return docErrorText;
	    };
	    /**
	     * Rewind to the specified marker, read the next token, and report it as a DocErrorText node.
	     */
	    NodeParser.prototype._backtrackAndCreateError = function (tokenReader, marker, messageId, errorMessage) {
	        tokenReader.backtrackToMarker(marker);
	        return this._createError(tokenReader, messageId, errorMessage);
	    };
	    /**
	     * Rewind to the errorStartMarker, read the tokens up to and including errorInclusiveEndMarker,
	     * and report it as a DocErrorText node.
	     */
	    NodeParser.prototype._backtrackAndCreateErrorRange = function (tokenReader, errorStartMarker, errorInclusiveEndMarker, messageId, errorMessage) {
	        tokenReader.backtrackToMarker(errorStartMarker);
	        while (tokenReader.createMarker() !== errorInclusiveEndMarker) {
	            tokenReader.readToken();
	        }
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.EndOfInput) {
	            tokenReader.readToken();
	        }
	        var textExcerpt = tokenReader.extractAccumulatedSequence();
	        var docErrorText = new nodes.DocErrorText({
	            parsed: true,
	            configuration: this._configuration,
	            textExcerpt: textExcerpt,
	            messageId: messageId,
	            errorMessage: errorMessage,
	            errorLocation: textExcerpt
	        });
	        this._parserContext.log.addMessageForDocErrorText(docErrorText);
	        return docErrorText;
	    };
	    /**
	     * Rewind to the specified marker, read the next token, and report it as a DocErrorText node
	     * whose location is based on an IFailure.
	     */
	    NodeParser.prototype._backtrackAndCreateErrorForFailure = function (tokenReader, marker, errorMessagePrefix, failure) {
	        tokenReader.backtrackToMarker(marker);
	        tokenReader.readToken();
	        var textExcerpt = tokenReader.extractAccumulatedSequence();
	        var docErrorText = new nodes.DocErrorText({
	            parsed: true,
	            configuration: this._configuration,
	            textExcerpt: textExcerpt,
	            messageId: failure.failureMessageId,
	            errorMessage: errorMessagePrefix + failure.failureMessage,
	            errorLocation: failure.failureLocation
	        });
	        this._parserContext.log.addMessageForDocErrorText(docErrorText);
	        return docErrorText;
	    };
	    /**
	     * Rewind to the errorStartMarker, read the tokens up to and including errorInclusiveEndMarker,
	     * and report it as a DocErrorText node whose location is based on an IFailure.
	     */
	    NodeParser.prototype._backtrackAndCreateErrorRangeForFailure = function (tokenReader, errorStartMarker, errorInclusiveEndMarker, errorMessagePrefix, failure) {
	        tokenReader.backtrackToMarker(errorStartMarker);
	        while (tokenReader.createMarker() !== errorInclusiveEndMarker) {
	            tokenReader.readToken();
	        }
	        if (tokenReader.peekTokenKind() !== Token_1.TokenKind.EndOfInput) {
	            tokenReader.readToken();
	        }
	        var textExcerpt = tokenReader.extractAccumulatedSequence();
	        var docErrorText = new nodes.DocErrorText({
	            parsed: true,
	            configuration: this._configuration,
	            textExcerpt: textExcerpt,
	            messageId: failure.failureMessageId,
	            errorMessage: errorMessagePrefix + failure.failureMessage,
	            errorLocation: failure.failureLocation
	        });
	        this._parserContext.log.addMessageForDocErrorText(docErrorText);
	        return docErrorText;
	    };
	    /**
	     * Creates an IFailure whose TokenSequence is a single token.  If a marker is not specified,
	     * then it is the current token.
	     */
	    NodeParser.prototype._createFailureForToken = function (tokenReader, failureMessageId, failureMessage, tokenMarker) {
	        if (!tokenMarker) {
	            tokenMarker = tokenReader.createMarker();
	        }
	        var tokenSequence = new TokenSequence_1.TokenSequence({
	            parserContext: this._parserContext,
	            startIndex: tokenMarker,
	            endIndex: tokenMarker + 1
	        });
	        return {
	            failureMessageId: failureMessageId,
	            failureMessage: failureMessage,
	            failureLocation: tokenSequence
	        };
	    };
	    /**
	     * Creates an IFailure whose TokenSequence starts from the specified marker and
	     * encompasses all tokens read since then.  If none were read, then the next token used.
	     */
	    NodeParser.prototype._createFailureForTokensSince = function (tokenReader, failureMessageId, failureMessage, startMarker) {
	        var endMarker = tokenReader.createMarker();
	        if (endMarker < startMarker) {
	            // This would be a parser bug
	            throw new Error('Invalid startMarker');
	        }
	        if (endMarker === startMarker) {
	            ++endMarker;
	        }
	        var tokenSequence = new TokenSequence_1.TokenSequence({
	            parserContext: this._parserContext,
	            startIndex: startMarker,
	            endIndex: endMarker
	        });
	        return {
	            failureMessageId: failureMessageId,
	            failureMessage: failureMessage,
	            failureLocation: tokenSequence
	        };
	    };
	    return NodeParser;
	}());
	exports.NodeParser = NodeParser;

	});

	unwrapExports(NodeParser_1);
	var NodeParser_2 = NodeParser_1.NodeParser;

	var ParagraphSplitter_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * The ParagraphSplitter is a secondary stage that runs after the NodeParser has constructed
	 * the DocComment.  It splits DocParagraph nodes into multiple paragraphs by looking for
	 * paragraph delimiters.  Following CommonMark conventions, paragraphs are delimited by
	 * one or more blank lines.  (These lines end with SoftBreak nodes.)  The blank lines are
	 * not discarded.  Instead, they are attached to the preceding paragraph.  If the DocParagraph
	 * starts with blank lines, they are preserved to avoid creating a paragraph containing only
	 * whitespace.
	 */
	var ParagraphSplitter = /** @class */ (function () {
	    function ParagraphSplitter() {
	    }
	    /**
	     * Split all paragraphs belonging to the provided subtree.
	     */
	    ParagraphSplitter.splitParagraphs = function (node) {
	        if (node instanceof nodes.DocSection) {
	            ParagraphSplitter.splitParagraphsForSection(node);
	            // (We don't recurse here, since sections cannot contain subsections)
	        }
	        else {
	            for (var _i = 0, _a = node.getChildNodes(); _i < _a.length; _i++) {
	                var childNode = _a[_i];
	                ParagraphSplitter.splitParagraphs(childNode);
	            }
	        }
	    };
	    /**
	     * Split all paragraphs belonging to the provided DocSection.
	     */
	    ParagraphSplitter.splitParagraphsForSection = function (docSection) {
	        var inputNodes = docSection.nodes;
	        var outputNodes = [];
	        for (var _i = 0, inputNodes_1 = inputNodes; _i < inputNodes_1.length; _i++) {
	            var oldNode = inputNodes_1[_i];
	            if (oldNode.kind === "Paragraph" /* Paragraph */) {
	                ParagraphSplitter._splitParagraph(oldNode, outputNodes);
	            }
	            else {
	                outputNodes.push(oldNode);
	            }
	        }
	        // Replace the inputNodes with the outputNodes
	        docSection.clearNodes();
	        docSection.appendNodes(outputNodes);
	    };
	    ParagraphSplitter._splitParagraph = function (oldParagraph, outputNodes) {
	        var inputParagraphNodes = oldParagraph.nodes;
	        var currentParagraph = new nodes.DocParagraph({ configuration: oldParagraph.configuration });
	        outputNodes.push(currentParagraph);
	        var state = 0 /* Start */;
	        var currentIndex = 0;
	        while (currentIndex < inputParagraphNodes.length) {
	            // Scan forwards to the end of the line
	            var isBlankLine = true;
	            var lineEndIndex = currentIndex; // non-inclusive
	            do {
	                var node = inputParagraphNodes[lineEndIndex++];
	                if (node.kind === "SoftBreak" /* SoftBreak */) {
	                    break;
	                }
	                if (isBlankLine) {
	                    if (!this._isWhitespace(node)) {
	                        isBlankLine = false;
	                    }
	                }
	            } while (lineEndIndex < inputParagraphNodes.length);
	            // At this point, the line and SoftBreak will be in inputParagraphNodes.slice(currentIndex, lineEndIndex)
	            switch (state) {
	                case 0 /* Start */:
	                    // We're skipping any blank lines that start the first paragraph
	                    if (!isBlankLine) {
	                        state = 1 /* AwaitingTrailer */;
	                    }
	                    break;
	                case 1 /* AwaitingTrailer */:
	                    // We already saw some content, so now we're looking for a blank line that starts the trailer
	                    // at the end of this paragraph
	                    if (isBlankLine) {
	                        state = 2 /* ReadingTrailer */;
	                    }
	                    break;
	                case 2 /* ReadingTrailer */:
	                    // We already found the trailer, so now we're looking for a non-blank line that will
	                    // begin a new paragraph
	                    if (!isBlankLine) {
	                        // Start a new paragraph
	                        currentParagraph = new nodes.DocParagraph({ configuration: oldParagraph.configuration });
	                        outputNodes.push(currentParagraph);
	                        state = 1 /* AwaitingTrailer */;
	                    }
	                    break;
	            }
	            // Append the line onto the current paragraph
	            for (var i = currentIndex; i < lineEndIndex; ++i) {
	                currentParagraph.appendNode(inputParagraphNodes[i]);
	            }
	            currentIndex = lineEndIndex;
	        }
	    };
	    ParagraphSplitter._isWhitespace = function (node) {
	        switch (node.kind) {
	            case "PlainText" /* PlainText */:
	                var docPlainText = node;
	                return ParagraphSplitter._whitespaceRegExp.test(docPlainText.text);
	            default:
	                return false;
	        }
	    };
	    ParagraphSplitter._whitespaceRegExp = /^\s*$/;
	    return ParagraphSplitter;
	}());
	exports.ParagraphSplitter = ParagraphSplitter;

	});

	unwrapExports(ParagraphSplitter_1);
	var ParagraphSplitter_2 = ParagraphSplitter_1.ParagraphSplitter;

	var TSDocParser_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });







	/**
	 * The main API for parsing TSDoc comments.
	 */
	var TSDocParser = /** @class */ (function () {
	    function TSDocParser(configuration) {
	        if (configuration) {
	            this.configuration = configuration;
	        }
	        else {
	            this.configuration = new TSDocConfiguration_1.TSDocConfiguration();
	        }
	    }
	    TSDocParser.prototype.parseString = function (text) {
	        return this.parseRange(TextRange_1.TextRange.fromString(text));
	    };
	    TSDocParser.prototype.parseRange = function (range) {
	        var parserContext = new ParserContext_1.ParserContext(this.configuration, range);
	        if (LineExtractor_1.LineExtractor.extract(parserContext)) {
	            parserContext.tokens = Tokenizer_1.Tokenizer.readTokens(parserContext.lines);
	            var nodeParser = new NodeParser_1.NodeParser(parserContext);
	            nodeParser.parse();
	            ParagraphSplitter_1.ParagraphSplitter.splitParagraphs(parserContext.docComment);
	        }
	        return parserContext;
	    };
	    return TSDocParser;
	}());
	exports.TSDocParser = TSDocParser;

	});

	unwrapExports(TSDocParser_1);
	var TSDocParser_2 = TSDocParser_1.TSDocParser;

	var lib = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });

	exports.DocNodeManager = DocNodeManager_1.DocNodeManager;

	exports.TSDocConfiguration = TSDocConfiguration_1.TSDocConfiguration;

	exports.TSDocTagSyntaxKind = TSDocTagDefinition_1.TSDocTagSyntaxKind;
	exports.TSDocTagDefinition = TSDocTagDefinition_1.TSDocTagDefinition;

	exports.TSDocValidationConfiguration = TSDocValidationConfiguration_1.TSDocValidationConfiguration;

	exports.StandardTags = StandardTags_1.StandardTags;

	exports.StandardModifierTagSet = StandardModifierTagSet_1.StandardModifierTagSet;

	exports.ModifierTagSet = ModifierTagSet_1.ModifierTagSet;

	exports.PlainTextEmitter = PlainTextEmitter_1.PlainTextEmitter;

	exports.StringBuilder = StringBuilder_1.StringBuilder;

	exports.TSDocEmitter = TSDocEmitter_1.TSDocEmitter;
	__export(nodes);

	exports.ParserContext = ParserContext_1.ParserContext;

	exports.ParserMessage = ParserMessage_1.ParserMessage;

	exports.ParserMessageLog = ParserMessageLog_1.ParserMessageLog;

	exports.TextRange = TextRange_1.TextRange;

	exports.Token = Token_1.Token;
	exports.TokenKind = Token_1.TokenKind;

	exports.TokenSequence = TokenSequence_1.TokenSequence;

	exports.TSDocParser = TSDocParser_1.TSDocParser;

	exports.DocNodeTransforms = DocNodeTransforms_1.DocNodeTransforms;

	});

	unwrapExports(lib);
	var lib_1 = lib.DocNodeManager;
	var lib_2 = lib.TSDocConfiguration;
	var lib_3 = lib.TSDocTagSyntaxKind;
	var lib_4 = lib.TSDocTagDefinition;
	var lib_5 = lib.TSDocValidationConfiguration;
	var lib_6 = lib.StandardTags;
	var lib_7 = lib.StandardModifierTagSet;
	var lib_8 = lib.ModifierTagSet;
	var lib_9 = lib.PlainTextEmitter;
	var lib_10 = lib.StringBuilder;
	var lib_11 = lib.TSDocEmitter;
	var lib_12 = lib.ParserContext;
	var lib_13 = lib.ParserMessage;
	var lib_14 = lib.ParserMessageLog;
	var lib_15 = lib.TextRange;
	var lib_16 = lib.Token;
	var lib_17 = lib.TokenKind;
	var lib_18 = lib.TokenSequence;
	var lib_19 = lib.TSDocParser;
	var lib_20 = lib.DocNodeTransforms;

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * @internal
	 */
	class AedocDefinitions {
	    static get tsdocConfiguration() {
	        if (!AedocDefinitions._tsdocConfiguration) {
	            const configuration = new lib_2();
	            configuration.addTagDefinitions([
	                AedocDefinitions.betaDocumentation,
	                AedocDefinitions.internalRemarks,
	                AedocDefinitions.preapprovedTag
	            ], true);
	            configuration.setSupportForTags([
	                lib_6.alpha,
	                lib_6.beta,
	                lib_6.defaultValue,
	                lib_6.deprecated,
	                lib_6.eventProperty,
	                lib_6.example,
	                lib_6.inheritDoc,
	                lib_6.internal,
	                lib_6.link,
	                lib_6.override,
	                lib_6.packageDocumentation,
	                lib_6.param,
	                lib_6.privateRemarks,
	                lib_6.public,
	                lib_6.readonly,
	                lib_6.remarks,
	                lib_6.returns,
	                lib_6.sealed,
	                lib_6.throws,
	                lib_6.virtual
	            ], true);
	            AedocDefinitions._tsdocConfiguration = configuration;
	        }
	        return AedocDefinitions._tsdocConfiguration;
	    }
	}
	AedocDefinitions.betaDocumentation = new lib_4({
	    tagName: '@betaDocumentation',
	    syntaxKind: lib_3.ModifierTag
	});
	AedocDefinitions.internalRemarks = new lib_4({
	    tagName: '@internalRemarks',
	    syntaxKind: lib_3.BlockTag
	});
	AedocDefinitions.preapprovedTag = new lib_4({
	    tagName: '@preapproved',
	    syntaxKind: lib_3.ModifierTag
	});

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	// See LICENSE in the project root for license information.
	/**
	  * A "release tag" is a custom TSDoc tag that is applied to an API to communicate the level of support
	  * provided for third-party developers.
	  *
	  * @remarks
	  *
	  * The four release tags are: `@internal`, `@alpha`, `@beta`, and `@public`. They are applied to API items such
	  * as classes, member functions, enums, etc.  The release tag applies recursively to members of a container
	  * (e.g. class or interface). For example, if a class is marked as `@beta`, then all of its members automatically
	  * have this status; you DON'T need add the `@beta` tag to each member function. However, you could add
	  * `@internal` to a member function to give it a different release status.
	  *
	  * @public
	  */
	var ReleaseTag;
	(function (ReleaseTag) {
	    /**
	     * No release tag was specified in the AEDoc summary.
	     */
	    ReleaseTag[ReleaseTag["None"] = 0] = "None";
	    /**
	     * Indicates that an API item is meant only for usage by other NPM packages from the same
	     * maintainer. Third parties should never use "internal" APIs. (To emphasize this, their
	     * names are prefixed by underscores.)
	     */
	    ReleaseTag[ReleaseTag["Internal"] = 1] = "Internal";
	    /**
	     * Indicates that an API item is eventually intended to be public, but currently is in an
	     * early stage of development. Third parties should not use "alpha" APIs.
	     */
	    ReleaseTag[ReleaseTag["Alpha"] = 2] = "Alpha";
	    /**
	     * Indicates that an API item has been released in an experimental state. Third parties are
	     * encouraged to try it and provide feedback. However, a "beta" API should NOT be used
	     * in production.
	     */
	    ReleaseTag[ReleaseTag["Beta"] = 3] = "Beta";
	    /**
	     * Indicates that an API item has been officially released. It is part of the supported
	     * contract (e.g. SemVer) for a package.
	     */
	    ReleaseTag[ReleaseTag["Public"] = 4] = "Public";
	})(ReleaseTag || (ReleaseTag = {}));
	/**
	 * Helper functions for working with the `ReleaseTag` enum.
	 * @public
	 */
	(function (ReleaseTag) {
	    /**
	     * Returns the TSDoc tag name for a `ReleaseTag` value.
	     *
	     * @remarks
	     * For example, `getTagName(ReleaseTag.Internal)` would return the string `@internal`.
	     */
	    function getTagName(releaseTag) {
	        switch (releaseTag) {
	            case ReleaseTag.None: return '(none)';
	            case ReleaseTag.Internal: return '@internal';
	            case ReleaseTag.Alpha: return '@alpha';
	            case ReleaseTag.Beta: return '@beta';
	            case ReleaseTag.Public: return '@public';
	        }
	        throw new Error('Unsupported release tag');
	    }
	    ReleaseTag.getTagName = getTagName;
	    /**
	     * Compares two `ReleaseTag` values. Their values must not be `ReleaseTag.None`.
	     * @returns 0 if `a` and `b` are equal, a positive number if `a` is more public than `b`,
	     * and a negative number if `a` is less public than `b`.
	     * @remarks
	     * For example, `compareReleaseTag(ReleaseTag.Beta, ReleaseTag.Alpha)` will return a positive
	     * number because beta is more public than alpha.
	     */
	    function compare(a, b) {
	        return a - b;
	    }
	    ReleaseTag.compare = compare;
	})(ReleaseTag || (ReleaseTag = {}));

	var DeclarationReference_1 = createCommonjsModule(function (module, exports) {
	/* eslint-disable max-lines */
	/* eslint-disable @typescript-eslint/array-type */
	/* eslint-disable no-return-assign */
	/* eslint-disable no-sequences */
	/* eslint-disable no-inner-declarations */
	/* eslint-disable @typescript-eslint/no-use-before-define */
	/* eslint-disable @typescript-eslint/member-naming */
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	// NOTE: See DeclarationReference.grammarkdown for information on the underlying grammar.

	/**
	 * Represents a reference to a declaration.
	 * @beta
	 */
	var DeclarationReference = /** @class */ (function () {
	    function DeclarationReference(source, navigation, symbol) {
	        this._source = source;
	        this._navigation = navigation;
	        this._symbol = symbol;
	    }
	    Object.defineProperty(DeclarationReference.prototype, "source", {
	        get: function () {
	            return this._source;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DeclarationReference.prototype, "navigation", {
	        get: function () {
	            if (!this._source || !this._symbol) {
	                return undefined;
	            }
	            if (this._source === GlobalSource.instance) {
	                return "~" /* Locals */;
	            }
	            if (this._navigation === undefined) {
	                return "." /* Exports */;
	            }
	            return this._navigation;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DeclarationReference.prototype, "symbol", {
	        get: function () {
	            return this._symbol;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DeclarationReference.prototype, "isEmpty", {
	        get: function () {
	            return this.source === undefined
	                && this.symbol === undefined;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DeclarationReference.parse = function (text) {
	        var parser = new Parser(text);
	        var reference = parser.parseDeclarationReference();
	        if (parser.errors.length) {
	            throw new SyntaxError("Invalid DeclarationReference '" + text + "':\n  " + parser.errors.join('\n  '));
	        }
	        if (!parser.eof) {
	            throw new SyntaxError("Invalid DeclarationReference '" + text + "'");
	        }
	        return reference;
	    };
	    DeclarationReference.parseComponent = function (text) {
	        if (text[0] === '[') {
	            return ComponentReference.parse(text);
	        }
	        else {
	            return new ComponentString(text, true);
	        }
	    };
	    /**
	     * Determines whether the provided string is a well-formed symbol navigation component string.
	     */
	    DeclarationReference.isWellFormedComponentString = function (text) {
	        var scanner = new Scanner(text);
	        return scanner.scan() === 16 /* String */ ? scanner.scan() === 1 /* EofToken */ :
	            scanner.token() === 17 /* Text */ ? scanner.scan() === 1 /* EofToken */ :
	                scanner.token() === 1 /* EofToken */;
	    };
	    /**
	     * Escapes a string for use as a symbol navigation component. If the string contains any of `!.#~:,"{}()@` or starts
	     * with `[`, it is enclosed in quotes.
	     */
	    DeclarationReference.escapeComponentString = function (text) {
	        if (text.length === 0) {
	            return '""';
	        }
	        var ch = text.charAt(0);
	        if (ch === '[' || ch === '"' || !this.isWellFormedComponentString(text)) {
	            return JSON.stringify(text);
	        }
	        return text;
	    };
	    /**
	     * Unescapes a string used as a symbol navigation component.
	     */
	    DeclarationReference.unescapeComponentString = function (text) {
	        if (text.length >= 2 && text.charAt(0) === '"' && text.charAt(text.length - 1) === '"') {
	            try {
	                return JSON.parse(text);
	            }
	            catch (_a) {
	                throw new SyntaxError("Invalid Component '" + text + "'");
	            }
	        }
	        if (!this.isWellFormedComponentString(text)) {
	            throw new SyntaxError("Invalid Component '" + text + "'");
	        }
	        return text;
	    };
	    /**
	     * Determines whether the provided string is a well-formed module source string. The string may not
	     * have a trailing `!` character.
	     */
	    DeclarationReference.isWellFormedModuleSourceString = function (text) {
	        var scanner = new Scanner(text + '!');
	        return scanner.rescanModuleSource() === 18 /* ModuleSource */
	            && !scanner.stringIsUnterminated
	            && scanner.scan() === 8 /* ExclamationToken */
	            && scanner.scan() === 1 /* EofToken */;
	    };
	    /**
	     * Escapes a string for use as a module source. If the string contains any of `!"` it is enclosed in quotes.
	     */
	    DeclarationReference.escapeModuleSourceString = function (text) {
	        if (text.length === 0) {
	            return '""';
	        }
	        var ch = text.charAt(0);
	        if (ch === '"' || !this.isWellFormedModuleSourceString(text)) {
	            return JSON.stringify(text);
	        }
	        return text;
	    };
	    /**
	     * Unescapes a string used as a module source. The string may not have a trailing `!` character.
	     */
	    DeclarationReference.unescapeModuleSourceString = function (text) {
	        if (text.length >= 2 && text.charAt(0) === '"' && text.charAt(text.length - 1) === '"') {
	            try {
	                return JSON.parse(text);
	            }
	            catch (_a) {
	                throw new SyntaxError("Invalid Module source '" + text + "'");
	            }
	        }
	        if (!this.isWellFormedModuleSourceString(text)) {
	            throw new SyntaxError("Invalid Module source '" + text + "'");
	        }
	        return text;
	    };
	    DeclarationReference.empty = function () {
	        return new DeclarationReference();
	    };
	    DeclarationReference.package = function (packageName, importPath) {
	        return new DeclarationReference(ModuleSource.fromPackage(packageName, importPath));
	    };
	    DeclarationReference.module = function (path, userEscaped) {
	        return new DeclarationReference(new ModuleSource(path, userEscaped));
	    };
	    DeclarationReference.global = function () {
	        return new DeclarationReference(GlobalSource.instance);
	    };
	    DeclarationReference.from = function (base) {
	        return base || this.empty();
	    };
	    DeclarationReference.prototype.withSource = function (source) {
	        return this._source === source ? this : new DeclarationReference(source, this._navigation, this._symbol);
	    };
	    DeclarationReference.prototype.withNavigation = function (navigation) {
	        return this._navigation === navigation ? this : new DeclarationReference(this._source, navigation, this._symbol);
	    };
	    DeclarationReference.prototype.withSymbol = function (symbol) {
	        return this._symbol === symbol ? this : new DeclarationReference(this._source, this._navigation, symbol);
	    };
	    DeclarationReference.prototype.withComponentPath = function (componentPath) {
	        return this.withSymbol(this.symbol ? this.symbol.withComponentPath(componentPath) :
	            new SymbolReference(componentPath));
	    };
	    DeclarationReference.prototype.withMeaning = function (meaning) {
	        if (!this.symbol) {
	            if (meaning === undefined) {
	                return this;
	            }
	            return this.withSymbol(SymbolReference.empty().withMeaning(meaning));
	        }
	        return this.withSymbol(this.symbol.withMeaning(meaning));
	    };
	    DeclarationReference.prototype.withOverloadIndex = function (overloadIndex) {
	        if (!this.symbol) {
	            if (overloadIndex === undefined) {
	                return this;
	            }
	            return this.withSymbol(SymbolReference.empty().withOverloadIndex(overloadIndex));
	        }
	        return this.withSymbol(this.symbol.withOverloadIndex(overloadIndex));
	    };
	    DeclarationReference.prototype.addNavigationStep = function (navigation, component) {
	        if (this.symbol) {
	            return this.withSymbol(this.symbol.addNavigationStep(navigation, component));
	        }
	        if (navigation === "#" /* Members */) {
	            navigation = "." /* Exports */;
	        }
	        var symbol = new SymbolReference(new ComponentRoot(Component.from(component)));
	        return new DeclarationReference(this.source, navigation, symbol);
	    };
	    DeclarationReference.prototype.toString = function () {
	        var navigation = this._source instanceof ModuleSource
	            && this._symbol
	            && this.navigation === "~" /* Locals */ ? '~' : '';
	        return "" + (this.source || '') + navigation + (this.symbol || '');
	    };
	    return DeclarationReference;
	}());
	exports.DeclarationReference = DeclarationReference;
	/**
	 * Represents a module.
	 * @beta
	 */
	var ModuleSource = /** @class */ (function () {
	    function ModuleSource(path, userEscaped) {
	        if (userEscaped === void 0) { userEscaped = true; }
	        this.escapedPath = this instanceof ParsedModuleSource ? path : escapeModuleSourceIfNeeded(path, userEscaped);
	    }
	    Object.defineProperty(ModuleSource.prototype, "path", {
	        get: function () {
	            return this._path || (this._path = DeclarationReference.unescapeModuleSourceString(this.escapedPath));
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ModuleSource.prototype, "packageName", {
	        get: function () {
	            return this._getOrParsePathComponents().packageName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ModuleSource.prototype, "scopeName", {
	        get: function () {
	            var scopeName = this._getOrParsePathComponents().scopeName;
	            return scopeName ? '@' + scopeName : '';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ModuleSource.prototype, "unscopedPackageName", {
	        get: function () {
	            return this._getOrParsePathComponents().unscopedPackageName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ModuleSource.prototype, "importPath", {
	        get: function () {
	            return this._getOrParsePathComponents().importPath || '';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ModuleSource.fromScopedPackage = function (scopeName, unscopedPackageName, importPath) {
	        var packageName = unscopedPackageName;
	        if (scopeName) {
	            if (scopeName.charAt(0) === '@') {
	                scopeName = scopeName.slice(1);
	            }
	            packageName = "@" + scopeName + "/" + unscopedPackageName;
	        }
	        var parsed = { packageName: packageName, scopeName: scopeName || '', unscopedPackageName: unscopedPackageName };
	        return this._fromPackageName(parsed, packageName, importPath);
	    };
	    ModuleSource.fromPackage = function (packageName, importPath) {
	        return this._fromPackageName(parsePackageName(packageName), packageName, importPath);
	    };
	    ModuleSource._fromPackageName = function (parsed, packageName, importPath) {
	        if (!parsed) {
	            throw new Error('Parsed package must be provided.');
	        }
	        var packageNameError = StringChecks_1.StringChecks.explainIfInvalidPackageName(packageName);
	        if (packageNameError) {
	            throw new SyntaxError("Invalid NPM package name: " + packageNameError);
	        }
	        var path = packageName;
	        if (importPath) {
	            if (invalidImportPathRegExp.test(importPath)) {
	                throw new SyntaxError("Invalid import path '" + importPath);
	            }
	            path += '/' + importPath;
	            parsed.importPath = importPath;
	        }
	        var source = new ModuleSource(path);
	        source._pathComponents = parsed;
	        return source;
	    };
	    ModuleSource.prototype.toString = function () {
	        return this.escapedPath + "!";
	    };
	    ModuleSource.prototype._getOrParsePathComponents = function () {
	        if (!this._pathComponents) {
	            var path = this.path;
	            var parsed = parsePackageName(path);
	            if (parsed && !StringChecks_1.StringChecks.explainIfInvalidPackageName(parsed.packageName)) {
	                this._pathComponents = parsed;
	            }
	            else {
	                this._pathComponents = {
	                    packageName: '',
	                    scopeName: '',
	                    unscopedPackageName: '',
	                    importPath: path
	                };
	            }
	        }
	        return this._pathComponents;
	    };
	    return ModuleSource;
	}());
	exports.ModuleSource = ModuleSource;
	var ParsedModuleSource = /** @class */ (function (_super) {
	    __extends(ParsedModuleSource, _super);
	    function ParsedModuleSource() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return ParsedModuleSource;
	}(ModuleSource));
	// matches the following:
	//   'foo'            -> ["foo", "foo", undefined, "foo", undefined]
	//   'foo/bar'        -> ["foo/bar", "foo", undefined, "foo", "bar"]
	//   '@scope/foo'     -> ["@scope/foo", "@scope/foo", "scope", "foo", undefined]
	//   '@scope/foo/bar' -> ["@scope/foo/bar", "@scope/foo", "scope", "foo", "bar"]
	// does not match:
	//   '/'
	//   '@/'
	//   '@scope/'
	// capture groups:
	//   1. The package name (including scope)
	//   2. The scope name (excluding the leading '@')
	//   3. The unscoped package name
	//   4. The package-relative import path
	var packageNameRegExp = /^((?:@([^/]+?)\/)?([^/]+?))(?:\/(.+))?$/;
	// no leading './' or '.\'
	// no leading '../' or '..\'
	// no leading '/' or '\'
	// not '.' or '..'
	var invalidImportPathRegExp = /^(\.\.?([\\/]|$)|[\\/])/;
	function parsePackageName(text) {
	    var match = packageNameRegExp.exec(text);
	    if (!match) {
	        return match;
	    }
	    var _a = match[1], packageName = _a === void 0 ? '' : _a, _b = match[2], scopeName = _b === void 0 ? '' : _b, _c = match[3], unscopedPackageName = _c === void 0 ? '' : _c, importPath = match[4];
	    return { packageName: packageName, scopeName: scopeName, unscopedPackageName: unscopedPackageName, importPath: importPath };
	}
	/**
	 * Represents the global scope.
	 * @beta
	 */
	var GlobalSource = /** @class */ (function () {
	    function GlobalSource() {
	    }
	    GlobalSource.prototype.toString = function () {
	        return '!';
	    };
	    GlobalSource.instance = new GlobalSource();
	    return GlobalSource;
	}());
	exports.GlobalSource = GlobalSource;
	/**
	 * @beta
	 */
	// eslint-disable-next-line @typescript-eslint/no-namespace
	var Component;
	(function (Component) {
	    function from(value) {
	        if (typeof value === 'string') {
	            return new ComponentString(value);
	        }
	        if (value instanceof DeclarationReference) {
	            return new ComponentReference(value);
	        }
	        return value;
	    }
	    Component.from = from;
	})(Component = exports.Component || (exports.Component = {}));
	/**
	 * @beta
	 */
	var ComponentString = /** @class */ (function () {
	    function ComponentString(text, userEscaped) {
	        this.text = this instanceof ParsedComponentString ? text : escapeComponentIfNeeded(text, userEscaped);
	    }
	    ComponentString.prototype.toString = function () {
	        return this.text;
	    };
	    return ComponentString;
	}());
	exports.ComponentString = ComponentString;
	var ParsedComponentString = /** @class */ (function (_super) {
	    __extends(ParsedComponentString, _super);
	    function ParsedComponentString() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return ParsedComponentString;
	}(ComponentString));
	/**
	 * @beta
	 */
	var ComponentReference = /** @class */ (function () {
	    function ComponentReference(reference) {
	        this.reference = reference;
	    }
	    ComponentReference.parse = function (text) {
	        if (text.length > 2 && text.charAt(0) === '[' && text.charAt(text.length - 1) === ']') {
	            return new ComponentReference(DeclarationReference.parse(text.slice(1, -1)));
	        }
	        throw new SyntaxError("Invalid component reference: '" + text + "'");
	    };
	    ComponentReference.prototype.withReference = function (reference) {
	        return this.reference === reference ? this : new ComponentReference(reference);
	    };
	    ComponentReference.prototype.toString = function () {
	        return "[" + this.reference + "]";
	    };
	    return ComponentReference;
	}());
	exports.ComponentReference = ComponentReference;
	/**
	 * @beta
	 */
	var ComponentPathBase = /** @class */ (function () {
	    function ComponentPathBase(component) {
	        this.component = component;
	    }
	    ComponentPathBase.prototype.addNavigationStep = function (navigation, component) {
	        // tslint:disable-next-line:no-use-before-declare
	        return new ComponentNavigation(this, navigation, Component.from(component));
	    };
	    return ComponentPathBase;
	}());
	exports.ComponentPathBase = ComponentPathBase;
	/**
	 * @beta
	 */
	var ComponentRoot = /** @class */ (function (_super) {
	    __extends(ComponentRoot, _super);
	    function ComponentRoot() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    ComponentRoot.prototype.withComponent = function (component) {
	        return this.component === component ? this : new ComponentRoot(Component.from(component));
	    };
	    ComponentRoot.prototype.toString = function () {
	        return this.component.toString();
	    };
	    return ComponentRoot;
	}(ComponentPathBase));
	exports.ComponentRoot = ComponentRoot;
	/**
	 * @beta
	 */
	var ComponentNavigation = /** @class */ (function (_super) {
	    __extends(ComponentNavigation, _super);
	    function ComponentNavigation(parent, navigation, component) {
	        var _this = _super.call(this, component) || this;
	        _this.parent = parent;
	        _this.navigation = navigation;
	        return _this;
	    }
	    ComponentNavigation.prototype.withParent = function (parent) {
	        return this.parent === parent ? this : new ComponentNavigation(parent, this.navigation, this.component);
	    };
	    ComponentNavigation.prototype.withNavigation = function (navigation) {
	        return this.navigation === navigation ? this : new ComponentNavigation(this.parent, navigation, this.component);
	    };
	    ComponentNavigation.prototype.withComponent = function (component) {
	        return this.component === component ? this :
	            new ComponentNavigation(this.parent, this.navigation, Component.from(component));
	    };
	    ComponentNavigation.prototype.toString = function () {
	        return "" + this.parent + formatNavigation(this.navigation) + this.component;
	    };
	    return ComponentNavigation;
	}(ComponentPathBase));
	exports.ComponentNavigation = ComponentNavigation;
	/**
	 * Represents a reference to a TypeScript symbol.
	 * @beta
	 */
	var SymbolReference = /** @class */ (function () {
	    function SymbolReference(component, _a) {
	        var _b = _a === void 0 ? {} : _a, meaning = _b.meaning, overloadIndex = _b.overloadIndex;
	        this.componentPath = component;
	        this.overloadIndex = overloadIndex;
	        this.meaning = meaning;
	    }
	    SymbolReference.empty = function () {
	        return new SymbolReference(/*component*/ undefined);
	    };
	    SymbolReference.prototype.withComponentPath = function (componentPath) {
	        return this.componentPath === componentPath ? this : new SymbolReference(componentPath, {
	            meaning: this.meaning,
	            overloadIndex: this.overloadIndex
	        });
	    };
	    SymbolReference.prototype.withMeaning = function (meaning) {
	        return this.meaning === meaning ? this : new SymbolReference(this.componentPath, {
	            meaning: meaning,
	            overloadIndex: this.overloadIndex
	        });
	    };
	    SymbolReference.prototype.withOverloadIndex = function (overloadIndex) {
	        return this.overloadIndex === overloadIndex ? this : new SymbolReference(this.componentPath, {
	            meaning: this.meaning,
	            overloadIndex: overloadIndex
	        });
	    };
	    SymbolReference.prototype.addNavigationStep = function (navigation, component) {
	        if (!this.componentPath) {
	            throw new Error('Cannot add a navigation step to an empty symbol reference.');
	        }
	        return new SymbolReference(this.componentPath.addNavigationStep(navigation, component));
	    };
	    SymbolReference.prototype.toString = function () {
	        var result = "" + (this.componentPath || '');
	        if (this.meaning && this.overloadIndex !== undefined) {
	            result += ":" + this.meaning + "(" + this.overloadIndex + ")";
	        }
	        else if (this.meaning) {
	            result += ":" + this.meaning;
	        }
	        else if (this.overloadIndex !== undefined) {
	            result += ":" + this.overloadIndex;
	        }
	        return result;
	    };
	    return SymbolReference;
	}());
	exports.SymbolReference = SymbolReference;
	function tokenToString(token) {
	    switch (token) {
	        case 2 /* OpenBraceToken */: return '{';
	        case 3 /* CloseBraceToken */: return '}';
	        case 4 /* OpenParenToken */: return '(';
	        case 5 /* CloseParenToken */: return ')';
	        case 6 /* OpenBracketToken */: return '[';
	        case 7 /* CloseBracketToken */: return ']';
	        case 8 /* ExclamationToken */: return '!';
	        case 9 /* DotToken */: return '.';
	        case 10 /* HashToken */: return '#';
	        case 11 /* TildeToken */: return '~';
	        case 12 /* ColonToken */: return ':';
	        case 13 /* CommaToken */: return ',';
	        case 14 /* AtToken */: return '@';
	        case 19 /* ClassKeyword */: return 'class';
	        case 20 /* InterfaceKeyword */: return 'interface';
	        case 21 /* TypeKeyword */: return 'type';
	        case 22 /* EnumKeyword */: return 'enum';
	        case 23 /* NamespaceKeyword */: return 'namespace';
	        case 24 /* FunctionKeyword */: return 'function';
	        case 25 /* VarKeyword */: return 'var';
	        case 26 /* ConstructorKeyword */: return 'constructor';
	        case 27 /* MemberKeyword */: return 'member';
	        case 28 /* EventKeyword */: return 'event';
	        case 29 /* CallKeyword */: return 'call';
	        case 30 /* NewKeyword */: return 'new';
	        case 31 /* IndexKeyword */: return 'index';
	        case 32 /* ComplexKeyword */: return 'complex';
	        case 0 /* None */: return '<none>';
	        case 1 /* EofToken */: return '<eof>';
	        case 15 /* DecimalDigits */: return '<decimal digits>';
	        case 16 /* String */: return '<string>';
	        case 17 /* Text */: return '<text>';
	        case 18 /* ModuleSource */: return '<module source>';
	    }
	}
	var Scanner = /** @class */ (function () {
	    function Scanner(text) {
	        this._pos = 0;
	        this._tokenPos = 0;
	        this._stringIsUnterminated = false;
	        this._token = 0 /* None */;
	        this._text = text;
	    }
	    Object.defineProperty(Scanner.prototype, "stringIsUnterminated", {
	        get: function () {
	            return this._stringIsUnterminated;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Scanner.prototype, "text", {
	        get: function () {
	            return this._text;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Scanner.prototype, "tokenText", {
	        get: function () {
	            return this._text.slice(this._tokenPos, this._pos);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Scanner.prototype, "eof", {
	        get: function () {
	            return this._pos >= this._text.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Scanner.prototype.token = function () {
	        return this._token;
	    };
	    Scanner.prototype.speculate = function (cb) {
	        var tokenPos = this._tokenPos;
	        var pos = this._pos;
	        var text = this._text;
	        var token = this._token;
	        var stringIsUnterminated = this._stringIsUnterminated;
	        var accepted = false;
	        try {
	            var accept = function () { accepted = true; };
	            return cb(accept);
	        }
	        finally {
	            if (!accepted) {
	                this._tokenPos = tokenPos;
	                this._pos = pos;
	                this._text = text;
	                this._token = token;
	                this._stringIsUnterminated = stringIsUnterminated;
	            }
	        }
	    };
	    Scanner.prototype.scan = function () {
	        if (!this.eof) {
	            this._tokenPos = this._pos;
	            this._stringIsUnterminated = false;
	            while (!this.eof) {
	                var ch = this._text.charAt(this._pos++);
	                switch (ch) {
	                    case '{': return this._token = 2 /* OpenBraceToken */;
	                    case '}': return this._token = 3 /* CloseBraceToken */;
	                    case '(': return this._token = 4 /* OpenParenToken */;
	                    case ')': return this._token = 5 /* CloseParenToken */;
	                    case '[': return this._token = 6 /* OpenBracketToken */;
	                    case ']': return this._token = 7 /* CloseBracketToken */;
	                    case '!': return this._token = 8 /* ExclamationToken */;
	                    case '.': return this._token = 9 /* DotToken */;
	                    case '#': return this._token = 10 /* HashToken */;
	                    case '~': return this._token = 11 /* TildeToken */;
	                    case ':': return this._token = 12 /* ColonToken */;
	                    case ',': return this._token = 13 /* CommaToken */;
	                    case '@': return this._token = 14 /* AtToken */;
	                    case '"':
	                        this.scanString();
	                        return this._token = 16 /* String */;
	                    default:
	                        this.scanText();
	                        return this._token = 17 /* Text */;
	                }
	            }
	        }
	        return this._token = 1 /* EofToken */;
	    };
	    Scanner.prototype.rescanModuleSource = function () {
	        var _this = this;
	        switch (this._token) {
	            case 18 /* ModuleSource */:
	            case 8 /* ExclamationToken */:
	            case 1 /* EofToken */:
	                return this._token;
	        }
	        return this.speculate(function (accept) {
	            if (!_this.eof) {
	                _this._pos = _this._tokenPos;
	                _this._stringIsUnterminated = false;
	                var scanned = 'none';
	                while (!_this.eof) {
	                    var ch = _this._text[_this._pos];
	                    if (ch === '!') {
	                        if (scanned === 'none') {
	                            return _this._token;
	                        }
	                        accept();
	                        return _this._token = 18 /* ModuleSource */;
	                    }
	                    _this._pos++;
	                    if (ch === '"') {
	                        if (scanned === 'other') {
	                            // strings not allowed after scanning any other characters
	                            return _this._token;
	                        }
	                        scanned = 'string';
	                        _this.scanString();
	                    }
	                    else {
	                        if (scanned === 'string') {
	                            // no other tokens allowed after string
	                            return _this._token;
	                        }
	                        scanned = 'other';
	                        if (!isPunctuator(ch)) {
	                            _this.scanText();
	                        }
	                    }
	                }
	            }
	            return _this._token;
	        });
	    };
	    Scanner.prototype.rescanMeaning = function () {
	        if (this._token === 17 /* Text */) {
	            var tokenText = this.tokenText;
	            switch (tokenText) {
	                case 'class': return this._token = 19 /* ClassKeyword */;
	                case 'interface': return this._token = 20 /* InterfaceKeyword */;
	                case 'type': return this._token = 21 /* TypeKeyword */;
	                case 'enum': return this._token = 22 /* EnumKeyword */;
	                case 'namespace': return this._token = 23 /* NamespaceKeyword */;
	                case 'function': return this._token = 24 /* FunctionKeyword */;
	                case 'var': return this._token = 25 /* VarKeyword */;
	                case 'constructor': return this._token = 26 /* ConstructorKeyword */;
	                case 'member': return this._token = 27 /* MemberKeyword */;
	                case 'event': return this._token = 28 /* EventKeyword */;
	                case 'call': return this._token = 29 /* CallKeyword */;
	                case 'new': return this._token = 30 /* NewKeyword */;
	                case 'index': return this._token = 31 /* IndexKeyword */;
	                case 'complex': return this._token = 32 /* ComplexKeyword */;
	            }
	        }
	        return this._token;
	    };
	    Scanner.prototype.rescanDecimalDigits = function () {
	        if (this._token === 17 /* Text */) {
	            var tokenText = this.tokenText;
	            if (/^\d+$/.test(tokenText)) {
	                return this._token = 15 /* DecimalDigits */;
	            }
	        }
	        return this._token;
	    };
	    Scanner.prototype.scanString = function () {
	        while (!this.eof) {
	            var ch = this._text.charAt(this._pos++);
	            switch (ch) {
	                case '"': return;
	                case '\\':
	                    this.scanEscapeSequence();
	                    break;
	                default:
	                    if (isLineTerminator(ch)) {
	                        this._stringIsUnterminated = true;
	                        return;
	                    }
	            }
	        }
	        this._stringIsUnterminated = true;
	    };
	    Scanner.prototype.scanEscapeSequence = function () {
	        if (this.eof) {
	            this._stringIsUnterminated = true;
	            return;
	        }
	        var ch = this._text.charAt(this._pos);
	        // EscapeSequence:: CharacterEscapeSequence
	        if (isCharacterEscapeSequence(ch)) {
	            this._pos++;
	            return;
	        }
	        // EscapeSequence:: `0` [lookahead != DecimalDigit]
	        if (ch === '0'
	            && (this._pos + 1 === this._text.length
	                || !isDecimalDigit(this._text.charAt(this._pos + 1)))) {
	            this._pos++;
	            return;
	        }
	        // EscapeSequence:: HexEscapeSequence
	        if (ch === 'x'
	            && this._pos + 3 <= this._text.length
	            && isHexDigit(this._text.charAt(this._pos + 1))
	            && isHexDigit(this._text.charAt(this._pos + 2))) {
	            this._pos += 3;
	            return;
	        }
	        // EscapeSequence:: UnicodeEscapeSequence
	        // UnicodeEscapeSequence:: `u` Hex4Digits
	        if (ch === 'u'
	            && this._pos + 5 <= this._text.length
	            && isHexDigit(this._text.charAt(this._pos + 1))
	            && isHexDigit(this._text.charAt(this._pos + 2))
	            && isHexDigit(this._text.charAt(this._pos + 3))
	            && isHexDigit(this._text.charAt(this._pos + 4))) {
	            this._pos += 5;
	            return;
	        }
	        // EscapeSequence:: UnicodeEscapeSequence
	        // UnicodeEscapeSequence:: `u` `{` CodePoint `}`
	        if (ch === 'u'
	            && this._pos + 4 <= this._text.length
	            && this._text.charAt(this._pos + 1) === '{') {
	            var hexDigits = this._text.charAt(this._pos + 2);
	            if (isHexDigit(hexDigits)) {
	                for (var i = this._pos + 3; i < this._text.length; i++) {
	                    var ch2 = this._text.charAt(i);
	                    if (ch2 === '}') {
	                        var mv = parseInt(hexDigits, 16);
	                        if (mv <= 0x10ffff) {
	                            this._pos = i + 1;
	                            return;
	                        }
	                        break;
	                    }
	                    if (!isHexDigit(ch2)) {
	                        hexDigits += ch2;
	                        break;
	                    }
	                }
	            }
	        }
	        this._stringIsUnterminated = true;
	    };
	    Scanner.prototype.scanText = function () {
	        while (this._pos < this._text.length) {
	            var ch = this._text.charAt(this._pos);
	            if (isPunctuator(ch) || ch === '"') {
	                return;
	            }
	            this._pos++;
	        }
	    };
	    return Scanner;
	}());
	var Parser = /** @class */ (function () {
	    function Parser(text) {
	        this._errors = [];
	        this._scanner = new Scanner(text);
	        this._scanner.scan();
	    }
	    Object.defineProperty(Parser.prototype, "eof", {
	        get: function () {
	            return this.token() === 1 /* EofToken */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Parser.prototype, "errors", {
	        get: function () {
	            return this._errors;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Parser.prototype.parseDeclarationReference = function () {
	        var source;
	        var navigation;
	        var symbol;
	        if (this.optionalToken(8 /* ExclamationToken */)) {
	            // Reference to global symbol
	            source = GlobalSource.instance;
	        }
	        else if (this._scanner.rescanModuleSource() === 18 /* ModuleSource */) {
	            source = this.parseModuleSource();
	            // Check for optional `~` navigation token.
	            if (this.optionalToken(11 /* TildeToken */)) {
	                navigation = "~" /* Locals */;
	            }
	        }
	        if (this.isStartOfComponent()) {
	            symbol = this.parseSymbol();
	        }
	        else if (this.token() === 12 /* ColonToken */) {
	            symbol = this.parseSymbolRest(new ComponentRoot(new ComponentString('', /*userEscaped*/ true)));
	        }
	        return new DeclarationReference(source, navigation, symbol);
	    };
	    Parser.prototype.parseModuleSourceString = function () {
	        this._scanner.rescanModuleSource();
	        return this.parseTokenString(18 /* ModuleSource */, 'Module source');
	    };
	    Parser.prototype.parseComponentString = function () {
	        switch (this._scanner.token()) {
	            case 16 /* String */:
	                return this.parseString();
	            default:
	                return this.parseComponentCharacters();
	        }
	    };
	    Parser.prototype.token = function () {
	        return this._scanner.token();
	    };
	    Parser.prototype.parseModuleSource = function () {
	        var source = this.parseModuleSourceString();
	        this.expectToken(8 /* ExclamationToken */);
	        return new ParsedModuleSource(source, /*userEscaped*/ true);
	    };
	    Parser.prototype.parseSymbol = function () {
	        var component = this.parseComponentRest(this.parseRootComponent());
	        return this.parseSymbolRest(component);
	    };
	    Parser.prototype.parseSymbolRest = function (component) {
	        var meaning;
	        var overloadIndex;
	        if (this.optionalToken(12 /* ColonToken */)) {
	            meaning = this.tryParseMeaning();
	            overloadIndex = this.tryParseOverloadIndex(!!meaning);
	        }
	        return new SymbolReference(component, { meaning: meaning, overloadIndex: overloadIndex });
	    };
	    Parser.prototype.parseRootComponent = function () {
	        if (!this.isStartOfComponent()) {
	            return this.fail('Component expected', new ComponentRoot(new ComponentString('', /*userEscaped*/ true)));
	        }
	        var component = this.parseComponent();
	        return new ComponentRoot(component);
	    };
	    Parser.prototype.parseComponentRest = function (component) {
	        for (;;) {
	            switch (this.token()) {
	                case 9 /* DotToken */:
	                case 10 /* HashToken */:
	                case 11 /* TildeToken */:
	                    var navigation = this.parseNavigation();
	                    var right = this.parseComponent();
	                    component = new ComponentNavigation(component, navigation, right);
	                    break;
	                default:
	                    return component;
	            }
	        }
	    };
	    Parser.prototype.parseNavigation = function () {
	        switch (this._scanner.token()) {
	            case 9 /* DotToken */: return this._scanner.scan(), "." /* Exports */;
	            case 10 /* HashToken */: return this._scanner.scan(), "#" /* Members */;
	            case 11 /* TildeToken */: return this._scanner.scan(), "~" /* Locals */;
	            default: return this.fail('Expected \'.\', \'#\', or \'~\'', "." /* Exports */);
	        }
	    };
	    Parser.prototype.tryParseMeaning = function () {
	        switch (this._scanner.rescanMeaning()) {
	            case 19 /* ClassKeyword */: return this._scanner.scan(), "class" /* Class */;
	            case 20 /* InterfaceKeyword */: return this._scanner.scan(), "interface" /* Interface */;
	            case 21 /* TypeKeyword */: return this._scanner.scan(), "type" /* TypeAlias */;
	            case 22 /* EnumKeyword */: return this._scanner.scan(), "enum" /* Enum */;
	            case 23 /* NamespaceKeyword */: return this._scanner.scan(), "namespace" /* Namespace */;
	            case 24 /* FunctionKeyword */: return this._scanner.scan(), "function" /* Function */;
	            case 25 /* VarKeyword */: return this._scanner.scan(), "var" /* Variable */;
	            case 26 /* ConstructorKeyword */: return this._scanner.scan(), "constructor" /* Constructor */;
	            case 27 /* MemberKeyword */: return this._scanner.scan(), "member" /* Member */;
	            case 28 /* EventKeyword */: return this._scanner.scan(), "event" /* Event */;
	            case 29 /* CallKeyword */: return this._scanner.scan(), "call" /* CallSignature */;
	            case 30 /* NewKeyword */: return this._scanner.scan(), "new" /* ConstructSignature */;
	            case 31 /* IndexKeyword */: return this._scanner.scan(), "index" /* IndexSignature */;
	            case 32 /* ComplexKeyword */: return this._scanner.scan(), "complex" /* ComplexType */;
	            default: return undefined;
	        }
	    };
	    Parser.prototype.tryParseOverloadIndex = function (hasMeaning) {
	        if (this.optionalToken(4 /* OpenParenToken */)) {
	            var overloadIndex = this.parseDecimalDigits();
	            this.expectToken(5 /* CloseParenToken */);
	            return overloadIndex;
	        }
	        else if (!hasMeaning) {
	            return this.parseDecimalDigits();
	        }
	        return undefined;
	    };
	    Parser.prototype.parseDecimalDigits = function () {
	        switch (this._scanner.rescanDecimalDigits()) {
	            case 15 /* DecimalDigits */:
	                var value = +this._scanner.tokenText;
	                this._scanner.scan();
	                return value;
	            default:
	                return this.fail('Decimal digit expected', 0);
	        }
	    };
	    Parser.prototype.isStartOfComponent = function () {
	        switch (this.token()) {
	            case 17 /* Text */:
	            case 16 /* String */:
	            case 6 /* OpenBracketToken */:
	                return true;
	            default:
	                return false;
	        }
	    };
	    Parser.prototype.parseComponentCharacters = function () {
	        var text = '';
	        for (;;) {
	            switch (this._scanner.token()) {
	                case 17 /* Text */:
	                    text += this.parseText();
	                    break;
	                default:
	                    return text;
	            }
	        }
	    };
	    Parser.prototype.parseTokenString = function (token, tokenString) {
	        if (this._scanner.token() === token) {
	            var text = this._scanner.tokenText;
	            var stringIsUnterminated = this._scanner.stringIsUnterminated;
	            this._scanner.scan();
	            if (stringIsUnterminated) {
	                return this.fail((tokenString || tokenToString(token)) + " is unterminated", text);
	            }
	            return text;
	        }
	        return this.fail((tokenString || tokenToString(token)) + " expected", '');
	    };
	    Parser.prototype.parseText = function () {
	        return this.parseTokenString(17 /* Text */, 'Text');
	    };
	    Parser.prototype.parseString = function () {
	        return this.parseTokenString(16 /* String */, 'String');
	    };
	    Parser.prototype.parseComponent = function () {
	        switch (this._scanner.token()) {
	            case 6 /* OpenBracketToken */:
	                return this.parseBracketedComponent();
	            default:
	                return new ParsedComponentString(this.parseComponentString(), /*userEscaped*/ true);
	        }
	    };
	    Parser.prototype.parseBracketedComponent = function () {
	        this.expectToken(6 /* OpenBracketToken */);
	        var reference = this.parseDeclarationReference();
	        this.expectToken(7 /* CloseBracketToken */);
	        return new ComponentReference(reference);
	    };
	    Parser.prototype.optionalToken = function (token) {
	        if (this._scanner.token() === token) {
	            this._scanner.scan();
	            return true;
	        }
	        return false;
	    };
	    Parser.prototype.expectToken = function (token, message) {
	        if (this._scanner.token() !== token) {
	            var expected = tokenToString(token);
	            var actual = tokenToString(this._scanner.token());
	            return this.fail(message || "Expected token '" + expected + "', received '" + actual + "' instead.", undefined);
	        }
	        this._scanner.scan();
	    };
	    Parser.prototype.fail = function (message, fallback) {
	        this._errors.push(message);
	        return fallback;
	    };
	    return Parser;
	}());
	function formatNavigation(navigation) {
	    switch (navigation) {
	        case "." /* Exports */: return '.';
	        case "#" /* Members */: return '#';
	        case "~" /* Locals */: return '~';
	        default: return '';
	    }
	}
	function isCharacterEscapeSequence(ch) {
	    return isSingleEscapeCharacter(ch)
	        || isNonEscapeCharacter(ch);
	}
	function isSingleEscapeCharacter(ch) {
	    switch (ch) {
	        case '\'':
	        case '"':
	        case '\\':
	        case 'b':
	        case 'f':
	        case 'n':
	        case 'r':
	        case 't':
	        case 'v':
	            return true;
	        default:
	            return false;
	    }
	}
	function isNonEscapeCharacter(ch) {
	    return !isEscapeCharacter(ch)
	        && !isLineTerminator(ch);
	}
	function isEscapeCharacter(ch) {
	    switch (ch) {
	        case 'x':
	        case 'u':
	            return true;
	        default:
	            return isSingleEscapeCharacter(ch)
	                || isDecimalDigit(ch);
	    }
	}
	function isLineTerminator(ch) {
	    switch (ch) {
	        case '\r':
	        case '\n':
	            // TODO: <LS>, <PS>
	            return true;
	        default:
	            return false;
	    }
	}
	function isDecimalDigit(ch) {
	    switch (ch) {
	        case '0':
	        case '1':
	        case '2':
	        case '3':
	        case '4':
	        case '5':
	        case '6':
	        case '7':
	        case '8':
	        case '9':
	            return true;
	        default:
	            return false;
	    }
	}
	function isHexDigit(ch) {
	    switch (ch) {
	        case 'a':
	        case 'b':
	        case 'c':
	        case 'd':
	        case 'e':
	        case 'f':
	        case 'A':
	        case 'B':
	        case 'C':
	        case 'D':
	        case 'E':
	        case 'F':
	            return true;
	        default:
	            return isDecimalDigit(ch);
	    }
	}
	function isPunctuator(ch) {
	    switch (ch) {
	        case '{':
	        case '}':
	        case '(':
	        case ')':
	        case '[':
	        case ']':
	        case '!':
	        case '.':
	        case '#':
	        case '~':
	        case ':':
	        case ',':
	        case '@':
	            return true;
	        default:
	            return false;
	    }
	}
	function escapeComponentIfNeeded(text, userEscaped) {
	    if (userEscaped) {
	        if (!DeclarationReference.isWellFormedComponentString(text)) {
	            throw new SyntaxError("Invalid Component '" + text + "'");
	        }
	        return text;
	    }
	    return DeclarationReference.escapeComponentString(text);
	}
	function escapeModuleSourceIfNeeded(text, userEscaped) {
	    if (userEscaped) {
	        if (!DeclarationReference.isWellFormedModuleSourceString(text)) {
	            throw new SyntaxError("Invalid Module source '" + text + "'");
	        }
	        return text;
	    }
	    return DeclarationReference.escapeModuleSourceString(text);
	}

	});

	unwrapExports(DeclarationReference_1);
	var DeclarationReference_2 = DeclarationReference_1.DeclarationReference;
	var DeclarationReference_3 = DeclarationReference_1.ModuleSource;
	var DeclarationReference_4 = DeclarationReference_1.GlobalSource;
	var DeclarationReference_5 = DeclarationReference_1.Component;
	var DeclarationReference_6 = DeclarationReference_1.ComponentString;
	var DeclarationReference_7 = DeclarationReference_1.ComponentReference;
	var DeclarationReference_8 = DeclarationReference_1.ComponentPathBase;
	var DeclarationReference_9 = DeclarationReference_1.ComponentRoot;
	var DeclarationReference_10 = DeclarationReference_1.ComponentNavigation;
	var DeclarationReference_11 = DeclarationReference_1.SymbolReference;

	// Copied from https://github.com/microsoft/rushstack/blob/23864e8f6213c872b88a7af8396e617c22cd9956/libraries/node-core-library/src/PackageName.ts without modification
	/**
	 * Various functions for working with package names that may include scopes.
	 *
	 * @public
	 */
	class PackageName {
	    /**
	     * This attempts to parse a package name that may include a scope component.
	     * The packageName must not be an empty string.
	     * @remarks
	     * This function will not throw an exception.
	     *
	     * @returns an {@link IParsedPackageNameOrError} structure whose `error` property will be
	     * nonempty if the string could not be parsed.
	     */
	    static tryParse(packageName) {
	        const result = {
	            scope: '',
	            unscopedName: '',
	            error: ''
	        };
	        let input = packageName;
	        if (input === null || input === undefined) {
	            result.error = 'The package name must not be null or undefined';
	            return result;
	        }
	        // Rule from npmjs.com:
	        // "The name must be less than or equal to 214 characters. This includes the scope for scoped packages."
	        if (packageName.length > 214) {
	            // Don't attempt to parse a ridiculously long input
	            result.error = 'The package name cannot be longer than 214 characters';
	            return result;
	        }
	        if (input[0] === '@') {
	            const indexOfScopeSlash = input.indexOf('/');
	            if (indexOfScopeSlash <= 0) {
	                result.scope = input;
	                result.error = `Error parsing "${packageName}": The scope must be followed by a slash`;
	                return result;
	            }
	            // Extract the scope substring
	            result.scope = input.substr(0, indexOfScopeSlash);
	            input = input.substr(indexOfScopeSlash + 1);
	        }
	        result.unscopedName = input;
	        if (result.scope === '@') {
	            result.error = `Error parsing "${packageName}": The scope name cannot be empty`;
	            return result;
	        }
	        if (result.unscopedName === '') {
	            result.error = 'The package name must not be empty';
	            return result;
	        }
	        // Rule from npmjs.com:
	        // "The name can't start with a dot or an underscore."
	        if (result.unscopedName[0] === '.' || result.unscopedName[0] === '_') {
	            result.error = `The package name "${packageName}" starts with an invalid character`;
	            return result;
	        }
	        // Convert "@scope/unscoped-name" --> "scopeunscoped-name"
	        const nameWithoutScopeSymbols = (result.scope ? result.scope.slice(1, -1) : '')
	            + result.unscopedName;
	        // "New packages must not have uppercase letters in the name."
	        // This can't be enforced because "old" packages are still actively maintained.
	        // Example: https://www.npmjs.com/package/Base64
	        // However it's pretty reasonable to require the scope to be lower case
	        if (result.scope !== result.scope.toLowerCase()) {
	            result.error = `The package scope "${result.scope}" must not contain upper case characters`;
	            return result;
	        }
	        // "The name ends up being part of a URL, an argument on the command line, and a folder name.
	        // Therefore, the name can't contain any non-URL-safe characters"
	        const match = nameWithoutScopeSymbols.match(PackageName._invalidNameCharactersRegExp);
	        if (match) {
	            result.error = `The package name "${packageName}" contains an invalid character: "${match[0]}"`;
	            return result;
	        }
	        return result;
	    }
	    /**
	     * Same as {@link PackageName.tryParse}, except this throws an exception if the input
	     * cannot be parsed.
	     * @remarks
	     * The packageName must not be an empty string.
	     */
	    static parse(packageName) {
	        const result = PackageName.tryParse(packageName);
	        if (result.error) {
	            throw new Error(result.error);
	        }
	        return result;
	    }
	    /**
	     * {@inheritDoc IParsedPackageName.scope}
	     */
	    static getScope(packageName) {
	        return PackageName.parse(packageName).scope;
	    }
	    /**
	     * {@inheritDoc IParsedPackageName.unscopedName}
	     */
	    static getUnscopedName(packageName) {
	        return PackageName.parse(packageName).unscopedName;
	    }
	    /**
	     * Returns true if the specified package name is valid, or false otherwise.
	     * @remarks
	     * This function will not throw an exception.
	     */
	    static isValidName(packageName) {
	        const result = PackageName.tryParse(packageName);
	        return !result.error;
	    }
	    /**
	     * Throws an exception if the specified name is not a valid package name.
	     * The packageName must not be an empty string.
	     */
	    static validate(packageName) {
	        PackageName.parse(packageName);
	    }
	    /**
	     * Combines an optional package scope with an unscoped root name.
	     * @param scope - Must be either an empty string, or a scope name such as "\@example"
	     * @param unscopedName - Must be a nonempty package name that does not contain a scope
	     * @returns A full package name such as "\@example/some-library".
	     */
	    static combineParts(scope, unscopedName) {
	        if (scope !== '') {
	            if (scope[0] !== '@') {
	                throw new Error('The scope must start with an "@" character');
	            }
	        }
	        if (scope.indexOf('/') >= 0) {
	            throw new Error('The scope must not contain a "/" character');
	        }
	        if (unscopedName[0] === '@') {
	            throw new Error('The unscopedName cannot start with an "@" character');
	        }
	        if (unscopedName.indexOf('/') >= 0) {
	            throw new Error('The unscopedName must not contain a "/" character');
	        }
	        let result;
	        if (scope === '') {
	            result = unscopedName;
	        }
	        else {
	            result = scope + '/' + unscopedName;
	        }
	        // Make sure the result is a valid package name
	        PackageName.validate(result);
	        return result;
	    }
	}
	// encodeURIComponent() escapes all characters except:  A-Z a-z 0-9 - _ . ! ~ * ' ( )
	// However, these are disallowed because they are shell characters:       ! ~ * ' ( )
	PackageName._invalidNameCharactersRegExp = /[^A-Za-z0-9\-_\.]/;

	// Copied from https://github.com/microsoft/rushstack/blob/23864e8f6213c872b88a7af8396e617c22cd9956/libraries/node-core-library/src/InternalError.ts without modification
	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	// See LICENSE in the project root for license information.
	/**
	 * An `Error` subclass that should be thrown to report an unexpected state that may indicate a software defect.
	 * An application may handle this error by instructing the end user to report an issue to the application maintainers.
	 *
	 * @remarks
	 * Do not use this class unless you intend to solicit bug reports from end users.
	 *
	 * @public
	 */
	class InternalError extends Error {
	    /**
	     * Constructs a new instance of the {@link InternalError} class.
	     *
	     * @param message - A message describing the error.  This will be assigned to
	     * {@link InternalError.unformattedMessage}.  The `Error.message` field will have additional boilerplate
	     * explaining that the user has encountered a software defect.
	     */
	    constructor(message) {
	        super(InternalError._formatMessage(message));
	        // Manually set the prototype, as we can no longer extend built-in classes like Error, Array, Map, etc.
	        // https://github.com/microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
	        //
	        // Note: the prototype must also be set on any classes which extend this one
	        this.__proto__ = InternalError.prototype; // eslint-disable-line @typescript-eslint/no-explicit-any
	        this.unformattedMessage = message;
	        if (InternalError.breakInDebugger) {
	            // eslint-disable-next-line no-debugger
	            debugger;
	        }
	    }
	    static _formatMessage(unformattedMessage) {
	        return `Internal Error: ${unformattedMessage}\n\nYou have encountered a software defect. Please consider`
	            + ` reporting the issue to the maintainers of this application.`;
	    }
	    /** @override */
	    toString() {
	        return this.message; // Avoid adding the "Error:" prefix
	    }
	}
	/**
	 * If true, a JavScript `debugger;` statement will be invoked whenever the `InternalError` constructor is called.
	 *
	 * @remarks
	 * Generally applications should not be catching and ignoring an `InternalError`.  Instead, the error should
	 * be reported and typically the application will terminate.  Thus, if `InternalError` is constructed, it's
	 * almost always something we want to examine in a debugger.
	 */
	InternalError.breakInDebugger = true;

	// Copied from https://github.com/microsoft/rushstack/blob/23864e8f6213c872b88a7af8396e617c22cd9956/libraries/node-core-library/src/Text.ts **with** modification
	/**
	 * Operations for working with strings that contain text.
	 *
	 * @remarks
	 * The utilities provided by this class are intended to be simple, small, and very
	 * broadly applicable.
	 *
	 * @public
	 */
	class Text {
	    /**
	     * Returns the same thing as targetString.replace(searchValue, replaceValue), except that
	     * all matches are replaced, rather than just the first match.
	     * @param input         - The string to be modified
	     * @param searchValue   - The value to search for
	     * @param replaceValue  - The replacement text
	     */
	    static replaceAll(input, searchValue, replaceValue) {
	        return input.split(searchValue).join(replaceValue);
	    }
	    /**
	     * Converts all newlines in the provided string to use Windows-style CRLF end of line characters.
	     */
	    static convertToCrLf(input) {
	        return input.replace(Text._newLineRegEx, '\r\n');
	    }
	    /**
	     * Converts all newlines in the provided string to use POSIX-style LF end of line characters.
	     *
	     * POSIX is a registered trademark of the Institute of Electrical and Electronic Engineers, Inc.
	     */
	    static convertToLf(input) {
	        return input.replace(Text._newLineRegEx, '\n');
	    }
	    /**
	     * Converts all newlines in the provided string to use the specified newline type.
	     */
	    static convertTo(input, newlineKind) {
	        const newline = newlineKind;
	        return input.replace(Text._newLineRegEx, newline);
	    }
	    /**
	     * Append characters to the end of a string to ensure the result has a minimum length.
	     * @remarks
	     * If the string length already exceeds the minimum length, then the string is unchanged.
	     * The string is not truncated.
	     */
	    static padEnd(s, minimumLength, paddingCharacter = ' ') {
	        if (paddingCharacter.length !== 1) {
	            throw new Error('The paddingCharacter parameter must be a single character.');
	        }
	        if (s.length < minimumLength) {
	            const paddingArray = new Array(minimumLength - s.length);
	            paddingArray.unshift(s);
	            return paddingArray.join(paddingCharacter);
	        }
	        else {
	            return s;
	        }
	    }
	    /**
	     * Append characters to the start of a string to ensure the result has a minimum length.
	     * @remarks
	     * If the string length already exceeds the minimum length, then the string is unchanged.
	     * The string is not truncated.
	     */
	    static padStart(s, minimumLength, paddingCharacter = ' ') {
	        if (paddingCharacter.length !== 1) {
	            throw new Error('The paddingCharacter parameter must be a single character.');
	        }
	        if (s.length < minimumLength) {
	            const paddingArray = new Array(minimumLength - s.length);
	            paddingArray.push(s);
	            return paddingArray.join(paddingCharacter);
	        }
	        else {
	            return s;
	        }
	    }
	    /**
	     * If the string is longer than maximumLength characters, truncate it to that length
	     * using "..." to indicate the truncation.
	     *
	     * @remarks
	     * For example truncateWithEllipsis('1234578', 5) would produce '12...'.
	     */
	    static truncateWithEllipsis(s, maximumLength) {
	        if (maximumLength < 0) {
	            throw new Error('The maximumLength cannot be a negative number');
	        }
	        if (s.length <= maximumLength) {
	            return s;
	        }
	        if (s.length <= 3) {
	            return s.substring(0, maximumLength);
	        }
	        return s.substring(0, maximumLength - 3) + '...';
	    }
	    /**
	     * Returns the input string with a trailing `\n` character appended, if not already present.
	     */
	    static ensureTrailingNewline(s, newlineKind = "\n" /* Lf */) {
	        // Is there already a newline?
	        if (Text._newLineAtEndRegEx.test(s)) {
	            return s; // yes, no change
	        }
	        return s + newlineKind; // no, add it
	    }
	}
	Text._newLineRegEx = /\r\n|\n\r|\r|\n/g;
	Text._newLineAtEndRegEx = /(\r\n|\n\r|\r|\n)$/;

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a named parameter for a function-like declaration.
	 *
	 * @remarks
	 *
	 * `Parameter` represents a TypeScript declaration such as `x: number` in this example:
	 *
	 * ```ts
	 * export function add(x: number, y: number): number {
	 *   return x + y;
	 * }
	 * ```
	 *
	 * `Parameter` objects belong to the {@link (ApiParameterListMixin:interface).parameters} collection.
	 *
	 * @public
	 */
	class Parameter {
	    constructor(options) {
	        this.name = options.name;
	        this.parameterTypeExcerpt = options.parameterTypeExcerpt;
	        this._parent = options.parent;
	    }
	    /**
	     * Returns the `@param` documentation for this parameter, if present.
	     */
	    get tsdocParamBlock() {
	        if (this._parent instanceof ApiDocumentedItem) {
	            if (this._parent.tsdocComment) {
	                return this._parent.tsdocComment.params.tryGetBlockByName(this.name);
	            }
	        }
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	const _overloadIndex = Symbol('ApiParameterListMixin._overloadIndex');
	const _parameters = Symbol('ApiParameterListMixin._parameters');
	/**
	 * Mixin function for {@link (ApiParameterListMixin:interface)}.
	 *
	 * @param baseClass - The base class to be extended
	 * @returns A child class that extends baseClass, adding the {@link (ApiParameterListMixin:interface)} functionality.
	 *
	 * @public
	 */
	function ApiParameterListMixin(baseClass) {
	    class MixedClass extends baseClass {
	        // eslint-disable-next-line @typescript-eslint/no-explicit-any
	        constructor(...args) {
	            super(...args);
	            const options = args[0];
	            this[_overloadIndex] = options.overloadIndex;
	            this[_parameters] = [];
	            if (this instanceof ApiDeclaredItem) {
	                if (options.parameters) {
	                    for (const parameterOptions of options.parameters) {
	                        const parameter = new Parameter({
	                            name: parameterOptions.parameterName,
	                            parameterTypeExcerpt: this.buildExcerpt(parameterOptions.parameterTypeTokenRange),
	                            parent: this
	                        });
	                        this[_parameters].push(parameter);
	                    }
	                }
	            }
	            else {
	                throw new InternalError('ApiReturnTypeMixin expects a base class that inherits from ApiDeclaredItem');
	            }
	        }
	        /** @override */
	        static onDeserializeInto(options, context, jsonObject) {
	            baseClass.onDeserializeInto(options, context, jsonObject);
	            options.overloadIndex = jsonObject.overloadIndex;
	            options.parameters = jsonObject.parameters || [];
	        }
	        get overloadIndex() {
	            return this[_overloadIndex];
	        }
	        get parameters() {
	            return this[_parameters];
	        }
	        /** @override */
	        serializeInto(jsonObject) {
	            super.serializeInto(jsonObject);
	            jsonObject.overloadIndex = this.overloadIndex;
	            const parameterObjects = [];
	            for (const parameter of this.parameters) {
	                parameterObjects.push({
	                    parameterName: parameter.name,
	                    parameterTypeTokenRange: parameter.parameterTypeExcerpt.tokenRange
	                });
	            }
	            jsonObject.parameters = parameterObjects;
	        }
	    }
	    return MixedClass;
	}
	/**
	 * Static members for {@link (ApiParameterListMixin:interface)}.
	 * @public
	 */
	(function (ApiParameterListMixin) {
	    /**
	     * A type guard that tests whether the specified `ApiItem` subclass extends the `ApiParameterListMixin` mixin.
	     *
	     * @remarks
	     *
	     * The JavaScript `instanceof` operator cannot be used to test for mixin inheritance, because each invocation of
	     * the mixin function produces a different subclass.  (This could be mitigated by `Symbol.hasInstance`, however
	     * the TypeScript type system cannot invoke a runtime test.)
	     */
	    function isBaseClassOf(apiItem) {
	        return apiItem.hasOwnProperty(_parameters);
	    }
	    ApiParameterListMixin.isBaseClassOf = isBaseClassOf;
	})(ApiParameterListMixin || (ApiParameterListMixin = {}));

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	// See LICENSE in the project root for license information.s
	const _name = Symbol('ApiNameMixin._name');
	/**
	 * Mixin function for {@link (ApiNameMixin:interface)}.
	 *
	 * @param baseClass - The base class to be extended
	 * @returns A child class that extends baseClass, adding the {@link (ApiNameMixin:interface)} functionality.
	 *
	 * @public
	 */
	function ApiNameMixin(baseClass) {
	    class MixedClass extends baseClass {
	        // eslint-disable-next-line @typescript-eslint/no-explicit-any
	        constructor(...args) {
	            super(...args);
	            const options = args[0];
	            this[_name] = options.name;
	        }
	        /** @override */
	        static onDeserializeInto(options, context, jsonObject) {
	            baseClass.onDeserializeInto(options, context, jsonObject);
	            options.name = jsonObject.name;
	        }
	        get name() {
	            return this[_name];
	        }
	        /** @override */
	        get displayName() {
	            return this[_name];
	        }
	        /** @override */
	        serializeInto(jsonObject) {
	            super.serializeInto(jsonObject);
	            jsonObject.name = this.name;
	        }
	    }
	    return MixedClass;
	}
	/**
	 * Static members for {@link (ApiNameMixin:interface)}.
	 * @public
	 */
	(function (ApiNameMixin) {
	    /**
	     * A type guard that tests whether the specified `ApiItem` subclass extends the `ApiNameMixin` mixin.
	     *
	     * @remarks
	     *
	     * The JavaScript `instanceof` operator cannot be used to test for mixin inheritance, because each invocation of
	     * the mixin function produces a different subclass.  (This could be mitigated by `Symbol.hasInstance`, however
	     * the TypeScript type system cannot invoke a runtime test.)
	     */
	    function isBaseClassOf(apiItem) {
	        return apiItem.hasOwnProperty(_name);
	    }
	    ApiNameMixin.isBaseClassOf = isBaseClassOf;
	})(ApiNameMixin || (ApiNameMixin = {}));

	var timsort = createCommonjsModule(function (module, exports) {
	/****
	 * The MIT License
	 *
	 * Copyright (c) 2015 Marco Ziccardi
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 *
	 ****/
	(function (global, factory) {
	  {
	    factory(exports);
	  }
	})(commonjsGlobal, function (exports) {

	  exports.__esModule = true;
	  exports.sort = sort;

	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError('Cannot call a class as a function');
	    }
	  }

	  var DEFAULT_MIN_MERGE = 32;

	  var DEFAULT_MIN_GALLOPING = 7;

	  var DEFAULT_TMP_STORAGE_LENGTH = 256;

	  var POWERS_OF_TEN = [1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];

	  function log10(x) {
	    if (x < 1e5) {
	      if (x < 1e2) {
	        return x < 1e1 ? 0 : 1;
	      }

	      if (x < 1e4) {
	        return x < 1e3 ? 2 : 3;
	      }

	      return 4;
	    }

	    if (x < 1e7) {
	      return x < 1e6 ? 5 : 6;
	    }

	    if (x < 1e9) {
	      return x < 1e8 ? 7 : 8;
	    }

	    return 9;
	  }

	  function alphabeticalCompare(a, b) {
	    if (a === b) {
	      return 0;
	    }

	    if (~ ~a === a && ~ ~b === b) {
	      if (a === 0 || b === 0) {
	        return a < b ? -1 : 1;
	      }

	      if (a < 0 || b < 0) {
	        if (b >= 0) {
	          return -1;
	        }

	        if (a >= 0) {
	          return 1;
	        }

	        a = -a;
	        b = -b;
	      }

	      var al = log10(a);
	      var bl = log10(b);

	      var t = 0;

	      if (al < bl) {
	        a *= POWERS_OF_TEN[bl - al - 1];
	        b /= 10;
	        t = -1;
	      } else if (al > bl) {
	        b *= POWERS_OF_TEN[al - bl - 1];
	        a /= 10;
	        t = 1;
	      }

	      if (a === b) {
	        return t;
	      }

	      return a < b ? -1 : 1;
	    }

	    var aStr = String(a);
	    var bStr = String(b);

	    if (aStr === bStr) {
	      return 0;
	    }

	    return aStr < bStr ? -1 : 1;
	  }

	  function minRunLength(n) {
	    var r = 0;

	    while (n >= DEFAULT_MIN_MERGE) {
	      r |= n & 1;
	      n >>= 1;
	    }

	    return n + r;
	  }

	  function makeAscendingRun(array, lo, hi, compare) {
	    var runHi = lo + 1;

	    if (runHi === hi) {
	      return 1;
	    }

	    if (compare(array[runHi++], array[lo]) < 0) {
	      while (runHi < hi && compare(array[runHi], array[runHi - 1]) < 0) {
	        runHi++;
	      }

	      reverseRun(array, lo, runHi);
	    } else {
	      while (runHi < hi && compare(array[runHi], array[runHi - 1]) >= 0) {
	        runHi++;
	      }
	    }

	    return runHi - lo;
	  }

	  function reverseRun(array, lo, hi) {
	    hi--;

	    while (lo < hi) {
	      var t = array[lo];
	      array[lo++] = array[hi];
	      array[hi--] = t;
	    }
	  }

	  function binaryInsertionSort(array, lo, hi, start, compare) {
	    if (start === lo) {
	      start++;
	    }

	    for (; start < hi; start++) {
	      var pivot = array[start];

	      var left = lo;
	      var right = start;

	      while (left < right) {
	        var mid = left + right >>> 1;

	        if (compare(pivot, array[mid]) < 0) {
	          right = mid;
	        } else {
	          left = mid + 1;
	        }
	      }

	      var n = start - left;

	      switch (n) {
	        case 3:
	          array[left + 3] = array[left + 2];

	        case 2:
	          array[left + 2] = array[left + 1];

	        case 1:
	          array[left + 1] = array[left];
	          break;
	        default:
	          while (n > 0) {
	            array[left + n] = array[left + n - 1];
	            n--;
	          }
	      }

	      array[left] = pivot;
	    }
	  }

	  function gallopLeft(value, array, start, length, hint, compare) {
	    var lastOffset = 0;
	    var maxOffset = 0;
	    var offset = 1;

	    if (compare(value, array[start + hint]) > 0) {
	      maxOffset = length - hint;

	      while (offset < maxOffset && compare(value, array[start + hint + offset]) > 0) {
	        lastOffset = offset;
	        offset = (offset << 1) + 1;

	        if (offset <= 0) {
	          offset = maxOffset;
	        }
	      }

	      if (offset > maxOffset) {
	        offset = maxOffset;
	      }

	      lastOffset += hint;
	      offset += hint;
	    } else {
	      maxOffset = hint + 1;
	      while (offset < maxOffset && compare(value, array[start + hint - offset]) <= 0) {
	        lastOffset = offset;
	        offset = (offset << 1) + 1;

	        if (offset <= 0) {
	          offset = maxOffset;
	        }
	      }
	      if (offset > maxOffset) {
	        offset = maxOffset;
	      }

	      var tmp = lastOffset;
	      lastOffset = hint - offset;
	      offset = hint - tmp;
	    }

	    lastOffset++;
	    while (lastOffset < offset) {
	      var m = lastOffset + (offset - lastOffset >>> 1);

	      if (compare(value, array[start + m]) > 0) {
	        lastOffset = m + 1;
	      } else {
	        offset = m;
	      }
	    }
	    return offset;
	  }

	  function gallopRight(value, array, start, length, hint, compare) {
	    var lastOffset = 0;
	    var maxOffset = 0;
	    var offset = 1;

	    if (compare(value, array[start + hint]) < 0) {
	      maxOffset = hint + 1;

	      while (offset < maxOffset && compare(value, array[start + hint - offset]) < 0) {
	        lastOffset = offset;
	        offset = (offset << 1) + 1;

	        if (offset <= 0) {
	          offset = maxOffset;
	        }
	      }

	      if (offset > maxOffset) {
	        offset = maxOffset;
	      }

	      var tmp = lastOffset;
	      lastOffset = hint - offset;
	      offset = hint - tmp;
	    } else {
	      maxOffset = length - hint;

	      while (offset < maxOffset && compare(value, array[start + hint + offset]) >= 0) {
	        lastOffset = offset;
	        offset = (offset << 1) + 1;

	        if (offset <= 0) {
	          offset = maxOffset;
	        }
	      }

	      if (offset > maxOffset) {
	        offset = maxOffset;
	      }

	      lastOffset += hint;
	      offset += hint;
	    }

	    lastOffset++;

	    while (lastOffset < offset) {
	      var m = lastOffset + (offset - lastOffset >>> 1);

	      if (compare(value, array[start + m]) < 0) {
	        offset = m;
	      } else {
	        lastOffset = m + 1;
	      }
	    }

	    return offset;
	  }

	  var TimSort = (function () {
	    function TimSort(array, compare) {
	      _classCallCheck(this, TimSort);

	      this.array = null;
	      this.compare = null;
	      this.minGallop = DEFAULT_MIN_GALLOPING;
	      this.length = 0;
	      this.tmpStorageLength = DEFAULT_TMP_STORAGE_LENGTH;
	      this.stackLength = 0;
	      this.runStart = null;
	      this.runLength = null;
	      this.stackSize = 0;

	      this.array = array;
	      this.compare = compare;

	      this.length = array.length;

	      if (this.length < 2 * DEFAULT_TMP_STORAGE_LENGTH) {
	        this.tmpStorageLength = this.length >>> 1;
	      }

	      this.tmp = new Array(this.tmpStorageLength);

	      this.stackLength = this.length < 120 ? 5 : this.length < 1542 ? 10 : this.length < 119151 ? 19 : 40;

	      this.runStart = new Array(this.stackLength);
	      this.runLength = new Array(this.stackLength);
	    }

	    TimSort.prototype.pushRun = function pushRun(runStart, runLength) {
	      this.runStart[this.stackSize] = runStart;
	      this.runLength[this.stackSize] = runLength;
	      this.stackSize += 1;
	    };

	    TimSort.prototype.mergeRuns = function mergeRuns() {
	      while (this.stackSize > 1) {
	        var n = this.stackSize - 2;

	        if (n >= 1 && this.runLength[n - 1] <= this.runLength[n] + this.runLength[n + 1] || n >= 2 && this.runLength[n - 2] <= this.runLength[n] + this.runLength[n - 1]) {

	          if (this.runLength[n - 1] < this.runLength[n + 1]) {
	            n--;
	          }
	        } else if (this.runLength[n] > this.runLength[n + 1]) {
	          break;
	        }
	        this.mergeAt(n);
	      }
	    };

	    TimSort.prototype.forceMergeRuns = function forceMergeRuns() {
	      while (this.stackSize > 1) {
	        var n = this.stackSize - 2;

	        if (n > 0 && this.runLength[n - 1] < this.runLength[n + 1]) {
	          n--;
	        }

	        this.mergeAt(n);
	      }
	    };

	    TimSort.prototype.mergeAt = function mergeAt(i) {
	      var compare = this.compare;
	      var array = this.array;

	      var start1 = this.runStart[i];
	      var length1 = this.runLength[i];
	      var start2 = this.runStart[i + 1];
	      var length2 = this.runLength[i + 1];

	      this.runLength[i] = length1 + length2;

	      if (i === this.stackSize - 3) {
	        this.runStart[i + 1] = this.runStart[i + 2];
	        this.runLength[i + 1] = this.runLength[i + 2];
	      }

	      this.stackSize--;

	      var k = gallopRight(array[start2], array, start1, length1, 0, compare);
	      start1 += k;
	      length1 -= k;

	      if (length1 === 0) {
	        return;
	      }

	      length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare);

	      if (length2 === 0) {
	        return;
	      }

	      if (length1 <= length2) {
	        this.mergeLow(start1, length1, start2, length2);
	      } else {
	        this.mergeHigh(start1, length1, start2, length2);
	      }
	    };

	    TimSort.prototype.mergeLow = function mergeLow(start1, length1, start2, length2) {

	      var compare = this.compare;
	      var array = this.array;
	      var tmp = this.tmp;
	      var i = 0;

	      for (i = 0; i < length1; i++) {
	        tmp[i] = array[start1 + i];
	      }

	      var cursor1 = 0;
	      var cursor2 = start2;
	      var dest = start1;

	      array[dest++] = array[cursor2++];

	      if (--length2 === 0) {
	        for (i = 0; i < length1; i++) {
	          array[dest + i] = tmp[cursor1 + i];
	        }
	        return;
	      }

	      if (length1 === 1) {
	        for (i = 0; i < length2; i++) {
	          array[dest + i] = array[cursor2 + i];
	        }
	        array[dest + length2] = tmp[cursor1];
	        return;
	      }

	      var minGallop = this.minGallop;

	      while (true) {
	        var count1 = 0;
	        var count2 = 0;
	        var exit = false;

	        do {
	          if (compare(array[cursor2], tmp[cursor1]) < 0) {
	            array[dest++] = array[cursor2++];
	            count2++;
	            count1 = 0;

	            if (--length2 === 0) {
	              exit = true;
	              break;
	            }
	          } else {
	            array[dest++] = tmp[cursor1++];
	            count1++;
	            count2 = 0;
	            if (--length1 === 1) {
	              exit = true;
	              break;
	            }
	          }
	        } while ((count1 | count2) < minGallop);

	        if (exit) {
	          break;
	        }

	        do {
	          count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare);

	          if (count1 !== 0) {
	            for (i = 0; i < count1; i++) {
	              array[dest + i] = tmp[cursor1 + i];
	            }

	            dest += count1;
	            cursor1 += count1;
	            length1 -= count1;
	            if (length1 <= 1) {
	              exit = true;
	              break;
	            }
	          }

	          array[dest++] = array[cursor2++];

	          if (--length2 === 0) {
	            exit = true;
	            break;
	          }

	          count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare);

	          if (count2 !== 0) {
	            for (i = 0; i < count2; i++) {
	              array[dest + i] = array[cursor2 + i];
	            }

	            dest += count2;
	            cursor2 += count2;
	            length2 -= count2;

	            if (length2 === 0) {
	              exit = true;
	              break;
	            }
	          }
	          array[dest++] = tmp[cursor1++];

	          if (--length1 === 1) {
	            exit = true;
	            break;
	          }

	          minGallop--;
	        } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

	        if (exit) {
	          break;
	        }

	        if (minGallop < 0) {
	          minGallop = 0;
	        }

	        minGallop += 2;
	      }

	      this.minGallop = minGallop;

	      if (minGallop < 1) {
	        this.minGallop = 1;
	      }

	      if (length1 === 1) {
	        for (i = 0; i < length2; i++) {
	          array[dest + i] = array[cursor2 + i];
	        }
	        array[dest + length2] = tmp[cursor1];
	      } else if (length1 === 0) {
	        throw new Error('mergeLow preconditions were not respected');
	      } else {
	        for (i = 0; i < length1; i++) {
	          array[dest + i] = tmp[cursor1 + i];
	        }
	      }
	    };

	    TimSort.prototype.mergeHigh = function mergeHigh(start1, length1, start2, length2) {
	      var compare = this.compare;
	      var array = this.array;
	      var tmp = this.tmp;
	      var i = 0;

	      for (i = 0; i < length2; i++) {
	        tmp[i] = array[start2 + i];
	      }

	      var cursor1 = start1 + length1 - 1;
	      var cursor2 = length2 - 1;
	      var dest = start2 + length2 - 1;
	      var customCursor = 0;
	      var customDest = 0;

	      array[dest--] = array[cursor1--];

	      if (--length1 === 0) {
	        customCursor = dest - (length2 - 1);

	        for (i = 0; i < length2; i++) {
	          array[customCursor + i] = tmp[i];
	        }

	        return;
	      }

	      if (length2 === 1) {
	        dest -= length1;
	        cursor1 -= length1;
	        customDest = dest + 1;
	        customCursor = cursor1 + 1;

	        for (i = length1 - 1; i >= 0; i--) {
	          array[customDest + i] = array[customCursor + i];
	        }

	        array[dest] = tmp[cursor2];
	        return;
	      }

	      var minGallop = this.minGallop;

	      while (true) {
	        var count1 = 0;
	        var count2 = 0;
	        var exit = false;

	        do {
	          if (compare(tmp[cursor2], array[cursor1]) < 0) {
	            array[dest--] = array[cursor1--];
	            count1++;
	            count2 = 0;
	            if (--length1 === 0) {
	              exit = true;
	              break;
	            }
	          } else {
	            array[dest--] = tmp[cursor2--];
	            count2++;
	            count1 = 0;
	            if (--length2 === 1) {
	              exit = true;
	              break;
	            }
	          }
	        } while ((count1 | count2) < minGallop);

	        if (exit) {
	          break;
	        }

	        do {
	          count1 = length1 - gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare);

	          if (count1 !== 0) {
	            dest -= count1;
	            cursor1 -= count1;
	            length1 -= count1;
	            customDest = dest + 1;
	            customCursor = cursor1 + 1;

	            for (i = count1 - 1; i >= 0; i--) {
	              array[customDest + i] = array[customCursor + i];
	            }

	            if (length1 === 0) {
	              exit = true;
	              break;
	            }
	          }

	          array[dest--] = tmp[cursor2--];

	          if (--length2 === 1) {
	            exit = true;
	            break;
	          }

	          count2 = length2 - gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare);

	          if (count2 !== 0) {
	            dest -= count2;
	            cursor2 -= count2;
	            length2 -= count2;
	            customDest = dest + 1;
	            customCursor = cursor2 + 1;

	            for (i = 0; i < count2; i++) {
	              array[customDest + i] = tmp[customCursor + i];
	            }

	            if (length2 <= 1) {
	              exit = true;
	              break;
	            }
	          }

	          array[dest--] = array[cursor1--];

	          if (--length1 === 0) {
	            exit = true;
	            break;
	          }

	          minGallop--;
	        } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

	        if (exit) {
	          break;
	        }

	        if (minGallop < 0) {
	          minGallop = 0;
	        }

	        minGallop += 2;
	      }

	      this.minGallop = minGallop;

	      if (minGallop < 1) {
	        this.minGallop = 1;
	      }

	      if (length2 === 1) {
	        dest -= length1;
	        cursor1 -= length1;
	        customDest = dest + 1;
	        customCursor = cursor1 + 1;

	        for (i = length1 - 1; i >= 0; i--) {
	          array[customDest + i] = array[customCursor + i];
	        }

	        array[dest] = tmp[cursor2];
	      } else if (length2 === 0) {
	        throw new Error('mergeHigh preconditions were not respected');
	      } else {
	        customCursor = dest - (length2 - 1);
	        for (i = 0; i < length2; i++) {
	          array[customCursor + i] = tmp[i];
	        }
	      }
	    };

	    return TimSort;
	  })();

	  function sort(array, compare, lo, hi) {
	    if (!Array.isArray(array)) {
	      throw new TypeError('Can only sort arrays');
	    }

	    if (!compare) {
	      compare = alphabeticalCompare;
	    } else if (typeof compare !== 'function') {
	      hi = lo;
	      lo = compare;
	      compare = alphabeticalCompare;
	    }

	    if (!lo) {
	      lo = 0;
	    }
	    if (!hi) {
	      hi = array.length;
	    }

	    var remaining = hi - lo;

	    if (remaining < 2) {
	      return;
	    }

	    var runLength = 0;

	    if (remaining < DEFAULT_MIN_MERGE) {
	      runLength = makeAscendingRun(array, lo, hi, compare);
	      binaryInsertionSort(array, lo, hi, lo + runLength, compare);
	      return;
	    }

	    var ts = new TimSort(array, compare);

	    var minRun = minRunLength(remaining);

	    do {
	      runLength = makeAscendingRun(array, lo, hi, compare);
	      if (runLength < minRun) {
	        var force = remaining;
	        if (force > minRun) {
	          force = minRun;
	        }

	        binaryInsertionSort(array, lo, lo + force, lo + runLength, compare);
	        runLength = force;
	      }

	      ts.pushRun(lo, runLength);
	      ts.mergeRuns();

	      remaining -= runLength;
	      lo += runLength;
	    } while (remaining !== 0);

	    ts.forceMergeRuns();
	  }
	});
	});

	unwrapExports(timsort);

	var timsort$1 = timsort;
	var timsort_1 = timsort$1.sort;

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	const _members = Symbol('ApiItemContainerMixin._members');
	const _membersSorted = Symbol('ApiItemContainerMixin._membersSorted');
	const _membersByContainerKey = Symbol('ApiItemContainerMixin._membersByContainerKey');
	const _membersByName = Symbol('ApiItemContainerMixin._membersByName');
	const _membersByKind = Symbol('ApiItemContainerMixin._membersByKind');
	/**
	 * Mixin function for {@link ApiDeclaredItem}.
	 *
	 * @param baseClass - The base class to be extended
	 * @returns A child class that extends baseClass, adding the {@link (ApiItemContainerMixin:interface)} functionality.
	 *
	 * @public
	 */
	function ApiItemContainerMixin(baseClass) {
	    class MixedClass extends baseClass {
	        // eslint-disable-next-line @typescript-eslint/no-explicit-any
	        constructor(...args) {
	            super(...args);
	            const options = args[0];
	            this[_members] = [];
	            this[_membersByContainerKey] = new Map();
	            if (options.members) {
	                for (const member of options.members) {
	                    this.addMember(member);
	                }
	            }
	        }
	        /** @override */
	        static onDeserializeInto(options, context, jsonObject) {
	            baseClass.onDeserializeInto(options, context, jsonObject);
	            options.members = [];
	            for (const memberObject of jsonObject.members) {
	                options.members.push(ApiItem.deserialize(memberObject, context));
	            }
	        }
	        get members() {
	            if (!this[_membersSorted]) {
	                // stable sort
	                timsort_1(this[_members], (x, y) => x.getSortKey().localeCompare(y.getSortKey()));
	                this[_membersSorted] = true;
	            }
	            return this[_members];
	        }
	        addMember(member) {
	            if (this[_membersByContainerKey].has(member.containerKey)) {
	                throw new Error(`Another member has already been added with the same name (${member.displayName})` +
	                    ` and containerKey (${member.containerKey})`);
	            }
	            const existingParent = member.parent;
	            if (existingParent !== undefined) {
	                throw new Error(`This item has already been added to another container: "${existingParent.displayName}"`);
	            }
	            this[_members].push(member);
	            this[_membersByName] = undefined; // invalidate the lookup
	            this[_membersByKind] = undefined; // invalidate the lookup
	            this[_membersSorted] = false;
	            this[_membersByContainerKey].set(member.containerKey, member);
	            member[apiItem_onParentChanged](this);
	        }
	        tryGetMemberByKey(containerKey) {
	            return this[_membersByContainerKey].get(containerKey);
	        }
	        findMembersByName(name) {
	            this._ensureMemberMaps();
	            return this[_membersByName].get(name) || [];
	        }
	        /** @internal */
	        _getMergedSiblingsForMember(memberApiItem) {
	            this._ensureMemberMaps();
	            let result;
	            if (ApiNameMixin.isBaseClassOf(memberApiItem)) {
	                result = this[_membersByName].get(memberApiItem.name);
	            }
	            else {
	                result = this[_membersByKind].get(memberApiItem.kind);
	            }
	            if (!result) {
	                throw new InternalError('Item was not found in the _membersByName/_membersByKind lookup');
	            }
	            return result;
	        }
	        /** @internal */
	        _ensureMemberMaps() {
	            // Build the _membersByName and _membersByKind tables if they don't already exist
	            if (this[_membersByName] === undefined) {
	                const membersByName = new Map();
	                const membersByKind = new Map();
	                for (const member of this[_members]) {
	                    let map;
	                    let key;
	                    if (ApiNameMixin.isBaseClassOf(member)) {
	                        map = membersByName;
	                        key = member.name;
	                    }
	                    else {
	                        map = membersByKind;
	                        key = member.kind;
	                    }
	                    let list = map.get(key);
	                    if (list === undefined) {
	                        list = [];
	                        map.set(key, list);
	                    }
	                    list.push(member);
	                }
	                this[_membersByName] = membersByName;
	                this[_membersByKind] = membersByKind;
	            }
	        }
	        /** @override */
	        serializeInto(jsonObject) {
	            super.serializeInto(jsonObject);
	            const memberObjects = [];
	            for (const member of this.members) {
	                const memberJsonObject = {};
	                member.serializeInto(memberJsonObject);
	                memberObjects.push(memberJsonObject);
	            }
	            jsonObject.members = memberObjects;
	        }
	    }
	    return MixedClass;
	}
	/**
	 * Static members for {@link (ApiItemContainerMixin:interface)}.
	 * @public
	 */
	(function (ApiItemContainerMixin) {
	    /**
	     * A type guard that tests whether the specified `ApiItem` subclass extends the `ApiItemContainerMixin` mixin.
	     *
	     * @remarks
	     *
	     * The JavaScript `instanceof` operator cannot be used to test for mixin inheritance, because each invocation of
	     * the mixin function produces a different subclass.  (This could be mitigated by `Symbol.hasInstance`, however
	     * the TypeScript type system cannot invoke a runtime test.)
	     */
	    function isBaseClassOf(apiItem) {
	        return apiItem.hasOwnProperty(_members);
	    }
	    ApiItemContainerMixin.isBaseClassOf = isBaseClassOf;
	})(ApiItemContainerMixin || (ApiItemContainerMixin = {}));

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	const _releaseTag = Symbol('ApiReleaseTagMixin._releaseTag');
	/**
	 * Mixin function for {@link (ApiReleaseTagMixin:interface)}.
	 *
	 * @param baseClass - The base class to be extended
	 * @returns A child class that extends baseClass, adding the {@link (ApiReleaseTagMixin:interface)} functionality.
	 *
	 * @public
	 */
	function ApiReleaseTagMixin(baseClass) {
	    class MixedClass extends baseClass {
	        // eslint-disable-next-line @typescript-eslint/no-explicit-any
	        constructor(...args) {
	            super(...args);
	            const options = args[0];
	            this[_releaseTag] = options.releaseTag;
	        }
	        /** @override */
	        static onDeserializeInto(options, context, jsonObject) {
	            baseClass.onDeserializeInto(options, context, jsonObject);
	            // @ts-ignore
	            const deserializedReleaseTag = ReleaseTag[jsonObject.releaseTag];
	            if (deserializedReleaseTag === undefined) {
	                throw new Error(`Failed to deserialize release tag ${JSON.stringify(jsonObject.releaseTag)}`);
	            }
	            options.releaseTag = deserializedReleaseTag;
	        }
	        get releaseTag() {
	            return this[_releaseTag];
	        }
	        /** @override */
	        serializeInto(jsonObject) {
	            super.serializeInto(jsonObject);
	            jsonObject.releaseTag = ReleaseTag[this.releaseTag];
	        }
	    }
	    return MixedClass;
	}
	/**
	 * Static members for {@link (ApiReleaseTagMixin:interface)}.
	 * @public
	 */
	(function (ApiReleaseTagMixin) {
	    /**
	     * A type guard that tests whether the specified `ApiItem` subclass extends the `ApiReleaseTagMixin` mixin.
	     *
	     * @remarks
	     *
	     * The JavaScript `instanceof` operator cannot be used to test for mixin inheritance, because each invocation of
	     * the mixin function produces a different subclass.  (This could be mitigated by `Symbol.hasInstance`, however
	     * the TypeScript type system cannot invoke a runtime test.)
	     */
	    function isBaseClassOf(apiItem) {
	        return apiItem.hasOwnProperty(_releaseTag);
	    }
	    ApiReleaseTagMixin.isBaseClassOf = isBaseClassOf;
	})(ApiReleaseTagMixin || (ApiReleaseTagMixin = {}));

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	// See LICENSE in the project root for license information.
	/**
	 * Represents a type referenced via an "extends" or "implements" heritage clause for a TypeScript class.
	 * @remarks
	 *
	 * For example, consider this declaration:
	 *
	 * ```ts
	 * export class Widget extends Controls.WidgetBase implements Controls.IWidget, IDisposable {
	 *   // . . .
	 * }
	 * ```
	 *
	 * The heritage types are `Controls.WidgetBase`, `Controls.IWidget`, and `IDisposable`.
	 * @public
	 */
	class HeritageType {
	    constructor(excerpt) {
	        this.excerpt = excerpt;
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a named type parameter for a generic declaration.
	 *
	 * @remarks
	 *
	 * `TypeParameter` represents a TypeScript declaration such as `T` in this example:
	 *
	 * ```ts
	 * interface IIdentifier {
	 *     getCode(): string;
	 * }
	 *
	 * class BarCode implements IIdentifier {
	 *     private _value: number;
	 *     public getCode(): string { return this._value.toString(); }
	 * }
	 *
	 * class Book<TIdentifier extends IIdentifier = BarCode> {
	 *     public identifier: TIdentifier;
	 * }
	 * ```
	 *
	 * `TypeParameter` objects belong to the {@link (ApiTypeParameterListMixin:interface).typeParameters} collection.
	 *
	 * @public
	 */
	class TypeParameter {
	    constructor(options) {
	        this.name = options.name;
	        this.constraintExcerpt = options.constraintExcerpt;
	        this.defaultTypeExcerpt = options.defaultTypeExcerpt;
	        this._parent = options.parent;
	    }
	    /**
	     * Returns the `@typeParam` documentation for this parameter, if present.
	     */
	    get tsdocTypeParamBlock() {
	        if (this._parent instanceof ApiDocumentedItem) {
	            if (this._parent.tsdocComment) {
	                return this._parent.tsdocComment.typeParams.tryGetBlockByName(this.name);
	            }
	        }
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	const _typeParameters = Symbol('ApiTypeParameterListMixin._typeParameters');
	/**
	 * Mixin function for {@link (ApiTypeParameterListMixin:interface)}.
	 *
	 * @param baseClass - The base class to be extended
	 * @returns A child class that extends baseClass, adding the {@link (ApiTypeParameterListMixin:interface)}
	 * functionality.
	 *
	 * @public
	 */
	function ApiTypeParameterListMixin(baseClass) {
	    class MixedClass extends baseClass {
	        // eslint-disable-next-line @typescript-eslint/no-explicit-any
	        constructor(...args) {
	            super(...args);
	            const options = args[0];
	            this[_typeParameters] = [];
	            if (this instanceof ApiDeclaredItem) {
	                if (options.typeParameters) {
	                    for (const typeParameterOptions of options.typeParameters) {
	                        const typeParameter = new TypeParameter({
	                            name: typeParameterOptions.typeParameterName,
	                            constraintExcerpt: this.buildExcerpt(typeParameterOptions.constraintTokenRange),
	                            defaultTypeExcerpt: this.buildExcerpt(typeParameterOptions.defaultTypeTokenRange),
	                            parent: this
	                        });
	                        this[_typeParameters].push(typeParameter);
	                    }
	                }
	            }
	            else {
	                throw new InternalError('ApiTypeParameterListMixin expects a base class that inherits from ApiDeclaredItem');
	            }
	        }
	        /** @override */
	        static onDeserializeInto(options, context, jsonObject) {
	            baseClass.onDeserializeInto(options, context, jsonObject);
	            options.typeParameters = jsonObject.typeParameters || [];
	        }
	        get typeParameters() {
	            return this[_typeParameters];
	        }
	        /** @override */
	        serializeInto(jsonObject) {
	            super.serializeInto(jsonObject);
	            const typeParameterObjects = [];
	            for (const typeParameter of this.typeParameters) {
	                typeParameterObjects.push({
	                    typeParameterName: typeParameter.name,
	                    constraintTokenRange: typeParameter.constraintExcerpt.tokenRange,
	                    defaultTypeTokenRange: typeParameter.defaultTypeExcerpt.tokenRange
	                });
	            }
	            if (typeParameterObjects.length > 0) {
	                jsonObject.typeParameters = typeParameterObjects;
	            }
	        }
	    }
	    return MixedClass;
	}
	/**
	 * Static members for {@link (ApiTypeParameterListMixin:interface)}.
	 * @public
	 */
	(function (ApiTypeParameterListMixin) {
	    /**
	     * A type guard that tests whether the specified `ApiItem` subclass extends the `ApiParameterListMixin` mixin.
	     *
	     * @remarks
	     *
	     * The JavaScript `instanceof` operator cannot be used to test for mixin inheritance, because each invocation of
	     * the mixin function produces a different subclass.  (This could be mitigated by `Symbol.hasInstance`, however
	     * the TypeScript type system cannot invoke a runtime test.)
	     */
	    function isBaseClassOf(apiItem) {
	        return apiItem.hasOwnProperty(_typeParameters);
	    }
	    ApiTypeParameterListMixin.isBaseClassOf = isBaseClassOf;
	})(ApiTypeParameterListMixin || (ApiTypeParameterListMixin = {}));

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript class declaration.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiClass` represents a TypeScript declaration such as this:
	 *
	 * ```ts
	 * export class X { }
	 * ```
	 *
	 * @public
	 */
	class ApiClass extends ApiItemContainerMixin(ApiNameMixin(ApiTypeParameterListMixin(ApiReleaseTagMixin(ApiDeclaredItem)))) {
	    constructor(options) {
	        super(options);
	        this._implementsTypes = [];
	        if (options.extendsTokenRange) {
	            this.extendsType = new HeritageType(this.buildExcerpt(options.extendsTokenRange));
	        }
	        else {
	            this.extendsType = undefined;
	        }
	        for (const implementsTokenRange of options.implementsTokenRanges) {
	            this._implementsTypes.push(new HeritageType(this.buildExcerpt(implementsTokenRange)));
	        }
	    }
	    static getContainerKey(name) {
	        return `${name}|${"Class" /* Class */}`;
	    }
	    /** @override */
	    static onDeserializeInto(options, context, jsonObject) {
	        super.onDeserializeInto(options, context, jsonObject);
	        options.extendsTokenRange = jsonObject.extendsTokenRange;
	        options.implementsTokenRanges = jsonObject.implementsTokenRanges;
	    }
	    /** @override */
	    get kind() {
	        return "Class" /* Class */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiClass.getContainerKey(this.name);
	    }
	    /**
	     * The list of interfaces that this class implements using the `implements` keyword.
	     */
	    get implementsTypes() {
	        return this._implementsTypes;
	    }
	    /** @override */
	    serializeInto(jsonObject) {
	        super.serializeInto(jsonObject);
	        // Note that JSON does not support the "undefined" value, so we simply omit the field entirely if it is undefined
	        if (this.extendsType) {
	            jsonObject.extendsTokenRange = this.extendsType.excerpt.tokenRange;
	        }
	        jsonObject.implementsTokenRanges = this.implementsTypes.map(x => x.excerpt.tokenRange);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const nameComponent = DeclarationReference_2.parseComponent(this.name);
	        return (this.parent ? this.parent.canonicalReference : DeclarationReference_2.empty())
	            .addNavigationStep("." /* Exports */, nameComponent)
	            .withMeaning("class" /* Class */);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	// See LICENSE in the project root for license information.
	var ApiJsonSchemaVersion;
	(function (ApiJsonSchemaVersion) {
	    /**
	     * The initial release.
	     */
	    ApiJsonSchemaVersion[ApiJsonSchemaVersion["V_1000"] = 1000] = "V_1000";
	    /**
	     * Add support for type parameters and type alias types.
	     */
	    ApiJsonSchemaVersion[ApiJsonSchemaVersion["V_1001"] = 1001] = "V_1001";
	    /**
	     * Remove "canonicalReference" field.  This field was for diagnostic purposes only and was never deserialized.
	     */
	    ApiJsonSchemaVersion[ApiJsonSchemaVersion["V_1002"] = 1002] = "V_1002";
	    /**
	     * Reintroduce the "canonicalReference" field using the experimental new TSDoc declaration reference notation.
	     *
	     * This is not a breaking change because this field is never deserialized; it is provided for informational
	     * purposes only.
	     */
	    ApiJsonSchemaVersion[ApiJsonSchemaVersion["V_1003"] = 1003] = "V_1003";
	    /**
	     * The current latest .api.json schema version.
	     *
	     * IMPORTANT: When incrementing this number, consider whether `OLDEST_SUPPORTED` or `OLDEST_FORWARDS_COMPATIBLE`
	     * should be updated.
	     */
	    ApiJsonSchemaVersion[ApiJsonSchemaVersion["LATEST"] = 1003] = "LATEST";
	    /**
	     * The oldest .api.json schema version that is still supported for backwards compatibility.
	     *
	     * This must be updated if you change to the file format and do not implement compatibility logic for
	     * deserializing the older representation.
	     */
	    ApiJsonSchemaVersion[ApiJsonSchemaVersion["OLDEST_SUPPORTED"] = 1001] = "OLDEST_SUPPORTED";
	    /**
	     * Used to assign `IApiPackageMetadataJson.oldestForwardsCompatibleVersion`.
	     *
	     * This value must be \<= `ApiJsonSchemaVersion.LATEST`.  It must be reset to the `LATEST` value
	     * if the older library would not be able to deserialize your new file format.  Adding a nonessential field
	     * is generally okay.  Removing, modifying, or reinterpreting existing fields is NOT safe.
	     */
	    ApiJsonSchemaVersion[ApiJsonSchemaVersion["OLDEST_FORWARDS_COMPATIBLE"] = 1001] = "OLDEST_FORWARDS_COMPATIBLE";
	})(ApiJsonSchemaVersion || (ApiJsonSchemaVersion = {}));
	class DeserializerContext {
	    constructor(options) {
	        this.toolPackage = options.toolPackage;
	        this.toolVersion = options.toolVersion;
	        this.versionToDeserialize = options.versionToDeserialize;
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents an NPM package containing API declarations.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * @public
	 */
	class ApiPackage extends ApiItemContainerMixin(ApiNameMixin(ApiDocumentedItem)) {
	    constructor(options) {
	        super(options);
	    }
	    static loadFromJsonObject(jsonObject) {
	        if (!jsonObject
	            || !jsonObject.metadata
	            || typeof jsonObject.metadata.schemaVersion !== 'number') {
	            throw new Error(`Error loading ApiPackage:`
	                + `\nThe file format is not recognized; the "metadata.schemaVersion" field is missing or invalid`);
	        }
	        const schemaVersion = jsonObject.metadata.schemaVersion;
	        if (schemaVersion < ApiJsonSchemaVersion.OLDEST_SUPPORTED) {
	            throw new Error(`Error loading ApiPackage:`
	                + `\nThe file format is version ${schemaVersion},`
	                + ` whereas ${ApiJsonSchemaVersion.OLDEST_SUPPORTED} is the oldest version supported by this tool`);
	        }
	        let oldestForwardsCompatibleVersion = schemaVersion;
	        if (jsonObject.metadata.oldestForwardsCompatibleVersion) {
	            // Sanity check
	            if (jsonObject.metadata.oldestForwardsCompatibleVersion > schemaVersion) {
	                throw new Error(`Error loading ApiPackage:`
	                    + `\nInvalid file format; "oldestForwardsCompatibleVersion" cannot be newer than "schemaVersion"`);
	            }
	            oldestForwardsCompatibleVersion = jsonObject.metadata.oldestForwardsCompatibleVersion;
	        }
	        let versionToDeserialize = schemaVersion;
	        if (versionToDeserialize > ApiJsonSchemaVersion.LATEST) {
	            // If the file format is too new, can we treat it as some earlier compatible version
	            // as indicated by oldestForwardsCompatibleVersion?
	            versionToDeserialize = Math.max(oldestForwardsCompatibleVersion, ApiJsonSchemaVersion.LATEST);
	            if (versionToDeserialize > ApiJsonSchemaVersion.LATEST) {
	                // Nope, still too new
	                throw new Error(`Error loading ApiPackage:`
	                    + `\nThe file format version ${schemaVersion} was written by a newer release of`
	                    + ` the api-extractor-model library; you may need to upgrade your software`);
	            }
	        }
	        const context = new DeserializerContext({
	            toolPackage: jsonObject.metadata.toolPackage,
	            toolVersion: jsonObject.metadata.toolVersion,
	            versionToDeserialize: versionToDeserialize
	        });
	        return ApiItem.deserialize(jsonObject, context);
	    }
	    /** @override */
	    get kind() {
	        return "Package" /* Package */;
	    }
	    /** @override */
	    get containerKey() {
	        // No prefix needed, because ApiPackage is the only possible member of an ApiModel
	        return this.name;
	    }
	    get entryPoints() {
	        return this.members;
	    }
	    /** @override */
	    addMember(member) {
	        if (member.kind !== "EntryPoint" /* EntryPoint */) {
	            throw new Error('Only items of type ApiEntryPoint may be added to an ApiPackage');
	        }
	        super.addMember(member);
	    }
	    findEntryPointsByPath(importPath) {
	        return this.findMembersByName(importPath);
	    }
	    getJsonObject(options) {
	        if (!options) {
	            options = {};
	        }
	        const jsonObject = {
	            metadata: {
	                toolPackage: options.toolPackage,
	                // In test mode, we don't write the real version, since that would cause spurious diffs whenever
	                // the version is bumped.  Instead we write a placeholder string.
	                toolVersion: options.testMode ? '[test mode]' : options.toolVersion,
	                schemaVersion: ApiJsonSchemaVersion.LATEST,
	                oldestForwardsCompatibleVersion: ApiJsonSchemaVersion.OLDEST_FORWARDS_COMPATIBLE
	            }
	        };
	        this.serializeInto(jsonObject);
	        return jsonObject;
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        return DeclarationReference_2.package(this.name);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents the entry point for an NPM package.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiEntryPoint` represents the entry point to an NPM package.  API Extractor does not currently support
	 * analysis of multiple entry points, but the `ApiEntryPoint` object is included to support a future feature.
	 * In the current implementation, `ApiEntryPoint.importPath` is always the empty string.
	 *
	 * For example, suppose the package.json file looks like this:
	 *
	 * ```json
	 * {
	 *   "name": "example-library",
	 *   "version": "1.0.0",
	 *   "main": "./lib/index.js",
	 *   "typings": "./lib/index.d.ts"
	 * }
	 * ```
	 *
	 * In this example, the `ApiEntryPoint` would represent the TypeScript module for `./lib/index.js`.
	 *
	 * @public
	 */
	class ApiEntryPoint extends ApiItemContainerMixin(ApiNameMixin(ApiItem)) {
	    constructor(options) {
	        super(options);
	    }
	    /** @override */
	    get kind() {
	        return "EntryPoint" /* EntryPoint */;
	    }
	    /** @override */
	    get containerKey() {
	        // No prefix needed, because ApiEntryPoint is the only possible member of an ApiPackage
	        return this.name;
	    }
	    /**
	     * The module path for this entry point, relative to the parent `ApiPackage`.  In the current implementation,
	     * this is always the empty string, indicating the default entry point.
	     *
	     * @remarks
	     *
	     * API Extractor does not currently support analysis of multiple entry points.  If that feature is implemented
	     * in the future, then the `ApiEntryPoint.importPath` will be used to distinguish different entry points,
	     * for example: `controls/Button` in `import { Button } from "example-package/controls/Button";`.
	     *
	     * The `ApiEntryPoint.name` property stores the same value as `ApiEntryPoint.importPath`.
	     */
	    get importPath() {
	        return this.name;
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        if (this.parent instanceof ApiPackage) {
	            return DeclarationReference_2.package(this.parent.name, this.importPath);
	        }
	        return DeclarationReference_2.empty();
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	// See LICENSE in the project root for license information.s
	const _isStatic = Symbol('ApiStaticMixin._isStatic');
	/**
	 * Mixin function for {@link (ApiStaticMixin:interface)}.
	 *
	 * @param baseClass - The base class to be extended
	 * @returns A child class that extends baseClass, adding the {@link (ApiStaticMixin:interface)} functionality.
	 *
	 * @public
	 */
	function ApiStaticMixin(baseClass) {
	    class MixedClass extends baseClass {
	        // eslint-disable-next-line @typescript-eslint/no-explicit-any
	        constructor(...args) {
	            super(...args);
	            const options = args[0];
	            this[_isStatic] = options.isStatic;
	        }
	        /** @override */
	        static onDeserializeInto(options, context, jsonObject) {
	            baseClass.onDeserializeInto(options, context, jsonObject);
	            options.isStatic = jsonObject.isStatic;
	        }
	        get isStatic() {
	            return this[_isStatic];
	        }
	        /** @override */
	        serializeInto(jsonObject) {
	            super.serializeInto(jsonObject);
	            jsonObject.isStatic = this.isStatic;
	        }
	    }
	    return MixedClass;
	}
	/**
	 * Static members for {@link (ApiStaticMixin:interface)}.
	 * @public
	 */
	(function (ApiStaticMixin) {
	    /**
	     * A type guard that tests whether the specified `ApiItem` subclass extends the `ApiStaticMixin` mixin.
	     *
	     * @remarks
	     *
	     * The JavaScript `instanceof` operator cannot be used to test for mixin inheritance, because each invocation of
	     * the mixin function produces a different subclass.  (This could be mitigated by `Symbol.hasInstance`, however
	     * the TypeScript type system cannot invoke a runtime test.)
	     */
	    function isBaseClassOf(apiItem) {
	        return apiItem.hasOwnProperty(_isStatic);
	    }
	    ApiStaticMixin.isBaseClassOf = isBaseClassOf;
	})(ApiStaticMixin || (ApiStaticMixin = {}));

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	const _returnTypeExcerpt = Symbol('ApiReturnTypeMixin._returnTypeExcerpt');
	/**
	 * Mixin function for {@link (ApiReturnTypeMixin:interface)}.
	 *
	 * @param baseClass - The base class to be extended
	 * @returns A child class that extends baseClass, adding the {@link (ApiReturnTypeMixin:interface)} functionality.
	 *
	 * @public
	 */
	function ApiReturnTypeMixin(baseClass) {
	    class MixedClass extends baseClass {
	        // eslint-disable-next-line @typescript-eslint/no-explicit-any
	        constructor(...args) {
	            super(...args);
	            const options = args[0];
	            if (this instanceof ApiDeclaredItem) {
	                this[_returnTypeExcerpt] = this.buildExcerpt(options.returnTypeTokenRange);
	            }
	            else {
	                throw new InternalError('ApiReturnTypeMixin expects a base class that inherits from ApiDeclaredItem');
	            }
	        }
	        /** @override */
	        static onDeserializeInto(options, context, jsonObject) {
	            baseClass.onDeserializeInto(options, context, jsonObject);
	            options.returnTypeTokenRange = jsonObject.returnTypeTokenRange;
	        }
	        get returnTypeExcerpt() {
	            return this[_returnTypeExcerpt];
	        }
	        /** @override */
	        serializeInto(jsonObject) {
	            super.serializeInto(jsonObject);
	            jsonObject.returnTypeTokenRange = this.returnTypeExcerpt.tokenRange;
	        }
	    }
	    return MixedClass;
	}
	/**
	 * Static members for {@link (ApiReturnTypeMixin:interface)}.
	 * @public
	 */
	(function (ApiReturnTypeMixin) {
	    /**
	     * A type guard that tests whether the specified `ApiItem` subclass extends the `ApiReturnTypeMixin` mixin.
	     *
	     * @remarks
	     *
	     * The JavaScript `instanceof` operator cannot be used to test for mixin inheritance, because each invocation of
	     * the mixin function produces a different subclass.  (This could be mitigated by `Symbol.hasInstance`, however
	     * the TypeScript type system cannot invoke a runtime test.)
	     */
	    function isBaseClassOf(apiItem) {
	        return apiItem.hasOwnProperty(_returnTypeExcerpt);
	    }
	    ApiReturnTypeMixin.isBaseClassOf = isBaseClassOf;
	})(ApiReturnTypeMixin || (ApiReturnTypeMixin = {}));

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript member function declaration that belongs to an `ApiClass`.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiMethod` represents a TypeScript declaration such as the `render` member function in this example:
	 *
	 * ```ts
	 * export class Widget {
	 *   public render(): void { }
	 * }
	 * ```
	 *
	 * Compare with {@link ApiMethodSignature}, which represents a method belonging to an interface.
	 * For example, a class method can be `static` but an interface method cannot.
	 *
	 * @public
	 */
	class ApiMethod extends ApiNameMixin(ApiTypeParameterListMixin(ApiParameterListMixin(ApiReleaseTagMixin(ApiReturnTypeMixin(ApiStaticMixin(ApiDeclaredItem)))))) {
	    constructor(options) {
	        super(options);
	    }
	    static getContainerKey(name, isStatic, overloadIndex) {
	        if (isStatic) {
	            return `${name}|${"Method" /* Method */}|static|${overloadIndex}`;
	        }
	        else {
	            return `${name}|${"Method" /* Method */}|instance|${overloadIndex}`;
	        }
	    }
	    /** @override */
	    get kind() {
	        return "Method" /* Method */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiMethod.getContainerKey(this.name, this.isStatic, this.overloadIndex);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const nameComponent = DeclarationReference_2.parseComponent(this.name);
	        return (this.parent ? this.parent.canonicalReference : DeclarationReference_2.empty())
	            .addNavigationStep(this.isStatic ? "." /* Exports */ : "#" /* Members */, nameComponent)
	            .withMeaning("member" /* Member */)
	            .withOverloadIndex(this.overloadIndex);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * This resolves a TSDoc declaration reference by walking the `ApiModel` hierarchy.
	 *
	 * @remarks
	 *
	 * This class is analogous to `AstReferenceResolver` from the `@microsoft/api-extractor` project,
	 * which resolves declaration references by walking the compiler state.
	 */
	class ModelReferenceResolver {
	    constructor(apiModel) {
	        this._apiModel = apiModel;
	    }
	    resolve(declarationReference, contextApiItem) {
	        const result = {
	            resolvedApiItem: undefined,
	            errorMessage: undefined
	        };
	        let apiPackage = undefined;
	        // Is this an absolute reference?
	        if (declarationReference.packageName !== undefined) {
	            apiPackage = this._apiModel.tryGetPackageByName(declarationReference.packageName);
	            if (apiPackage === undefined) {
	                result.errorMessage = `The package "${declarationReference.packageName}" could not be located`;
	                return result;
	            }
	        }
	        else {
	            // If the package name is omitted, try to infer it from the context
	            if (contextApiItem !== undefined) {
	                apiPackage = contextApiItem.getAssociatedPackage();
	            }
	            if (apiPackage === undefined) {
	                result.errorMessage = `The reference does not include a package name, and the package could not be inferred`
	                    + ` from the context`;
	                return result;
	            }
	        }
	        const importPath = declarationReference.importPath || '';
	        const foundEntryPoints = apiPackage.findEntryPointsByPath(importPath);
	        if (foundEntryPoints.length !== 1) {
	            result.errorMessage = `The import path "${importPath}" could not be resolved`;
	            return result;
	        }
	        let currentItem = foundEntryPoints[0];
	        // Now search for the member reference
	        for (const memberReference of declarationReference.memberReferences) {
	            if (memberReference.memberSymbol !== undefined) {
	                result.errorMessage = `Symbols are not yet supported in declaration references`;
	                return result;
	            }
	            if (memberReference.memberIdentifier === undefined) {
	                result.errorMessage = `Missing member identifier`;
	                return result;
	            }
	            const identifier = memberReference.memberIdentifier.identifier;
	            if (!ApiItemContainerMixin.isBaseClassOf(currentItem)) {
	                // For example, {@link MyClass.myMethod.X} is invalid because methods cannot contain members
	                result.errorMessage = `Unable to resolve ${JSON.stringify(identifier)} because ${JSON.stringify(currentItem)}`
	                    + ` cannot act as a container`;
	                return result;
	            }
	            const foundMembers = currentItem.findMembersByName(identifier);
	            if (foundMembers.length === 0) {
	                result.errorMessage = `The member reference ${JSON.stringify(identifier)} was not found`;
	                return result;
	            }
	            if (foundMembers.length > 1) {
	                if (memberReference.selector && memberReference.selector.selectorKind === "index" /* Index */) {
	                    const selectedMembers = [];
	                    const selectorOverloadIndex = parseInt(memberReference.selector.selector);
	                    for (const foundMember of foundMembers) {
	                        if (ApiParameterListMixin.isBaseClassOf(foundMember)) {
	                            if (foundMember.overloadIndex === selectorOverloadIndex) {
	                                selectedMembers.push(foundMember);
	                            }
	                        }
	                    }
	                    if (selectedMembers.length === 0) {
	                        result.errorMessage = `An overload for ${JSON.stringify(identifier)} was not found that matches`
	                            + ` the TSDoc selector ":${selectorOverloadIndex}"`;
	                        return result;
	                    }
	                    if (selectedMembers.length === 1) {
	                        result.resolvedApiItem = selectedMembers[0];
	                        return result;
	                    }
	                }
	                // TODO: Support other TSDoc selectors
	                result.errorMessage = `The member reference ${JSON.stringify(identifier)} was ambiguous`;
	                return result;
	            }
	            currentItem = foundMembers[0];
	        }
	        result.resolvedApiItem = currentItem;
	        return result;
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * A serializable representation of a collection of API declarations.
	 *
	 * @remarks
	 *
	 * An `ApiModel` represents a collection of API declarations that can be serialized to disk.  It captures all the
	 * important information needed to generate documentation, without any reliance on the TypeScript compiler engine.
	 *
	 * An `ApiModel` acts as the root of a tree of objects that all inherit from the `ApiItem` base class.
	 * The tree children are determined by the {@link (ApiItemContainerMixin:interface)} mixin base class.  The model
	 * contains packages.  Packages have an entry point (today, only one).  And the entry point can contain various types
	 * of API declarations.  The container relationships might look like this:
	 *
	 * ```
	 * Things that can contain other things:
	 *
	 * - ApiModel
	 *   - ApiPackage
	 *     - ApiEntryPoint
	 *       - ApiClass
	 *         - ApiMethod
	 *         - ApiProperty
	 *       - ApiEnum
	 *         - ApiEnumMember
	 *       - ApiInterface
	 *         - ApiMethodSignature
	 *         - ApiPropertySignature
	 *       - ApiNamespace
	 *         - (ApiClass, ApiEnum, ApiInterace, ...)
	 *
	 * ```
	 *
	 * Normally, API Extractor writes an .api.json file to disk for each project that it builds.  Then, a tool like
	 * API Documenter can load the various `ApiPackage` objects into a single `ApiModel` and process them as a group.
	 * This is useful because compilation generally occurs separately (e.g. because projects may reside in different
	 * Git repos, or because they build with different TypeScript compiler configurations that may be incompatible),
	 * whereas API Documenter cannot detect broken hyperlinks without seeing the entire documentation set.
	 *
	 * @public
	 */
	class ApiModel extends ApiItemContainerMixin(ApiItem) {
	    constructor() {
	        super({});
	        this._packagesByName = undefined;
	        this._resolver = new ModelReferenceResolver(this);
	    }
	    loadPackageFromJsonObject(apiPackageJson) {
	        const apiPackage = ApiPackage.loadFromJsonObject(apiPackageJson);
	        this.addMember(apiPackage);
	        return apiPackage;
	    }
	    /** @override */
	    get kind() {
	        return "Model" /* Model */;
	    }
	    /** @override */
	    get containerKey() {
	        return '';
	    }
	    get packages() {
	        return this.members;
	    }
	    /** @override */
	    addMember(member) {
	        if (member.kind !== "Package" /* Package */) {
	            throw new Error('Only items of type ApiPackage may be added to an ApiModel');
	        }
	        super.addMember(member);
	        this._packagesByName = undefined; // invalidate the cache
	    }
	    /**
	     * Efficiently finds a package by the NPM package name.
	     *
	     * @remarks
	     *
	     * If the NPM scope is omitted in the package name, it will still be found provided that it is an unambiguous match.
	     * For example, it's often convenient to write `{@link node-core-library#JsonFile}` instead of
	     * `{@link @rushstack/node-core-library#JsonFile}`.
	     */
	    tryGetPackageByName(packageName) {
	        // Build the lookup on demand
	        if (this._packagesByName === undefined) {
	            this._packagesByName = new Map();
	            const unscopedMap = new Map();
	            for (const apiPackage of this.packages) {
	                if (this._packagesByName.get(apiPackage.name)) {
	                    // This should not happen
	                    throw new Error(`The model contains multiple packages with the name ${apiPackage.name}`);
	                }
	                this._packagesByName.set(apiPackage.name, apiPackage);
	                const unscopedName = PackageName.parse(apiPackage.name).unscopedName;
	                if (unscopedMap.has(unscopedName)) {
	                    // If another package has the same unscoped name, then we won't register it
	                    unscopedMap.set(unscopedName, undefined);
	                }
	                else {
	                    unscopedMap.set(unscopedName, apiPackage);
	                }
	            }
	            for (const [unscopedName, apiPackage] of unscopedMap) {
	                if (apiPackage) {
	                    if (!this._packagesByName.has(unscopedName)) {
	                        // If the unscoped name is unambiguous, then we can also use it as a lookup
	                        this._packagesByName.set(unscopedName, apiPackage);
	                    }
	                }
	            }
	        }
	        return this._packagesByName.get(packageName);
	    }
	    resolveDeclarationReference(declarationReference, contextApiItem) {
	        return this._resolver.resolve(declarationReference, contextApiItem);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        return DeclarationReference_2.empty();
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript namespace declaration.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiNamespace` represents a TypeScript declaration such `X` or `Y` in this example:
	 *
	 * ```ts
	 * export namespace X {
	 *   export namespace Y {
	 *     export interface IWidget {
	 *       render(): void;
	 *     }
	 *   }
	 * }
	 * ```
	 *
	 * @public
	 */
	class ApiNamespace extends ApiItemContainerMixin(ApiNameMixin(ApiReleaseTagMixin(ApiDeclaredItem))) {
	    constructor(options) {
	        super(options);
	    }
	    static getContainerKey(name) {
	        return `${name}|${"Namespace" /* Namespace */}`;
	    }
	    /** @override */
	    get kind() {
	        return "Namespace" /* Namespace */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiNamespace.getContainerKey(this.name);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const nameComponent = DeclarationReference_2.parseComponent(this.name);
	        return (this.parent ? this.parent.canonicalReference : DeclarationReference_2.empty())
	            .addNavigationStep("." /* Exports */, nameComponent)
	            .withMeaning("namespace" /* Namespace */);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript class declaration.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiInterface` represents a TypeScript declaration such as this:
	 *
	 * ```ts
	 * export interface X extends Y {
	 * }
	 * ```
	 *
	 * @public
	 */
	class ApiInterface extends ApiItemContainerMixin(ApiNameMixin(ApiTypeParameterListMixin(ApiReleaseTagMixin(ApiDeclaredItem)))) {
	    constructor(options) {
	        super(options);
	        this._extendsTypes = [];
	        for (const extendsTokenRange of options.extendsTokenRanges) {
	            this._extendsTypes.push(new HeritageType(this.buildExcerpt(extendsTokenRange)));
	        }
	    }
	    static getContainerKey(name) {
	        return `${name}|${"Interface" /* Interface */}`;
	    }
	    /** @override */
	    static onDeserializeInto(options, context, jsonObject) {
	        super.onDeserializeInto(options, context, jsonObject);
	        options.extendsTokenRanges = jsonObject.extendsTokenRanges;
	    }
	    /** @override */
	    get kind() {
	        return "Interface" /* Interface */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiInterface.getContainerKey(this.name);
	    }
	    /**
	     * The list of base interfaces that this interface inherits from using the `extends` keyword.
	     */
	    get extendsTypes() {
	        return this._extendsTypes;
	    }
	    /** @override */
	    serializeInto(jsonObject) {
	        super.serializeInto(jsonObject);
	        jsonObject.extendsTokenRanges = this.extendsTypes.map(x => x.excerpt.tokenRange);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const nameComponent = DeclarationReference_2.parseComponent(this.name);
	        return (this.parent ? this.parent.canonicalReference : DeclarationReference_2.empty())
	            .addNavigationStep("." /* Exports */, nameComponent)
	            .withMeaning("interface" /* Interface */);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * The abstract base class for {@link ApiProperty} and {@link ApiPropertySignature}.
	 *
	 * @public
	 */
	class ApiPropertyItem extends ApiNameMixin(ApiReleaseTagMixin(ApiDeclaredItem)) {
	    constructor(options) {
	        super(options);
	        this.propertyTypeExcerpt = this.buildExcerpt(options.propertyTypeTokenRange);
	    }
	    /** @override */
	    static onDeserializeInto(options, context, jsonObject) {
	        super.onDeserializeInto(options, context, jsonObject);
	        options.propertyTypeTokenRange = jsonObject.propertyTypeTokenRange;
	    }
	    /**
	     * Returns true if this property should be documented as an event.
	     *
	     * @remarks
	     * The `@eventProperty` TSDoc modifier can be added to readonly properties to indicate that they return an
	     * event object that event handlers can be attached to.  The event-handling API is implementation-defined, but
	     * typically the return type would be a class with members such as `addHandler()` and `removeHandler()`.
	     * The documentation should display such properties under an "Events" heading instead of the
	     * usual "Properties" heading.
	     */
	    get isEventProperty() {
	        if (this.tsdocComment) {
	            return this.tsdocComment.modifierTagSet.isEventProperty();
	        }
	        return false;
	    }
	    /** @override */
	    serializeInto(jsonObject) {
	        super.serializeInto(jsonObject);
	        jsonObject.propertyTypeTokenRange = this.propertyTypeExcerpt.tokenRange;
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript property declaration that belongs to an `ApiInterface`.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiPropertySignature` represents a TypeScript declaration such as the `width` and `height` members in this example:
	 *
	 * ```ts
	 * export interface IWidget {
	 *   readonly width: number;
	 *   height: number;
	 * }
	 * ```
	 *
	 * Compare with {@link ApiProperty}, which represents a property belonging to a class.
	 * For example, a class property can be `static` but an interface property cannot.
	 *
	 * @public
	 */
	class ApiPropertySignature extends ApiPropertyItem {
	    constructor(options) {
	        super(options);
	    }
	    static getContainerKey(name) {
	        return `${name}|${"PropertySignature" /* PropertySignature */}`;
	    }
	    /** @override */
	    get kind() {
	        return "PropertySignature" /* PropertySignature */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiPropertySignature.getContainerKey(this.name);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const nameComponent = DeclarationReference_2.parseComponent(this.name);
	        return (this.parent ? this.parent.canonicalReference : DeclarationReference_2.empty())
	            .addNavigationStep("#" /* Members */, nameComponent)
	            .withMeaning("member" /* Member */);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript member function declaration that belongs to an `ApiInterface`.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiMethodSignature` represents a TypeScript declaration such as the `render` member function in this example:
	 *
	 * ```ts
	 * export interface IWidget {
	 *   render(): void;
	 * }
	 * ```
	 *
	 * Compare with {@link ApiMethod}, which represents a method belonging to a class.
	 * For example, a class method can be `static` but an interface method cannot.
	 *
	 * @public
	 */
	class ApiMethodSignature extends ApiNameMixin(ApiTypeParameterListMixin(ApiParameterListMixin(ApiReleaseTagMixin(ApiReturnTypeMixin(ApiDeclaredItem))))) {
	    constructor(options) {
	        super(options);
	    }
	    static getContainerKey(name, overloadIndex) {
	        return `${name}|${"MethodSignature" /* MethodSignature */}|${overloadIndex}`;
	    }
	    /** @override */
	    get kind() {
	        return "MethodSignature" /* MethodSignature */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiMethodSignature.getContainerKey(this.name, this.overloadIndex);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const nameComponent = DeclarationReference_2.parseComponent(this.name);
	        return (this.parent ? this.parent.canonicalReference : DeclarationReference_2.empty())
	            .addNavigationStep("#" /* Members */, nameComponent)
	            .withMeaning("member" /* Member */)
	            .withOverloadIndex(this.overloadIndex);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript property declaration that belongs to an `ApiClass`.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiProperty` represents a TypeScript declaration such as the `width` and `height` members in this example:
	 *
	 * ```ts
	 * export class Widget {
	 *   public width: number = 100;
	 *
	 *   public get height(): number {
	 *     if (this.isSquashed()) {
	 *       return 0;
	 *     } else {
	 *       return this.clientArea.height;
	 *     }
	 *   }
	 * }
	 * ```
	 *
	 * Note that member variables are also considered to be properties.
	 *
	 * If the property has both a getter function and setter function, they will be represented by a single `ApiProperty`
	 * and must have a single documentation comment.
	 *
	 * Compare with {@link ApiPropertySignature}, which represents a property belonging to an interface.
	 * For example, a class property can be `static` but an interface property cannot.
	 *
	 * @public
	 */
	class ApiProperty extends ApiStaticMixin(ApiPropertyItem) {
	    constructor(options) {
	        super(options);
	    }
	    static getContainerKey(name, isStatic) {
	        if (isStatic) {
	            return `${name}|${"Property" /* Property */}|static`;
	        }
	        else {
	            return `${name}|${"Property" /* Property */}|instance`;
	        }
	    }
	    /** @override */
	    get kind() {
	        return "Property" /* Property */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiProperty.getContainerKey(this.name, this.isStatic);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const nameComponent = DeclarationReference_2.parseComponent(this.name);
	        return (this.parent ? this.parent.canonicalReference : DeclarationReference_2.empty())
	            .addNavigationStep(this.isStatic ? "." /* Exports */ : "#" /* Members */, nameComponent)
	            .withMeaning("member" /* Member */);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a member of a TypeScript enum declaration.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiEnumMember` represents an enum member such as `Small = 100` in the example below:
	 *
	 * ```ts
	 * export enum FontSizes {
	 *   Small = 100,
	 *   Medium = 200,
	 *   Large = 300
	 * }
	 * ```
	 *
	 * @public
	 */
	class ApiEnumMember extends ApiNameMixin(ApiReleaseTagMixin(ApiDeclaredItem)) {
	    constructor(options) {
	        super(options);
	        this.initializerExcerpt = this.buildExcerpt(options.initializerTokenRange);
	    }
	    static getContainerKey(name) {
	        // No prefix needed, because ApiEnumMember is the only possible member of an ApiEnum
	        return name;
	    }
	    /** @override */
	    static onDeserializeInto(options, context, jsonObject) {
	        super.onDeserializeInto(options, context, jsonObject);
	        options.initializerTokenRange = jsonObject.initializerTokenRange;
	    }
	    /** @override */
	    get kind() {
	        return "EnumMember" /* EnumMember */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiEnumMember.getContainerKey(this.name);
	    }
	    /** @override */
	    serializeInto(jsonObject) {
	        super.serializeInto(jsonObject);
	        jsonObject.initializerTokenRange = this.initializerExcerpt.tokenRange;
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const nameComponent = DeclarationReference_2.parseComponent(this.name);
	        return (this.parent ? this.parent.canonicalReference : DeclarationReference_2.empty())
	            .addNavigationStep("." /* Exports */, nameComponent)
	            .withMeaning("member" /* Member */);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript enum declaration.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiEnum` represents an enum declaration such as `FontSizes` in the example below:
	 *
	 * ```ts
	 * export enum FontSizes {
	 *   Small = 100,
	 *   Medium = 200,
	 *   Large = 300
	 * }
	 * ```
	 *
	 * @public
	 */
	class ApiEnum extends ApiItemContainerMixin(ApiNameMixin(ApiReleaseTagMixin(ApiDeclaredItem))) {
	    constructor(options) {
	        super(options);
	    }
	    static getContainerKey(name) {
	        return `${name}|${"Enum" /* Enum */}`;
	    }
	    /** @override */
	    get kind() {
	        return "Enum" /* Enum */;
	    }
	    /** @override */
	    get members() {
	        return super.members;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiEnum.getContainerKey(this.name);
	    }
	    /** @override */
	    addMember(member) {
	        if (member.kind !== "EnumMember" /* EnumMember */) {
	            throw new Error('Only ApiEnumMember objects can be added to an ApiEnum');
	        }
	        super.addMember(member);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const nameComponent = DeclarationReference_2.parseComponent(this.name);
	        return (this.parent ? this.parent.canonicalReference : DeclarationReference_2.empty())
	            .addNavigationStep("." /* Exports */, nameComponent)
	            .withMeaning("enum" /* Enum */);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript class constructor declaration that belongs to an `ApiClass`.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiConstructor` represents a declaration using the `constructor` keyword such as in this example:
	 *
	 * ```ts
	 * export class Vector {
	 *   public x: number;
	 *   public y: number;
	 *
	 *   // A class constructor:
	 *   public constructor(x: number, y: number) {
	 *     this.x = x;
	 *     this.y = y;
	 *   }
	 * }
	 * ```
	 *
	 * Compare with {@link ApiConstructSignature}, which describes the construct signature for a class constructor.
	 *
	 * @public
	 */
	class ApiConstructor extends ApiParameterListMixin(ApiReleaseTagMixin(ApiDeclaredItem)) {
	    constructor(options) {
	        super(options);
	    }
	    static getContainerKey(overloadIndex) {
	        return `|${"Constructor" /* Constructor */}|${overloadIndex}`;
	    }
	    /** @override */
	    get kind() {
	        return "Constructor" /* Constructor */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiConstructor.getContainerKey(this.overloadIndex);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const parent = this.parent
	            ? this.parent.canonicalReference
	            // .withMeaning() requires some kind of component
	            : DeclarationReference_2.empty().addNavigationStep("#" /* Members */, '(parent)');
	        return parent
	            .withMeaning("constructor" /* Constructor */)
	            .withOverloadIndex(this.overloadIndex);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript construct signature that belongs to an `ApiInterface`.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiConstructSignature` represents a construct signature using the `new` keyword such as in this example:
	 *
	 * ```ts
	 * export interface IVector {
	 *   x: number;
	 *   y: number;
	 * }
	 *
	 * export interface IVectorConstructor {
	 *   // A construct signature:
	 *   new(x: number, y: number): IVector;
	 * }
	 *
	 * export function createVector(vectorConstructor: IVectorConstructor,
	 *   x: number, y: number): IVector {
	 *   return new vectorConstructor(x, y);
	 * }
	 *
	 * class Vector implements IVector {
	 *   public x: number;
	 *   public y: number;
	 *   public constructor(x: number, y: number) {
	 *     this.x = x;
	 *     this.y = y;
	 *   }
	 * }
	 *
	 * let vector: Vector = createVector(Vector, 1, 2);
	 * ```
	 *
	 * Compare with {@link ApiConstructor}, which describes the class constructor itself.
	 *
	 * @public
	 */
	class ApiConstructSignature extends ApiTypeParameterListMixin(ApiParameterListMixin(ApiReleaseTagMixin(ApiReturnTypeMixin(ApiDeclaredItem)))) {
	    constructor(options) {
	        super(options);
	    }
	    static getContainerKey(overloadIndex) {
	        return `|${"ConstructSignature" /* ConstructSignature */}|${overloadIndex}`;
	    }
	    /** @override */
	    get kind() {
	        return "ConstructSignature" /* ConstructSignature */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiConstructSignature.getContainerKey(this.overloadIndex);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const parent = this.parent
	            ? this.parent.canonicalReference
	            // .withMeaning() requires some kind of component
	            : DeclarationReference_2.empty().addNavigationStep("#" /* Members */, '(parent)');
	        return parent
	            .withMeaning("new" /* ConstructSignature */)
	            .withOverloadIndex(this.overloadIndex);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript function declaration.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiFunction` represents a TypeScript declaration such as this example:
	 *
	 * ```ts
	 * export function getAverage(x: number, y: number): number {
	 *   return (x + y) / 2.0;
	 * }
	 * ```
	 *
	 * Functions are exported by an entry point module or by a namespace.  Compare with {@link ApiMethod}, which
	 * represents a function that is a member of a class.
	 *
	 * @public
	 */
	class ApiFunction extends ApiNameMixin(ApiTypeParameterListMixin(ApiParameterListMixin(ApiReleaseTagMixin(ApiReturnTypeMixin(ApiDeclaredItem))))) {
	    constructor(options) {
	        super(options);
	    }
	    static getContainerKey(name, overloadIndex) {
	        return `${name}|${"Function" /* Function */}|${overloadIndex}`;
	    }
	    /** @override */
	    get kind() {
	        return "Function" /* Function */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiFunction.getContainerKey(this.name, this.overloadIndex);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const nameComponent = DeclarationReference_2.parseComponent(this.name);
	        return (this.parent ? this.parent.canonicalReference : DeclarationReference_2.empty())
	            .addNavigationStep("." /* Exports */, nameComponent)
	            .withMeaning("function" /* Function */)
	            .withOverloadIndex(this.overloadIndex);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript function call signature.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiCallSignature` represents a TypeScript declaration such as `(x: number, y: number): number`
	 * in this example:
	 *
	 * ```ts
	 * export interface IChooser {
	 *   // A call signature:
	 *   (x: number, y: number): number;
	 *
	 *   // Another overload for this call signature:
	 *   (x: string, y: string): string;
	 * }
	 *
	 * function chooseFirst<T>(x: T, y: T): T {
	 *   return x;
	 * }
	 *
	 * let chooser: IChooser = chooseFirst;
	 * ```
	 *
	 * @public
	 */
	class ApiCallSignature extends ApiTypeParameterListMixin(ApiParameterListMixin(ApiReleaseTagMixin(ApiReturnTypeMixin(ApiDeclaredItem)))) {
	    constructor(options) {
	        super(options);
	    }
	    static getContainerKey(overloadIndex) {
	        return `|${"CallSignature" /* CallSignature */}|${overloadIndex}`;
	    }
	    /** @override */
	    get kind() {
	        return "CallSignature" /* CallSignature */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiCallSignature.getContainerKey(this.overloadIndex);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const parent = this.parent
	            ? this.parent.canonicalReference
	            // .withMeaning() requires some kind of component
	            : DeclarationReference_2.empty().addNavigationStep("#" /* Members */, '(parent)');
	        return parent
	            .withMeaning("call" /* CallSignature */)
	            .withOverloadIndex(this.overloadIndex);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript index signature.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiIndexSignature` represents a TypeScript declaration such as `[x: number]: number` in this example:
	 *
	 * ```ts
	 * export interface INumberTable {
	 *   // An index signature
	 *   [value: number]: number;
	 *
	 *   // An overloaded index signature
	 *   [name: string]: number;
	 * }
	 * ```
	 *
	 * @public
	 */
	class ApiIndexSignature extends ApiParameterListMixin(ApiReleaseTagMixin(ApiReturnTypeMixin(ApiDeclaredItem))) {
	    constructor(options) {
	        super(options);
	    }
	    static getContainerKey(overloadIndex) {
	        return `|${"IndexSignature" /* IndexSignature */}|${overloadIndex}`;
	    }
	    /** @override */
	    get kind() {
	        return "IndexSignature" /* IndexSignature */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiIndexSignature.getContainerKey(this.overloadIndex);
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const parent = this.parent
	            ? this.parent.canonicalReference
	            // .withMeaning() requires some kind of component
	            : DeclarationReference_2.empty().addNavigationStep("#" /* Members */, '(parent)');
	        return parent
	            .withMeaning("index" /* IndexSignature */)
	            .withOverloadIndex(this.overloadIndex);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript type alias declaration.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiTypeAlias` represents a definition such as one of these examples:
	 *
	 * ```ts
	 * // A union type:
	 * export type Shape = Square | Triangle | Circle;
	 *
	 * // A generic type alias:
	 * export type BoxedValue<T> = { value: T };
	 *
	 * export type BoxedArray<T> = { array: T[] };
	 *
	 * // A conditional type alias:
	 * export type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;
	 *
	 * ```
	 *
	 * @public
	 */
	class ApiTypeAlias extends ApiTypeParameterListMixin(ApiNameMixin(ApiReleaseTagMixin(ApiDeclaredItem))) {
	    constructor(options) {
	        super(options);
	        this.typeExcerpt = this.buildExcerpt(options.typeTokenRange);
	    }
	    /** @override */
	    static onDeserializeInto(options, context, jsonObject) {
	        super.onDeserializeInto(options, context, jsonObject);
	        options.typeTokenRange = jsonObject.typeTokenRange;
	    }
	    static getContainerKey(name) {
	        return `${name}|${"TypeAlias" /* TypeAlias */}`;
	    }
	    /** @override */
	    get kind() {
	        return "TypeAlias" /* TypeAlias */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiTypeAlias.getContainerKey(this.name);
	    }
	    /** @override */
	    serializeInto(jsonObject) {
	        super.serializeInto(jsonObject);
	        jsonObject.typeTokenRange = this.typeExcerpt.tokenRange;
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const nameComponent = DeclarationReference_2.parseComponent(this.name);
	        return (this.parent ? this.parent.canonicalReference : DeclarationReference_2.empty())
	            .addNavigationStep("." /* Exports */, nameComponent)
	            .withMeaning("type" /* TypeAlias */);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * Represents a TypeScript variable declaration.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * `ApiVariable` represents an exported `const` or `let` object such as these examples:
	 *
	 * ```ts
	 * // A variable declaration
	 * export let verboseLogging: boolean;
	 *
	 * // A constant variable declaration with an initializer
	 * export const canvas: IWidget = createCanvas();
	 * ```
	 *
	 * @public
	 */
	class ApiVariable extends ApiNameMixin(ApiReleaseTagMixin(ApiDeclaredItem)) {
	    constructor(options) {
	        super(options);
	        this.variableTypeExcerpt = this.buildExcerpt(options.variableTypeTokenRange);
	    }
	    /** @override */
	    static onDeserializeInto(options, context, jsonObject) {
	        super.onDeserializeInto(options, context, jsonObject);
	        options.variableTypeTokenRange = jsonObject.variableTypeTokenRange;
	    }
	    static getContainerKey(name) {
	        return `${name}|${"Variable" /* Variable */}`;
	    }
	    /** @override */
	    get kind() {
	        return "Variable" /* Variable */;
	    }
	    /** @override */
	    get containerKey() {
	        return ApiVariable.getContainerKey(this.name);
	    }
	    /** @override */
	    serializeInto(jsonObject) {
	        super.serializeInto(jsonObject);
	        jsonObject.variableTypeTokenRange = this.variableTypeExcerpt.tokenRange;
	    }
	    /** @beta @override */
	    buildCanonicalReference() {
	        const nameComponent = DeclarationReference_2.parseComponent(this.name);
	        return (this.parent ? this.parent.canonicalReference : DeclarationReference_2.empty())
	            .addNavigationStep("." /* Exports */, nameComponent)
	            .withMeaning("var" /* Variable */);
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	class Deserializer {
	    static deserialize(context, jsonObject) {
	        const options = {};
	        switch (jsonObject.kind) {
	            case "Class" /* Class */:
	                ApiClass.onDeserializeInto(options, context, jsonObject);
	                return new ApiClass(options);
	            case "CallSignature" /* CallSignature */:
	                ApiCallSignature.onDeserializeInto(options, context, jsonObject);
	                return new ApiCallSignature(options);
	            case "Constructor" /* Constructor */:
	                ApiConstructor.onDeserializeInto(options, context, jsonObject);
	                return new ApiConstructor(options);
	            case "ConstructSignature" /* ConstructSignature */:
	                ApiConstructSignature.onDeserializeInto(options, context, jsonObject);
	                return new ApiConstructSignature(options);
	            case "EntryPoint" /* EntryPoint */:
	                ApiEntryPoint.onDeserializeInto(options, context, jsonObject);
	                return new ApiEntryPoint(options);
	            case "Enum" /* Enum */:
	                ApiEnum.onDeserializeInto(options, context, jsonObject);
	                return new ApiEnum(options);
	            case "EnumMember" /* EnumMember */:
	                ApiEnumMember.onDeserializeInto(options, context, jsonObject);
	                return new ApiEnumMember(options);
	            case "Function" /* Function */:
	                ApiFunction.onDeserializeInto(options, context, jsonObject);
	                return new ApiFunction(options);
	            case "IndexSignature" /* IndexSignature */:
	                ApiIndexSignature.onDeserializeInto(options, context, jsonObject);
	                return new ApiIndexSignature(options);
	            case "Interface" /* Interface */:
	                ApiInterface.onDeserializeInto(options, context, jsonObject);
	                return new ApiInterface(options);
	            case "Method" /* Method */:
	                ApiMethod.onDeserializeInto(options, context, jsonObject);
	                return new ApiMethod(options);
	            case "MethodSignature" /* MethodSignature */:
	                ApiMethodSignature.onDeserializeInto(options, context, jsonObject);
	                return new ApiMethodSignature(options);
	            case "Model" /* Model */:
	                return new ApiModel();
	            case "Namespace" /* Namespace */:
	                ApiNamespace.onDeserializeInto(options, context, jsonObject);
	                return new ApiNamespace(options);
	            case "Package" /* Package */:
	                ApiPackage.onDeserializeInto(options, context, jsonObject);
	                return new ApiPackage(options);
	            case "Property" /* Property */:
	                ApiProperty.onDeserializeInto(options, context, jsonObject);
	                return new ApiProperty(options);
	            case "PropertySignature" /* PropertySignature */:
	                ApiPropertySignature.onDeserializeInto(options, context, jsonObject);
	                return new ApiPropertySignature(options);
	            case "TypeAlias" /* TypeAlias */:
	                ApiTypeAlias.onDeserializeInto(options, context, jsonObject);
	                return new ApiTypeAlias(options);
	            case "Variable" /* Variable */:
	                ApiVariable.onDeserializeInto(options, context, jsonObject);
	                return new ApiVariable(options);
	            default:
	                throw new Error(`Failed to deserialize unsupported API item type ${JSON.stringify(jsonObject.kind)}`);
	        }
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	// PRIVATE - Allows ApiItemContainerMixin to assign the parent.
	//
	const apiItem_onParentChanged = Symbol('ApiItem._onAddToContainer');
	/**
	 * The abstract base class for all members of an `ApiModel` object.
	 *
	 * @remarks
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 * @public
	 */
	class ApiItem {
	    constructor(options) {
	        // ("options" is not used here, but part of the inheritance pattern)
	    }
	    static deserialize(jsonObject, context) {
	        return Deserializer.deserialize(context, jsonObject);
	    }
	    /** @virtual */
	    static onDeserializeInto(options, context, jsonObject) {
	        // (implemented by subclasses)
	    }
	    /** @virtual */
	    serializeInto(jsonObject) {
	        jsonObject.kind = this.kind;
	        jsonObject.canonicalReference = this.canonicalReference.toString();
	    }
	    /**
	     * Identifies the subclass of the `ApiItem` base class.
	     * @virtual
	     */
	    get kind() {
	        throw new Error('ApiItem.kind was not implemented by the child class');
	    }
	    /**
	     * Warning: This API is used internally by API extractor but is not yet ready for general usage.
	     *
	     * @remarks
	     *
	     * Returns a `DeclarationReference` object using the experimental new declaration reference notation.
	     *
	     * @beta
	     */
	    get canonicalReference() {
	        if (!this._canonicalReference) {
	            try {
	                this._canonicalReference = this.buildCanonicalReference();
	            }
	            catch (e) {
	                const name = this.getScopedNameWithinPackage() || this.displayName;
	                throw new InternalError(`Error building canonical reference for ${name}:\n`
	                    + e.message);
	            }
	        }
	        return this._canonicalReference;
	    }
	    /**
	     * Returns a string key that can be used to efficiently retrieve an `ApiItem` from an `ApiItemContainerMixin`.
	     * The key is unique within the container.  Its format is undocumented and may change at any time.
	     *
	     * @remarks
	     * Use the `getContainerKey()` static member to construct the key.  Each subclass has a different implementation
	     * of this function, according to the aspects that are important for identifying it.
	     *
	     * @virtual
	     */
	    get containerKey() {
	        throw new InternalError('ApiItem.containerKey was not implemented by the child class');
	    }
	    /**
	     * Returns a name for this object that can be used in diagnostic messages, for example.
	     *
	     * @remarks
	     * For an object that inherits ApiNameMixin, this will return the declared name (e.g. the name of a TypeScript
	     * function).  Otherwise, it will return a string such as "(call signature)" or "(model)".
	     *
	     * @virtual
	     */
	    get displayName() {
	        switch (this.kind) {
	            case "CallSignature" /* CallSignature */: return '(call)';
	            case "Constructor" /* Constructor */: return '(constructor)';
	            case "ConstructSignature" /* ConstructSignature */: return '(new)';
	            case "IndexSignature" /* IndexSignature */: return '(indexer)';
	            case "Model" /* Model */: return '(model)';
	        }
	        return '(???)'; // All other types should inherit ApiNameMixin which will override this property
	    }
	    /**
	     * If this item was added to a ApiItemContainerMixin item, then this returns the container item.
	     * If this is an Parameter that was added to a method or function, then this returns the function item.
	     * Otherwise, it returns undefined.
	     * @virtual
	     */
	    get parent() {
	        return this._parent;
	    }
	    /**
	     * This property supports a visitor pattern for walking the tree.
	     * For items with ApiItemContainerMixin, it returns the contained items.
	     * Otherwise it returns an empty array.
	     * @virtual
	     */
	    get members() {
	        return [];
	    }
	    /**
	     * If this item has a name (i.e. extends `ApiNameMixin`), then return all items that have the same parent
	     * and the same name.  Otherwise, return all items that have the same parent and the same `ApiItemKind`.
	     *
	     * @remarks
	     * Examples: For a function, this would return all overloads for the function.  For a constructor, this would
	     * return all overloads for the constructor.  For a merged declaration (e.g. a `namespace` and `enum` with the
	     * same name), this would return both declarations.  If this item does not have a parent, or if it is the only
	     * item of its name/kind, then the result is an array containing only this item.
	     */
	    getMergedSiblings() {
	        const parent = this._parent;
	        if (parent && ApiItemContainerMixin.isBaseClassOf(parent)) {
	            return parent._getMergedSiblingsForMember(this);
	        }
	        return [];
	    }
	    /**
	     * Returns the chain of ancestors, starting from the root of the tree, and ending with the this item.
	     */
	    getHierarchy() {
	        const hierarchy = [];
	        for (let current = this; current !== undefined; current = current.parent) {
	            hierarchy.push(current);
	        }
	        hierarchy.reverse();
	        return hierarchy;
	    }
	    /**
	     * This returns a scoped name such as `"Namespace1.Namespace2.MyClass.myMember()"`.  It does not include the
	     * package name or entry point.
	     *
	     * @remarks
	     * If called on an ApiEntrypoint, ApiPackage, or ApiModel item, the result is an empty string.
	     */
	    getScopedNameWithinPackage() {
	        const reversedParts = [];
	        for (let current = this; current !== undefined; current = current.parent) {
	            if (current.kind === "Model" /* Model */
	                || current.kind === "Package" /* Package */
	                || current.kind === "EntryPoint" /* EntryPoint */) {
	                break;
	            }
	            if (reversedParts.length !== 0) {
	                reversedParts.push('.');
	            }
	            else {
	                switch (current.kind) {
	                    case "CallSignature" /* CallSignature */:
	                    case "ConstructSignature" /* ConstructSignature */:
	                    case "Constructor" /* Constructor */:
	                    case "IndexSignature" /* IndexSignature */:
	                        // These functional forms don't have a proper name, so we don't append the "()" suffix
	                        break;
	                    default:
	                        if (ApiParameterListMixin.isBaseClassOf(current)) {
	                            reversedParts.push('()');
	                        }
	                }
	            }
	            reversedParts.push(current.displayName);
	        }
	        return reversedParts.reverse().join('');
	    }
	    /**
	     * If this item is an ApiPackage or has an ApiPackage as one of its parents, then that object is returned.
	     * Otherwise undefined is returned.
	     */
	    getAssociatedPackage() {
	        for (let current = this; current !== undefined; current = current.parent) {
	            if (current.kind === "Package" /* Package */) {
	                return current;
	            }
	        }
	        return undefined;
	    }
	    /** @virtual */
	    getSortKey() {
	        return this.containerKey;
	    }
	    /**
	     * PRIVATE
	     *
	     * @privateRemarks
	     * Allows ApiItemContainerMixin to assign the parent when the item is added to a container.
	     *
	     * @internal
	     */
	    [apiItem_onParentChanged](parent) {
	        this._parent = parent;
	        this._canonicalReference = undefined;
	    }
	    /**
	     * Builds the cached object used by the `canonicalReference` property.
	     * @virtual
	     */
	    buildCanonicalReference() {
	        throw new InternalError('ApiItem.canonicalReference was not implemented by the child class');
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * An abstract base class for API declarations that can have an associated TSDoc comment.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * @public
	 */
	class ApiDocumentedItem extends ApiItem {
	    constructor(options) {
	        super(options);
	        this._tsdocComment = options.docComment;
	    }
	    /** @override */
	    static onDeserializeInto(options, context, jsonObject) {
	        super.onDeserializeInto(options, context, jsonObject);
	        const documentedJson = jsonObject;
	        if (documentedJson.docComment) {
	            const tsdocParser = new lib_19(AedocDefinitions.tsdocConfiguration);
	            // NOTE: For now, we ignore TSDoc errors found in a serialized .api.json file.
	            // Normally these errors would have already been reported by API Extractor during analysis.
	            // However, they could also arise if the JSON file was edited manually, or if the file was saved
	            // using a different release of the software that used an incompatible syntax.
	            const parserContext = tsdocParser.parseString(documentedJson.docComment);
	            options.docComment = parserContext.docComment;
	        }
	    }
	    get tsdocComment() {
	        return this._tsdocComment;
	    }
	    /** @override */
	    serializeInto(jsonObject) {
	        super.serializeInto(jsonObject);
	        if (this.tsdocComment !== undefined) {
	            jsonObject.docComment = this.tsdocComment.emitAsTsdoc();
	        }
	        else {
	            jsonObject.docComment = '';
	        }
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/** @public */
	class ExcerptToken {
	    constructor(kind, text, canonicalReference) {
	        this._kind = kind;
	        // Standardize the newlines across operating systems. Even though this may deviate from the actual
	        // input source file that was parsed, it's useful because the newline gets serialized inside
	        // a string literal in .api.json, which cannot be automatically normalized by Git.
	        this._text = Text.convertToLf(text);
	        this._canonicalReference = canonicalReference;
	    }
	    get kind() {
	        return this._kind;
	    }
	    get text() {
	        return this._text;
	    }
	    get canonicalReference() {
	        return this._canonicalReference;
	    }
	}
	/**
	 * This class is used by {@link ApiDeclaredItem} to represent a source code excerpt containing
	 * a TypeScript declaration.
	 *
	 * @remarks
	 *
	 * The main excerpt is parsed into an array of tokens, and the main excerpt's token range will span all of these
	 * tokens.  The declaration may also have have "captured" excerpts, which are other subranges of tokens.
	 * For example, if the main excerpt is a function declaration, it will also have a captured excerpt corresponding
	 * to the return type of the function.
	 *
	 * An excerpt may be empty (i.e. a token range containing zero tokens).  For example, if a function's return value
	 * is not explicitly declared, then the returnTypeExcerpt will be empty.  By contrast, a class constructor cannot
	 * have a return value, so ApiConstructor has no returnTypeExcerpt property at all.
	 *
	 * @public
	 */
	class Excerpt {
	    constructor(tokens, tokenRange) {
	        this.tokens = tokens;
	        this.tokenRange = tokenRange;
	        if (this.tokenRange.startIndex < 0 || this.tokenRange.endIndex > this.tokens.length
	            || this.tokenRange.startIndex > this.tokenRange.endIndex) {
	            throw new Error('Invalid token range');
	        }
	    }
	    get text() {
	        if (this._text === undefined) {
	            this._text = this.tokens.slice(this.tokenRange.startIndex, this.tokenRange.endIndex)
	                .map(x => x.text).join('');
	        }
	        return this._text;
	    }
	    get isEmpty() {
	        return this.tokenRange.startIndex === this.tokenRange.endIndex;
	    }
	}

	// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
	/**
	 * The base class for API items that have an associated source code excerpt containing a TypeScript declaration.
	 *
	 * @remarks
	 *
	 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
	 * API declarations.
	 *
	 * Most `ApiItem` subclasses have declarations and thus extend `ApiDeclaredItem`.  Counterexamples include
	 * `ApiModel` and `ApiPackage`, which do not have any corresponding TypeScript source code.
	 *
	 * @public
	 */
	// eslint-disable-next-line @typescript-eslint/interface-name-prefix
	class ApiDeclaredItem extends ApiDocumentedItem {
	    constructor(options) {
	        super(options);
	        this._excerptTokens = options.excerptTokens.map(token => {
	            const canonicalReference = token.canonicalReference === undefined ? undefined :
	                DeclarationReference_2.parse(token.canonicalReference);
	            return new ExcerptToken(token.kind, token.text, canonicalReference);
	        });
	        this._excerpt = new Excerpt(this.excerptTokens, { startIndex: 0, endIndex: this.excerptTokens.length });
	    }
	    /** @override */
	    static onDeserializeInto(options, context, jsonObject) {
	        super.onDeserializeInto(options, context, jsonObject);
	        options.excerptTokens = jsonObject.excerptTokens;
	    }
	    /**
	     * The source code excerpt where the API item is declared.
	     */
	    get excerpt() {
	        return this._excerpt;
	    }
	    /**
	     * The individual source code tokens that comprise the main excerpt.
	     */
	    get excerptTokens() {
	        return this._excerptTokens;
	    }
	    /**
	     * If the API item has certain important modifier tags such as `@sealed`, `@virtual`, or `@override`,
	     * this prepends them as a doc comment above the excerpt.
	     */
	    getExcerptWithModifiers() {
	        const excerpt = this.excerpt.text;
	        const modifierTags = [];
	        if (excerpt.length > 0) {
	            if (this instanceof ApiDocumentedItem) {
	                if (this.tsdocComment) {
	                    if (this.tsdocComment.modifierTagSet.isSealed()) {
	                        modifierTags.push('@sealed');
	                    }
	                    if (this.tsdocComment.modifierTagSet.isVirtual()) {
	                        modifierTags.push('@virtual');
	                    }
	                    if (this.tsdocComment.modifierTagSet.isOverride()) {
	                        modifierTags.push('@override');
	                    }
	                }
	                if (modifierTags.length > 0) {
	                    return '/** ' + modifierTags.join(' ') + ' */\n'
	                        + excerpt;
	                }
	            }
	        }
	        return excerpt;
	    }
	    /** @override */
	    serializeInto(jsonObject) {
	        super.serializeInto(jsonObject);
	        jsonObject.excerptTokens = this.excerptTokens.map(x => {
	            const excerptToken = { kind: x.kind, text: x.text };
	            if (x.canonicalReference !== undefined) {
	                excerptToken.canonicalReference = x.canonicalReference.toString();
	            }
	            return excerptToken;
	        });
	    }
	    /**
	     * Constructs a new {@link Excerpt} corresponding to the provided token range.
	     */
	    buildExcerpt(tokenRange) {
	        return new Excerpt(this.excerptTokens, tokenRange);
	    }
	}

	// Copied from https://github.com/microsoft/rushstack/blob/ed71171eb7d7212397041862412e4f6cc5df75dd/build-tests/api-documenter-test/etc/api-documenter-test.api.json
	var data = {
	    "metadata": {
	        "toolPackage": "@microsoft/api-extractor",
	        "toolVersion": "[test mode]",
	        "schemaVersion": 1003,
	        "oldestForwardsCompatibleVersion": 1001
	    },
	    "kind": "Package",
	    "canonicalReference": "api-documenter-test!",
	    "docComment": "/**\n * api-extractor-test-05\n *\n * This project tests various documentation generation scenarios and doc comment syntaxes.\n *\n * @packageDocumentation\n */\n",
	    "name": "api-documenter-test",
	    "members": [
	        {
	            "kind": "EntryPoint",
	            "canonicalReference": "api-documenter-test!",
	            "name": "",
	            "members": [
	                {
	                    "kind": "Variable",
	                    "canonicalReference": "api-documenter-test!constVariable:var",
	                    "docComment": "/**\n * An exported variable declaration.\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "constVariable: "
	                        },
	                        {
	                            "kind": "Content",
	                            "text": "number"
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "constVariable",
	                    "variableTypeTokenRange": {
	                        "startIndex": 1,
	                        "endIndex": 2
	                    }
	                },
	                {
	                    "kind": "Class",
	                    "canonicalReference": "api-documenter-test!DocBaseClass:class",
	                    "docComment": "/**\n * Example base class\n *\n * {@docCategory DocBaseClass}\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export declare class DocBaseClass "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "DocBaseClass",
	                    "members": [
	                        {
	                            "kind": "Constructor",
	                            "canonicalReference": "api-documenter-test!DocBaseClass:constructor(1)",
	                            "docComment": "/**\n * The simple constructor for `DocBaseClass`\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "constructor();"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "overloadIndex": 1,
	                            "parameters": []
	                        },
	                        {
	                            "kind": "Constructor",
	                            "canonicalReference": "api-documenter-test!DocBaseClass:constructor(2)",
	                            "docComment": "/**\n * The overloaded constructor for `DocBaseClass`\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "constructor(x: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "number"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ");"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "overloadIndex": 2,
	                            "parameters": [
	                                {
	                                    "parameterName": "x",
	                                    "parameterTypeTokenRange": {
	                                        "startIndex": 1,
	                                        "endIndex": 2
	                                    }
	                                }
	                            ]
	                        }
	                    ],
	                    "implementsTokenRanges": []
	                },
	                {
	                    "kind": "Class",
	                    "canonicalReference": "api-documenter-test!DocClass1:class",
	                    "docComment": "/**\n * This is an example class.\n *\n * @remarks\n *\n * {@link DocClass1.(exampleFunction:1) | Link to overload 1}\n *\n * {@link DocClass1.(exampleFunction:2) | Link to overload 2}\n *\n * {@docCategory DocClass1}\n *\n * The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `DocClass1` class.\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export declare class DocClass1 extends "
	                        },
	                        {
	                            "kind": "Reference",
	                            "text": "DocBaseClass",
	                            "canonicalReference": "api-documenter-test!DocBaseClass:class"
	                        },
	                        {
	                            "kind": "Content",
	                            "text": " "
	                        },
	                        {
	                            "kind": "Content",
	                            "text": "implements "
	                        },
	                        {
	                            "kind": "Reference",
	                            "text": "IDocInterface1",
	                            "canonicalReference": "api-documenter-test!IDocInterface1:interface"
	                        },
	                        {
	                            "kind": "Content",
	                            "text": ", "
	                        },
	                        {
	                            "kind": "Reference",
	                            "text": "IDocInterface2",
	                            "canonicalReference": "api-documenter-test!IDocInterface2:interface"
	                        },
	                        {
	                            "kind": "Content",
	                            "text": " "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "DocClass1",
	                    "members": [
	                        {
	                            "kind": "Method",
	                            "canonicalReference": "api-documenter-test!DocClass1#deprecatedExample:member(1)",
	                            "docComment": "/**\n * @deprecated\n *\n * Use `otherThing()` instead.\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "deprecatedExample(): "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "void"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "isStatic": false,
	                            "returnTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            },
	                            "releaseTag": "Public",
	                            "overloadIndex": 1,
	                            "parameters": [],
	                            "name": "deprecatedExample"
	                        },
	                        {
	                            "kind": "Method",
	                            "canonicalReference": "api-documenter-test!DocClass1#exampleFunction:member(1)",
	                            "docComment": "/**\n * This is an overloaded function.\n *\n * @param a - the first string\n *\n * @param b - the second string\n *\n * @throws\n *\n * `Error` The first throws line\n *\n * @throws\n *\n * The second throws line\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "exampleFunction(a: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "string"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ", b: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "string"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "): "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "string"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "isStatic": false,
	                            "returnTypeTokenRange": {
	                                "startIndex": 5,
	                                "endIndex": 6
	                            },
	                            "releaseTag": "Public",
	                            "overloadIndex": 1,
	                            "parameters": [
	                                {
	                                    "parameterName": "a",
	                                    "parameterTypeTokenRange": {
	                                        "startIndex": 1,
	                                        "endIndex": 2
	                                    }
	                                },
	                                {
	                                    "parameterName": "b",
	                                    "parameterTypeTokenRange": {
	                                        "startIndex": 3,
	                                        "endIndex": 4
	                                    }
	                                }
	                            ],
	                            "name": "exampleFunction"
	                        },
	                        {
	                            "kind": "Method",
	                            "canonicalReference": "api-documenter-test!DocClass1#exampleFunction:member(2)",
	                            "docComment": "/**\n * This is also an overloaded function.\n *\n * @param x - the number\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "exampleFunction(x: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "number"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "): "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "number"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "isStatic": false,
	                            "returnTypeTokenRange": {
	                                "startIndex": 3,
	                                "endIndex": 4
	                            },
	                            "releaseTag": "Public",
	                            "overloadIndex": 2,
	                            "parameters": [
	                                {
	                                    "parameterName": "x",
	                                    "parameterTypeTokenRange": {
	                                        "startIndex": 1,
	                                        "endIndex": 2
	                                    }
	                                }
	                            ],
	                            "name": "exampleFunction"
	                        },
	                        {
	                            "kind": "Method",
	                            "canonicalReference": "api-documenter-test!DocClass1#interestingEdgeCases:member(1)",
	                            "docComment": "/**\n * Example: \"\\{ \\\\\"maxItemsToShow\\\\\": 123 \\}\"\n *\n * The regular expression used to validate the constraints is /^[a-zA-Z0-9\\\\-_]+$/\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "interestingEdgeCases(): "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "void"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "isStatic": false,
	                            "returnTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            },
	                            "releaseTag": "Public",
	                            "overloadIndex": 1,
	                            "parameters": [],
	                            "name": "interestingEdgeCases"
	                        },
	                        {
	                            "kind": "Property",
	                            "canonicalReference": "api-documenter-test!DocClass1#malformedEvent:member",
	                            "docComment": "/**\n * This event should have been marked as readonly.\n *\n * @eventProperty\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "malformedEvent: "
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "SystemEvent",
	                                    "canonicalReference": "api-documenter-test!SystemEvent:class"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "malformedEvent",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            },
	                            "isStatic": false
	                        },
	                        {
	                            "kind": "Property",
	                            "canonicalReference": "api-documenter-test!DocClass1#modifiedEvent:member",
	                            "docComment": "/**\n * This event is fired whenever the object is modified.\n *\n * @eventProperty\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "readonly modifiedEvent: "
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "SystemEvent",
	                                    "canonicalReference": "api-documenter-test!SystemEvent:class"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "modifiedEvent",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            },
	                            "isStatic": false
	                        },
	                        {
	                            "kind": "Property",
	                            "canonicalReference": "api-documenter-test!DocClass1#readonlyProperty:member",
	                            "docComment": "",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "get readonlyProperty(): "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "string"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "readonlyProperty",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            },
	                            "isStatic": false
	                        },
	                        {
	                            "kind": "Property",
	                            "canonicalReference": "api-documenter-test!DocClass1#regularProperty:member",
	                            "docComment": "/**\n * This is a regular property that happens to use the SystemEvent type.\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "regularProperty: "
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "SystemEvent",
	                                    "canonicalReference": "api-documenter-test!SystemEvent:class"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "regularProperty",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            },
	                            "isStatic": false
	                        },
	                        {
	                            "kind": "Method",
	                            "canonicalReference": "api-documenter-test!DocClass1.sumWithExample:member(1)",
	                            "docComment": "/**\n * Returns the sum of two numbers.\n *\n * @remarks\n *\n * This illustrates usage of the `@example` block tag.\n *\n * @param x - the first number to add\n *\n * @param y - the second number to add\n *\n * @returns the sum of the two numbers\n *\n * @example\n *\n * Here's a simple example:\n * ```\n * // Prints \"2\":\n * console.log(DocClass1.sumWithExample(1,1));\n * ```\n *\n * @example\n *\n * Here's an example with negative numbers:\n * ```\n * // Prints \"0\":\n * console.log(DocClass1.sumWithExample(1,-1));\n * ```\n *\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "static sumWithExample(x: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "number"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ", y: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "number"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "): "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "number"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "isStatic": true,
	                            "returnTypeTokenRange": {
	                                "startIndex": 5,
	                                "endIndex": 6
	                            },
	                            "releaseTag": "Public",
	                            "overloadIndex": 1,
	                            "parameters": [
	                                {
	                                    "parameterName": "x",
	                                    "parameterTypeTokenRange": {
	                                        "startIndex": 1,
	                                        "endIndex": 2
	                                    }
	                                },
	                                {
	                                    "parameterName": "y",
	                                    "parameterTypeTokenRange": {
	                                        "startIndex": 3,
	                                        "endIndex": 4
	                                    }
	                                }
	                            ],
	                            "name": "sumWithExample"
	                        },
	                        {
	                            "kind": "Method",
	                            "canonicalReference": "api-documenter-test!DocClass1#tableExample:member(1)",
	                            "docComment": "/**\n * An example with tables:\n *\n * @remarks\n *\n * <table> <tr> <td>John</td> <td>Doe</td> </tr> </table>\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "tableExample(): "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "void"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "isStatic": false,
	                            "returnTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            },
	                            "releaseTag": "Public",
	                            "overloadIndex": 1,
	                            "parameters": [],
	                            "name": "tableExample"
	                        },
	                        {
	                            "kind": "Property",
	                            "canonicalReference": "api-documenter-test!DocClass1#writeableProperty:member",
	                            "docComment": "",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "get writeableProperty(): "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "string"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "\n\nset writeableProperty(value: string);"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "writeableProperty",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            },
	                            "isStatic": false
	                        }
	                    ],
	                    "extendsTokenRange": {
	                        "startIndex": 1,
	                        "endIndex": 3
	                    },
	                    "implementsTokenRanges": [
	                        {
	                            "startIndex": 4,
	                            "endIndex": 5
	                        },
	                        {
	                            "startIndex": 6,
	                            "endIndex": 8
	                        }
	                    ]
	                },
	                {
	                    "kind": "Class",
	                    "canonicalReference": "api-documenter-test!DocClassInterfaceMerge:class",
	                    "docComment": "/**\n * Class that merges with interface\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export declare class DocClassInterfaceMerge "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "DocClassInterfaceMerge",
	                    "members": [],
	                    "implementsTokenRanges": []
	                },
	                {
	                    "kind": "Interface",
	                    "canonicalReference": "api-documenter-test!DocClassInterfaceMerge:interface",
	                    "docComment": "/**\n * Interface that merges with class\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export interface DocClassInterfaceMerge "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "DocClassInterfaceMerge",
	                    "members": [],
	                    "extendsTokenRanges": []
	                },
	                {
	                    "kind": "Enum",
	                    "canonicalReference": "api-documenter-test!DocEnum:enum",
	                    "docComment": "/**\n * Docs for DocEnum\n *\n * {@docCategory SystemEvent}\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export declare enum DocEnum "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "DocEnum",
	                    "members": [
	                        {
	                            "kind": "EnumMember",
	                            "canonicalReference": "api-documenter-test!DocEnum.One:member",
	                            "docComment": "/**\n * These are some docs for One\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "One = "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "1"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "One",
	                            "initializerTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        },
	                        {
	                            "kind": "EnumMember",
	                            "canonicalReference": "api-documenter-test!DocEnum.Two:member",
	                            "docComment": "/**\n * These are some docs for Two\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "Two = "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "2"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "Two",
	                            "initializerTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        },
	                        {
	                            "kind": "EnumMember",
	                            "canonicalReference": "api-documenter-test!DocEnum.Zero:member",
	                            "docComment": "/**\n * These are some docs for Zero\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "Zero = "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "0"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "Zero",
	                            "initializerTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        }
	                    ]
	                },
	                {
	                    "kind": "Namespace",
	                    "canonicalReference": "api-documenter-test!EcmaSmbols:namespace",
	                    "docComment": "/**\n * A namespace containing an ECMAScript symbol\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export declare namespace EcmaSmbols "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "EcmaSmbols",
	                    "members": [
	                        {
	                            "kind": "Variable",
	                            "canonicalReference": "api-documenter-test!EcmaSmbols.example:var",
	                            "docComment": "/**\n * An ECMAScript symbol\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "example: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "unique symbol"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "example",
	                            "variableTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        }
	                    ]
	                },
	                {
	                    "kind": "TypeAlias",
	                    "canonicalReference": "api-documenter-test!ExampleTypeAlias:type",
	                    "docComment": "/**\n * A type alias\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export declare type ExampleTypeAlias = "
	                        },
	                        {
	                            "kind": "Reference",
	                            "text": "Promise",
	                            "canonicalReference": "!Promise:interface"
	                        },
	                        {
	                            "kind": "Content",
	                            "text": "<boolean>"
	                        },
	                        {
	                            "kind": "Content",
	                            "text": ";"
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "ExampleTypeAlias",
	                    "typeTokenRange": {
	                        "startIndex": 1,
	                        "endIndex": 3
	                    }
	                },
	                {
	                    "kind": "Class",
	                    "canonicalReference": "api-documenter-test!Generic:class",
	                    "docComment": "/**\n * Generic class.\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export declare class Generic<T> "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "typeParameters": [
	                        {
	                            "typeParameterName": "T",
	                            "constraintTokenRange": {
	                                "startIndex": 0,
	                                "endIndex": 0
	                            },
	                            "defaultTypeTokenRange": {
	                                "startIndex": 0,
	                                "endIndex": 0
	                            }
	                        }
	                    ],
	                    "name": "Generic",
	                    "members": [],
	                    "implementsTokenRanges": []
	                },
	                {
	                    "kind": "TypeAlias",
	                    "canonicalReference": "api-documenter-test!GenericTypeAlias:type",
	                    "docComment": "/**\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export declare type GenericTypeAlias<T> = "
	                        },
	                        {
	                            "kind": "Content",
	                            "text": "T[]"
	                        },
	                        {
	                            "kind": "Content",
	                            "text": ";"
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "GenericTypeAlias",
	                    "typeParameters": [
	                        {
	                            "typeParameterName": "T",
	                            "constraintTokenRange": {
	                                "startIndex": 0,
	                                "endIndex": 0
	                            },
	                            "defaultTypeTokenRange": {
	                                "startIndex": 0,
	                                "endIndex": 0
	                            }
	                        }
	                    ],
	                    "typeTokenRange": {
	                        "startIndex": 1,
	                        "endIndex": 2
	                    }
	                },
	                {
	                    "kind": "Function",
	                    "canonicalReference": "api-documenter-test!globalFunction:function(1)",
	                    "docComment": "/**\n * An exported function\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export declare function globalFunction(x: "
	                        },
	                        {
	                            "kind": "Content",
	                            "text": "number"
	                        },
	                        {
	                            "kind": "Content",
	                            "text": "): "
	                        },
	                        {
	                            "kind": "Content",
	                            "text": "number"
	                        },
	                        {
	                            "kind": "Content",
	                            "text": ";"
	                        }
	                    ],
	                    "returnTypeTokenRange": {
	                        "startIndex": 3,
	                        "endIndex": 4
	                    },
	                    "releaseTag": "Public",
	                    "overloadIndex": 1,
	                    "parameters": [
	                        {
	                            "parameterName": "x",
	                            "parameterTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        }
	                    ],
	                    "name": "globalFunction"
	                },
	                {
	                    "kind": "Interface",
	                    "canonicalReference": "api-documenter-test!IDocInterface1:interface",
	                    "docComment": "/**\n * {@docCategory DocBaseClass}\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export interface IDocInterface1 "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "IDocInterface1",
	                    "members": [
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface1#regularProperty:member",
	                            "docComment": "/**\n * Does something\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "regularProperty: "
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "SystemEvent",
	                                    "canonicalReference": "api-documenter-test!SystemEvent:class"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "regularProperty",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        }
	                    ],
	                    "extendsTokenRanges": []
	                },
	                {
	                    "kind": "Interface",
	                    "canonicalReference": "api-documenter-test!IDocInterface2:interface",
	                    "docComment": "/**\n * {@docCategory DocBaseClass}\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export interface IDocInterface2 extends "
	                        },
	                        {
	                            "kind": "Reference",
	                            "text": "IDocInterface1",
	                            "canonicalReference": "api-documenter-test!IDocInterface1:interface"
	                        },
	                        {
	                            "kind": "Content",
	                            "text": " "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "IDocInterface2",
	                    "members": [
	                        {
	                            "kind": "MethodSignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface2#deprecatedExample:member(1)",
	                            "docComment": "/**\n * @deprecated\n *\n * Use `otherThing()` instead.\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "deprecatedExample(): "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "void"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "returnTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            },
	                            "releaseTag": "Public",
	                            "overloadIndex": 1,
	                            "parameters": [],
	                            "name": "deprecatedExample"
	                        }
	                    ],
	                    "extendsTokenRanges": [
	                        {
	                            "startIndex": 1,
	                            "endIndex": 3
	                        }
	                    ]
	                },
	                {
	                    "kind": "Interface",
	                    "canonicalReference": "api-documenter-test!IDocInterface3:interface",
	                    "docComment": "/**\n * Some less common TypeScript declaration kinds.\n *\n * {@docCategory DocClass1}\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export interface IDocInterface3 "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "IDocInterface3",
	                    "members": [
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface3#\"[not.a.symbol]\":member",
	                            "docComment": "/**\n * An identifier that does needs quotes. It misleadingly looks like an ECMAScript symbol.\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "\"[not.a.symbol]\": "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "string"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "\"[not.a.symbol]\"",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        },
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface3#[EcmaSmbols.example]:member",
	                            "docComment": "/**\n * ECMAScript symbol\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "["
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "EcmaSmbols.example",
	                                    "canonicalReference": "api-documenter-test!EcmaSmbols.example"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "]: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "string"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "[EcmaSmbols.example]",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 3,
	                                "endIndex": 4
	                            }
	                        },
	                        {
	                            "kind": "CallSignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface3:call(1)",
	                            "docComment": "/**\n * Call signature\n *\n * @param x - the parameter\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "(x: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "number"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "): "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "number"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "returnTypeTokenRange": {
	                                "startIndex": 3,
	                                "endIndex": 4
	                            },
	                            "releaseTag": "Public",
	                            "overloadIndex": 1,
	                            "parameters": [
	                                {
	                                    "parameterName": "x",
	                                    "parameterTypeTokenRange": {
	                                        "startIndex": 1,
	                                        "endIndex": 2
	                                    }
	                                }
	                            ]
	                        },
	                        {
	                            "kind": "ConstructSignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface3:new(1)",
	                            "docComment": "/**\n * Construct signature\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "new (): "
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "IDocInterface1",
	                                    "canonicalReference": "api-documenter-test!IDocInterface1:interface"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "returnTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            },
	                            "releaseTag": "Public",
	                            "overloadIndex": 1,
	                            "parameters": []
	                        },
	                        {
	                            "kind": "IndexSignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface3:index(1)",
	                            "docComment": "/**\n * Indexer\n *\n * @param x - the parameter\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "[x: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "string"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "]: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "string"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "returnTypeTokenRange": {
	                                "startIndex": 3,
	                                "endIndex": 4
	                            },
	                            "releaseTag": "Public",
	                            "overloadIndex": 1,
	                            "parameters": [
	                                {
	                                    "parameterName": "x",
	                                    "parameterTypeTokenRange": {
	                                        "startIndex": 1,
	                                        "endIndex": 2
	                                    }
	                                }
	                            ]
	                        },
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface3#redundantQuotes:member",
	                            "docComment": "/**\n * A quoted identifier with redundant quotes.\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "\"redundantQuotes\": "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "string"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "redundantQuotes",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        }
	                    ],
	                    "extendsTokenRanges": []
	                },
	                {
	                    "kind": "Interface",
	                    "canonicalReference": "api-documenter-test!IDocInterface4:interface",
	                    "docComment": "/**\n * Type union in an interface.\n *\n * {@docCategory DocClass1}\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export interface IDocInterface4 "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "IDocInterface4",
	                    "members": [
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface4#Context:member",
	                            "docComment": "/**\n * Test newline rendering when code blocks are used in tables\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "Context: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "({ children }: {\n        children: string;\n    }) => boolean"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "Context",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        },
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface4#generic:member",
	                            "docComment": "/**\n * make sure html entities are escaped in tables.\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "generic: "
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "Generic",
	                                    "canonicalReference": "api-documenter-test!Generic:class"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "<number>"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "generic",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 3
	                            }
	                        },
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface4#numberOrFunction:member",
	                            "docComment": "/**\n * a union type with a function\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "numberOrFunction: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "number | (() => number)"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "numberOrFunction",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        },
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface4#stringOrNumber:member",
	                            "docComment": "/**\n * a union type\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "stringOrNumber: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "string | number"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "stringOrNumber",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        }
	                    ],
	                    "extendsTokenRanges": []
	                },
	                {
	                    "kind": "Interface",
	                    "canonicalReference": "api-documenter-test!IDocInterface5:interface",
	                    "docComment": "/**\n * Interface without inline tag to test custom TOC\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export interface IDocInterface5 "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "IDocInterface5",
	                    "members": [
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface5#regularProperty:member",
	                            "docComment": "/**\n * Property of type string that does something\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "regularProperty: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "string"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "regularProperty",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        }
	                    ],
	                    "extendsTokenRanges": []
	                },
	                {
	                    "kind": "Interface",
	                    "canonicalReference": "api-documenter-test!IDocInterface6:interface",
	                    "docComment": "/**\n * Interface without inline tag to test custom TOC with injection\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export interface IDocInterface6 "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "IDocInterface6",
	                    "members": [
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface6#arrayProperty:member",
	                            "docComment": "",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "arrayProperty: "
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "IDocInterface1",
	                                    "canonicalReference": "api-documenter-test!IDocInterface1:interface"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "[]"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "arrayProperty",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 3
	                            }
	                        },
	                        {
	                            "kind": "MethodSignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface6#genericReferenceMethod:member(1)",
	                            "docComment": "",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "genericReferenceMethod<T>(x: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "T"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "): "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "T"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "returnTypeTokenRange": {
	                                "startIndex": 3,
	                                "endIndex": 4
	                            },
	                            "releaseTag": "Public",
	                            "overloadIndex": 1,
	                            "parameters": [
	                                {
	                                    "parameterName": "x",
	                                    "parameterTypeTokenRange": {
	                                        "startIndex": 1,
	                                        "endIndex": 2
	                                    }
	                                }
	                            ],
	                            "typeParameters": [
	                                {
	                                    "typeParameterName": "T",
	                                    "constraintTokenRange": {
	                                        "startIndex": 0,
	                                        "endIndex": 0
	                                    },
	                                    "defaultTypeTokenRange": {
	                                        "startIndex": 0,
	                                        "endIndex": 0
	                                    }
	                                }
	                            ],
	                            "name": "genericReferenceMethod"
	                        },
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface6#intersectionProperty:member",
	                            "docComment": "",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "intersectionProperty: "
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "IDocInterface1",
	                                    "canonicalReference": "api-documenter-test!IDocInterface1:interface"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": " & "
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "IDocInterface2",
	                                    "canonicalReference": "api-documenter-test!IDocInterface2:interface"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "intersectionProperty",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 4
	                            }
	                        },
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface6#regularProperty:member",
	                            "docComment": "/**\n * Property of type number that does something\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "regularProperty: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "number"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "regularProperty",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        },
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface6#tupleProperty:member",
	                            "docComment": "",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "tupleProperty: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "["
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "IDocInterface1",
	                                    "canonicalReference": "api-documenter-test!IDocInterface1:interface"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ", "
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "IDocInterface2",
	                                    "canonicalReference": "api-documenter-test!IDocInterface2:interface"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "]"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "tupleProperty",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 6
	                            }
	                        },
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface6#typeReferenceProperty:member",
	                            "docComment": "",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "typeReferenceProperty: "
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "Generic",
	                                    "canonicalReference": "api-documenter-test!Generic:class"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "<"
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "IDocInterface1",
	                                    "canonicalReference": "api-documenter-test!IDocInterface1:interface"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ">"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "typeReferenceProperty",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 5
	                            }
	                        },
	                        {
	                            "kind": "PropertySignature",
	                            "canonicalReference": "api-documenter-test!IDocInterface6#unionProperty:member",
	                            "docComment": "",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "unionProperty: "
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "IDocInterface1",
	                                    "canonicalReference": "api-documenter-test!IDocInterface1:interface"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": " | "
	                                },
	                                {
	                                    "kind": "Reference",
	                                    "text": "IDocInterface2",
	                                    "canonicalReference": "api-documenter-test!IDocInterface2:interface"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "unionProperty",
	                            "propertyTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 4
	                            }
	                        }
	                    ],
	                    "extendsTokenRanges": []
	                },
	                {
	                    "kind": "Namespace",
	                    "canonicalReference": "api-documenter-test!OuterNamespace:namespace",
	                    "docComment": "/**\n * A top-level namespace\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export declare namespace OuterNamespace "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "OuterNamespace",
	                    "members": [
	                        {
	                            "kind": "Namespace",
	                            "canonicalReference": "api-documenter-test!OuterNamespace.InnerNamespace:namespace",
	                            "docComment": "/**\n * A nested namespace\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "namespace InnerNamespace "
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "InnerNamespace",
	                            "members": [
	                                {
	                                    "kind": "Function",
	                                    "canonicalReference": "api-documenter-test!OuterNamespace.InnerNamespace.nestedFunction:function(1)",
	                                    "docComment": "/**\n * A function inside a namespace\n */\n",
	                                    "excerptTokens": [
	                                        {
	                                            "kind": "Content",
	                                            "text": "function nestedFunction(x: "
	                                        },
	                                        {
	                                            "kind": "Content",
	                                            "text": "number"
	                                        },
	                                        {
	                                            "kind": "Content",
	                                            "text": "): "
	                                        },
	                                        {
	                                            "kind": "Content",
	                                            "text": "number"
	                                        },
	                                        {
	                                            "kind": "Content",
	                                            "text": ";"
	                                        }
	                                    ],
	                                    "returnTypeTokenRange": {
	                                        "startIndex": 3,
	                                        "endIndex": 4
	                                    },
	                                    "releaseTag": "Public",
	                                    "overloadIndex": 1,
	                                    "parameters": [
	                                        {
	                                            "parameterName": "x",
	                                            "parameterTypeTokenRange": {
	                                                "startIndex": 1,
	                                                "endIndex": 2
	                                            }
	                                        }
	                                    ],
	                                    "name": "nestedFunction"
	                                }
	                            ]
	                        },
	                        {
	                            "kind": "Variable",
	                            "canonicalReference": "api-documenter-test!OuterNamespace.nestedVariable:var",
	                            "docComment": "/**\n * A variable exported from within a namespace.\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "nestedVariable: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "boolean"
	                                }
	                            ],
	                            "releaseTag": "Public",
	                            "name": "nestedVariable",
	                            "variableTypeTokenRange": {
	                                "startIndex": 1,
	                                "endIndex": 2
	                            }
	                        }
	                    ]
	                },
	                {
	                    "kind": "Class",
	                    "canonicalReference": "api-documenter-test!SystemEvent:class",
	                    "docComment": "/**\n * A class used to exposed events.\n *\n * {@docCategory SystemEvent}\n *\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export declare class SystemEvent "
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "SystemEvent",
	                    "members": [
	                        {
	                            "kind": "Method",
	                            "canonicalReference": "api-documenter-test!SystemEvent#addHandler:member(1)",
	                            "docComment": "/**\n * Adds an handler for the event.\n */\n",
	                            "excerptTokens": [
	                                {
	                                    "kind": "Content",
	                                    "text": "addHandler(handler: "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "() => void"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "): "
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": "void"
	                                },
	                                {
	                                    "kind": "Content",
	                                    "text": ";"
	                                }
	                            ],
	                            "isStatic": false,
	                            "returnTypeTokenRange": {
	                                "startIndex": 3,
	                                "endIndex": 4
	                            },
	                            "releaseTag": "Public",
	                            "overloadIndex": 1,
	                            "parameters": [
	                                {
	                                    "parameterName": "handler",
	                                    "parameterTypeTokenRange": {
	                                        "startIndex": 1,
	                                        "endIndex": 2
	                                    }
	                                }
	                            ],
	                            "name": "addHandler"
	                        }
	                    ],
	                    "implementsTokenRanges": []
	                },
	                {
	                    "kind": "TypeAlias",
	                    "canonicalReference": "api-documenter-test!TypeAlias:type",
	                    "docComment": "/**\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export declare type TypeAlias = "
	                        },
	                        {
	                            "kind": "Content",
	                            "text": "number"
	                        },
	                        {
	                            "kind": "Content",
	                            "text": ";"
	                        }
	                    ],
	                    "releaseTag": "Public",
	                    "name": "TypeAlias",
	                    "typeTokenRange": {
	                        "startIndex": 1,
	                        "endIndex": 2
	                    }
	                },
	                {
	                    "kind": "Function",
	                    "canonicalReference": "api-documenter-test!yamlReferenceUniquenessTest:function(1)",
	                    "docComment": "/**\n * @public\n */\n",
	                    "excerptTokens": [
	                        {
	                            "kind": "Content",
	                            "text": "export declare function yamlReferenceUniquenessTest(): "
	                        },
	                        {
	                            "kind": "Reference",
	                            "text": "IDocInterface1",
	                            "canonicalReference": "api-documenter-test!IDocInterface1:interface"
	                        },
	                        {
	                            "kind": "Content",
	                            "text": ";"
	                        }
	                    ],
	                    "returnTypeTokenRange": {
	                        "startIndex": 1,
	                        "endIndex": 2
	                    },
	                    "releaseTag": "Public",
	                    "overloadIndex": 1,
	                    "parameters": [],
	                    "name": "yamlReferenceUniquenessTest"
	                }
	            ]
	        }
	    ]
	};

	var model = new ApiModel();
	var apiPackage = model.loadPackageFromJsonObject(data);
	console.log(model, apiPackage);
	debugger;
	// import * as tsdoc from "@microsoft/tsdoc";
	// console.log(tsdoc);

}());
