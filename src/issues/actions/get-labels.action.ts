import { githubApi_AxiosInstance } from '../../api';
import { sleep } from '../../helpers';
import type { LabelRepoReactInterface } from '../interfaces';

export const getLabelsAction = async (): Promise<LabelRepoReactInterface[]> => {
  await sleep(1500);

  const { data } =
    await githubApi_AxiosInstance.get<LabelRepoReactInterface[]>('/labels');

  // console.log(data);

  return data;
};
