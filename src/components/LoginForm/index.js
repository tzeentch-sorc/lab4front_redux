import React from 'react';
import "./LoginForm.css";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import axios from "axios";
import {setAuthorised, setUnAuth} from "../../actions/login";


class LoginForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showResults: false,
            username: '',
            password: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }


    showLogin = () => {
        this.setState({ showResults: true });
    };

    hideLogin = () => {
        this.setState({ showResults: false });
    };

    testGet(){
        axios.get('http://localhost:8080/results/get',{withCredentials:true})
            .then(res => {
                alert(res.data);
            }).catch(err=> alert('error'));
    }

    logout(){
        axios.get('http://localhost:8080/logout',{withCredentials:true})
            .catch(res => {
                this.props.setUnAuth();
                alert('ended');
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
                this.props.setAuthorised();
                if(this.props.isAuthorised){
                    alert('ada2');
                };
                alert('logging out');
                this.logout();
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
                <button onClick={this.testGet}>Get</button>

                    { this.state.showResults ?
                        <div className="modal" id="id01">
                        <form className="modal-content animate" onSubmit={this.onSubmit}>

                            <div className="container">
                                <label htmlFor="uname"><b>Username</b></label>
                                <input type="text" value={this.state.username} onChange={this.onChange.bind(this)} placeholder="Enter Username" name="username" required/>

                                <label htmlFor="psw"><b>Password</b></label>
                                <input type="password" value={this.state.password}  onChange={this.onChange.bind(this)} placeholder="Enter Password" name="password" required/>

                                <button type="submit">Login</button>
                                <button type="button" onClick={this.hideLogin}
                                        className="cancelbtn">Cancel
                                </button>

                            </div>
                        </form>
                        </div> : null
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
        }
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);