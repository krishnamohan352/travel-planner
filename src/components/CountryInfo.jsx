import useFetch from "../hook/useFetch";

function CountryInfo({ code }) {
  const { data } = useFetch(
    code
      ? `${import.meta.env.VITE_REST_COUNTRIES_API_URL}/v3.1/alpha/${code}`
      : null
  );

  const country = data?.[0];

  if (!country) return null;

  return (
    <>
      <img
        src={country.flags?.png}
        alt="flag"
        className="w-16 h-12 object-cover rounded-md shadow"
      />

      <div>
        <p className="font-semibold text-black dark:text-white">
          {country.capital?.[0] || "N/A"}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {country.population?.toLocaleString()}
        </p>
      </div>
    </>
  );
}

export default CountryInfo;