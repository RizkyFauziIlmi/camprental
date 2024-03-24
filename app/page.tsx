import { LandingBanner } from "@/components/landing/landing-banner";
import { LandingContact } from "@/components/landing/landing-contact";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingHeader } from "@/components/landing/landing-header";

export default function Home() {
  return (
    <main>
      <div className="p-4">
        <LandingHeader />
        <LandingBanner />
        <LandingFeatures />
      </div>
      <LandingContact />
    </main>
  );
}
