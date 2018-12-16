import React from 'react';
import styles from "./PointForm.css";
import axios from "axios";
import {setAuthorised, setUnAuth} from "../../actions/login";
import {setPoints} from "../../actions/setPoints";
import {connect} from "react-redux";
import MyCanvas from "../MyCanvas";
import ReactDOM from 'react-dom'

class PointForm extends React.Component{

    constructor(props){
        super(props);
        this.state =
            {
                showInv:false,
                x: "1",
                y: "",
                r: "1"
            };
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.testSession = this.testSession.bind(this);
        this.pointFromCanvas = this.pointFromCanvas.bind(this);
    }

    testSession() {
        axios.get('http://localhost:8080/results/get', {withCredentials: true})
            .then(res => {
                if(res.status !== 401) {
                    this.props.setPoints(res.data);
                    return true;
                }
                else return false;
            }).catch(err => {
            this.props.setUnAuth();
            return false;
        });
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
        if(!this.validateY()) this.showInval();
        else this.hideInval();
    }

    showInval(){
        this.setState({
            showInv: true
        })
    };

    hideInval(){
        this.setState({
            showInv: false
        })
    };

    handleSubmit(event){
        event.preventDefault();
        if(this.validateY()){
            var params = new URLSearchParams();
            params.append('x', this.state.x);
            params.append('y', this.state.y);
            params.append('r', this.state.r);
            axios.get('http://localhost:8080/results/add',{params, withCredentials:true})
                .then(response => {
                    this.testSession();
                    this.child.updateCanvas(this.state.r);
                });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.child.updateCanvas(this.state.r);
    }

    pointFromCanvas(x, y, r){
        this.setState({
            x: x, y: y, r: r
        }, ()=>{
            this.sbf.dispatchEvent(new Event('submit'))
        });
    }


    validateY(){
        let y = parseFloat(this.state.y);
        return (y > -3 && y < 5) || (this.state.y === "");
    }
    render() {
        let error;
        if(!this.validateY()){
           error = <p className="Inval" style={{color: 'red'}}>Некорректные данные. Y - число (-3..5)</p>;
        } else error = <p className="Inval" style={{color: 'red'}}> </p>;
        return(
            <div>
                <form ref={f => this.sbf = f} className="pointForm" onSubmit={this.handleSubmit.bind(this)} >
                    <label>
                        Значение Х:
                    <table className="radioPanelX">
                        <tbody>
                        <tr>
                            <td>
                                <label>
                                    <input name="x" type="radio" value="-4" checked={this.state.x === "-4"}
                                           onChange={this.handleChange.bind(this)}
                                    />
                                    -4
                                </label>
                            </td>
                            <td>
                                <label>
                                    <input name="x" type="radio" value="-3" checked={this.state.x === "-3"}
                                           onChange={this.handleChange.bind(this)}
                                    />
                                    -3
                                </label>
                            </td>
                            <td>
                                <label>
                                    <input name="x" type="radio" value="-2" checked={this.state.x === "-2"}
                                           onChange={this.handleChange.bind(this)}
                                    />
                                    -2
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>
                                    <input name="x" type="radio" value="-1" checked={this.state.x === "-1"}
                                           onChange={this.handleChange.bind(this)}
                                    />
                                    -1
                                </label>
                            </td>
                            <td>
                                <label>
                                    <input name="x" type="radio" value="0" checked={this.state.x === "0"}
                                           onChange={this.handleChange.bind(this)}
                                    />
                                    0
                                </label>
                            </td>
                            <td>
                                <label>
                                    <input name="x" type="radio" value="1" checked={this.state.x === "1"}
                                           onChange={this.handleChange.bind(this)}
                                    />
                                    1
                                </label>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label>
                                    <input name="x" type="radio" value="2" checked={this.state.x === "2"}
                                           onChange={this.handleChange.bind(this)}
                                    />
                                    2
                                </label>
                            </td>
                            <td>
                                <label>
                                    <input name="x" type="radio" value="3" checked={this.state.x === "3"}
                                           onChange={this.handleChange.bind(this)}
                                    />
                                    3
                                </label>
                            </td>
                            <td>
                                <label>
                                    <input name="x" type="radio" value="4" checked={this.state.x === "4"}
                                           onChange={this.handleChange.bind(this)}
                                    />
                                    4
                                </label>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </label>

                    <label htmlFor="y"><b>Значение Y:</b></label>
                    <input type="text" className={styles.y} value={this.state.y} onChange={this.handleChange.bind(this)} placeholder="Значение Y от -3 до 5" name="y" required/>
                    {error}


                    {/*radius*/}
                    <label>
                        Значение R:
                        <label>
                            <input name="r" type="radio" value="1" checked={this.state.r === "1"}
                                   onChange={this.handleChange.bind(this)}
                            />
                            1
                        </label>
                        <label>
                            <input name="r" type="radio" value="2" checked={this.state.r === "2"}
                                   onChange={this.handleChange.bind(this)}
                            />
                            2
                        </label>
                        <label>
                            <input name="r" type="radio" value="3" checked={this.state.r === "3"}
                                   onChange={this.handleChange.bind(this)}
                            />
                            3
                        </label>
                        <label>
                            <input name="r" type="radio" value="4" checked={this.state.r === "4"}
                                   onChange={this.handleChange.bind(this)}
                            />
                            4
                        </label>
                        <label>
                            <input name="r" type="radio" value="5" checked={this.state.r === "5"}
                                   onChange={this.handleChange.bind(this)}
                            />
                            5
                        </label>
                    </label>
                    <br/>

                    <MyCanvas setPoint={this.pointFromCanvas} radius={this.state.r} onRef={ref => this.child = ref}/>
                    <button type="submit">Check</button>


                </form>
            </div>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(PointForm);