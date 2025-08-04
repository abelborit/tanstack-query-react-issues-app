import type { LabelRepoReactInterface } from './label-repo-react.interface';

export interface IssueRepoReactInterface {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: LabelRepoReactInterface[];
  state: string;
  locked: boolean;
  assignee: null;
  assignees: unknown[];
  milestone: null;
  comments: number;
  created_at: Date;
  updated_at: Date;
  closed_at: null;
  author_association: string;
  type: null;
  active_lock_reason: null;
  draft?: boolean;
  pull_request?: PullRequest;
  body: string;
  closed_by: null;
  reactions: string;
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null;
  sub_issues_summary?: SubIssuesSummary;
}

export interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  merged_at: null;
}

export interface SubIssuesSummary {
  total: number;
  completed: number;
  percent_completed: number;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}
