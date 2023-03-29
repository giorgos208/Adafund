import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import BigBox from './components/BigBox';
import Popup from './components/Popup';
import SmallBox from './components/BigBox';

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Hero} />
        <Route path="/features" component={Features} />
        <Route path="/requests/:id" component={SmallBox} />
      </Switch>
      <Footer />
    </Router>
  );
};


export default Routes;
