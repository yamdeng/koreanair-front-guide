import { v4 as uuidv4 } from 'uuid';

export const ModalDimmedScreen = (params) => {
  const { contents: Contents } = params;

  return (
    <div
      key={uuidv4()}
      className={`tw-fixed tw-p-4 tw-inset-0 tw-bg-black tw-bg-opacity-70 tw-flex tw-items-center tw-justify-center tw-z-20 tw-transition-opacity tw-duration-300`}
    >
      <div className="tw-h-full tw-overflow-scroll tw-flex tw-p-6 tw-rounded-lg tw-w-full">
        <Contents />
      </div>
    </div>
  );
};
