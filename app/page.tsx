"use client";

import SiteHeader from "@/components/SiteHeader";
import { DiamondButton } from "@/components/DiamondNav";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="home-wrap">
      <SiteHeader section="INTRO" />

      <div className="home-side left">
        <DiamondButton label="DISCOVER" variant="white" onClick={() => router.push("/analysis/introduce")} />
      </div>

      <div className="home-side right">
        <DiamondButton label="START" variant="black" onClick={() => router.push("/analysis/introduce")} />
      </div>

      <div className="home-center">
        <h1 className="home-title">Sophisticated<br />skincare</h1>
        <div className="home-sub">
          Skinstric developed an A.I. that creates a<br />
          highly-personalized routine tailored to<br />
          what your skin needs.
        </div>
      </div>
    </main>
  );
}
