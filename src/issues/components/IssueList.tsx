import { IssueItem } from './IssueItem';

export const IssueList = () => {
  return (
    <>
      {/* Botones de All, Open, Closed */}
      <div className="flex gap-4 animate-fade-in-scale">
        <button
          className="btn active"
          type="button"
        >
          All
        </button>
        <button
          className="btn"
          type="button"
        >
          Open
        </button>
        <button
          className="btn"
          type="button"
        >
          Closed
        </button>
      </div>

      {/* Lista de issues */}
      <div className="mt-4">
        {[1, 2, 3].map((issue) => (
          <IssueItem key={issue} />
        ))}
      </div>
    </>
  );
};
