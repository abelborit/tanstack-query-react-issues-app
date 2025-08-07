import { useState } from 'react';

import { LoadingSpinner } from '../../shared/components';
import { IssueListInfinite } from '../components/IssueListInfinite';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesInfiniteQuery } from '../hooks';
import type { IssueState } from '../interfaces/issue-repo-react.interface';

export const ListViewInfinite = () => {
  const [issueState, setIssueState] = useState<IssueState>('all');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery } = useIssuesInfiniteQuery({
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
        {issuesQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col justify-center">
            <IssueListInfinite
              handleChangeIssueState={handleChangeIssueState}
              issuesQuery={issuesQuery}
              issueState={issueState}
            />

            <button
              className="py-2 px-4 bg-blue-500 rounded-md hover:bg-blue-700 transition-all cursor-pointer disabled:bg-gray-500"
              disabled={issuesQuery.isFetchingNextPage}
              type="button"
              /* se coloca el void porque sino dará un error similar a -- Promise-returning function provided to attribute where a void return was expected. eslint@typescript-eslint/no-misused-promises -- que se genera porque estás pasando una función async (o una función que retorna una Promise) a un atributo que espera una función que retorne void, como onClick. El método -- issuesQuery.fetchNextPage() -- retorna una Promise, por lo tanto estás pasando una función que devuelve una Promise a un atributo que espera una función sin retorno (void) entonces colocaremos un void delante de la función que es lo más común y recomendado si no se quiere capturar errores */
              onClick={() => void issuesQuery.fetchNextPage()}
            >
              {issuesQuery.isFetchingNextPage
                ? 'Se están cargando más issues...'
                : 'Cargar más...'}
            </button>
          </div>
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
