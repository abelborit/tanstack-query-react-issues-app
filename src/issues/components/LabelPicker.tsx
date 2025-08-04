import { LoadingSpinner } from '../../shared/components';
import { useLabelsQuery } from '../hooks';

export const LabelPicker = () => {
  const { labelsQuery } = useLabelsQuery();

  if (labelsQuery.isLoading || labelsQuery.isFetching) {
    return <LoadingSpinner />;
  }

  if (labelsQuery.error) {
    return (
      <div className="flex items-center animate-fade-in-scale">
        <strong>Error:</strong>
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(labelsQuery.error, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {labelsQuery.data?.map((element) => (
        <span
          key={element.id}
          className="px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer text-white animate-fade-in-scale"
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
