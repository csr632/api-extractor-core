// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { DeclarationReference, Meaning, Navigation, Component } from '@microsoft/tsdoc/lib/beta/DeclarationReference';
import { ApiItemKind } from '../__index';
import { ApiStaticMixin, IApiStaticMixinOptions } from '../__index';
import { IApiDeclaredItemOptions, ApiDeclaredItem } from '../__index';
import { IApiParameterListMixinOptions, ApiParameterListMixin } from '../__index';
import { IApiReleaseTagMixinOptions, ApiReleaseTagMixin } from '../__index';
import { ApiReturnTypeMixin, IApiReturnTypeMixinOptions } from '../__index';
import { IApiNameMixinOptions, ApiNameMixin } from '../__index';
import { ApiTypeParameterListMixin, IApiTypeParameterListMixinOptions } from '../__index';

/**
 * Constructor options for {@link ApiMethod}.
 * @public
 */
export interface IApiMethodOptions extends
  IApiNameMixinOptions,
  IApiTypeParameterListMixinOptions,
  IApiParameterListMixinOptions,
  IApiReleaseTagMixinOptions,
  IApiReturnTypeMixinOptions,
  IApiStaticMixinOptions,
  IApiDeclaredItemOptions {
}

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
export class ApiMethod extends ApiNameMixin(ApiTypeParameterListMixin(ApiParameterListMixin(
  ApiReleaseTagMixin(ApiReturnTypeMixin(ApiStaticMixin(ApiDeclaredItem)))))) {

  public constructor(options: IApiMethodOptions) {
    super(options);
  }

  public static getContainerKey(name: string, isStatic: boolean, overloadIndex: number): string {
    if (isStatic) {
      return `${name}|${ApiItemKind.Method}|static|${overloadIndex}`;
    } else {
      return `${name}|${ApiItemKind.Method}|instance|${overloadIndex}`;
    }
  }

  /** @override */
  public get kind(): ApiItemKind {
    return ApiItemKind.Method;
  }

  /** @override */
  public get containerKey(): string {
    return ApiMethod.getContainerKey(this.name, this.isStatic, this.overloadIndex);
  }

  /** @beta @override */
  public buildCanonicalReference(): DeclarationReference {
    const nameComponent: Component = DeclarationReference.parseComponent(this.name);
    return (this.parent ? this.parent.canonicalReference : DeclarationReference.empty())
      .addNavigationStep(this.isStatic ? Navigation.Exports : Navigation.Members, nameComponent)
      .withMeaning(Meaning.Member)
      .withOverloadIndex(this.overloadIndex);
  }
}
