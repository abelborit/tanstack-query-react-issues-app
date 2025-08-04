import { /* FiCheckCircle, */ FiInfo, FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router';

export const IssueItem = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800 animate-fade-in-scale">
      <FiInfo
        className="min-w-10"
        color="red"
        size={30}
      />
      {/* <FiCheckCircle size={30} color="green" /> */}

      <div className="flex flex-col flex-grow px-2">
        <button
          className="hover:underline"
          type="button"
          onClick={() => void navigate(`/issues/issue/123`)}
        >
          Suggestion: why not make accessing and changing the state possible
          globally?
        </button>
        <span className="text-gray-500">
          #25581 opened 2 days ago by{' '}
          <span className="font-bold">segfaulty1</span>
        </span>
      </div>

      <img
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
        src="https://avatars.githubusercontent.com/u/1933404?v=4"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare
          className="min-w-5"
          color="gray"
          size={30}
        />
        <span className="px-4 text-gray-400">2</span>
      </div>
    </div>
  );
};
