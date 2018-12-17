import React from 'react';
import MediaQuery from 'react-responsive';

class UnAuthPage extends React.Component{
    render() {
        return(
            <div>
                <MediaQuery minDeviceWidth={1176}>
                    <div className="Unauthorised">
                        <h1>+++UNAUTHORISED+++</h1>
                        <h2>+++OMNISSIAH COMMENDS ONLY AUTHORISED CONNECTIONS+++</h2>
                    </div>
                </MediaQuery>
                <MediaQuery minDeviceWidth={829} maxDeviceWidth={1175}>
                    <div className="Unauthorised">
                        <h2>+++UNAUTHORISED+++</h2>
                        <h4>+++OMNISSIAH COMMENDS ONLY AUTHORISED CONNECTIONS+++</h4>
                    </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={828}>
                    <div className="Unauthorised">
                        <h4>+++UNAUTHORISED+++</h4>
                        <h4>+++OMNISSIAH COMMENDS ONLY AUTHORISED CONNECTIONS+++</h4>
                    </div>
                </MediaQuery>
            </div>
        )
    }
}

export default UnAuthPage;