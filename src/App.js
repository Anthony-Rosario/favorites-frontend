import React, { Component } from 'react'
import './App.css';
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from 'react-router-dom';
import Header from './Components/Header.js';
import PrivateRoute from './Components/PrivateRoute.js';
import Home from './Home/Home.js';
import SignUpPage from './Auth/SignUpPage.js';
import LoginPage from './Auth/LoginPage.js';
import PeopleSearchPage from './PeopleSearchPage/PeopleSearchPage.js';
import { getUserFromLocalStorage, putUserInLocalStorage } from './local-storage-utils.js';
import FavoritesPage from './FavoritesPage/FavoritesPage.js';

export default class App extends Component {
    state = {
      user: getUserFromLocalStorage()
    }

    handleUserChange = (user) => {
      this.setState({ user })
      
      putUserInLocalStorage(user);
    }

    handleLogout = () => {
      this.handleUserChange();
    }

    render() {
      const { user } = this.state;
        return (
            <div>
                <Router>
                  <Header
                    user={this.state.user}
                    handleLogout={this.handleLogout}/>
                    <Switch>
                        <Route 
                            path="/" 
                            exact
                            render={(routerProps) => <Home {...routerProps} />} 
                        />
                        <Route 
                            path="/search" 
                            exact
                            render={(routerProps) => <PeopleSearchPage 
                              {...routerProps} 
                              user={this.state.user} />} 
                        />
                        <PrivateRoute 
                            path="/favorites" 
                            exact
                            token={user && user.token}
                            render={(routerProps) => 
                              <FavoritesPage 
                                user={this.state.user}
                                {...routerProps} 
                              />} 
                        />
                        <Route 
                          path="/login" 
                          exact
                          render={(routerProps) => 
                            <LoginPage 
                              handleUserChange={this.handleUserChange}
                              {...routerProps} 
                            />} 
                        />
                        <Route 
                          path="/signup" 
                          exact
                          render={(routerProps) => 
                            <SignUpPage 
                              handleUserChange={this.handleUserChange}
                              {...routerProps} 
                            />} 
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}