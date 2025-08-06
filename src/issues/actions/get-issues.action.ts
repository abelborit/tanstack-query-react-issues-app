import { githubApi_AxiosInstance } from '../../api';
import { sleep } from '../../helpers';
import type { IssueRepoReactInterface } from '../interfaces';
import type { IssueState } from '../interfaces/issue-repo-react.interface';

interface GetIssuesActionProps {
  issueState: IssueState;
  selectedLabels: string[];
  page: number;
}

export const getIssuesAction = async ({
  issueState,
  selectedLabels,
  page,
}: GetIssuesActionProps): Promise<IssueRepoReactInterface[]> => {
  await sleep(1500);

  const params = new URLSearchParams();

  if (issueState !== 'all') {
    params.append('state', issueState);
  }

  if (selectedLabels.length > 0) {
    params.append('labels', selectedLabels.join(','));
  }

  params.append('page', page.toString());
  params.append('per_page', '5');

  const { data } = await githubApi_AxiosInstance.get<IssueRepoReactInterface[]>(
    '/issues',
    {
      params,
    },
  );

  // console.log(data);

  return data;
};
