// Copied from https://github.com/microsoft/rushstack/blob/ed71171eb7d7212397041862412e4f6cc5df75dd/build-tests/api-documenter-test/etc/api-documenter-test.api.json
export default {
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
}
