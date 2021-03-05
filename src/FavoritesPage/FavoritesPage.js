import React, { Component } from 'react';
import { deleteFavorite, getFavorites } from '../api-utils.js';

export default class FavoritesPage extends Component {
    state = {
        favorites: []
    }

componentDidMount = async() => {
    const favorites = await getFavorites(this.props.token);

    this.setState({ favorites })
}

removeFavorite = async(person) => {
    await deleteFavorite(person, this.props.token);
    await this.getFavorites();
}
    render() {
        return (
            <main>
                <h2 className="favorites">Favorites!</h2>
                <div className="people-container">
                    {this.state.favorites.map(fav => <div className="people">
                        <button onclick={() => this.removeFavorite(fav.name)}>Remove From Favorites</button>
                        <h3>Name: {fav.name}</h3>
                        <p>Birth: {fav.birth_year}</p>
                        <p>Height: {fav.height}</p>
                        <p>Mass: {fav.mass}</p>
                        <p>Hair Color: {fav.hair_color}</p>
                        <p>Skin Color: {fav.skin_color}</p>
                        <p>Homeworld: {fav.homeworld}</p>
                    </div>)}
                </div>
            </main>
        )
    }
}
