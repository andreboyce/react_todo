import React, { Component } from 'react';

var moment = require('moment');

class UpdateForm extends Component {
    constructor(props) {
        super(props);

        this.apihost = process.env.REACT_APP_SERVER_HOST;
        this.apiport = process.env.REACT_APP_SERVER_PORT;

        this.state = {
            todo_id: 0,
            //name: '',
            //description: '',
            //date: '',
        };

        if( typeof this.props.match.params.id !== 'undefined' && this.props.match.params.id )
        {
           this.state.todo_id = this.props.match.params.id;
        }

        this.getTodoItem();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount ()
    {

    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState( {[name]: value } );
    }

    getTodoItem = () => 
    {
      let endpoint = 'http://'+this.apihost+':'+this.apiport+'/api/todo/get/'+this.state.todo_id;
      console.log( "getTodoItem endpoint: " + endpoint );

      fetch( endpoint )
         .then( ( response ) => { 
             if( response.ok )
             {
                response.json().then( 
                   ( json ) => { 
                     //console.log(json);
                     //console.log( "getTodoItem json: "+ util.inspect(json, false, null, false) ); 
                     this.setState( { name: json['name'] } );
                     this.setState( { description: json['description'] } );
                     this.setState( { date: json['date'] } );
                     //console.log( "getTodoItem this.state: "+ util.inspect(this.state, false, null, false) ); 
                   }
                );
             }
           }
         )
         .catch( 
           ( err ) => { console.error( "Fetch Error: " + err ) }
         );
    }

    handleSubmit(e) {
        e.preventDefault();

        let endpoint = 'http://'+this.apihost+':'+this.apiport+'/api/todo/update/'+this.state.todo_id;
        //console.log(endpoint);

        let date = (typeof this.state.date !== 'undefined' && this.state.date ) ? moment(this.state.date).format('YYYY-MM-DD').toString() : moment().format('YYYY-MM-DD').toString();

        let body = JSON.stringify({
                      id: 0,
                      name: this.state.name,
                      description: this.state.description, 
                      date: date });

        fetch( endpoint,
               { method: 'PUT', 
                 headers: { "Content-Type": "application/json" },
                 body: body }
            )
            .then( ( response ) => { 
                if( response.ok )
                {
                    response.json().then( 
                        ( json ) => { 
                            //console.log(json);
                            if( json['deleted'] !== 0 )
                            {
                                this.setState( { updated: json['updated'] } );
                                this.setState( { message: json['message'] } );
                            }
                            else
                            {
                                this.setState( { updated: 0 } );
                                this.setState( { message: json['message'] } );
                            }
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
                <div>
                    <div>Attempt to update record with id: {this.state.todo_id}</div>
                    <div>{this.state.message}</div>
                </div>

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
                        <button className="FormField__Button mr-20">Update</button>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateForm;
