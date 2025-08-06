import { useState } from 'react';

import { LoadingSpinner } from '../../shared/components';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesQuery } from '../hooks';
import type { IssueState } from '../interfaces/issue-repo-react.interface';

export const ListView = () => {
  const [issueState, setIssueState] = useState<IssueState>('all');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery, page, handleNextPage, handlePrevPage } = useIssuesQuery({
    issueState,
    selectedLabels,
  });

  const handleChangeIssueState = (newIssueState: IssueState) => {
    setIssueState(newIssueState);
  };

  const handleChangeSelectedLabels = (newSelectedLabel: string) => {
    if (selectedLabels.includes(newSelectedLabel)) {
      setSelectedLabels(() =>
        selectedLabels.filter((label) => label !== newSelectedLabel),
      );
    } else {
      setSelectedLabels([...selectedLabels, newSelectedLabel]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading || issuesQuery.isFetching ? (
          <LoadingSpinner />
        ) : (
          <>
            <IssueList
              handleChangeIssueState={handleChangeIssueState}
              issuesQuery={issuesQuery}
              issueState={issueState}
            />

            <div className="flex justify-between items-center">
              <button
                className="py-2 px-4 bg-blue-500 rounded-md hover:bg-blue-700 transition-all cursor-pointer"
                type="button"
                onClick={handlePrevPage}
              >
                Anteriores
              </button>

              <span>- {page} -</span>

              <button
                className="py-2 px-4 bg-blue-500 rounded-md hover:bg-blue-700 transition-all cursor-pointer"
                type="button"
                onClick={handleNextPage}
              >
                Siguientes
              </button>
            </div>
          </>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          handleChangeSelectedLabels={handleChangeSelectedLabels}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};
