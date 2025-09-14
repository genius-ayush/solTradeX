import Footer from "@/components/LandingPage.tsx/Footer";
import Header from "@/components/LandingPage.tsx/Header";
import Landing from "@/components/LandingPage.tsx/Landing";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
      <div className="dark:bg-[#111314]  bg-[#ece8e8]">
      <Header/>
      <Landing/>
      <Footer/>
      </div>
    
  );
}
