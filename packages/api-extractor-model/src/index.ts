// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

/**
 * Use this library to read and write *.api.json files as defined by the
 * {@link https://api-extractor.com/ | API Extractor}  tool.  These files are used to generate a documentation
 * website for your TypeScript package.  The files store the API signatures and doc comments that were extracted
 * from your package.
 *
 * @packageDocumentation
 */

export { AedocDefinitions } from './aedoc/AedocDefinitions';
export { ReleaseTag } from './aedoc/ReleaseTag';

// items
export {
  IApiDeclaredItemOptions,
  ApiDeclaredItem,
  IApiDocumentedItemOptions,
  ApiDocumentedItem,
  ApiItemKind,
  IApiItemOptions,
  ApiItem,
  IApiItemConstructor,
  IApiPropertyItemOptions,
  ApiPropertyItem
} from './__index';

// mixins
export {
  IApiParameterListMixinOptions,
  IApiParameterOptions,
  ApiParameterListMixin,
  IApiTypeParameterOptions,
  IApiTypeParameterListMixinOptions,
  ApiTypeParameterListMixin,
  IApiItemContainerMixinOptions,
  ApiItemContainerMixin,
  IApiReleaseTagMixinOptions,
  ApiReleaseTagMixin,
  IApiReturnTypeMixinOptions,
  ApiReturnTypeMixin,
  IApiStaticMixinOptions,
  ApiStaticMixin,
  IApiNameMixinOptions,
  ApiNameMixin,
  ExcerptTokenKind,
  IExcerptTokenRange,
  IExcerptToken,
  ExcerptToken,
  Excerpt,
  Constructor,
  PropertiesOf
} from './__index';

// model
export {
  IApiCallSignatureOptions,
  ApiCallSignature
} from './model/ApiCallSignature';
export {
  IApiClassOptions,
  ApiClass
} from './model/ApiClass';
export {
  IApiConstructorOptions,
  ApiConstructor
} from './model/ApiConstructor';
export {
  IApiConstructSignatureOptions,
  ApiConstructSignature
} from './model/ApiConstructSignature';
export {
  IApiEntryPointOptions,
  ApiEntryPoint
} from './model/ApiEntryPoint';
export {
  IApiEnumOptions,
  ApiEnum
} from './model/ApiEnum';
export {
  IApiEnumMemberOptions,
  ApiEnumMember
} from './model/ApiEnumMember';
export {
  IApiFunctionOptions,
  ApiFunction
} from './model/ApiFunction';
export {
  IApiIndexSignatureOptions,
  ApiIndexSignature
} from './model/ApiIndexSignature';
export {
  IApiInterfaceOptions,
  ApiInterface
} from './model/ApiInterface';
export {
  IApiMethodOptions,
  ApiMethod
} from './model/ApiMethod';
export {
  IApiMethodSignatureOptions,
  ApiMethodSignature
} from './model/ApiMethodSignature';
export {
  ApiModel
} from './model/ApiModel';
export {
  IApiNamespaceOptions,
  ApiNamespace
} from './model/ApiNamespace';
export {
  IApiPackageOptions,
  ApiPackage,
  IApiPackageSaveOptions
} from './model/ApiPackage';
export {
  IParameterOptions,
  Parameter
} from './model/Parameter';
export {
  IApiPropertyOptions,
  ApiProperty
} from './model/ApiProperty';
export {
  IApiPropertySignatureOptions,
  ApiPropertySignature
} from './model/ApiPropertySignature';
export {
  IApiTypeAliasOptions,
  ApiTypeAlias
} from './model/ApiTypeAlias';
export {
  ITypeParameterOptions,
  TypeParameter
} from './model/TypeParameter';
export {
  IApiVariableOptions,
  ApiVariable
} from './model/ApiVariable';
export {
  IResolveDeclarationReferenceResult
} from './model/ModelReferenceResolver';
export {
  HeritageType
} from './model/HeritageType';
