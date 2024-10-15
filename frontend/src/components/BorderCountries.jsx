import Link from 'next/link';
import { motion } from 'framer-motion';

function BorderCountries({ borderCountries }) {
  return (
    <motion.div
      className="card bg-base-100 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-body">
        <motion.h2
          className="card-title text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Border Countries
        </motion.h2>
        {borderCountries.length > 0 ? (
          <motion.ul
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {borderCountries.map((country) => (
              <motion.li
                key={country.countryCode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/country/${country.countryCode}`}
                  className="btn btn-outline btn-primary btn-sm"
                >
                  {country.commonName}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.p
            className="text-center italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            This country has no bordering countries.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default BorderCountries;
