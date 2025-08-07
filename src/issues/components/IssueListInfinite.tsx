import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type {
  IssueRepoReactInterface,
  IssueState,
} from '../interfaces/issue-repo-react.interface';
import { IssueItem } from './IssueItem';

interface IssueStatesInterface {
  label: string;
  value: IssueState;
}

const issueStatesButton: IssueStatesInterface[] = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
];

interface IssueListProps {
  issuesQuery: UseInfiniteQueryResult<
    InfiniteData<IssueRepoReactInterface[], unknown>,
    Error
  >;
  issueState: IssueState;
  // eslint-disable-next-line no-unused-vars
  handleChangeIssueState: (issueState: IssueState) => void;
}

export const IssueListInfinite = ({
  handleChangeIssueState,
  issueState,
  issuesQuery,
}: IssueListProps) => {
  // console.log('sin aplanar', issuesQuery.data?.pages); // [ [issue1, issue2], [issue3, issue4], [issue5, issue6] ]
  // console.log('aplanado', issuesQuery.data?.pages.flat()); // [ issue1, issue2, issue3, issue4, issue5, issue6 ]

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
        {issueStatesButton.map(({ label, value }) => (
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
        {issuesQuery.data?.pages.flat() // aplanar la data porque vienen arreglos todos en un arreglo
          ? issuesQuery.data?.pages.flat().map((element) => (
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
