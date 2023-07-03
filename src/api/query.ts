export const getRepos = (queryString: string, cursor: string) => {
  let search = `{search(query: "${queryString} stars:>10000", type: REPOSITORY, first:5,after:"${cursor}") {
       repositoryCount
       pageInfo {
         endCursor
         startCursor
         hasNextPage
       }
       edges {
         node {
           ... on Repository {
             name
             id
             description
             viewerHasStarred
             viewerSubscription	
             watchers{
               totalCount
             }
             stargazers{
               totalCount
             }
             owner {
              login
              avatarUrl
             }
             url
           }
         }
       }
     }
 }`;

  if (!cursor)
    search = search.replace(`,after:"${cursor}"`, "");

  if (!queryString)
    search = search.replace(`query: "${queryString}`, `query: "`);

  return search;
}

export const getRepo = (owner: string, name: string, cursor: string) => {
  let search = `query { 
    repository(owner: "${owner}", name: "${name}") {
      issues(first: 5, orderBy: { field: CREATED_AT, direction: DESC}, after:"${cursor}") {
        nodes {
          id
          title
          bodyText
          url
          createdAt
          author {
            avatarUrl
            url
            login
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          startCursor
        } 
      }
    }
  }`

  if (!cursor)
    search = search.replace(`, after:"${cursor}"`, "");

  return search;
}