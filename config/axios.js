const axios = require('axios')

module.exports = axios.create({
    baseURL : 'http://worldtimeapi.org/api/timezone/asia/Jakarta',
})