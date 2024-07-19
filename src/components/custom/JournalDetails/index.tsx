import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';

import useIsMobile from '@/hooks/useIsMobile';
import { JournalClassification } from '@/models/journal';
import { formatIssn, formatColor } from '@/lib/formatter';
import Spinner from '../Spinner';
import { Separator } from '@/components/ui/separator';

const JournalDetails = ({
  open = false,
  isLoading = false,
  classifications,
  onClose = () => {}
}: {
  open?: boolean;
  isLoading?: boolean;
  classifications: JournalClassification[];
  onClose?: () => void;
}) => {
  const isMobile = useIsMobile();

  const handleClose = () => {
    onClose();
  };

  return (
    <Drawer
      direction={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={handleClose}
    >
      <DrawerContent
        className={
          isMobile
            ? 'h-[75%]'
            : 'top-0 right-0 left-auto mt-0 w-[500px] rounded-none'
        }
      >
        {!isMobile && (
          <Button
            className="absolute top-12 right-12 rounded-full w-[40px] h-[40px] p-0"
            variant="outline"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </Button>
        )}
        <div className="mx-auto w-full p-5 overflow-y-scroll overflow-x-hidden h-screen">
          <DrawerHeader>
            <DrawerTitle>Clasificación de la revista</DrawerTitle>
          </DrawerHeader>
          <Separator />
          <div className="p-4 pb-0">
            {isLoading && (
              <div className="flex justify-center">
                <Spinner className="w-12 h-12" />
              </div>
            )}
            <>
              <h3 className="text-md font-semibold text-slate-700 dark:text-white mb-2">
                {classifications[0]?.name}
              </h3>
              <p className="text-gray-500 text-sm mb-2">
                <span className="font-semibold">ISSN:</span>{' '}
                {formatIssn(classifications[0]?.issns)}
              </p>
              {!isLoading &&
                classifications?.map((classification, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-md py-2 px-4 mb-2"
                  >
                    <p className="text-gray-500 text-sm">
                      <span className="font-semibold">Clasificación:</span>{' '}
                      <span className={formatColor(classification?.index)}>
                        {classification?.index}
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      <span className="font-semibold">Vigencia:</span>{' '}
                      {classification?.date}
                    </p>
                    <p className="text-gray-500 text-sm">
                      <span className="font-semibold">Indexadores:</span>{' '}
                      {classification?.indexers?.join(', ')}
                    </p>
                  </div>
                ))}
            </>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default JournalDetails;
