import { MYREPORT_DICT_SETUP, MYREPORT_LANG } from '../../configs/WriteScreenConfig';
import {
  ReportInputType1,
  ReportInputWithRightLabel,
  ReportSelectType1,
  SelectSingleFormView,
} from '../../custom/CustomForms';
import { LabelType1 } from '../../custom/CustomView';
import { pickupOptionsLanguage } from '../../utils/Function';
import { MyReportWriteScreenViewModel } from '../../viewModels/MyReportWriteScreenViewModel';

export const CSREventViewGroup = () => {
  const { data, updateData, pushSheetOnSelect, onClose } = MyReportWriteScreenViewModel.getState();

  const eventData = data.data.filter((element) => {
    return element.specification === 'Event';
  })[0].data;

  return (
    <>
      {/* 발생공항 */}
      <div className="tw-p-3">
        <LabelType1 text={MYREPORT_DICT_SETUP.CSR.Occurrence_Airport[MYREPORT_LANG]} />
        <ReportInputWithRightLabel
          rightLabel="검색"
          text={eventData.occurrenceAirport}
          onChange={(event) => {
            updateData({
              specification: 'Event',
              attribute: 'occurrenceAirport',
              value: event.target.value,
            });
          }}
        />
      </div>

      {/* 점검종류 */}
      <div className="tw-p-3">
        <SelectSingleFormView
          title={MYREPORT_DICT_SETUP.CSR.Inspection_Type[MYREPORT_LANG]}
          list={pickupOptionsLanguage(MYREPORT_DICT_SETUP.CSR.Option.Inspection_Type, MYREPORT_LANG)}
          selectedKey={eventData.inspectionType}
          hasLabel={true}
          onSelect={(value) => {
            updateData({
              specification: 'Event',
              attribute: 'inspectionType',
              value: value,
            });
          }}
        />
      </div>

      {/* 점검기관 Base */}
      <div className="tw-p-3">
        <SelectSingleFormView
          title={MYREPORT_DICT_SETUP.CSR.Base_of_Authority[MYREPORT_LANG]}
          list={pickupOptionsLanguage(MYREPORT_DICT_SETUP.CSR.Option.Base_of_Authority, MYREPORT_LANG)}
          selectedKey={eventData.baseOfAuthority}
          hasLabel={true}
          onSelect={(value) => {
            updateData({
              specification: 'Event',
              attribute: 'baseOfAuthority',
              value: value,
            });
          }}
        />
      </div>

      {/* 객실 지적사항 */}
      <div className="tw-p-3">
        <SelectSingleFormView
          title={MYREPORT_DICT_SETUP.CSR.Finding[MYREPORT_LANG]}
          list={pickupOptionsLanguage(MYREPORT_DICT_SETUP.CSR.Option.Finding, MYREPORT_LANG)}
          selectedKey={eventData.finding}
          hasLabel={true}
          onSelect={(value) => {
            updateData({
              specification: 'Event',
              attribute: 'finding',
              value: value,
            });
          }}
        />
      </div>

      {/* 점검관 */}
      <div className="tw-p-3">
        <LabelType1 text={MYREPORT_DICT_SETUP.CSR.Inspector[MYREPORT_LANG]} />
        <ReportInputType1
          text={eventData.inspector}
          onChange={(event) => {
            updateData({
              specification: 'Event',
              attribute: 'inspector',
              value: event.target.value,
            });
          }}
        />
      </div>

      {/* 점검기관 */}
      {(() => {
        const list = pickupOptionsLanguage(MYREPORT_DICT_SETUP.CSR.Option.Inspection_Dept, MYREPORT_LANG);

        list.forEach((element) => {
          element.isSelected = false;
          if (eventData.inspectionDept === element.text) {
            element.isSelected = true;
          }
        });

        const placeHolder = list.find((element) => element.key === eventData.inspectionDept)?.text;
        //console.log(`eventData.inspectionDept: ${eventData.inspectionDept}, placeHolder: ${placeHolder}`);

        return (
          <div className="tw-p-3">
            <LabelType1 text={MYREPORT_DICT_SETUP.CSR.Inspection_Dept[MYREPORT_LANG]} />
            <ReportSelectType1
              onClick={() => {
                const title = MYREPORT_DICT_SETUP.CSR.Inspection_Dept[MYREPORT_LANG];

                pushSheetOnSelect({
                  title: title,
                  listOnSelect: list,
                  alreadyPicked: [eventData.inspectionDept],
                  onSelect: (selected) => {
                    updateData({ specification: 'Event', attribute: 'inspectionDept', value: selected.key });
                    onClose();
                  },
                });
              }}
              placeholder={placeHolder}
            />
          </div>
        );
      })()}
    </>
  );
};
