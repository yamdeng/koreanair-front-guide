import { useRef } from 'react';
import { MYREPORT_DICT_SETUP, MYREPORT_LANG } from '../../configs/WriteScreenConfig';
import { formatFileSize } from '../../utils/Function';
import { MyReportWriteScreenViewModel } from '../../viewModels/MyReportWriteScreenViewModel';

export const AttachmentViewGroup = () => {
  const { handleFileChange, getFormArray, removeFormFile } = MyReportWriteScreenViewModel.getState();

  const fileInputRef = useRef(null);

  return (
    <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-mb-4 tw-h-full">
      <div className="tw-p-6 tw-bg-white tw-rounded-2xl tw-h-full tw-h-full tw-overflow-y-scroll scrollbar-hidden">
        <div className="tw-flex tw-flex-col tw-h-full tw-justify-end">
          <div className="tw-flex tw-flex-col tw-gap-6 tw-grow tw-items-stretch">
            {(() => {
              const list = getFormArray();

              if (list.length == 0) {
                return <div>{MYREPORT_DICT_SETUP.Common.NoAttachment[MYREPORT_LANG]}</div>;
              }

              return list.map(([key, value], index) => {
                return (
                  <div className="tw-flex tw-gap-6 av-flex-vertical-center" key={key}>
                    <div className="tw-flex-shrink-0 tw-bg-slate-600 tw-rounded-full tw-basis-10 tw-text-white av-flex-vertical-center">
                      {index + 1}
                    </div>
                    <div className="tw-grow">
                      <span className="tw-font-bold tw-break-all">
                        {value.name} ({formatFileSize(value.size)})
                      </span>
                    </div>
                    <div className="tw-grow-0">
                      <button
                        onClick={() => {
                          removeFormFile(key);
                        }}
                        className="tw-flex tw-px-4 tw-py-2 tw-bg-slate-300 tw-rounded-2xl"
                      >
                        <span className="tw-text-lg">{MYREPORT_DICT_SETUP.Common.Delete[MYREPORT_LANG]}</span>
                      </button>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          <div className="tw-grow-0">
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
            <button
              onClick={() => {
                // 업로드 시작
                fileInputRef.current.click();
              }}
              className="av-input-1 tw-rounded-lg"
            >
              {MYREPORT_DICT_SETUP.Common.Add[MYREPORT_LANG]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
