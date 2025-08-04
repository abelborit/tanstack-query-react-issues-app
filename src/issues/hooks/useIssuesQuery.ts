import { useQuery } from '@tanstack/react-query';

import { getIssuesAction } from '../actions';

export const useIssuesQuery = () => {
  const issuesQuery = useQuery({
    queryKey: ['issues_repo_react'],
    queryFn: getIssuesAction,
    staleTime: 1000 * 60 * 5, // 5 minutos de stale time, es decir, 5 minutos que esta data se considerará "fresca"
  });

  return { issuesQuery };
};
