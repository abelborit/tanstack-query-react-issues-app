import { useQueryClient } from '@tanstack/react-query';
import { FiCheckCircle, FiInfo, FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router';

import { getIssueByNumberAction, getIssueCommentsAction } from '../actions';
import type { IssueRepoReactInterface } from '../interfaces';

interface IssueItemProps {
  issue: IssueRepoReactInterface;
}

export const IssueItem = ({ issue }: IssueItemProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // console.log(queryClient);

  const handlePrefetchDataQuery = () => {
    // console.log('prefetching...');

    /* la llamada a queryClient.prefetchQuery(...) retorna una promesa, y se tendría que manejar con await, .then, .catch, void.
    - Opción 1: Ignorar la promesa explícitamente con "void". Es lo más simple y recomendado si no necesitas manejar errores. Con void, le dices a TypeScript: "Sé que esto es una promesa, ignórala con seguridad".
    - Opción 2: Usar async/await con manejo de errores. Útil si quieres registrar fallos en el prefetch.

    - NOTA: si estás usando onMouseEnter, lo mejor es usar "void" para evitar que múltiples movimientos del mouse acumulen awaits innecesarios.
    */
    void queryClient.prefetchQuery({
      queryKey: ['issues_repo_react', issue.number], // es el que está en useIssueByNumberQuery
      queryFn: () => getIssueByNumberAction({ issueNumber: issue.number }),
      staleTime: 1000 * 60 * 5, // se coloca para evitar que al pasar el mouse por cada posible entrada/click del usuario se haga un prefetch a lo loco y se sature las peticiones hacia el backend
    });

    void queryClient.prefetchQuery({
      queryKey: ['issues_repo_react', issue.number, 'comments'], // es el que está en useIssueByNumberQuery
      queryFn: () => getIssueCommentsAction({ issueNumber: issue.number }),
      staleTime: 1000 * 60 * 5, // se coloca para evitar que al pasar el mouse por cada posible entrada/click del usuario se haga un prefetch a lo loco y se sature las peticiones hacia el backend
    });
  };

  return (
    <button
      className="flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800 animate-fade-in-scale cursor-pointer w-full"
      type="button"
      onClick={() => void navigate(`/issues/issue/${issue.number}`)}
      onMouseEnter={handlePrefetchDataQuery}
    >
      {issue.state === 'close' ? (
        <FiCheckCircle
          className="min-w-10"
          color="green"
          size={30}
        />
      ) : (
        <FiInfo
          className="min-w-10"
          color="red"
          size={30}
        />
      )}

      <div className="flex flex-col flex-grow px-2 cursor-pointer">
        <span className="hover:underline">{issue.title}</span>

        <p className="text-gray-500">
          <span>#{issue.number} opened 2 days ago by </span>
          <span className="font-bold">{issue.user.login}</span>
        </p>
      </div>

      <img
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
        src={issue.user.avatar_url}
      />

      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare
          className="min-w-5"
          color="gray"
          size={30}
        />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </button>
  );
};
