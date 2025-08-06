import { useState } from 'react';

import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesQuery } from '../hooks';
import type { IssueState } from '../interfaces/issue-repo-react.interface';

export const ListView = () => {
  const [issueState, setIssueState] = useState<IssueState>('all');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery } = useIssuesQuery({ issueState, selectedLabels });

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
        <IssueList
          handleChangeIssueState={handleChangeIssueState}
          issuesQuery={issuesQuery}
          issueState={issueState}
        />
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
