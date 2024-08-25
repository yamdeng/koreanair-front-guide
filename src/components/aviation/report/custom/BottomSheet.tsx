import { useEffect, useRef, useState } from 'react';
import { MYREPORT_DICT_SETUP, MYREPORT_LANG } from '../configs/WriteScreenConfig';
import { ReportButtonType3, ReportButtonType4 } from './CustomForms';

export const BottomSheetLayout = (params) => {
  const { isShow, onClose, jsx } = params;

  const open = isShow ? 'tw-open' : '';
  const css = `tw-absolute tw-bottom-0 tw-bottom-sheet ${open} tw-transition tw-transition-transform tw-duration-300 tw-ease-in-out tw-left-0 tw-w-full tw-text-white tw-rounded-t-lg tw-shadow-lg`;

  return (
    <>
      <div
        className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-70 tw-rounded-lg"
        onClick={() => {
          onClose();
        }}
      ></div>
      <div className={css}>{jsx()}</div>
    </>
  );
};

export const BottomSheetLayoutWhenWrite = (params) => {
  const { isShow, onClose, jsx } = params;

  const open = isShow ? 'tw-open' : '';
  const css = `tw-absolute tw-bottom-0 tw-bottom-sheet ${open} tw-transition tw-transition-transform tw-duration-300 tw-ease-in-out tw-left-0 tw-w-full tw-text-white tw-shadow-lg`;

  return (
    <>
      <div
        className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-50 tw-rounded-2xl"
        onClick={() => {
          onClose();
        }}
      ></div>
      <div className={css}>{jsx()}</div>
    </>
  );
};

export const SheetAddReport = (params) => {
  const { category } = params;

  return (
    <div className="tw-bg-slate-300 tw-rounded-t-2xl tw-p-6">
      {/* 보고서 종류 */}
      <div className="tw-w-full tw-pb-6 tw-text-3xl">{MYREPORT_DICT_SETUP.Common.ReportCategory[MYREPORT_LANG]}</div>
      <div className="tw-flex tw-gap-4 tw-flex-col">
        {(() => {
          return category.map((element) => {
            return ReportButtonType3({ text: element.text, onClick: element.onClick, key: element.text });
          });
        })()}
      </div>
    </div>
  );
};

export const SheetDefaultSelect = (params) => {
  const { title, list, alreadyPicked, onSelect } = params;

  const [selectList, setSelectedList] = useState([]);

  useEffect(() => {
    if (alreadyPicked) {
      const newList = list.map((item) => ({
        ...item,
        isSelected: alreadyPicked.includes(item.key),
      }));
      setSelectedList(newList);
    } else {
      setSelectedList(list);
    }
  }, [list, alreadyPicked]);

  const onChangeSelectedItem = (item) => {
    const newList = selectList.map((element) => {
      element.isSelected = element.key === item.key;
      return element;
    });
    setSelectedList(newList);
  };

  const sheetRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const containerHeight = rootRef.current.parentNode?.parentNode?.offsetHeight ?? 0.0;
      //console.log(`containerHeight: ${containerHeight}, sheetHeight: ${sheetRef.current.offsetHeight}`);

      if (sheetRef.current && sheetRef.current.offsetHeight > 0) {
        const sheetHeight = sheetRef.current.offsetHeight;

        if (sheetHeight * 1.1 > containerHeight) {
          sheetRef.current.style.height = `${containerHeight * 0.7}px`;
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (sheetRef.current) {
      resizeObserver.observe(sheetRef.current);
      resizeObserver.observe(rootRef.current.parentNode.parentNode);
    }

    // 컴포넌트 언마운트 시 observer 해제
    return () => {
      if (sheetRef.current) {
        resizeObserver.unobserve(sheetRef.current);
        resizeObserver.unobserve(rootRef.current.parentNode.parentNode);
      }
    };
  }, []);

  return (
    <div ref={rootRef} className={`tw-bg-slate-300 tw-rounded-t-2xl tw-p-6`}>
      {/* 보고서 종류 */}
      <div className="tw-pb-6 tw-text-3xl tw-h-[50px]">{title}</div>
      <div
        ref={sheetRef}
        className="tw-grid tw-gap-4 tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-4 tw-overflow-y-scroll scrollbar-hidden"
      >
        {(() => {
          return selectList.map((element, index) => {
            return (
              <ReportButtonType4
                key={index}
                item={element}
                onClick={() => {
                  onChangeSelectedItem(element);
                  setTimeout(() => {
                    onSelect(element);
                  }, 200);
                }}
              />
            );
          });
        })()}
      </div>
    </div>
  );
};
