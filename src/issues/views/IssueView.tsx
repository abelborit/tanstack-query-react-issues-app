import { FiSkipBack } from 'react-icons/fi';
import { Navigate, useNavigate, useParams } from 'react-router';

import { LoadingSpinner } from '../../shared/components';
import { IssueComment } from '../components/IssueComment';
import { useIssueByNumberQuery } from '../hooks';

export const IssueView = () => {
  const navigate = useNavigate();
  const params = useParams();
  // console.log({params});

  const issueNumberAdapter = Number(params.issueNumber ?? 0);

  const { issueByNumberQuery, issueComments } = useIssueByNumberQuery({
    issueNumber: issueNumberAdapter,
  });

  const handleClick = () => {
    /* La función navigate(-1) de react-router a veces puede devolver una promesa (dependiendo de la versión y uso), por eso TypeScript y ESLint te advierten que deberías manejarla apropiadamente poque "@typescript-eslint/no-floating-promises" porque  previene que ejecutes una promesa sin manejar su resultado (ni con await, .then, .catch o void). */

    /* Si no te importa el resultado y quieres ignorar la promesa explícitamente usando -- void navigate(-1); -- y esto le dice a TypeScript y ESLint: "Sé que esto es una promesa y no me interesa esperar el resultado". */
    /* Para navigate, que en general no necesita espera ni control de errores (como navigate('/home')), lo más limpio y correcto es usar el "void" */
    void navigate(-1);
  };

  if (issueByNumberQuery.isLoading || issueByNumberQuery.isFetching) {
    // return <span>Cargando Issue...</span>;
    return <LoadingSpinner />;
  }

  if (!issueByNumberQuery.data) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          className="hover:underline text-blue-400 flex items-center"
          type="button"
          onClick={handleClick}
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      {/* Primer comentario */}
      <IssueComment issueByNumberQuery={issueByNumberQuery.data} />

      {issueComments.isLoading || issueComments.isFetching ? (
        <LoadingSpinner />
      ) : (
        issueComments.data?.map((element) => (
          <IssueComment
            key={element.id}
            issueByNumberQuery={element}
          />
        ))
      )}
    </div>
  );
};
