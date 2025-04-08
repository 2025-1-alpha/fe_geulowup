import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
