import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { SheetSettingFilter } from './forms/write';

// let sheets = [];

// const initailState = {
//   currentIndex: 0,
//   dimmedJSX: () => {},
//   pushSheet: () => {},
//   popSheet: () => {},
//   render: () => {}
// };

// export const SheetManager2 = create<any>((set, get) => ({
//   ...initailState,
//   dimmedJSX: () => {
//     const { popSheet } = get()
//     return (<div className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-40 tw-rounded-lg" onClick={() => { popSheet() }}></div>)
//   },
//   pushSheet: (jsx) => {
//     const { currentIndex } = get()
//     sheets.push({ isShow: false, jsx: jsx})
//   },
//   popSheet: () => {
//     const { currentIndex } = get()
//     sheets.pop()
//   },
//   showSheet: () => {
//     const { currentIndex } = get()
//     sheets = sheets.map((element, index) => {
//       element.isShow = true
//       return element
//     })
//     set({currentIndex: currentIndex+1})
//   },
//   render: () => {
//     const { dimmedJSX } = get()
//     return sheets.map((element, index) => {
//       const open = element.isShow ? "tw-open" : ""
//       return (
//         <>
//           {dimmedJSX()}
//           <div className={`tw-absolute tw-bottom-0 tw-bottom-sheet ${open} tw-transition tw-transition-transform tw-duration-300 tw-ease-in-out tw-left-0 tw-w-full tw-text-white tw-rounded-t-lg tw-shadow-lg`}>
//             {element.jsx}
//           </div>
//         </>
//       )
//     })
//   }
// }))