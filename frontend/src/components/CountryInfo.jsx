'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PopulationChart from './PopulationChart';
import BorderCountries from './BorderCountries';

function CountryInfo({ countryCode }) {
  const [countryInfo, setCountryInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountryInfo() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/country-info/${countryCode}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setCountryInfo(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching country information:', error);
        setError(error.message);
        setIsLoading(false);
      }
    }

    fetchCountryInfo();
  }, [countryCode]);

  if (isLoading) {
    return <div>Loading country information...</div>;
  }

  if (error) {
    return <div>Error loading country information: {error}</div>;
  }

  if (!countryInfo) {
    return <div>No country information available.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold">{countryInfo.name}</h1>
        {countryInfo.flag && (
          <Image
            src={countryInfo.flag}
            alt={`Flag of ${countryInfo.name}`}
            width={60}
            height={40}
          />
        )}
      </div>

      <BorderCountries borderCountries={countryInfo.borderCountries} />

      {countryInfo.populationData && (
        <PopulationChart populationData={countryInfo.populationData} />
      )}

      <Link href="/" className="text-blue-600 hover:underline">
        Back to country list
      </Link>
    </div>
  );
}

export default CountryInfo;
