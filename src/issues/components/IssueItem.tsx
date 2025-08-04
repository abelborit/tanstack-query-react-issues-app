import { FiCheckCircle, FiInfo, FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router';

import type { IssueRepoReactInterface } from '../interfaces';

interface IssueItemProps {
  issue: IssueRepoReactInterface;
}

export const IssueItem = ({ issue }: IssueItemProps) => {
  const navigate = useNavigate();

  return (
    <button
      className="flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800 animate-fade-in-scale cursor-pointer w-full"
      type="button"
      onClick={() => void navigate(`/issues/issue/${issue.number}`)}
    >
      {issue.state === 'close' ? (
        <FiCheckCircle
          className="min-w-10"
          color="green"
          size={30}
        />
      ) : (
        <FiInfo
          className="min-w-10"
          color="red"
          size={30}
        />
      )}

      <div className="flex flex-col flex-grow px-2 cursor-pointer">
        <span className="hover:underline">{issue.title}</span>

        <p className="text-gray-500">
          <span>#{issue.number} opened 2 days ago by </span>
          <span className="font-bold">{issue.user.login}</span>
        </p>
      </div>

      <img
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
        src={issue.user.avatar_url}
      />

      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare
          className="min-w-5"
          color="gray"
          size={30}
        />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </button>
  );
};
