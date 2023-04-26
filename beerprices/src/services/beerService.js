import axios from 'axios'

const baseUrl = '/api/restaurants'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//uusi ravintola
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const createBeer = (id, newObject) => {
    const request = axios.post(`${baseUrl}/${id}/beers`, newObject)
    return request.then(response => response.data)
}

const deleteBeer = (restaurantId, beerId) => {
    const request = axios.delete(`${baseUrl}/${restaurantId}/beers/${beerId}`)
    return request.then(response => response.data)
}

const updateBeer = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { create, getAll, deleteBeer, updateBeer }