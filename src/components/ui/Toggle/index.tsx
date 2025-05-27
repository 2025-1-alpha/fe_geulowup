'use client';

type ToggleProps = {
  isOn: boolean;
  onToggle: () => void;
};

export default function Toggle({ isOn, onToggle }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="bg-layout-grey2 border-layout-grey3 flex h-[26px] w-[42px] items-center rounded-[14px] border p-0.5"
    >
      <div
        className={`text-layout-white h-[21px] w-[21px] transform rounded-full shadow-md transition-transform ${
          isOn ? '' : 'translate-x-[16px]'
        } flex items-center justify-center text-[8px] text-gray-700 ${
          isOn ? 'bg-primary-navy4' : 'bg-layout-grey5'
        }`}
      >
        {isOn ? 'ON' : 'OFF'}
      </div>
    </button>
  );
}
