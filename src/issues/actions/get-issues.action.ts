import { githubApi_AxiosInstance } from '../../api';
import { sleep } from '../../helpers';
import type { IssueRepoReactInterface } from '../interfaces';
import type { IssueState } from '../interfaces/issue-repo-react.interface';

interface GetIssuesActionProps {
  issueState: IssueState;
}

export const getIssuesAction = async ({
  issueState,
}: GetIssuesActionProps): Promise<IssueRepoReactInterface[]> => {
  await sleep(1500);

  const params = new URLSearchParams();

  if (issueState !== 'all') {
    params.append('state', issueState);
  }

  const { data } = await githubApi_AxiosInstance.get<IssueRepoReactInterface[]>(
    '/issues',
    {
      params,
    },
  );

  // console.log(data);

  return data;
};
