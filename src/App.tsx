import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Country from "./components/Country";
import { CountryType } from "./types";

function App() {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCountries = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<CountryType[]>(
        "https://restcountries.eu/rest/v2/all"
      );
      setCountries(data);
    } catch {
      console.log("error...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      {loading
        ? "Loading..."
        : countries.map((country) => {
            return <Country key={country.name} country={country} />;
          })}
    </div>
  );
}

export default App;
