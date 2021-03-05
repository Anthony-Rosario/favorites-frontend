import React, { Component } from 'react'
import { on } from 'superagent';
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
        }, this.props.user.token);
        
        await this.fetchFavorites();
    }

    handleSearchChange = e => this.setState({ search: e.target.value })
    

    isAFavorite = (person) => {
        // if(!this.props.token) return true;

        const isFavorites = this.state.favorites.find(favorite => favorite.name === person.name);
        
        return Boolean(isFavorites);
        
    }

    render() {
        
        return (
            <div className="people-search-container">
                <form onSubmit={this.handleSubmit}>
                    <input className="search-input" value={this.state.search} onChange={this.handleSearchChange} />
                    <button className="search-button">Search for Intergalactic Peeps</button>
                </form>
                <div className="people-container">
                    {this.state.people.map((person, i) => 
                    <div key={`${person.title}-${i}`} class="people"> <h3>Name: {person.name}</h3>
                    <p>Birth: {person.birth_year}</p>
                    <p>Height: {person.height}</p>
                    <p>Mass: {person.mass}</p>
                    <p>Hair Color: {person.hair_color}</p>
                    <p>Skin Color: {person.skin_color}</p>
                    <p>Homeworld: {person.homeworld}</p>
                    <p>{this.isAFavorite(person) ? 'favorited' : <button className="favorite-button" onClick={() => this.handleFavoriteClick(person)}>Favorite</button>}</p>
                    </div>
                        )}

                </div>
            </div>
        )
    }
}
