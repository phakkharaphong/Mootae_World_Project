import { NavigationMenuDemo } from "@/components/AppHeader";
import { FooterBar } from "@/components/Footer";

export default function FOMLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationMenuDemo />
      {children}
      <FooterBar />
    </>
  );
}
