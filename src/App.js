import logo from './logo.svg';
import './App.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import loaderImg from './assets/loader.gif'
import spinner from './assets/spinner.gif'
import Pagination from './components/pagination';
import CustomPagination from './components/pagination';

function App() {

  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(3)
  const [offset, setOffset] = useState(0)
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)

  const handlePageChange = (val) => {
    console.log('vala', val)
    setOffset(val-1)
  }

  const handleSearch = (e) => {
    const { value } = e?.target
    setSearch(value)
  }

  var apiOptions = {
    method: 'GET',
    url: process.env.REACT_APP_API_URL,
    params: { countryIds: 'IN', namePrefix: search, limit: limit, offset: offset },
    headers: {
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_API_KEY // get key from https://rapidapi.com/wirefreethought/api/geodb-cities/
    }
  };

  const getCities = async () => {
    console.log(process.env.REACT_APP_API_URL, process.env.REACT_APP_API_KEY);
    try {
      const response = await axios.request(apiOptions);
      console.log(response.data);
      if (response?.data) setCities(response?.data)
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      getCities()
      setLoading(true)
      console.log('serach', search)
    }, 2000)

    return () => clearTimeout(getData)
  }, [search])

  useEffect(() => {
    getCities()
  }, [offset])

  useEffect(() => { 
    if(offset === 0) {
      getCities()
    } else {
      setOffset(0)
    }
  }, [limit])

  return (
    <div className="App">
      <div className='text-center'>
        <h3>Search Places</h3>
        <input className="search-box mb-20" type='text' onChange={(e) => handleSearch(e)} />
      </div>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Region</th>
              <th>Country</th>
            </tr>
          </thead>
          {cities?.data?.length && !loading  
            ? <tbody>
              {cities?.data?.length
                ? cities.data.map((el, i) => {
                  return (
                    <tr key={i + 1}>
                      <td>{i + 1}</td>
                      <td>{el?.name}</td>
                      <td>{el?.region}</td>
                      <td>{el?.countryCode ? <img className='country-flag' alt={el?.countryCode} src={`https://flagsapi.com/${el?.countryCode}/flat/64.png`} /> : 'NA'}</td>
                    </tr>
                  )
                })
                : 'No result found'}
            </tbody> 
          : null}
        </table>
        {loading ? <div className='text-center'><img src={spinner} /></div> : null}
        {cities?.data?.length && !loading 
          ? <div className='table-footer'>
            <div>
              <CustomPagination
                totalItems={cities?.metadata?.totalCount}
                limit={limit}
                onPageChange={handlePageChange}
              />
            </div>
            <div>
              <select value={limit} onChange={e => setLimit(e.target.value)}>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
                {/* <option value="15">15</option> */}
                {/* The requested query limit '15' exceeds what's allowed on your current plan */}
              </select>
            </div>
          </div> 
        : null}
      </div>
    </div>
  );
}

export default App;
