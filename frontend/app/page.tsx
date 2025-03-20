import Hero from "@/components/hero";
import { AuthButtons } from "@/components/landing-page/auth-buttons";
import InfoTabs from "@/components/landing-page/info-tabs";
import Particles from "@/components/ui/particles";

export default async function Home() {
  return (
    <>
      <main className=" flex flex-col gap-6 px-4 items-center ">
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={1000}
        />
        <Hero />
        <InfoTabs />
        <AuthButtons />
      </main>
    </>
  );
}
