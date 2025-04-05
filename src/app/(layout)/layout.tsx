import Header from '@/components/ui/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <footer></footer>
    </>
  );
}
