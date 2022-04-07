import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route
            exact
            path="/album/:id"
            render={ (props) => <Album { ...props } /> }
          />
          <Route path="/search" component={ Search } />
          <Route path="/" exact component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
