import axios from 'axios'


const instance = axios.create({
    baseURL : 'https://floating-everglades-04801.herokuapp.com'
})


export default instance;