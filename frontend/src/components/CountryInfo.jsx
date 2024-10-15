'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
    return (
      <motion.div
        className="flex justify-center items-center h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="alert alert-error shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
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
          <span>Error loading country information: {error}</span>
        </div>
      </motion.div>
    );
  }

  if (!countryInfo) {
    return (
      <motion.div
        className="alert alert-info shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        No country information available.
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between bg-base-100 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-primary">
              {countryInfo.name}
            </h1>
            {countryInfo.flag && (
              <Image
                src={countryInfo.flag}
                alt={`Flag of ${countryInfo.name}`}
                width={60}
                height={40}
                className="rounded-lg shadow-md"
              />
            )}
          </div>
          <Link href="/" className="btn btn-primary text-white">
            Back to country list
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <BorderCountries borderCountries={countryInfo.borderCountries} />

          {countryInfo.populationData && (
            <motion.div
              className="card bg-base-100 shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="card-body">
                <h2 className="card-title text-primary">Population Data</h2>
                <PopulationChart populationData={countryInfo.populationData} />
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CountryInfo;
