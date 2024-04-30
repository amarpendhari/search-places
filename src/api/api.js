import axios from 'axios';

var options = {
    method: 'GET',
    url: process.env.REACT_APP_API_URL,
    params: { countryIds: 'IN', namePrefix: 'del', limit: '5' },
    headers: {
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY // get key from https://rapidapi.com/wirefreethought/api/geodb-cities/
    }
};

export const getCities = () => {
    return axios.request(options).catch(err => console.log(err))
}

try {
    const response = await axios.request(options);
    console.log(response.data);
} catch (error) {
    console.error(error);
}