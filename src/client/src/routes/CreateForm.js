import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

var moment = require('moment');

class CreateForm extends Component {
    constructor(props) {
        super(props);

        this.apihost = process.env.REACT_APP_SERVER_HOST;
        this.apiport = process.env.REACT_APP_SERVER_PORT;


        this.state = {
            //isLoggedin: false,
            //token: '',
            name: '',
            description: '',
            date: '',
            message: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let endpoint = 'http://'+this.apihost+':'+this.apiport+'/api/todo/create';
        //console.log(endpoint);

        let date = (typeof this.state.date !== 'undefined' && this.state.date ) ? moment(this.state.date).format('YYYY-MM-DD').toString() : moment().format('YYYY-MM-DD').toString();

        let body = JSON.stringify({
                      id: 0,
                      name: this.state.name,
                      description: this.state.description, 
                      date: date });

        fetch( endpoint,
               { method: 'POST', 
                 headers: { "Content-Type": "application/json" },
                 body: body }
            )
            .then( ( response ) => { 
                if( response.ok )
                {
                    //console.log( "response.ok" );
                    response.json().then( 
                        ( json ) => { 
                            console.log(json);
                            //this.setState( { todo: json } );
                            this.setState( { message: json['message'] } );
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
        return (
            <div>
                <div>{this.state.message}</div>
                <div className="FormCenter">
                    <form onSubmit={this.handleSubmit} className="FormFields">
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="name">Name</label>
                        <input type="text" id="email" className="FormField__Input" placeholder="Todo item name" name="name" value={this.state.name} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="description">Description</label>
                        <input type="description" id="description" className="FormField__Input" placeholder="description" name="description" value={this.state.description} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="date">Date</label>
                        <input type="date" id="date" className="FormField__Input" placeholder="" name="date" value={this.state.date} onChange={this.handleChange} /> {/* mysql is YYYY-MM-DD while this seems to be using DD-MM-YYYY*/}
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20">Create</button>
                    </div>
                    {/*  <Link to="/" className="FormField__Link">Home</Link> */}
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateForm;
