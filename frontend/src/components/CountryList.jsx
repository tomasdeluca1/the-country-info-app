'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error loading countries. Please try again later.</span>
        </div>
      </div>
    );
  }

  return (
    <motion.ul
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-semibold text-center text-base-content mb-2 col-span-full"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Countries List
      </motion.h1>
      {countries.map((country, index) => (
        <motion.li
          key={country.countryCode}
          className="card "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link
            href={`/country/${country.countryCode}`}
            className={`btn btn-primary bg-primary/80 glass hover:bg-primary  duration-300 text-base-100 font-bold my-1 md:my-2 btn-lg transition-all  scale-95 hover:scale-100`}
          >
            {country.name}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default CountryList;
