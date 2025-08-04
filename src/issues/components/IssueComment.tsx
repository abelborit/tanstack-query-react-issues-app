import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';

import type { IssueRepoReactInterface } from '../interfaces';

interface IssueCommentProps {
  issueByNumberQuery: IssueRepoReactInterface;
}

export const IssueComment: FC<IssueCommentProps> = ({ issueByNumberQuery }) => {
  return (
    <div className="w-full">
      <div className="border border-gray-200 mt-2 rounded-md shadow-sm">
        <div className="flex items-center bg-blue-500 text-white p-2 rounded-t-md">
          <img
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
            src={issueByNumberQuery.user.avatar_url}
          />
          <span className="mx-2">{issueByNumberQuery.user.login}</span>
        </div>
        <div className="p-4 bg-gray-700 text-white">
          <ReactMarkdown>{issueByNumberQuery.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
