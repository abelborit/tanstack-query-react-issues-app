import { useQuery } from '@tanstack/react-query';

import { getIssueByNumberAction, getIssueCommentsAction } from '../actions';

interface IssueByNumberQueryProps {
  issueNumber: number;
}

export const useIssueByNumberQuery = ({
  issueNumber,
}: IssueByNumberQueryProps) => {
  const issueByNumberQuery = useQuery({
    queryKey: ['issues_repo_react', issueNumber],
    queryFn: () => getIssueByNumberAction({ issueNumber }),
    staleTime: 1000 * 60 * 5, // 5 minutos de stale time, es decir, 5 minutos que esta data se considerará "fresca"
  });

  /* para este ejemplo se están haciendo llamadas en paralelo, porque una funcionalidad no depende de la otra, pero habrá casos en donde se tenga que realizar de forma secuencial, es decir, primero una petición y luego con otra petición */
  // const issueComments = useQuery({
  //   queryKey: ['issues_repo_react', issueNumber, 'comments'],
  //   queryFn: () => getIssueCommentsAction({ issueNumber }),
  //   staleTime: 1000 * 60 * 5, // 5 minutos de stale time, es decir, 5 minutos que esta data se considerará "fresca"
  // });

  /* para este ejemplo se están haciendo llamadas de forma secuencial, en caso esta petición dependiera de la petición anterior */
  const issueComments = useQuery({
    queryKey: [
      'issues_repo_react',
      issueByNumberQuery.data?.number,
      'comments',
    ],
    queryFn: () =>
      getIssueCommentsAction({ issueNumber: issueByNumberQuery.data!.number }),
    staleTime: 1000 * 60 * 5, // 5 minutos de stale time, es decir, 5 minutos que esta data se considerará "fresca"
    enabled: issueByNumberQuery.data !== undefined, // esta funcionalidd de ejecutará cuando la data de la solicitud anterior sea diferente de undefined
  });

  return { issueByNumberQuery, issueComments };
};
