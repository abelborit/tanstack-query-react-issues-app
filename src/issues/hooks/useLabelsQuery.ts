import { useQuery } from '@tanstack/react-query';

import { getLabelsAction } from '../actions';

export const useLabelsQuery = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels_repo_react'],
    queryFn: getLabelsAction,
    staleTime: 1000 * 60 * 60, // 1 hora de stale time, es decir, 1 hora que esta data se considerará "fresca"
  });

  return { labelsQuery };
};
