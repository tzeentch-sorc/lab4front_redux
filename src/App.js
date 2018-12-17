import React from 'react'
import {Link} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import PointsPage from './components/PointsPage'
import Home from "./components/Home";
import UnAuthPage from "./components/UnAuthPage";
import './App.css'



const App = () => (
    <div className="App">

        <div className="Navigation">
            <p className="links">
                <Link to="/" className="home">Home</Link>
                <Link to="main" className="points">Points</Link>
                <p className='title'>Лабораторная работа №4</p>
            </p>
        </div>

        <Switch>
            <Route exact path='/' component={Home}/>
            <Route pattern='/main' component={PointsPage}/>
            {/*<Route pattern='/unauthorised' component={UnAuthPage}/>*/}
        </Switch>
    </div>

);

export default App;