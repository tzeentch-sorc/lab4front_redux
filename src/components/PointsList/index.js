import React from 'react';
import PropTypes from 'prop-types'

class PointsList extends React.Component{
    emptyMsg =(<p>No points yet</p>);

    pointsMsg = (
        <p>qwert</p>
    );

    render(){
        return(
            <div>
                {this.props.points.length === 0 ? this.emptyMsg : this.pointsMsg}
            </div>
        )
    }

    propTypes = {
        points: PropTypes.array.isRequired
    }

}

export default PointsList;
