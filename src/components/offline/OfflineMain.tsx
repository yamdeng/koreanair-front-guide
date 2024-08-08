import { useNavigate } from 'react-router-dom';

export default function OfflineMain() {
  const navigate = useNavigate();

  let baseTabStyleOn = `tw-px-3 tw-bg-slate-200 tw-py-3 tw-mx-2 tw-rounded-t-xl`;
  let baseTabStyleOff = `${baseTabStyleOn} tw-text-white tw-bg-slate-500`;

  return (
    <div className="tw-bg-slate-400 tw-rounded-2xl tw-p-10">

      <div className="tw-flex tw-w-full tw-gap-5">
        "OFFLINE"
      </div>

    </div>
  );
}
