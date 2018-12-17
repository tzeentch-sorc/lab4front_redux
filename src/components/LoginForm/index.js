import React from 'react';
import "./LoginForm.css";
import {connect} from 'react-redux';
import axios from "axios";
import {setAuthorised, setUnAuth} from "../../actions/login";
import {setPoints} from "../../actions/setPoints";
import MediaQuery from 'react-responsive'


class LoginForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showResults: false,
            username: '',
            password: '',
            err: false,
            egg: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.getInit = this.getInit.bind(this);
    }


    showLogin = () => {
            this.setState({showResults: true});
    };

    hideLogin = () => {
        // var video = this.refs.video;
        // video.play();
        // video.onended = function () {
            this.setState({ showResults: false, egg: false });
        // }


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
        // if(this.state.username==='ivanuskov' || this.state.username === 'schwarzsword') {
        //     this.setState({egg: true});
        // }
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

        ).catch(err => this.setState({err: true}))
    }

    onChange(e){
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }


    render() {
        var videoStyle = {
            display: 'visible'
        };

        var buttonBigCancel = {
            padding: '10px 18px',
            width: '300px',
            color: 'white',
            margin: '20px',
            border: 'none',
            cursor: 'pointer',
            height: '60px',
            font: '20pt sans-serif',
        };

        var buttonBig = {
            padding: '10px 18px',
            width: '300px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            height: '60px',
            font: '20pt sans-serif',

        };

        var buttonSmallCancel = {
            padding: '10px 18px',
            width: '100px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            height: '60px',
            font: '16pt sans-serif',
        };

        var buttonSmall = {
            padding: '10px 18px',
            width: '100px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            height: '60px',
            font: '16pt sans-serif',
        };
        return(
            <div className="login">
                <button onClick={this.showLogin} style={buttonBig} className="ordinary">Login</button>

                    { this.state.showResults ? <div>
                        <MediaQuery query='(min-device-width: 1176px)'>
                        <div className="modal" id="id01">
                        <form className="modal-content animate" onSubmit={this.onSubmit}>

                            <div className="container">

                                <label htmlFor="username"><b>Username</b></label>
                                <input type="text" value={this.state.username} onChange={this.onChange.bind(this)} placeholder="Enter Username" name="username" required/>
                                <label htmlFor="password"><b>Password</b></label>
                                <input type="password" value={this.state.password}  onChange={this.onChange.bind(this)} placeholder="Enter Password" name="password" required/>
                                {this.state.err ? <p className='loginErr'>Не удалось авторизоваться, проверьте правильность введенных данных</p> : null}

                                <div>
                                    <div style={{display: 'inline-block'}}>
                                        <button type="submit" className="ordinary" style={buttonBig}>Login</button>
                                    </div>
                                    <div style={{display: 'inline-block'}}>
                                    <button type="button" onClick={this.hideLogin}
                                            style={buttonBigCancel} className="cancelbtn">Cancel
                                    </button>
                                    </div>
                                </div>


                            </div>
                        </form>

                        </div>
                        </MediaQuery>

                        {/*__________________________*/}
                            <MediaQuery maxDeviceWidth={1175} minDeviceWidth={829}>
                                <div className="modal" id="id01">
                                    <form className="modal-content animate"  style={{width: '50%'}}onSubmit={this.onSubmit}>

                                        <div className="container">
                                            <input type="text" value={this.state.username} onChange={this.onChange.bind(this)} placeholder="Enter Username" name="username" style={{width: '400px'}} required/>
                                            <input type="password" value={this.state.password}  onChange={this.onChange.bind(this)} placeholder="Enter Password" name="password" style={{width: '400px'}} required/>
                                            {this.state.err ? <p className='loginErr'>Не удалось авторизоваться, проверьте правильность введенных данных</p> : null}

                                            <div>
                                                <div style={{display: 'inline-block'}}>
                                                    <button type="submit" className="ordinary" style={buttonSmall}>Login</button>
                                                </div>
                                                <div style={{display: 'inline-block'}}>
                                                    <button type="button" onClick={this.hideLogin}
                                                            style={buttonSmallCancel} className="cancelbtn">Cancel
                                                    </button>
                                                </div>
                                            </div>






                                        </div>
                                    </form>

                                </div>
                            </MediaQuery>


                            <MediaQuery maxDeviceWidth={828}>
                                <div className="modal" id="id01">
                                    <form className="modal-content animate"  style={{width: '40%'}} onSubmit={this.onSubmit}>

                                        <div className="container">
                                            <input type="text" value={this.state.username} onChange={this.onChange.bind(this)} placeholder="Enter Username" name="username" style={{width: '60%'}} required/>
                                            <input type="password" value={this.state.password}  onChange={this.onChange.bind(this)} placeholder="Enter Password" name="password" style={{width: '60%'}} required/>
                                            {this.state.err ? <p className='loginErr'>Не удалось авторизоваться, проверьте правильность введенных данных</p> : null}

                                            <div>
                                                    <button type="submit" className="ordinary" style={buttonSmall}>Login</button>
                                                    <br/>
                                                    <button type="button" onClick={this.hideLogin}
                                                            style={buttonSmallCancel} className="cancelbtn">Cancel
                                                    </button>
                                            </div>






                                        </div>
                                    </form>

                                </div>
                            </MediaQuery>
                        </div>
                        :
                        <div>
                            <p className='loginPLS'>+++Необходимо пройти авторизацию+++</p>
                            <p className='loginPLSinfo'>+++Омниссия не поощряет неавторизованные подключения+++</p>
                        </div>
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