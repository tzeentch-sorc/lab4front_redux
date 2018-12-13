import React from 'react';
import LoginForm from "../LoginForm";
import {connect} from "react-redux";

class Home extends React.Component{
    render() {
        return (
            <div>
                <h1>Homepage</h1>

                <LoginForm />

            </div>


        );
    }


}

function mapStateToProps(state){
    return { isAuthorised: state.isAuthorised}
}

export default connect(mapStateToProps)(Home);