import { useQuery } from '@tanstack/react-query';

import { getIssuesAction } from '../actions';

export const useIssuesQuery = () => {
  const issuesQuery = useQuery({
    queryKey: ['issues_repo_react'],
    queryFn: getIssuesAction,
    staleTime: 1000 * 60 * 60, // 1 hora de stale time, es decir, 1 hora que esta data se considerará "fresca"
  });

  return { issuesQuery };
};
