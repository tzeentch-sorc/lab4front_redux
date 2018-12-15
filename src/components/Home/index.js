import React from 'react';
import LoginForm from "../LoginForm";
import {connect} from "react-redux";
import axios from "axios";
import {setAuthorised, setUnAuth} from "../../actions/login";
import {setPoints} from '../../actions/setPoints'

class Home extends React.Component{

    constructor(props){
        super(props);
        this.testSession = this.testSession.bind(this);
        this.testSession();
        this.logout = this.logout.bind(this);
    }


    render() {
        if(this.props.isAuthorised) {
            return (
                <div>
                    <p>You are already logged</p>
                    <button onClick={this.logout}>Logout</button>
                </div>
            );

        }
        else {
            return (
                <div>
                    <h1>Homepage</h1>
                    <LoginForm history={this.history}/>
                </div>


            );
        }
    }


    logout(){
        axios.get('http://localhost:8080/logout',{withCredentials:true})
            .catch(res => {
                this.props.setUnAuth();
                this.props.setPoints(null);
            });
    }

    testSession() {
        axios.get('http://localhost:8080/results/get', {withCredentials: true})
            .then(res => {
                if(res.status !== 401) {
                    this.props.setAuthorised();
                    this.props.setPoints(res.data);
                    return true;
                }
                else return false;
            }).catch(err => {
            this.props.setUnAuth();
            this.props.setPoints(null);
            return false;
        });
    }
}

function mapStateToProps(state){
    return { isAuthorised: state.loginReducer.isAuthorised, points: state.pointsReducer.points}
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);