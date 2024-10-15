import Link from 'next/link';

function BorderCountries({ borderCountries }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Border Countries</h2>
      {borderCountries.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {borderCountries.map((country) => (
            <li
              key={country.countryCode}
              className="bg-gray-100 rounded-md px-3 py-1"
            >
              <Link
                href={`/country/${country.countryCode}`}
                className="text-blue-600 hover:underline"
              >
                {country.commonName}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>This country has no bordering countries.</p>
      )}
    </div>
  );
}

export default BorderCountries;
