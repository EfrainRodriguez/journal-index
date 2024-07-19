import { Button } from '@/components/ui/button';

import { Journal } from '@/models/journal';
import { formatIssn } from '@/lib/formatter';

const JournalItem = ({
  journal,
  onSeeMore = () => {}
}: {
  journal: Journal;
  onSeeMore?: (journal: Journal) => void;
}) => {
  const handleSeeMore = () => {
    onSeeMore(journal);
  };

  return (
    <div className="md:flex md:items-center p-2 border border-gray-200 dark:border-gray-700 mb-2 rounded-md">
      <div className="flex flex-1">
        <div className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
            />
          </svg>
        </div>
        <div>
          <h3 className="md:text-lg font-semibold text-slate-700 dark:text-white">
            {journal?.name?.toUpperCase()}
          </h3>
          <p className="text-sm text-gray-500">{formatIssn(journal?.issns)}</p>
        </div>
      </div>
      <Button
        className="mt-4 md:m-0 w-full md:w-auto"
        variant="outline"
        onClick={handleSeeMore}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Ver revista
      </Button>
    </div>
  );
};

export default JournalItem;
