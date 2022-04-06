import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'

const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getFilteredList = (list, text) => {
    console.log(text);
    return list.filter(item => item.name?.common?.toLowerCase().includes(text.toLowerCase()));
  }

  // can i only call it once after the first render?
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => setCountryList(res.data))
      .catch(err => console.warn(err));
  })

  return (
    <div>
      <div>find countries <input value={searchText} type="text" onChange={(event) => setSearchText(event.target.value)}/></div>
      <div><ResultDisplay countryList={getFilteredList(countryList, searchText)} /></div>
    </div>
  )
}

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

const ShowButton = ({ targetCountry, handleClick }) => (
  <button type="button" onClick={(event) => handleClick(targetCountry)}>show</button>
)

const CountryView = ({ targetCountry }) => (
  <>
    <br/>
    <div>capital {targetCountry.capital}</div>
    <div>area {targetCountry.area}</div>

    <br/>
    <LangaugeDisplay targetCountry={targetCountry}/>

    <br/>
    <FlagDisplay targetCountry={targetCountry}/>
  </>
)

const LangaugeDisplay = ({ targetCountry }) => (
  <div>
    <b>languages</b>
    <ul>
      {Object.entries(targetCountry.languages).map(([k, v]) => <div key={k}><li>{v}</li></div>)}
    </ul>
  </div>
)

const FlagDisplay = ({ targetCountry }) => {
  if (targetCountry?.flags.png) {
    return <><img src={targetCountry.flags.png}/></>
  }
  if (targetCountry?.flags.svg) {
    return <><img src={targetCountry.flags.svg}/></>
  }
}

export default App;
