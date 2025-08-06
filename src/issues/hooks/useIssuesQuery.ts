import { useQuery } from '@tanstack/react-query';

import { getIssuesAction } from '../actions';
import type { IssueState } from '../interfaces/issue-repo-react.interface';

interface UseIssuesQueryProps {
  issueState: IssueState;
  selectedLabels: string[];
}

export const useIssuesQuery = ({
  issueState,
  selectedLabels,
}: UseIssuesQueryProps) => {
  const issuesQuery = useQuery({
    queryKey: ['issues_repo_react', { issueState, selectedLabels }],
    queryFn: () => getIssuesAction({ issueState, selectedLabels }),
    staleTime: 1000 * 60 * 5, // 5 minutos de stale time, es decir, 5 minutos que esta data se considerará "fresca"
  });

  return { issuesQuery };
};
