import MyReportWriteScreen from '../aviation/report/MyReportWriteScreen';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const OfflineWriteReportViewModel = create<any>((set, get) => ({
//   categoryData: (() => {
//     const typeData = ReportConfig.filter((element) => {
//       return element.type === 'CSR';
//     })[0];

//     const categoryData = typeData.data.filter((element) => {
//       return element.category === 'Inspection';
//     })[0];

//     return categoryData;
//   })(),
// }));

export default function OfflineWriteReport() {
  // const { categoryData } = useStore(OfflineWriteReportViewModel, (state) => state) as any;

  return (
    <>
      <div className="tw-h-full">
        <MyReportWriteScreen categoryData={null} />
      </div>
    </>
  );
}
