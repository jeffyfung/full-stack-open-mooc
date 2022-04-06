import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'

const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getFilteredList = (list, text) => {
    console.log(text);
    return list.filter(item => item.name?.common?.includes(text));
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

const ResultDisplay = ({countryList}) => {
  if (countryList.length > 10) {
    return <>Too many matches, specify another filter</>
  }
  if (countryList.length === 1) {
    return (
      <>
        <br/>
        <div>capital {countryList[0].capital}</div>
        <div>area {countryList[0].area}</div>

        <br/>
        <LangaugeDisplay targetCountry={countryList[0]}/>

        <br/>
        <FlagDisplay targetCountry={countryList[0]}/>
        
      </>
    )
  }
  return <>{countryList.map(country => (<div key={country.name.common}>{country.name.common}</div>))}</>
}

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
