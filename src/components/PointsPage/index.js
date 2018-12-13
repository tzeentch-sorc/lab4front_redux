import React from 'react';
import {connect} from "react-redux";
import PointsList from "../PointsList";
import PropTypes from 'prop-types'
import axios from "axios";
class PointsPage extends React.Component{
    render() {
        return (
            <div>
                <h1>Points</h1>

                <PointsList points={this.props.points}/>
                <button onClick={this.testGet}>Get</button>
            </div>
        );
    }


    testGet(){
        axios.get('http://localhost:8080/results/get',{withCredentials:true})
            .then(res => {
                alert(JSON.stringify(res) + '\n' + JSON.stringify(document.cookie));
            }).catch(err=> alert('error'));
    }

}

function mapStateToProps(state) {
    return{
        points: state.points
    }
}



PointsPage.propTypes = {
    points: PropTypes.array.isRequired //TODO change to arrayOf point(component)
};

export default connect(mapStateToProps)(PointsPage);