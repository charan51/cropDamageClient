import React from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import contract from './contract';
import AppBar from 'material-ui/AppBar';
import Login from './login';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Register from './RegisterFarmer';
import BuyPolicy from './buyPolicy';
import ClaimPolicy from './claimPolicy';
import { NavLink } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: ''
    }
  }
  // async componentDidMount() {
  //   try{
  //     const accounts = await web3.eth.getAccounts();
  //     const sen = await contract.methods.set(1999).send({from: accounts[0]});
  //   const manager = await contract.events.StorageSet({fromBlock: 0, toBlock: 'latest'},(err, evet) => console.log(evet));

  //   // this.setState({
  //   //   manager: manager
  //   // });
  // } catch(err) {
  //   console.log(err);
  // }
  // }
  render() {
    return (
      <Router>
        <div className="App">
          <AppBar
            title="Crop Damage Insurance"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <Breadcrumbs separator="-" aria-label="breadcrumb">
            <NavLink color="inherit" to="/" >
              Home
        </NavLink>
            <NavLink color="inherit" to="/buyPolicy" >
              Buy Policy
        </NavLink>
            <NavLink color="inherit" to="/claimPolicy" >
              Claim Policy
        </NavLink>
            <NavLink color="inherit" to="/" onClick={() => localStorage.clear()}>
              Logout
        </NavLink>
          </Breadcrumbs>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/newFarmer">
              <Register />
            </Route>
            <Route path="/buyPolicy">
              <BuyPolicy />
            </Route>
            <Route path="/claimPolicy">
              <ClaimPolicy />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
