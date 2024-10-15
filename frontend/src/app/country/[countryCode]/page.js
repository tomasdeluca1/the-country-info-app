import { Suspense } from "react";
import CountryInfo from "../../../components/CountryInfo";

export default function CountryPage({ params }) {
  const { countryCode } = params;

  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading country information...</div>}>
        <CountryInfo countryCode={countryCode} />
      </Suspense>
    </main>
  );
}
