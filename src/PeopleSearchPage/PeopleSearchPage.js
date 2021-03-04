import React, { Component } from 'react'
import { searchPeople, getFavorites, addFavorite } from '../api-utils.js';


export default class PeopleSearchPage extends Component {
    state = {
        people: [],
        favorites: [],
        search: ''
    }

    componentDidMount = async() => {
        if(this.props.token) await this.fetchFavorites();
    }

    fetchFavorites = async () => {
        const favorites = await getFavorites(this.props.user.token);

        this.setState({ favorites })
    }

    trySearch = async () => {
        const people = await searchPeople(this.state.search);

        this.setState({ people })
    }

    handleSubmit = async e => {
        e.preventDefault();

        await this.trySearch();
    }

    handleFavoriteClick = async (onePerson) => {
        await addFavorite({
            name: onePerson.name,
            birth_year: onePerson.birth_year,
            height: onePerson.height,
            mass: onePerson.mass,
            hair_color: onePerson.hair_color,
            skin_color: onePerson.skin_color,
            homeworld: onePerson.homeworld
        })
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
