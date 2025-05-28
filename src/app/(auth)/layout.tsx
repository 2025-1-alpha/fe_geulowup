import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  image: ReactNode;
  content: ReactNode;
};

export default function AuthLayout({ children, content, image }: Props) {
  return (
    <div className="flex min-h-screen">
      {children ? (
        <div className="flex w-full items-center justify-center">{children}</div>
      ) : (
        <>
          <div className="flex w-1/2 items-center justify-center">{content}</div>
          <div className="relative w-1/2">{image}</div>
        </>
      )}
    </div>
  );
}
