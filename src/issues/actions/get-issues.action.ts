import { githubApi_AxiosInstance } from '../../api';
import { sleep } from '../../helpers';
import type { IssueRepoReactInterface } from '../interfaces';

export const getIssuesAction = async (): Promise<IssueRepoReactInterface[]> => {
  await sleep(1500);

  const { data } =
    await githubApi_AxiosInstance.get<IssueRepoReactInterface[]>('/issues');

  // console.log(data);

  return data;
};
