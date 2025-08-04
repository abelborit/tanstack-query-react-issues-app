import { useQuery } from '@tanstack/react-query';

import { getLabelsAction } from '../actions';
// import type { LabelRepoReactInterface } from '../interfaces';

export const useLabelsQuery = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels_repo_react'],
    queryFn: getLabelsAction,
    staleTime: 1000 * 60 * 60, // 1 hora de stale time, es decir, 1 hora que esta data se considerará "fresca"

    // placeholderData: [
    //   {
    //     id: 739777675,
    //     node_id: 'MDU6TGFiZWw3Mzk3Nzc2NzU=',
    //     url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Component%20API',
    //     name: 'Component: Component API',
    //     color: 'd4c5f9',
    //     default: false,
    //   } satisfies LabelRepoReactInterface,

    //   {
    //     id: 139734344,
    //     node_id: 'MDU6TGFiZWwxMzk3MzQzNDQ=',
    //     url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Test%20Utils',
    //     name: 'Component: Test Utils',
    //     color: 'eb6420',
    //     default: false,
    //   } satisfies LabelRepoReactInterface,
    // ],

    /* hay que tener cuidado al trabajar "initialData" con el "staleTime" porque si está activo entonces tomará la data del "initialData" como "fresca" y solo se mostrará esa data y ya no hará una petición porque ya tiene la data inicial como fresca, entonces sería mejor no colocar el "staleTime" cuando se trabaje con el "initialData" y de esa forma trabajará como una data temporal */
    // initialData: [
    //   {
    //     id: 739777675,
    //     node_id: 'MDU6TGFiZWw3Mzk3Nzc2NzU=',
    //     url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Component%20API',
    //     name: 'Component: Component API',
    //     color: 'd4c5f9',
    //     default: false,
    //   } satisfies LabelRepoReactInterface,

    //   {
    //     id: 139734344,
    //     node_id: 'MDU6TGFiZWwxMzk3MzQzNDQ=',
    //     url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Test%20Utils',
    //     name: 'Component: Test Utils',
    //     color: 'eb6420',
    //     default: false,
    //   } satisfies LabelRepoReactInterface,
    // ],
  });

  return { labelsQuery };
};
