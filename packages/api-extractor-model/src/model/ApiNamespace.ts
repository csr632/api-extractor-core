// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { DeclarationReference, Meaning, Navigation, Component } from '@microsoft/tsdoc/lib/beta/DeclarationReference';
import { ApiItemKind } from '../__index';
import { ApiItemContainerMixin, IApiItemContainerMixinOptions } from '../__index';
import { IApiDeclaredItemOptions, ApiDeclaredItem } from '../__index';
import { ApiReleaseTagMixin, IApiReleaseTagMixinOptions } from '../__index';
import { IApiNameMixinOptions, ApiNameMixin } from '../__index';

/**
 * Constructor options for {@link ApiClass}.
 * @public
 */
export interface IApiNamespaceOptions extends
  IApiItemContainerMixinOptions,
  IApiNameMixinOptions,
  IApiReleaseTagMixinOptions,
  IApiDeclaredItemOptions {
}

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
export class ApiNamespace extends ApiItemContainerMixin(ApiNameMixin(ApiReleaseTagMixin(ApiDeclaredItem))) {

  public constructor(options: IApiNamespaceOptions) {
    super(options);
  }

  public static getContainerKey(name: string): string {
    return `${name}|${ApiItemKind.Namespace}`;
  }

  /** @override */
  public get kind(): ApiItemKind {
    return ApiItemKind.Namespace;
  }

  /** @override */
  public get containerKey(): string {
    return ApiNamespace.getContainerKey(this.name);
  }

  /** @beta @override */
  public buildCanonicalReference(): DeclarationReference {
    const nameComponent: Component = DeclarationReference.parseComponent(this.name);
    return (this.parent ? this.parent.canonicalReference : DeclarationReference.empty())
      .addNavigationStep(Navigation.Exports, nameComponent)
      .withMeaning(Meaning.Namespace);
  }
}
