// In order to avoid "accessing uninitialized variable"
// which caused by circular module dependency,
// we use this internal index file to control module eval order.
// https://github.com/microsoft/rushstack/issues/1010#issuecomment-619697266

// If any internal module dependends on modules in ./items or ./mixins, it should import things from this file. Don't import from ./items/xxx.ts directly.

// items
export {
  ApiItemKind,
  IApiItemOptions,
  ApiItem,
  IApiItemConstructor,
  IApiItemJson,
  apiItem_onParentChanged,
} from "./items/ApiItem";
export {
  IApiDocumentedItemOptions,
  ApiDocumentedItem,
  IApiDocumentedItemJson,
} from "./items/ApiDocumentedItem";
export {
  IApiDeclaredItemOptions,
  ApiDeclaredItem,
  IApiDeclaredItemJson,
} from "./items/ApiDeclaredItem";
export {
  IApiPropertyItemOptions,
  ApiPropertyItem,
  IApiPropertyItemJson,
} from "./items/ApiPropertyItem";

// mixins
export {
  IApiParameterListMixinOptions,
  IApiParameterOptions,
  ApiParameterListMixin,
  IApiParameterListJson,
} from "./mixins/ApiParameterListMixin";
export {
  IApiTypeParameterOptions,
  IApiTypeParameterListMixinOptions,
  ApiTypeParameterListMixin,
  IApiTypeParameterListMixinJson,
} from "./mixins/ApiTypeParameterListMixin";
export {
  IApiItemContainerMixinOptions,
  ApiItemContainerMixin,
  IApiItemContainerJson,
} from "./mixins/ApiItemContainerMixin";
export {
  IApiReleaseTagMixinOptions,
  ApiReleaseTagMixin,
  IApiReleaseTagMixinJson,
} from "./mixins/ApiReleaseTagMixin";
export {
  IApiReturnTypeMixinOptions,
  ApiReturnTypeMixin,
  IApiReturnTypeMixinJson,
} from "./mixins/ApiReturnTypeMixin";
export {
  IApiStaticMixinOptions,
  ApiStaticMixin,
  IApiStaticMixinJson,
} from "./mixins/ApiStaticMixin";
export {
  IApiNameMixinOptions,
  ApiNameMixin,
  IApiNameMixinJson,
} from "./mixins/ApiNameMixin";
export {
  ExcerptTokenKind,
  IExcerptTokenRange,
  IExcerptToken,
  ExcerptToken,
  Excerpt,
} from "./mixins/Excerpt";
export { Constructor, PropertiesOf } from "./mixins/Mixin";

// models
export { Deserializer } from "./model/Deserializer";
