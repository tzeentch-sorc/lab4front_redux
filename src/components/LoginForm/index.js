import React from 'react';
import "./LoginForm.css";
import {connect} from 'react-redux';
import axios from "axios";
import {setAuthorised, setUnAuth} from "../../actions/login";
import {setPoints} from "../../actions/setPoints";


class LoginForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showResults: false,
            username: '',
            password: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.getInit = this.getInit.bind(this);
    }


    showLogin = () => {
        this.setState({ showResults: true });
    };

    hideLogin = () => {
        this.setState({ showResults: false });
    };


    getInit() {
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

    onSubmit(e){
        e.preventDefault();
        var params = new URLSearchParams();
        params.append('username', this.state.username);
        params.append('password', this.state.password);
        axios.post('http://localhost:8080/login', params, {
            withCredentials: true
        }).then(
            response => {
                this.getInit();
                this.hideLogin();
            }

        )
    }

    onChange(e){
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return(
            <div className="login">
                <button onClick={this.showLogin}>Login</button>

                    { this.state.showResults ?
                        <div className="modal" id="id01">
                        <form className="modal-content animate" onSubmit={this.onSubmit}>

                            <div className="container">
                                <label htmlFor="username"><b>Username</b></label>
                                <input type="text" value={this.state.username} onChange={this.onChange.bind(this)} placeholder="Enter Username" name="username" required/>

                                <label htmlFor="password"><b>Password</b></label>
                                <input type="password" value={this.state.password}  onChange={this.onChange.bind(this)} placeholder="Enter Password" name="password" required/>

                                <button type="submit">Login</button>
                                <button type="button" onClick={this.hideLogin}
                                        className="cancelbtn">Cancel
                                </button>

                            </div>
                        </form>
                        </div> : <p className='loginPLS'>+++You need to authorise+++</p>
                    }

            </div>
        )
    }
}



function mapStateToProps(state){
    return { isAuthorised: state.loginReducer.isAuthorised}
}

function mapDispatchToProps(dispatch){
    return { setAuthorised: () => {
                        dispatch(setAuthorised());
                    },
        setUnAuth: () => {
            dispatch(setUnAuth());
        }, setPoints: (pointsData) => {
            dispatch(setPoints(pointsData));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);