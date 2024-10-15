import { Suspense } from 'react';
import CountryList from '../components/CountryList';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <Suspense fallback={<div>Loading countries...</div>}>
        <CountryList />
      </Suspense>
    </main>
  );
}
