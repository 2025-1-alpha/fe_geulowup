import { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  onClose: () => void;
};
export default function Toast({ message, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 500);

    const removeTimer = setTimeout(() => {
      onClose();
    }, 800);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  return (
    <section
      className={`button-lg fixed top-1/2 left-1/2 z-50 flex h-[68px] w-[300px] -translate-x-1/2 transform items-center justify-center ${visible ? '-translate-y-1/2' : '-translate-y-0'} bg-layout-grey6 text-layout-white rounded-lg px-4 py-2 shadow-lg transition-all duration-300 ease-out ${visible ? 'opacity-100' : 'opacity-0'} `}
    >
      {message}
    </section>
  );
}
