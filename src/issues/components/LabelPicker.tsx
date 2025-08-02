import { useQuery } from '@tanstack/react-query';

import { getLabelsAction } from '../actions';

export const LabelPicker = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels_repo_react'],
    queryFn: getLabelsAction,
  });

  if (labelsQuery.isLoading || labelsQuery.isFetching) {
    return (
      <div className="flex items-center">
        <span>Cargando...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {labelsQuery.data?.map((element) => (
        <span
          key={element.id}
          className="px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer text-white"
          // style={{ border: `1px solid ${element.color}`, color: `${element.color}` }}
          style={{
            border: `1px solid ${element.color}`,
            backgroundColor: `rgba(${parseInt(element.color.slice(0, 2), 16)}, ${parseInt(element.color.slice(2, 4), 16)}, ${parseInt(element.color.slice(4, 6), 16)}, 0.25)`,
          }}
        >
          {element.name}
        </span>
      ))}
    </div>
  );
};
