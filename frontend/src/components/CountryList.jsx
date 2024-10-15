'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/available-countries`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setHasError(true);
        setIsLoading(false);
      }
    }

    fetchCountries();
  }, []);

  if (isLoading) {
    return <div>Loading countries...</div>;
  }

  if (hasError) {
    return <div>Error loading countries. Please try again later.</div>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {countries.map((country) => (
        <li
          key={country.countryCode}
          className="bg-white shadow rounded-lg p-4"
        >
          <Link
            href={`/country/${country.countryCode}`}
            className="text-blue-600 hover:underline"
          >
            {country.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CountryList;
