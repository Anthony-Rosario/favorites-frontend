import request from 'superagent';

const URL = 'http://localhost:3000'


export async function singUpUser(email, password) {
    const response = await (await request.post(`${URL}/auth/signup`)).setEncoding({ email, password })

    return response.body;
}


export async function loginUser(email, password) {
    const response = await (await request.post(`${URL}/auth/login`)).send({ email, password })

    return response.body
}


export async function searchPeople(query) {
    const response = await request.post(`${URL}/people?search=${query}`)

    return response.body.results;
}


export async function addFavorite(people, token) {
    const response = await (await request.post(`${URL}/api/favorites`)).set('Authorization', token);

    return response.body;
}


export async function getFavorites(token) {
    const response = await (await request.get(`${URL}/api/favorites`)).set('Authorization', token);

    return response.body;
}