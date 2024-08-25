import { useEffect, useRef } from 'react';
import { create, useStore } from 'zustand';
import { ReportButtonType2, ReportInputType1, ReportSelectType1, SelectSingleFormView } from '../../custom/CustomForms';
import { CloseIconView, LabelType1 } from '../../custom/CustomView';
import { pickupOptionsLanguage } from '../../utils/Function';
import { MyReportWriteScreenViewModel } from '../../viewModels/MyReportWriteScreenViewModel';
import { MYREPORT_DICT_SETUP, MYREPORT_LANG } from '../../configs/WriteScreenConfig';

const CSRPersonInvolvedDetailViewModel = create<any>((set, get) => ({
  paxFormValue: {},
  crewFormValue: {},
  cleanFormValue: () => {
    set({
      paxFormValue: {
        type: null,
        name: null,
        sex: null,
        age: null,
        nationality: null,
        seatNo: null,
      },
      crewFormValue: {
        type: null,
        name: null,
      },
    });
  },
  paxChangeInput: (inputName, inputValue) => {
    const { paxFormValue } = get();
    paxFormValue[inputName] = inputValue;
    set({ paxFormValue: paxFormValue });
  },
  crewChangeInput: (inputName, inputValue) => {
    const { crewFormValue } = get();
    crewFormValue[inputName] = inputValue;
    set({ crewFormValue: crewFormValue });
  },
}));

