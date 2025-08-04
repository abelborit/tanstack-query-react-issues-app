import { useQuery } from '@tanstack/react-query';

import { getIssueByNumberAction } from '../actions';

interface IssueByNumberQueryProps {
  issueNumber: number;
}

export const useIssueByNumberQuery = ({
  issueNumber,
}: IssueByNumberQueryProps) => {
  const issueByNumberQuery = useQuery({
    queryKey: ['issue_repo_react', issueNumber],
    queryFn: () => getIssueByNumberAction({ issueNumber }),
    staleTime: 1000 * 60 * 5, // 5 minutos de stale time, es decir, 5 minutos que esta data se considerará "fresca"
  });

  return { issueByNumberQuery };
};
