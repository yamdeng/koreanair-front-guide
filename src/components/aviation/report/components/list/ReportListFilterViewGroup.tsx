import { create, useStore } from 'zustand';
import { ReportDateType1, ReportInputType1, ReportSelectType1 } from '../../custom/CustomForms';
import { MyReportListScreenViewModel } from '../../viewModels/MyReportListScreenViewModel';
import { SheetDefaultSelect } from '../../custom/BottomSheet';
import { pickupOptionsLanguage } from '../../utils/Function';
import { MYREPORT_DICT_SETUP, MYREPORT_LANG } from '../../configs/WriteScreenConfig';
import { reportCategory, reportStatus } from '../../configs/ListScreenConfig';
import { useEffect } from 'react';

const ReportListFilterViewModel = create<any>((set, get) => ({
  formValue: {},
  cleanFormValue: () => {
    set({
      formValue: {
        reportCategory: null,
        dateFrom: '2024-07-01',
        dateTo: '2024-08-01',
        reportStatus: null,
        subject: null,
      },
    });
  },
  setFormValue: (params) => {
    const { filterCondition } = params;
    set({ formValue: filterCondition });
  },
  changeInput: (inputName, inputValue) => {
    const { formValue } = get();
    formValue[inputName] = inputValue;
    set({ formValue: formValue });
  },
}));

export const ReportListFilterViewGroup = (params) => {
  const { category, onConfirm, filterCondition } = params;
  const { onDefaultBottomSheet, onClose } = MyReportListScreenViewModel.getState();
  const { formValue, setFormValue, changeInput, cleanFormValue } = useStore(
    ReportListFilterViewModel,
    (state) => state
  ) as any;

  console.log(`ReportListFilterViewGroup - Reload`);
  useEffect(() => {
    cleanFormValue();
    setFormValue({ filterCondition: filterCondition });
  }, []);

  console.log(pickupOptionsLanguage(reportStatus, MYREPORT_LANG).find((element) => element.key == 'key01'));

  const findReportCategory = pickupOptionsLanguage(reportCategory[category], MYREPORT_LANG).find(
    (element) => element.key === formValue.reportCategory
  );
  const reportCategoryText = findReportCategory?.text;

  const findReportStatus = pickupOptionsLanguage(reportStatus, MYREPORT_LANG).find(
    (element) => element.key === formValue.reportStatus
  );
  const reportStatusText = findReportStatus?.text;

  return (
    <div className="tw-bg-slate-300 tw-rounded-t-2xl tw-p-6">
      {/* 보고서 종류 */}
      <div className="tw-w-full tw-pb-6 tw-text-3xl">검색조건 설정</div>
      <div className="tw-gap-4 tw-flex tw-flex-col xl:tw-flex-row">
        <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-grow">
          <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">보고서 종류</label>
          <ReportSelectType1
            placeholder={reportCategoryText ? reportCategoryText : 'ALL'}
            onClick={() => {
              onDefaultBottomSheet({
                contents: () => {
                  // 클릭 이벤트 추가
                  const list = pickupOptionsLanguage(reportCategory[category], MYREPORT_LANG);
                  return (
                    <SheetDefaultSelect
                      title={MYREPORT_DICT_SETUP.Common.ReportCategory[MYREPORT_LANG]}
                      list={list}
                      onSelect={(value) => {
                        changeInput('reportCategory', value?.key);
                        onClose();
                      }}
                    />
                  );
                },
              });
            }}
          />
        </div>
        <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6">
          <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">
            {MYREPORT_DICT_SETUP.Common.Period[MYREPORT_LANG]}
          </label>
          <div className="tw-flex tw-gap-4">
            <ReportDateType1
              type="date"
              date={formValue.dateFrom}
              onChange={(event) => {
                changeInput('dateFrom', event.target.value);
              }}
            />
            <ReportDateType1
              type="date"
              date={formValue.dateTo}
              onChange={(event) => {
                changeInput('dateTo', event.target.value);
              }}
            />
          </div>
        </div>
        <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-grow">
          <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">
            {MYREPORT_DICT_SETUP.Common.ReportStatus[MYREPORT_LANG]}
          </label>
          <ReportSelectType1
            placeholder={reportStatusText ? reportStatusText : 'ALL'}
            onClick={() => {
              onDefaultBottomSheet({
                contents: () => {
                  // 클릭 이벤트 추가
                  const list = pickupOptionsLanguage(reportStatus, MYREPORT_LANG);
                  return (
                    <SheetDefaultSelect
                      title={MYREPORT_DICT_SETUP.Common.ReportCategory[MYREPORT_LANG]}
                      list={list}
                      onSelect={(value) => {
                        changeInput('reportStatus', value?.key);
                        onClose();
                      }}
                    />
                  );
                },
              });
            }}
          />
        </div>
      </div>
      <div className="tw-gap-4 tw-flex tw-mt-4">
        <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-w-full">
          <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">제목</label>
          <ReportInputType1
            text={formValue.subject}
            onChange={(event) => {
              changeInput('subject', event.target.value);
            }}
          />
        </div>
      </div>
      <div className="tw-gap-4 tw-flex tw-mt-4">
        <input
          type="button"
          id="name"
          value={MYREPORT_DICT_SETUP.Common.Search[MYREPORT_LANG]}
          name="name"
          className="tw-tw-input tw-p-4 tw-border tw-rounded-lg tw-w-full tw-bg-slate-900 tw-text-white"
          onClick={() => {
            onConfirm({ condition: formValue });
          }}
        />
      </div>
    </div>
  );
};
