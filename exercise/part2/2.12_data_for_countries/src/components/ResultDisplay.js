import ShowButton from "./ShowButton";
import CountryView from "./CountryView";
import { useState } from 'react'

const ResultDisplay = ({ countryList }) => {
  const [countryToShowDetails, setCountryToShowDetails] = useState('');

  if (countryToShowDetails) {
    return <CountryView targetCountry={countryToShowDetails}/>
  }
  if (countryList.length > 10) {
    return <>Too many matches, specify another filter</>
  }
  if (countryList.length === 1) {
    return <CountryView targetCountry={countryList[0]}/>
  }
  return (
    <>
      {countryList.map(country => (
        <div key={country.name.common}>
          {country.name.common} <ShowButton targetCountry={country} handleClick={setCountryToShowDetails}/>
        </div>))
      }
    </>
  )
}

export default ResultDisplay