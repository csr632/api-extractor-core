// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { DeclarationReference, Meaning, Navigation, Component } from '@microsoft/tsdoc/lib/beta/DeclarationReference';
import { ApiItemKind } from '../__index';
import { ApiDeclaredItem, IApiDeclaredItemOptions } from '../__index';
import { ApiParameterListMixin, IApiParameterListMixinOptions } from '../__index';
import { ApiReleaseTagMixin, IApiReleaseTagMixinOptions } from '../__index';
import { IApiReturnTypeMixinOptions, ApiReturnTypeMixin } from '../__index';
import { IApiNameMixinOptions, ApiNameMixin } from '../__index';
import { IApiTypeParameterListMixinOptions, ApiTypeParameterListMixin } from '../__index';

/** @public */
export interface IApiMethodSignatureOptions extends
  IApiNameMixinOptions,
  IApiTypeParameterListMixinOptions,
  IApiParameterListMixinOptions,
  IApiReleaseTagMixinOptions,
  IApiReturnTypeMixinOptions,
  IApiDeclaredItemOptions {
}

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
export class ApiMethodSignature extends ApiNameMixin(ApiTypeParameterListMixin(ApiParameterListMixin(
  ApiReleaseTagMixin(ApiReturnTypeMixin(ApiDeclaredItem))))) {

  public constructor(options: IApiMethodSignatureOptions) {
    super(options);
  }

  public static getContainerKey(name: string, overloadIndex: number): string {
    return `${name}|${ApiItemKind.MethodSignature}|${overloadIndex}`;
  }

  /** @override */
  public get kind(): ApiItemKind {
    return ApiItemKind.MethodSignature;
  }

  /** @override */
  public get containerKey(): string {
    return ApiMethodSignature.getContainerKey(this.name, this.overloadIndex);
  }

  /** @beta @override */
  public buildCanonicalReference(): DeclarationReference {
    const nameComponent: Component = DeclarationReference.parseComponent(this.name);
    return (this.parent ? this.parent.canonicalReference : DeclarationReference.empty())
      .addNavigationStep(Navigation.Members, nameComponent)
      .withMeaning(Meaning.Member)
      .withOverloadIndex(this.overloadIndex);
  }
}
