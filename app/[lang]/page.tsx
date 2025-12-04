import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Navigation from "@/components/Navigation";
import Structure from "@/components/Structure";
import Clusters from "@/components/Clusters";
import Systems from "@/components/Systems";
import Benefits from "@/components/Benefits";
import Pilot from "@/components/Pilot";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation dict={dict.nav} lang={lang} />
      <Hero dict={dict.hero} />
      <About dict={dict.about} />
      <Structure dict={dict.structure} />
      <Clusters dict={dict.clusters} />
      <Systems regionalDict={dict.regional} localDict={dict.local} />
      <Benefits dict={dict.benefits} />
      <Pilot pilotDict={dict.pilot} economyDict={dict.economy} lang={lang} />
      <Footer dict={dict.contact} />
    </main>
  );
}
