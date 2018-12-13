import React from 'react'
import {Link} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import PointsPage from './components/PointsPage'
import Home from "./components/Home";


const App = () => (
    <div className="App">
        <h2>Hello</h2>

        <div className="Navigation">
            <p className="Points link">
                <Link to="points">Points</Link>
            </p>

            <Switch>
                <Route exact path='/' component={Home}/>
                <Route pattern="/points" component={PointsPage}/>
            </Switch>

        </div>
    </div>

);

export default App;