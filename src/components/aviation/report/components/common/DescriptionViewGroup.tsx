import { MYREPORT_DICT_SETUP, MYREPORT_LANG } from '../../configs/WriteScreenConfig';
import { ReportInputType1 } from '../../custom/CustomForms';
import { MyReportWriteScreenViewModel } from '../../viewModels/MyReportWriteScreenViewModel';

export const DescriptionViewGroup = () => {
  const { data, updateData } = MyReportWriteScreenViewModel.getState();

  const descriptionData = data.data.filter((element) => {
    return element.specification === 'Description';
  })[0].data;

  return (
    <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-mb-4 tw-h-full">
      <div className="tw-p-6 tw-bg-white tw-rounded-2xl tw-h-full tw-h-full tw-overflow-y-scroll scrollbar-hidden">
        <div className="tw-flex tw-flex-col tw-h-full tw-justify-end">
          {/* 제목 */}
          <div className="tw-p-3">
            <label className="av-label-1">{MYREPORT_DICT_SETUP.Common.Subject[MYREPORT_LANG]}</label>
            <ReportInputType1
              onChange={(event) => {
                updateData({ specification: 'Description', attribute: 'subject', value: event.target.value });
              }}
              text={descriptionData.subject}
            />
          </div>

          {/* 내용 */}
          <div className="tw-p-3 tw-grow">
            <label className="av-label-1">{MYREPORT_DICT_SETUP.Common.Description[MYREPORT_LANG]}</label>
            <div className="tw-flex tw-gap-4 tw-h-[90%]">
              <textarea
                id="name"
                name="name"
                className="av-input-1 tw-rounded-lg"
                onChange={(event) => {
                  updateData({ specification: 'Description', attribute: 'description', value: event.target.value });
                }}
                value={descriptionData.description}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
