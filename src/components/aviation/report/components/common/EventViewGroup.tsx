import { CSREventViewGroup } from '../csr/CSREventViewGroup';

export const EventViewGroup = (params) => {
  const { type, category } = params;

  return (
    <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-mb-4 tw-h-full">
      <div className="tw-p-6 tw-bg-white tw-rounded-2xl tw-h-full tw-h-full tw-overflow-y-scroll scrollbar-hidden">
        {(() => {
          switch (type) {
            case 'CSR': {
              switch (category) {
                case 'Inspection': {
                  return <CSREventViewGroup />;
                }
              }
              break;
            }
            default: {
              return <></>;
            }
          }
        })()}
      </div>
    </div>
  );
};
