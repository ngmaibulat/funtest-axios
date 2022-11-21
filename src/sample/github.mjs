const user = {
    login: "octocat",
    id: 583231,
    node_id: "MDQ6VXNlcjU4MzIzMQ==",
    avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/octocat",
    html_url: "https://github.com/octocat",
    followers_url: "https://api.github.com/users/octocat/followers",
    following_url:
        "https://api.github.com/users/octocat/following{/other_user}",
    gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
    starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
    organizations_url: "https://api.github.com/users/octocat/orgs",
    repos_url: "https://api.github.com/users/octocat/repos",
    events_url: "https://api.github.com/users/octocat/events{/privacy}",
    received_events_url: "https://api.github.com/users/octocat/received_events",
    type: "User",
    site_admin: false,
    name: "The Octocat",
    company: "@github",
    blog: "https://github.blog",
    location: "San Francisco",
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 8,
    public_gists: 8,
    followers: 7569,
    following: 9,
    created_at: "2011-01-25T18:44:36Z",
    updated_at: "2022-10-24T11:21:44Z",
};

const urls = {
    current_user_url: "https://api.github.com/user",
    current_user_authorizations_html_url:
        "https://github.com/settings/connections/applications{/client_id}",
    authorizations_url: "https://api.github.com/authorizations",
    code_search_url:
        "https://api.github.com/search/code?q={query}{&page,per_page,sort,order}",
    commit_search_url:
        "https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}",
    emails_url: "https://api.github.com/user/emails",
    emojis_url: "https://api.github.com/emojis",
    events_url: "https://api.github.com/events",
    feeds_url: "https://api.github.com/feeds",
    followers_url: "https://api.github.com/user/followers",
    following_url: "https://api.github.com/user/following{/target}",
    gists_url: "https://api.github.com/gists{/gist_id}",
    hub_url: "https://api.github.com/hub",
    issue_search_url:
        "https://api.github.com/search/issues?q={query}{&page,per_page,sort,order}",
    issues_url: "https://api.github.com/issues",
    keys_url: "https://api.github.com/user/keys",
    label_search_url:
        "https://api.github.com/search/labels?q={query}&repository_id={repository_id}{&page,per_page}",
    notifications_url: "https://api.github.com/notifications",
    organization_url: "https://api.github.com/orgs/{org}",
    organization_repositories_url:
        "https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}",
    organization_teams_url: "https://api.github.com/orgs/{org}/teams",
    public_gists_url: "https://api.github.com/gists/public",
    rate_limit_url: "https://api.github.com/rate_limit",
    repository_url: "https://api.github.com/repos/{owner}/{repo}",
    repository_search_url:
        "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}",
    current_user_repositories_url:
        "https://api.github.com/user/repos{?type,page,per_page,sort}",
    starred_url: "https://api.github.com/user/starred{/owner}{/repo}",
    starred_gists_url: "https://api.github.com/gists/starred",
    topic_search_url:
        "https://api.github.com/search/topics?q={query}{&page,per_page}",
    user_url: "https://api.github.com/users/{user}",
    user_organizations_url: "https://api.github.com/user/orgs",
    user_repositories_url:
        "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
    user_search_url:
        "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}",
};

export { user };
