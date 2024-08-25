import { MYREPORT_DICT_SETUP, MYREPORT_LANG } from '../../configs/WriteScreenConfig';
import {
  ReportButtonType5,
  ReportDateType1,
  ReportInputType1,
  ReportInputWithLeftLabel,
  ReportInputWithRightLabel,
  ReportSelectType1,
} from '../../custom/CustomForms';
import { LabelType1, LabelType2 } from '../../custom/CustomView';
import { MyReportWriteScreenViewModel } from '../../viewModels/MyReportWriteScreenViewModel';

export const FlightViewGroup = () => {
  const { data, updateData, apiToSearchFlight, pushSheetOnSelect, onClose } = MyReportWriteScreenViewModel.getState();

  const flightData = data.data.filter((element) => {
    return element.specification === 'Flight';
  })[0].data;

  const flightNo = flightData.flightNo;
  const departureDate = flightData.departureDate;

  //const [isShowFlightDetail, setShowFlightDetail] = useState(false);

  return (
    <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-mb-4 tw-h-full">
      <div className="tw-p-6 tw-bg-white tw-rounded-2xl tw-h-full tw-h-full tw-overflow-y-scroll scrollbar-hidden">
        {/* 출발일자 */}
        <div className="tw-p-3">
          <LabelType1 text={MYREPORT_DICT_SETUP.Common.Departure_Date[MYREPORT_LANG]} />
          <ReportDateType1
            type="date"
            date={departureDate}
            rightContents={<div className="av-flex-vertical-center">UTC</div>}
            onChange={(event) => {
              updateData({ specification: 'Flight', attribute: 'departureDate', value: event.target.value });
            }}
          />
        </div>

        {/* 비행편명 */}
        <div className="tw-p-3">
          <LabelType1 text={MYREPORT_DICT_SETUP.Common.Flight_No[MYREPORT_LANG]} />
          <ReportInputWithLeftLabel
            text={flightNo}
            leftLabel={'KE'}
            onChange={(event) => {
              updateData({ specification: 'Flight', attribute: 'flightNo', value: event.target.value });
            }}
          />
        </div>

        {/* 조회 */}
        <div className="tw-p-3">
          <ReportButtonType5
            text={MYREPORT_DICT_SETUP.Common.Search[MYREPORT_LANG]}
            onClick={async () => {
              await apiToSearchFlight();
            }}
          />
        </div>

        <div className={flightData.responseSearchFlight ? '' : 'tw-hidden'}>
          {/* 등록부호 */}
          <div className="tw-p-3">
            <LabelType1 text={MYREPORT_DICT_SETUP.Common.Registration_No[MYREPORT_LANG]} />
            <ReportInputWithLeftLabel
              leftLabel="HL"
              text={flightData.responseSearchFlight?.registrationNo}
              onChange={(event) => {
                updateData({
                  specification: 'Flight',
                  attribute: 'responseSearchFlight.registrationNo',
                  value: event.target.value,
                });
              }}
            />
          </div>

          {/* 항공기 형식 */}
          {/* <div className="tw-p-3">
            <LabelType1 text={`Aircraft Type`} />
            <ReportInputType1
              text={flightData.responseSearchFlight?.aircraftType}
              onChange={(event) => {
                updateData({
                  specification: 'Flight',
                  attribute: 'responseSearchFlight.aircraftType',
                  value: event.target.value,
                });
              }}
            />
          </div> */}

          {/* 점검기관 */}
          {(() => {
            const list = MYREPORT_DICT_SETUP.Common.Option.Aircraft_Type;

            const placeHolder = list.find(
              (element) => element.key === flightData.responseSearchFlight?.aircraftType
            )?.text;

            return (
              <div className="tw-p-3">
                <LabelType1 text={MYREPORT_DICT_SETUP.Common.Aircraft_Type[MYREPORT_LANG]} />
                <ReportSelectType1
                  onClick={() => {
                    const title = `Aircraft Type`;

                    pushSheetOnSelect({
                      title: title,
                      listOnSelect: list,
                      alreadyPicked: [],
                      onSelect: (selected) => {
                        updateData({
                          specification: 'Flight',
                          attribute: 'responseSearchFlight.aircraftType',
                          value: selected.key,
                        });
                        onClose();
                      },
                    });
                  }}
                  placeholder={placeHolder}
                />
              </div>
            );
          })()}

          {/* 출발공항 */}
          <div className="tw-p-3">
            <LabelType1 text={MYREPORT_DICT_SETUP.Common.From[MYREPORT_LANG]} />
            <ReportInputWithRightLabel
              rightLabel={MYREPORT_DICT_SETUP.Common.Search[MYREPORT_LANG]}
              text={flightData.responseSearchFlight?.from}
              onChange={(event) => {
                updateData({
                  specification: 'Flight',
                  attribute: 'responseSearchFlight.from',
                  value: event.target.value,
                });
              }}
            />
          </div>

          {/* 도착공항 */}
          <div className="tw-p-3">
            <LabelType1 text={MYREPORT_DICT_SETUP.Common.To[MYREPORT_LANG]} />
            <ReportInputWithRightLabel
              rightLabel={MYREPORT_DICT_SETUP.Common.Search[MYREPORT_LANG]}
              text={flightData.responseSearchFlight?.to}
              onChange={(event) => {
                updateData({
                  specification: 'Flight',
                  attribute: 'responseSearchFlight.to',
                  value: event.target.value,
                });
              }}
            />
          </div>

          {/* 회항 공항 */}
          <div className="tw-p-3">
            <LabelType1 text={MYREPORT_DICT_SETUP.Common.Divert[MYREPORT_LANG]} />
            <div className="tw-flex tw-gap-4">
              <ReportInputWithRightLabel
                rightLabel={MYREPORT_DICT_SETUP.Common.Search[MYREPORT_LANG]}
                text={flightData.responseSearchFlight?.divert?.loc}
                onChange={(event) => {
                  updateData({
                    specification: 'Flight',
                    attribute: 'responseSearchFlight.divert.loc',
                    value: event.target.value,
                  });
                }}
              />
            </div>
            <div className="tw-pt-3 tw-grid tw-grid-cols-3 md:tw-grid-cols-5 tw-gap-2">
              <div>
                <LabelType2 text={`STD`} />
                <ReportDateType1
                  type="time"
                  date={flightData.responseSearchFlight?.divert?.time?.std}
                  onChange={(event) => {
                    updateData({
                      specification: 'Flight',
                      attribute: 'responseSearchFlight.divert.time.std',
                      value: event.target.value,
                    });
                  }}
                />
              </div>
              <div className="">
                <LabelType2 text={`STA`} />
                <ReportDateType1
                  type="time"
                  date={flightData.responseSearchFlight?.divert?.time?.sta}
                  onChange={(event) => {
                    updateData({
                      specification: 'Flight',
                      attribute: 'responseSearchFlight.divert.time.sta',
                      value: event.target.value,
                    });
                  }}
                />
              </div>
              <div className="">
                <LabelType2 text={`ATD`} />
                <ReportDateType1
                  type="time"
                  date={flightData.responseSearchFlight?.divert?.time?.atd}
                  onChange={(event) => {
                    updateData({
                      specification: 'Flight',
                      attribute: 'responseSearchFlight.divert.time.atd',
                      value: event.target.value,
                    });
                  }}
                />
              </div>
              <div className="">
                <LabelType2 text={`ATA`} />
                <ReportDateType1
                  type="time"
                  date={flightData.responseSearchFlight?.divert?.time?.ata}
                  onChange={(event) => {
                    updateData({
                      specification: 'Flight',
                      attribute: 'responseSearchFlight.divert.time.ata',
                      value: event.target.value,
                    });
                  }}
                />
              </div>
              <div className="">
                <LabelType2 text={`DELAY`} />
                <ReportDateType1
                  type="time"
                  date={flightData.responseSearchFlight?.divert?.time?.delay}
                  onChange={(event) => {
                    updateData({
                      specification: 'Flight',
                      attribute: 'responseSearchFlight.divert.time.delay',
                      value: event.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>

          {/* 좌석수 */}
          <div className="tw-p-3">
            <LabelType1 text={MYREPORT_DICT_SETUP.Common.Supply[MYREPORT_LANG]} />
            <div className="tw-flex tw-gap-4">
              <LabelType2 text={`F`} addStyle={`av-flex-vertical-center`} />
              <ReportInputType1
                type="number"
                text={flightData.responseSearchFlight?.supply?.f}
                onChange={(event) => {
                  updateData({
                    specification: 'Flight',
                    attribute: 'responseSearchFlight.supply.f',
                    value: event.target.value,
                  });
                }}
              />
              <LabelType2 text={`C`} addStyle={`av-flex-vertical-center`} />
              <ReportInputType1
                type="number"
                text={flightData.responseSearchFlight?.supply?.c}
                onChange={(event) => {
                  updateData({
                    specification: 'Flight',
                    attribute: 'responseSearchFlight.supply.c',
                    value: event.target.value,
                  });
                }}
              />
              <LabelType2 text={`Y`} addStyle={`av-flex-vertical-center`} />
              <ReportInputType1
                type="number"
                text={flightData.responseSearchFlight?.supply?.y}
                onChange={(event) => {
                  updateData({
                    specification: 'Flight',
                    attribute: 'responseSearchFlight.supply.y',
                    value: event.target.value,
                  });
                }}
              />
            </div>
          </div>

          {/* 탑승자 */}
          <div className="tw-p-3">
            <LabelType1 text={MYREPORT_DICT_SETUP.Common.Check_In[MYREPORT_LANG]} />
            <div className="tw-flex tw-gap-4">
              <LabelType2 text={`F`} addStyle={`av-flex-vertical-center`} />
              <ReportInputType1
                type="number"
                text={flightData.responseSearchFlight?.checkIn?.f}
                onChange={(event) => {
                  updateData({
                    specification: 'Flight',
                    attribute: 'responseSearchFlight.checkIn.f',
                    value: event.target.value,
                  });
                }}
              />
              <LabelType2 text={`C`} addStyle={`av-flex-vertical-center`} />
              <ReportInputType1
                type="number"
                text={flightData.responseSearchFlight?.checkIn?.c}
                onChange={(event) => {
                  updateData({
                    specification: 'Flight',
                    attribute: 'responseSearchFlight.checkIn.c',
                    value: event.target.value,
                  });
                }}
              />
              <LabelType2 text={`Y`} addStyle={`av-flex-vertical-center`} />
              <ReportInputType1
                type="number"
                text={flightData.responseSearchFlight?.checkIn?.y}
                onChange={(event) => {
                  updateData({
                    specification: 'Flight',
                    attribute: 'responseSearchFlight.checkIn.y',
                    value: event.target.value,
                  });
                }}
              />
            </div>
          </div>

          {/* Cabin Crew */}
          <div className="tw-p-3">
            <LabelType1 text={MYREPORT_DICT_SETUP.CSR.Cabin_Crew[MYREPORT_LANG]} />
            <div className="tw-flex tw-gap-4">
              <ReportInputWithRightLabel rightLabel={MYREPORT_DICT_SETUP.Common.Search[MYREPORT_LANG]} />
            </div>
            {(() => {
              return flightData.responseSearchFlight?.cabinCrew?.map((element, index) => {
                return (
                  <div
                    className="tw-grid tw-grid-cols-[1fr,1fr,1fr,1fr,0.5fr] tw-gap-4 tw-border-solid tw-border-b-[1px] tw-border-slate-300 tw-p-4"
                    key={index}
                  >
                    <div>{element.name}</div>
                    <div>{element.department}</div>
                    <div>{element.office}</div>
                    <div>{element.position}</div>
                    <div>
                      <button type="button" id="name" name="name" className="av-button-3" onClick={() => {}}>
                        {MYREPORT_DICT_SETUP.Common.Delete[MYREPORT_LANG]}
                      </button>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};
