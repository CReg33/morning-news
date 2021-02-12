import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {createStore, combineReducers}  from 'redux';
import {Provider} from 'react-redux';
import './App.css';
// screens
import ScreenHome from './ScreenHome';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';

// reducers
import article from './reducers/article.reducer';
import token from './reducers/token.reducer';
import country from './reducers/country.reducer';

const store = createStore(combineReducers({article, token, country}));

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={ScreenHome} />
        <Route path="/screensource" component={ScreenSource} />
        <Route path="/screenarticlesbysource/:id" component={ScreenArticlesBySource} />
        <Route path="/screenmyarticles" component={ScreenMyArticles} />
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
