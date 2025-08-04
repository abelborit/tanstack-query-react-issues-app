import { LoadingSpinner } from '../../shared/components';
import { useIssuesQuery } from '../hooks';
import { IssueItem } from './IssueItem';

export const IssueList = () => {
  const { issuesQuery } = useIssuesQuery();

  if (issuesQuery.isLoading || issuesQuery.isFetching) {
    return <LoadingSpinner />;
  }

  if (issuesQuery.error) {
    return (
      <div className="flex items-center animate-fade-in-scale">
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(issuesQuery.error, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <>
      {/* Botones de All, Open, Closed */}
      <div className="flex gap-4 animate-fade-in-scale">
        <button
          className="btn active"
          type="button"
        >
          All
        </button>
        <button
          className="btn"
          type="button"
        >
          Open
        </button>
        <button
          className="btn"
          type="button"
        >
          Closed
        </button>
      </div>

      {/* Lista de issues */}
      <div className="mt-4">
        {issuesQuery.data
          ? issuesQuery.data.map((element) => (
              <IssueItem
                key={element.id}
                issue={element}
              />
            ))
          : null}
      </div>
    </>
  );
};
