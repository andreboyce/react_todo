import React, { Component } from 'react';

//const util = require('util');

class LoginForm extends Component {
    constructor(props) {
        super(props);

        //this.apihost = "localhost";
        //this.apiport = 8082;

        this.apihost = process.env.REACT_APP_SERVER_HOST;
        this.apiport = process.env.REACT_APP_SERVER_PORT;

        this.state = {
            email: process.env.REACT_APP_DEFAULT_USERNAME,
            password: process.env.REACT_APP_DEFAULT_PASSWORD,
            isLoggedin: false,
            token: ''
        };

        let login = this.props.parentObject.parentGetCallback("login");
        this.state.token = login.token;
        this.state.isLoggedin = login.isLoggedin;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState( { [name]: value } );
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let endpoint = 'http://'+this.apihost+':'+this.apiport+'/api/login';

        let body = JSON.stringify({
                      email: this.state.email,
                      password: this.state.password });

        fetch( endpoint,
               { /*mode: "no-cors", */
                 method: 'POST', 
                 headers: { /*'Accept': 'application/json',*/
                            "Content-Type": "application/json" },
                 body: body }
            )
            .then( ( response ) => { 
                if( response.ok )
                {
                    //console.log( "response.ok" );
                    response.json().then( 
                        ( json ) => { 
                            //console.log(json);
                            //console.log( "json[token]: " + util.inspect(json["token"], false, null, false) );
                            this.setState( { token: json["token"] } );
                            if( json["isLoggedin"] )
                            {
                                this.setState( { isLoggedin: json["isLoggedin"] } );
                            }
                            //console.log( this.state );
                            //console.log( "handleSubmit this.props: " + util.inspect(this.props, false, null, false) );
                            this.props.parentObject.parentSetCallback( this.state );
                            //console.log( "this.props.parentCallback: " + this.props.parentCallback );
                        }
                    );
                }
            }
            )
            .catch( 
               ( err ) => { console.error( "Fetch Error: " + err ) }
            );
    }

    render() {
        console.log( "LoginForm render this.state.isLoggedin: " + this.state.isLoggedin );
        //this.props.parentCallback( this.state );
        if( this.state.isLoggedin === true )
        {
            return (

                    <div>
                       You are now logged in.
                       {/* Token: {this.state.token} */}
                    </div>
                );
        }
        else
        {
            return (
                <div className="FormCenter">
                    <form onSubmit={this.handleSubmit} className="FormFields">
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                        <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                        </div>
        
                        <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                        </div>
        
                        <div className="FormField">
                            <button className="FormField__Button mr-20">Sign In</button> {/*<Link to="/" className="FormField__Link">Create an account</Link>*/}
                            </div>
                    </form>
                    </div>
                );
        }
    }
}

export default LoginForm;
