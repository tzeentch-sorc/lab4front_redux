import React from 'react'
import {Link} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import PointsPage from './components/PointsPage'
import Home from "./components/Home";
import UnAuthPage from "./components/UnAuthPage";



const App = () => (
    <div className="App">
        <h2>Лабораторная №4</h2>

        <div className="Navigation">
            <p className="links">
                <Link to="/">Home</Link>
                <br/>
                <Link to="main">Points</Link>
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