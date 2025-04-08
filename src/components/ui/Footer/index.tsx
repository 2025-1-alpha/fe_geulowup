import Logo from '@/assets/logo.svg';

export default function Footer() {
  return (
    <footer className="bg-layout-grey1 mx-auto mt-[140px] flex min-w-screen items-center justify-between px-24 pt-6 pb-[42px]">
      <div className="flex flex-col">
        <Logo />
        <p className="detail text-layout-grey6">Copyright(c)2025</p>
      </div>
      <div className="flex gap-3">
        <p className="body-sst text-layout-grey6 flex">문의 이메일</p>
        <p className="body-sm text-layout-grey6 flex">temp@kookmin.ac.kr</p>
      </div>
    </footer>
  );
}
