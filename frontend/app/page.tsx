import Hero from "@/components/hero";
import { AuthButtons } from "@/components/landing-page/auth-buttons";
import InfoTabs from "@/components/landing-page/info-tabs";

export default async function Home() {
  return (
    <>
      <main className=" flex flex-col gap-6 px-4 items-center ">
        <Hero />
        <InfoTabs />
        <AuthButtons />
      </main>
    </>
  );
}
