/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
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
  tags?: Maybe<Array<ContactTags>>;
};

export type ContactLink = {
  __typename?: "ContactLink";
  handle?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  type: LinkType;
  url: Scalars["String"]["output"];
};

export type ContactTags = Tag & {
  __typename?: "ContactTags";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
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

export type Mutation = {
  __typename?: "Mutation";
  addMeetup: Meetup;
};

export type MutationAddMeetupArgs = {
  name: Scalars["String"]["input"];
  scheduledAt: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
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

export type AllOwnedTagsQueryVariables = Exact<{
  userId: Scalars["ID"]["input"];
}>;

export type AllOwnedTagsQuery = {
  __typename?: "Query";
  allOwnedTags: Array<{
    __typename?: "TagPage";
    id: string;
    name: string;
    count: number;
  }>;
};

export type AllContactsQueryVariables = Exact<{
  userId: Scalars["ID"]["input"];
}>;

export type AllContactsQuery = {
  __typename?: "Query";
  allContacts?: Array<{
    __typename?: "ContactDto";
    id: string;
    name: string;
    company?: string | null;
    role?: string | null;
    links?: Array<{
      __typename?: "ContactLink";
      id: string;
      type: LinkType;
      url: string;
      handle?: string | null;
    }> | null;
    tags?: Array<{ __typename?: "ContactTags"; name: string }> | null;
    meetup: {
      __typename?: "Meetup";
      id: string;
      name: string;
      scheduledAt: string;
    };
  }> | null;
};

export type AddMeetupMutationVariables = Exact<{
  userId: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
  scheduledAt: Scalars["String"]["input"];
}>;

export type AddMeetupMutation = {
  __typename?: "Mutation";
  addMeetup: { __typename?: "Meetup"; id: string };
};

export const AllOwnedTagsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllOwnedTags" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allOwnedTags" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "count" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllOwnedTagsQuery, AllOwnedTagsQueryVariables>;
export const AllContactsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllContacts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allContacts" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "company" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "links" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "handle" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tags" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "meetup" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "scheduledAt" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllContactsQuery, AllContactsQueryVariables>;
export const AddMeetupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddMeetup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "scheduledAt" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addMeetup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "scheduledAt" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "scheduledAt" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddMeetupMutation, AddMeetupMutationVariables>;
