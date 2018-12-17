import React from 'react';
import {connect} from "react-redux";
import axios from "axios";
import {setAuthorised, setUnAuth} from "../../actions/login";
import {setPoints} from "../../actions/setPoints";
import UnAuthPage from "../UnAuthPage";
import PointForm from "../PointForm";
import './PointsPage.css'
import MediaQuery from 'react-responsive'

class PointsPage extends React.Component{
    constructor(props) {
        super(props);
        this.testSession = this.testSession.bind(this);
        this.testSession();
        this.logout = this.logout.bind(this);
    }

    testSession() {
        axios.get('http://localhost:8080/results/get', {withCredentials: true})
            .then(res => {
                if(res.status !== 401) {
                    this.props.setPoints(res.data);
                    this.props.setAuthorised();
                    return true;
                }
                else return false;
            }).catch(err => {
            this.props.setUnAuth();
            return false;
        });
    }


    render() {
        var buttonBig = {
            padding: '10px 18px',
            width: '300px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            height: '60px',
            font: '20pt sans-serif',

        }

        var buttonSmall = {
            padding: '10px 18px',
            width: '100px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            height: '60px',
            font: '16pt sans-serif',
        };

        var bigT ={
            font: '20px sans-serif',
            padding: '30px',
            width: '600px'
        };

        var bigR ={
            margin: '30px',

        };

        var mT = {
            font: '14px sans-serif',
            width: '400px'
        };

        var smT = {
            font: '10px sans-serif',
            width: '200px'
        };

        if(this.props.isAuthorised && (this.props.points !== null || this.props.points !== undefined))
        return (
                    <div className='handler'>
                        <h1>Points</h1>
                        <MediaQuery minDeviceWidth={1176}>
                            <button onClick={this.logout} className="ordinary" style={buttonBig}>Logout</button>
                        </MediaQuery>

                        <MediaQuery maxDeviceWidth={1175}>
                            <button onClick={this.logout} className="ordinary" style={buttonSmall}>Logout</button>
                        </MediaQuery>
                        <PointForm/>

                        <MediaQuery minDeviceWidth={1176}>
                        <table id="pointTable" className="table" style={bigT}>
                            <tbody>
                            <tr className="PointRow" style={bigR}>
                                <td>
                                   X
                                </td>
                                <td>
                                   Y
                                </td>
                                <td>
                                   R
                                </td>
                                <td>
                                    result
                                </td>
                            </tr>
                            {
                                this.props.points.map(
                                    point => {
                                        return(
                                            <tr key={point.id} className="PointRow" style={bigR}>
                                                <td>
                                                    {point.x}
                                                </td>
                                                <td>
                                                    {point.y}
                                                </td>
                                                <td>
                                                    {point.r}
                                                </td>
                                                <td>
                                                    {point.entering}
                                                </td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                            </tbody>
                        </table>
                        </MediaQuery>


                        <MediaQuery minDeviceWidth={829} maxDeviceWidth={1175}>
                            <table id="pointTable" className="table" style={mT}>
                                <tbody>
                                <tr className="PointRow" style={bigR}>
                                    <td>
                                        X
                                    </td>
                                    <td>
                                        Y
                                    </td>
                                    <td>
                                        R
                                    </td>
                                    <td>
                                        result
                                    </td>
                                </tr>
                                {
                                    this.props.points.map(
                                        point => {
                                            return(
                                                <tr key={point.id} className="PointRow" style={bigR}>
                                                    <td>
                                                        {point.x}
                                                    </td>
                                                    <td>
                                                        {point.y}
                                                    </td>
                                                    <td>
                                                        {point.r}
                                                    </td>
                                                    <td>
                                                        {point.entering}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                                </tbody>
                            </table>
                        </MediaQuery>

                        <MediaQuery maxDeviceWidth={828}>
                            <table id="pointTable" className="table" style={smT}>
                                <tbody>
                                <tr className="PointRow" style={bigR}>
                                    <td>
                                        X
                                    </td>
                                    <td>
                                        Y
                                    </td>
                                    <td>
                                        R
                                    </td>
                                    <td>
                                        result
                                    </td>
                                </tr>
                                {
                                    this.props.points.map(
                                        point => {
                                            return(
                                                <tr key={point.id} className="PointRow" style={bigR}>
                                                    <td>
                                                        {point.x}
                                                    </td>
                                                    <td>
                                                        {point.y}
                                                    </td>
                                                    <td>
                                                        {point.r}
                                                    </td>
                                                    <td>
                                                        {point.entering}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                                </tbody>
                            </table>
                        </MediaQuery>
                    </div>
        );
        else return(
            <UnAuthPage/>
        )
    }


    logout(){
        axios.get('http://localhost:8080/logout',{withCredentials:true})
            .catch(err => {
                    this.props.setUnAuth();
            });
    }

}

function mapStateToProps(state) {
    return{
        isAuthorised: state.loginReducer.isAuthorised,
        points: state.pointsReducer.points
    }
}

function mapDispatchToProps(dispatch){
    return { setAuthorised: () => {
            dispatch(setAuthorised());
        },
        setUnAuth: () => {
            dispatch(setUnAuth());
        },
        setPoints: (pointsData) => {
            dispatch(setPoints(pointsData));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PointsPage);