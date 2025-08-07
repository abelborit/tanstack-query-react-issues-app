import { useInfiniteQuery } from '@tanstack/react-query';

import { getIssuesAction } from '../actions';
import type { IssueState } from '../interfaces/issue-repo-react.interface';

interface useIssuesInfiniteQueryProps {
  issueState: IssueState;
  selectedLabels: string[];
}

export const useIssuesInfiniteQuery = ({
  issueState,
  selectedLabels,
}: useIssuesInfiniteQueryProps) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: [
      'issues_repo_react',
      'infinite_scroll',
      { issueState, selectedLabels },
    ],
    queryFn: ({ pageParam, queryKey }) => {
      // console.log({ pageParam, queryKey });

      /* en este caso tomaremos lo que necesitamos desde las props del "queryFn" aunque también podríamos tomarlas desde las props de "useIssuesInfiniteQuery" porque usaremos lo mismo de -- issueState, selectedLabels -- pero lo estamos haciendo de esta forma por si por alguna razón no podemos acceder o no podemos usar las props que vienen desde "useIssuesInfiniteQuery" */
      const [, , args] = queryKey; // queryKey: [ 'issues_repo_react', 'infinite_scroll', { issueState, selectedLabels } ]
      const {
        issueState: issueStateQueryFn,
        selectedLabels: selectedLabelsQueryFn,
      } = args as useIssuesInfiniteQueryProps;

      return getIssuesAction({
        issueState: issueStateQueryFn,
        selectedLabels: selectedLabelsQueryFn,
        page: pageParam,
      });
    },
    staleTime: 1000 * 60 * 5, // 5 minutos de stale time, es decir, 5 minutos que esta data se considerará "fresca"
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      // [ page1, page2, page3 ]
      // [ [issue1, issue2], [issue3, issue4], [issue5, issue6] ] -> pages viene arreglo de issues dentro de un arreglo general
      // console.log({ lastPage, pages });

      /* undefined o null para decir que ya no hay más páginas */
      const nextPage = lastPage.length > 0 ? pages.length + 1 : undefined;

      // console.log({ nextPage });

      return nextPage;
    },
  });

  return {
    issuesQuery,
  };
};
