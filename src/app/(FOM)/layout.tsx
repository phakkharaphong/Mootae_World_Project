import FOMHeader from './FOMHeader';
import FOMFooter from './FOMFooter';

export default function FOMLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FOMHeader />
      {children}
      <FOMFooter />
    </>
  );
}
