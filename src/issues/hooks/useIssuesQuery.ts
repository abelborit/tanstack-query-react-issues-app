import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

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
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ['issues_repo_react', { issueState, selectedLabels, page }],
    queryFn: () => getIssuesAction({ issueState, selectedLabels, page }),
    staleTime: 1000 * 60 * 5, // 5 minutos de stale time, es decir, 5 minutos que esta data se considerará "fresca"
  });

  const handleNextPage = () => {
    if (issuesQuery.data?.length === 0) {
      return;
    }

    setPage((prevState) => prevState + 1);
  };

  const handlePrevPage = () => {
    if (page === 1) {
      return;
    }

    setPage((prevState) => prevState - 1);
  };

  useEffect(() => {
    setPage(1);
  }, [issueState]);

  useEffect(() => {
    setPage(1);
  }, [selectedLabels]);

  return {
    issuesQuery,
    page,
    handleNextPage,
    handlePrevPage,
  };
};
