import { useState } from 'react';

import { LoadingSpinner } from '../../shared/components';
import { useIssuesQuery } from '../hooks';
import type { IssueState } from '../interfaces/issue-repo-react.interface';
import { IssueItem } from './IssueItem';

interface IssueStatesInterface {
  label: string;
  value: IssueState;
}

const issueStates: IssueStatesInterface[] = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
];

export const IssueList = () => {
  const [issueState, setIssueState] = useState<IssueState>('all');
  const { issuesQuery } = useIssuesQuery({issueState});

  const handleChangeIssueState = (newIssueState: IssueState) => {
    setIssueState(newIssueState);
  };

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
      <div className="flex gap-4 animate-fade-in-scale">
        {issueStates.map(({ label, value }) => (
          <button
            key={value}
            className={`btn cursor-pointer ${issueState === value ? 'active' : ''}`}
            type="button"
            onClick={() => handleChangeIssueState(value)}
          >
            {label}
          </button>
        ))}
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
