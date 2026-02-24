import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type ContactDto = {
  __typename?: "ContactDto";
  company?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  links?: Maybe<Array<ContactLink>>;
  meetup: Meetup;
  name: Scalars["String"]["output"];
  role?: Maybe<Scalars["String"]["output"]>;
  tags?: Maybe<Array<Tag>>;
};

export type ContactLink = {
  __typename?: "ContactLink";
  handle?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  type: LinkType;
  url: Scalars["String"]["output"];
};

export enum LinkType {
  Github = "GITHUB",
  Other = "OTHER",
  Product = "PRODUCT",
  Twitter = "TWITTER",
  Website = "WEBSITE",
}

export type Meetup = {
  __typename?: "Meetup";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  scheduledAt: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  allContacts?: Maybe<Array<ContactDto>>;
  allOwnedTags: Array<TagPage>;
};

export type QueryAllContactsArgs = {
  userId: Scalars["ID"]["input"];
};

export type QueryAllOwnedTagsArgs = {
  userId: Scalars["ID"]["input"];
};

export type Tag = {
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type TagPage = Tag & {
  __typename?: "TagPage";
  count: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<
  TResult,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<
  TTypes,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<
  T = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = Record<PropertyKey, never>,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
  {
    Tag: TagPage;
  };

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  ContactDto: ResolverTypeWrapper<
    Omit<ContactDto, "tags"> & { tags?: Maybe<Array<ResolversTypes["Tag"]>> }
  >;
  ContactLink: ResolverTypeWrapper<ContactLink>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  LinkType: LinkType;
  Meetup: ResolverTypeWrapper<Meetup>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Tag: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Tag"]>;
  TagPage: ResolverTypeWrapper<TagPage>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"]["output"];
  ContactDto: Omit<ContactDto, "tags"> & {
    tags?: Maybe<Array<ResolversParentTypes["Tag"]>>;
  };
  ContactLink: ContactLink;
  ID: Scalars["ID"]["output"];
  Int: Scalars["Int"]["output"];
  Meetup: Meetup;
  Query: Record<PropertyKey, never>;
  String: Scalars["String"]["output"];
  Tag: ResolversInterfaceTypes<ResolversParentTypes>["Tag"];
  TagPage: TagPage;
};

export type ContactDtoResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ContactDto"] = ResolversParentTypes["ContactDto"],
> = {
  company?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  links?: Resolver<
    Maybe<Array<ResolversTypes["ContactLink"]>>,
    ParentType,
    ContextType
  >;
  meetup?: Resolver<ResolversTypes["Meetup"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes["Tag"]>>, ParentType, ContextType>;
};

export type ContactLinkResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ContactLink"] = ResolversParentTypes["ContactLink"],
> = {
  handle?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["LinkType"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type MeetupResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Meetup"] = ResolversParentTypes["Meetup"],
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  scheduledAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  allContacts?: Resolver<
    Maybe<Array<ResolversTypes["ContactDto"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryAllContactsArgs, "userId">
  >;
  allOwnedTags?: Resolver<
    Array<ResolversTypes["TagPage"]>,
    ParentType,
    ContextType,
    RequireFields<QueryAllOwnedTagsArgs, "userId">
  >;
};

export type TagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Tag"] = ResolversParentTypes["Tag"],
> = {
  __resolveType: TypeResolveFn<"TagPage", ParentType, ContextType>;
};

export type TagPageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["TagPage"] = ResolversParentTypes["TagPage"],
> = {
  count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ContactDto?: ContactDtoResolvers<ContextType>;
  ContactLink?: ContactLinkResolvers<ContextType>;
  Meetup?: MeetupResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagPage?: TagPageResolvers<ContextType>;
};
