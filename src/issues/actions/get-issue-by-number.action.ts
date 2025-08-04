import { githubApi_AxiosInstance } from '../../api';
import { sleep } from '../../helpers';
import type { IssueRepoReactInterface } from '../interfaces';

interface getIssueByNumberActionProps {
  issueNumber: number;
}

export const getIssueByNumberAction = async ({
  issueNumber,
}: getIssueByNumberActionProps): Promise<IssueRepoReactInterface> => {
  await sleep(1500);

  const { data } = await githubApi_AxiosInstance.get<IssueRepoReactInterface>(
    `/issues/${issueNumber}`,
  );

  // console.log(data);

  return data;
};
