import React from 'react';
import {connect} from "react-redux";
import axios from "axios";
import {setAuthorised, setUnAuth} from "../../actions/login";
import {setPoints} from "../../actions/setPoints";
import history from "../../history";
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
        if(this.props.isAuthorised && (this.props.points !== null || this.props.points !== undefined))
        return (
            <div>
                <h1>Points</h1>
                <table id="pointTable" className="table">
                    <tbody>
                    {
                        this.props.points.map(
                            point => {
                                return(
                                    <tr key={point.id} className="PointRow">
                                        <td>
                                            {point.id}
                                        </td>
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
                <button onClick={this.logout}>Logout</button>
            </div>
        );
        else return(
           history.push('/')
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