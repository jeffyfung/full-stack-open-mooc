import axios from 'axios';
import { useState, useEffect } from 'react'
import ResultDisplay from './ResultDisplay';

const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getFilteredList = (list, text) => {
    console.log(text);
    return list.filter(item => item.name?.common?.toLowerCase().includes(text.toLowerCase()));
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => setCountryList(res.data))
      .catch(err => console.warn(err));
  }, [])

  return (
    <div>
      <div>find countries <input value={searchText} type="text" onChange={(event) => setSearchText(event.target.value)}/></div>
      <div><ResultDisplay countryList={getFilteredList(countryList, searchText)} /></div>
    </div>
  )
}

export default App;
