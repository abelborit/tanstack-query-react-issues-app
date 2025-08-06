import { LoadingSpinner } from '../../shared/components';
import { useLabelsQuery } from '../hooks';

interface LabelPickerProps {
  selectedLabels: string[];
  // eslint-disable-next-line no-unused-vars
  handleChangeSelectedLabels: (newSelectedLabel: string) => void;
}

export const LabelPicker = ({
  selectedLabels,
  handleChangeSelectedLabels,
}: LabelPickerProps) => {
  const { labelsQuery } = useLabelsQuery();

  if (labelsQuery.isLoading || labelsQuery.isFetching) {
    return <LoadingSpinner />;
  }

  if (labelsQuery.error) {
    return (
      <div className="flex items-center animate-fade-in-scale">
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(labelsQuery.error, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {labelsQuery.data?.map((element) => (
        <button
          key={element.id}
          type="button"
          className={`
            cursor-pointer px-2 py-1 rounded-full text-xs font-semibold animate-fade-in-scale transition-colors duration-200
            ${selectedLabels.includes(element.name) ? 'ring-2 ring-white text-slate-800' : 'text-white'}
          `}
          style={{
            border: `1px solid #${element.color}`,
            backgroundColor: selectedLabels.includes(element.name)
              ? `#${element.color}`
              : `rgba(${parseInt(element.color.slice(0, 2), 16)}, ${parseInt(element.color.slice(2, 4), 16)}, ${parseInt(element.color.slice(4, 6), 16)}, 0.25)`,
          }}
          onClick={() => handleChangeSelectedLabels(element.name)}
          onMouseEnter={(e) => {
            if (!selectedLabels.includes(element.name)) {
              e.currentTarget.style.backgroundColor = `rgba(${parseInt(element.color.slice(0, 2), 16)}, ${parseInt(element.color.slice(2, 4), 16)}, ${parseInt(element.color.slice(4, 6), 16)}, 0.7)`;
            }
          }}
          onMouseLeave={(e) => {
            if (!selectedLabels.includes(element.name)) {
              e.currentTarget.style.backgroundColor = `rgba(${parseInt(element.color.slice(0, 2), 16)}, ${parseInt(element.color.slice(2, 4), 16)}, ${parseInt(element.color.slice(4, 6), 16)}, 0.25)`;
            }
          }}
        >
          {element.name}
        </button>
      ))}
    </div>
  );
};
