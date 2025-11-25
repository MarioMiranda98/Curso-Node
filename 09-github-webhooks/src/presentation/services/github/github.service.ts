import type { GitHubIssuePayload } from "../../../interfaces/github-issue.interface.js";
import type { GitHubStarPayload } from "../../../interfaces/github-star.interface.js";

export class GithubService {
  constructor() { }

  onStart(payload: GitHubStarPayload): string {
    let message: string = "";
    const { action, starred_at, sender, repository } = payload;

    if (starred_at) {
      message = `User ${sender.login} ${action} starred on ${repository.full_name}`;
    }

    return message;
  }

  onIssue(payload: GitHubIssuePayload): string {
    let message: string = "";

    const { issue, action } = payload;

    if (action == 'opened') {
      message = `An issue was opened with this title ${issue.title}`;
    }

    if (action == 'closed') {
      message = `An issue was closed by ${issue.user.login}`;
    }

    if (action == 'reopened') {
      message = `An issue was reopened by ${issue.user.login}`;
    }

    return message;
  }
}