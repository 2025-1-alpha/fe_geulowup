import { ReactNode } from 'react';

type Props = {
  image: ReactNode;
  content: ReactNode;
};

export default function AuthLayout({ content, image }: Props) {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-1/2 items-center justify-center">{content}</div>

      <div className="relative w-1/2">{image}</div>
    </div>
  );
}
