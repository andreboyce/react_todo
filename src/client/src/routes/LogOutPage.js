import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

//const util = require('util');

class LogOutPage extends Component {
    constructor(props) {
        super(props);

        this.apihost = process.env.REACT_APP_SERVER_HOST;
        this.apiport = process.env.REACT_APP_SERVER_PORT;

        //let login = this.props.parentObject.parentGetCallback("login");
        //this.props.parentObject.parentSetCallback( false );

        //console.log( "LoginForm constructor this.state.isLoggedin: " + util.inspect( this.state.isLoggedin, false, null, false ) );

        this.state = {
                        email: '',
                        password: '',
                        isLoggedin: false,
                        token: ''
                     };


        this.props.parentObject.parentSetCallback( this.state );
    }

    render() {
            return (
                    <div>
                       You are now logged out.
                    </div>
                   );
    }
}

export default LogOutPage;
