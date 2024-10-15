import { Suspense } from "react";
import CountryList from "../components/CountryList";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Country Info App</h1>
      <Suspense fallback={<div>Loading countries...</div>}>
        <CountryList />
      </Suspense>
    </main>
  );
}