export const CSRPersonInvolvedDetailViewGroup = () => {
  const { data, updateData, onDefaultBottomSheet, pushSheetOnSelect, onClose } =
    MyReportWriteScreenViewModel.getState();

  const { paxChangeInput, crewChangeInput, cleanFormValue } = useStore(
    CSRPersonInvolvedDetailViewModel,
    (state) => state
  ) as any;

  const personalInvolvedDetailData = data.data.filter((element) => {
    return element.specification === 'Person Involved Detail';
  })[0].data;

  const addPaxButton = useRef(null);
  const addCrewButton = useRef(null);

  useEffect(() => {
    if (addPaxButton.current) {
      //addPaxButton.current.click();
    }
    if (addCrewButton.current) {
      // addCrewButton.current.click();
    }
  }, []);

  // console.log(`paxFormValue: ${paxFormValue.name}`);

  const paxData = personalInvolvedDetailData.pax;
  const crewData = personalInvolvedDetailData.crew;

  return (
    <>
      <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-mb-4 tw-h-full">
        <div className="tw-p-6 tw-bg-white tw-rounded-2xl tw-h-full tw-h-full tw-overflow-y-scroll">
          <div className="">
            {/* PAX */}
            <div className="tw-my-5">
              <span className="tw-rounded-lg tw-bg-slate-200 tw-px-4 tw-py-1">
                {MYREPORT_DICT_SETUP.CSR.Pax[MYREPORT_LANG]}
              </span>
            </div>
            <div className="tw-grid tw-grid-cols-6 tw-gap-4 tw-border-solid tw-border-b-[1px] tw-border-slate-300 tw-p-4">
              <div>{MYREPORT_DICT_SETUP.Common.Category[MYREPORT_LANG]}</div>
              <div>{MYREPORT_DICT_SETUP.Common.Name[MYREPORT_LANG]}</div>
              <div>{MYREPORT_DICT_SETUP.Common.Sex[MYREPORT_LANG]}</div>
              <div>{MYREPORT_DICT_SETUP.Common.Age[MYREPORT_LANG]}</div>
              <div>{MYREPORT_DICT_SETUP.Common.Nationality[MYREPORT_LANG]}</div>
              <div>{MYREPORT_DICT_SETUP.CSR.SeatNo[MYREPORT_LANG]}</div>
            </div>
            {(() => {
              return paxData.map((element, index) => {
                return (
                  <div
                    className="tw-grid tw-grid-cols-6 tw-gap-4 tw-border-solid tw-border-b-[1px] tw-border-slate-300 tw-p-4"
                    key={index}
                  >
                    <div>{element.type}</div>
                    <div>{element.name}</div>
                    <div>{element.sex}</div>
                    <div>{element.age}</div>
                    <div>{element.nationality}</div>
                    <div>{element.seatNo}</div>
                  </div>
                );
              });
            })()}

            <div className="tw-mt-10">
              <button
                ref={addPaxButton}
                onClick={() => {
                  // 데이터 초기화 이후, formValue를 state에서 읽어와서 지역변수로 다시 할당
                  const { paxFormValue } = CSRPersonInvolvedDetailViewModel.getState();

                  onDefaultBottomSheet({
                    contents: () => {
                      const validation = () => {
                        for (const [key, value] of Object.entries(paxFormValue)) {
                          console.log(`key: ${key}, value: ${value}`);
                          if (!value) {
                            alert(`${key}값이 입력되지 않았습니다`);
                            return validation;
                          }
                        }

                        const updated = [...paxData, { ...paxFormValue }];

                        // 완료되면 최종 저장
                        updateData({ specification: 'Person Involved Detail', attribute: 'pax', value: updated });
                        onClose();
                        cleanFormValue();
                      };

                      return (
                        <div className="tw-bg-slate-300 tw-rounded-t-2xl tw-p-6">
                          <div className="tw-flex tw-justify-between tw-pb-6">
                            <div className="tw-text-3xl">{MYREPORT_DICT_SETUP.CSR.Pax[MYREPORT_LANG]}</div>
                            <CloseIconView onClose={onClose} />
                          </div>

                          <div className="tw-grid tw-grid-cols">
                            <div className="tw-flex">
                              {/* 종류 */}
                              {(() => {
                                const list = pickupOptionsLanguage(
                                  MYREPORT_DICT_SETUP.CSR.Option.Person_Involved_Detail,
                                  MYREPORT_LANG
                                );

                                return (
                                  <div className="tw-p-3 tw-basis-1/2">
                                    <LabelType1 text={MYREPORT_DICT_SETUP.CSR.Pax[MYREPORT_LANG]} />
                                    <ReportSelectType1
                                      onClick={() => {
                                        const title = MYREPORT_DICT_SETUP.CSR.Pax[MYREPORT_LANG];
                                        pushSheetOnSelect({
                                          title: title,
                                          listOnSelect: list,
                                          alreadyPicked: paxFormValue.type?.key ? [paxFormValue.type?.key] : null,
                                          onSelect: (selected) => {
                                            paxChangeInput('type', selected);
                                            onClose();
                                          },
                                        });
                                      }}
                                      placeholder={paxFormValue.type?.text ? paxFormValue.type?.text : null}
                                    />
                                  </div>
                                );
                              })()}

                              {/* 이름 */}
                              <div className="tw-p-3 tw-basis-1/2">
                                <LabelType1 text={MYREPORT_DICT_SETUP.Common.Name[MYREPORT_LANG]} />
                                <ReportInputType1
                                  onChange={(event) => {
                                    paxChangeInput('name', event.target.value);
                                  }}
                                />
                              </div>
                            </div>

                            {/* 성별 */}
                            <div className="tw-p-3">
                              <SelectSingleFormView
                                title={MYREPORT_DICT_SETUP.Common.Sex[MYREPORT_LANG]}
                                list={pickupOptionsLanguage(MYREPORT_DICT_SETUP.CSR.Option.Person_Sex, MYREPORT_LANG)}
                                selectedKey={paxFormValue.sex}
                                defineCols={2}
                                hasLabel={true}
                                customStyle={`tw-grid tw-gap-4 tw-grid-cols-2 xl:tw-grid-cols-4`}
                                onSelect={(key) => {
                                  paxChangeInput('sex', key);
                                }}
                              />
                            </div>

                            <div className="tw-flex tw-flex-row">
                              {/* 연령 */}
                              <div className="tw-p-3">
                                <LabelType1 text={MYREPORT_DICT_SETUP.Common.Age[MYREPORT_LANG]} />
                                <ReportInputType1
                                  onChange={(event) => {
                                    paxChangeInput('age', event.target.value);
                                  }}
                                />
                              </div>

                              {/* 국적 */}
                              <div className="tw-p-3">
                                <LabelType1 text={MYREPORT_DICT_SETUP.Common.Nationality[MYREPORT_LANG]} />
                                <ReportInputType1
                                  onChange={(event) => {
                                    paxChangeInput('nationality', event.target.value);
                                  }}
                                />
                              </div>

                              {/* 좌석번호 */}
                              <div className="tw-p-3">
                                <LabelType1 text={MYREPORT_DICT_SETUP.CSR.SeatNo[MYREPORT_LANG]} />
                                <ReportInputType1
                                  onChange={(event) => {
                                    paxChangeInput('seatNo', event.target.value);
                                  }}
                                />
                              </div>
                            </div>

                            {/* 저장/취소 */}
                            <div className="tw-p-3 tw-mt-5">
                              <div className="tw-flex tw-gap-4">
                                <ReportButtonType2
                                  text={MYREPORT_DICT_SETUP.Common.Save[MYREPORT_LANG]}
                                  onClick={() => {
                                    validation();
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  });
                }}
                className="av-input-1 tw-rounded-lg"
              >
                추가
              </button>
            </div>

            {/* CREW */}
            <div className="tw-my-5 tw-mt-10">
              <span className="tw-rounded-lg tw-bg-slate-200 tw-px-4 tw-py-1">
                {MYREPORT_DICT_SETUP.CSR.Crew[MYREPORT_LANG]}
              </span>
            </div>
            <div className="tw-grid tw-grid-cols-[25%,75%] tw-gap-4 tw-border-solid tw-border-b-[1px] tw-border-slate-300 tw-p-4">
              <div>구분</div>
              <div>이름</div>
            </div>
            {(() => {
              return crewData.map((element, index) => {
                return (
                  <div
                    className="tw-grid tw-grid-cols-[25%,75%] tw-gap-4 tw-border-solid tw-border-b-[1px] tw-border-slate-400 tw-p-4"
                    key={index}
                  >
                    <div>{element.type}</div>
                    <div>{element.name}</div>
                  </div>
                );
              });
            })()}

            <div className="tw-mt-10">
              <button
                ref={addCrewButton}
                onClick={() => {
                  // 데이터 초기화 이후, formValue를 state에서 읽어와서 지역변수로 다시 할당
                  const { crewFormValue } = CSRPersonInvolvedDetailViewModel.getState();

                  onDefaultBottomSheet({
                    contents: () => {
                      const validation = () => {
                        for (const [key, value] of Object.entries(crewFormValue)) {
                          console.log(`key: ${key}, value: ${value}`);
                          if (!value) {
                            alert(`${key}값이 입력되지 않았습니다`);
                            return validation;
                          }
                        }

                        const updated = [...crewData, { ...crewFormValue }];

                        // 완료되면 최종 저장
                        updateData({ specification: 'Person Involved Detail', attribute: 'crew', value: updated });
                        onClose();
                        cleanFormValue();
                      };

                      return (
                        <div className="tw-bg-slate-300 tw-rounded-t-2xl tw-p-6 tw-h-full">
                          <div className="tw-flex tw-justify-between tw-pb-6">
                            <div className="tw-text-3xl">{MYREPORT_DICT_SETUP.CSR.Crew[MYREPORT_LANG]}</div>
                            <CloseIconView onClose={onClose} />
                          </div>

                          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2">
                            <div className="tw-flex">
                              {/* 종류 */}
                              {(() => {
                                const list = pickupOptionsLanguage(
                                  MYREPORT_DICT_SETUP.CSR.Option.Person_Involved_Detail,
                                  MYREPORT_LANG
                                );

                                return (
                                  <div className="tw-p-3 tw-basis-1/2">
                                    <label className="av-label-1">
                                      {MYREPORT_DICT_SETUP.CSR.Inspection_Dept[MYREPORT_LANG]}
                                    </label>
                                    <ReportSelectType1
                                      onClick={() => {
                                        const title = MYREPORT_DICT_SETUP.CSR.Inspection_Dept[MYREPORT_LANG];
                                        pushSheetOnSelect({
                                          title: title,
                                          listOnSelect: list,
                                          alreadyPicked: crewFormValue.type?.key ? [crewFormValue.type?.key] : null,
                                          onSelect: (selected) => {
                                            crewChangeInput('type', selected);
                                            onClose();
                                          },
                                        });
                                      }}
                                      placeholder={crewFormValue.type?.text ? crewFormValue.type?.text : null}
                                    />
                                  </div>
                                );
                              })()}

                              {/* 이름 */}
                              <div className="tw-p-3 tw-basis-1/2">
                                <label className="av-label-1">{MYREPORT_DICT_SETUP.Common.Name[MYREPORT_LANG]}</label>
                                <ReportInputType1
                                  onChange={(event) => {
                                    crewChangeInput('name', event.target.value);
                                  }}
                                />
                              </div>
                            </div>

                            {/* 저장/취소 */}
                            <div className="tw-p-3 md:tw-col-span-2 tw-mt-5">
                              <div className="tw-flex tw-gap-4">
                                <ReportButtonType2
                                  text={MYREPORT_DICT_SETUP.Common.Save[MYREPORT_LANG]}
                                  onClick={() => {
                                    validation();
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  });
                }}
                className="av-input-1 tw-rounded-lg"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
