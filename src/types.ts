type StarGazersType = { totalCount: number };

type OwnerType = {
    login: string;
};

export type Author = OwnerType & {
    avatarUrl: string;
    url: string;
    login: string;
}

export type PageInfoType = {
    hasNextPage: boolean;
    endCursor: string;
}

export type RepoType = {
    id: string;
    name: string;
    description: string;
    stargazers: StarGazersType;
    owner: OwnerType;
    url: string;
};

export type IssueType = {
    id: string;
    title: string;
    bodyText: string;
    createdAt: string;
    url: string;
    author: Author;
};
