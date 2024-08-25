import { MYREPORT_DICT_SETUP, MYREPORT_LANG } from '../../configs/WriteScreenConfig';
import { ReportButtonType1 } from '../../custom/CustomForms';
import { MyReportWriteScreenViewModel } from '../../viewModels/MyReportWriteScreenViewModel';

export const FinishViewGroup = (params) => {
  const { type, category } = params;

  const { saveReport, onCancel, onDestory } = MyReportWriteScreenViewModel.getState();

  return (
    <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-mb-4 tw-h-full">
      <div className="tw-p-6 tw-bg-white tw-rounded-2xl tw-h-full tw-h-full tw-overflow-y-scroll scrollbar-hidden">
        <div className="tw-flex tw-justify-end tw-h-full tw-flex-col tw-items-stretch">
          <h1 className="tw-flex tw-grow tw-h-full tw-text-center av-flex-vertical-center tw-text-[2rem] tw-font-bold">
            {type} - {category} report has been completed
          </h1>
          <div className="tw-flex tw-flex-col">
            <ReportButtonType1
              className="tw-w-full"
              text={MYREPORT_DICT_SETUP.Common.Print[MYREPORT_LANG]}
              onClick={() => {}}
            />
            <ReportButtonType1
              className="tw-w-full"
              text={MYREPORT_DICT_SETUP.Common.Save[MYREPORT_LANG]}
              onClick={() => {
                saveReport({
                  completion: () => {
                    onDestory();
                  },
                });
              }}
            />
            <ReportButtonType1
              className="tw-w-full"
              text={MYREPORT_DICT_SETUP.Common.Submit[MYREPORT_LANG]}
              onClick={() => {}}
            />
            <ReportButtonType1
              className="tw-w-full"
              text={MYREPORT_DICT_SETUP.Common.Back[MYREPORT_LANG]}
              onClick={() => {
                onCancel();
              }}
            />
            <ReportButtonType1
              className="tw-w-full"
              text={MYREPORT_DICT_SETUP.Common.Close[MYREPORT_LANG]}
              onClick={() => {
                onDestory();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
