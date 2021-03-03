import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

const util = require('util');

class DeleteId extends Component {
    constructor(props) {
        super(props);

        //this.apihost = "localhost";
        //this.apiport = 8082;

        this.apihost = process.env.REACT_APP_SERVER_HOST;
        this.apiport = process.env.REACT_APP_SERVER_PORT;

        this.state = {
            //isLoggedin: false,
            //token: '',
            deleted: 0,
            message: "",
            todo_id: 0,
        };
        //console.log( "DeleteId constructor: " + this.props );
        //console.log( "DeleteId constructor this.props.match.params.id: " + util.inspect(this.props.match.params.id, false, null, false) );
        if( typeof this.props.match.params.id !== 'undefined' && this.props.match.params.id )
        {
           this.state.todo_id = this.props.match.params.id;
        }
    }

    componentDidMount ()
    {
        //console.log( "DeleteId componentDidMount this.props: " + util.inspect(this.props, false, null, false) );
        //console.log( "DeleteId componentDidMount this.props.match.params.id: " + util.inspect(this.props.match.params.id, false, null, false) );
        //const { todo_id } = this.props.match.params;        
        //console.log( "DeleteId componentDidMount this.state.todo_id: " + util.inspect(this.state.todo_id, false, null, false) );
        this.deleteItem();
    }

    deleteItem() {

        let endpoint = 'http://'+this.apihost+':'+this.apiport+'/api/todo/delete/'+this.state.todo_id;
        console.log(endpoint);

        //let body = JSON.stringify( { id: this.state.todo_id } );

        fetch( endpoint,
               { /*mode: "no-cors", */
                 mode: 'cors',
                 method: 'DELETE'
                 //headers: { 'Accept': 'application/json' },
                 //body: body
               }
            )
            .then( ( response ) => { 
                //console.log( "response.ok" );
                console.log( "DeleteId response.ok: " + util.inspect(response.ok, false, null, false) );
                if( response.ok )
                {
                    //console.log( "response.ok" );
                    response.json().then( 
                        ( json ) => { 
                            //console.log(json);
                            if( json['deleted'] !== 0 )
                            {
                                this.setState( { deleted: json['deleted'] } );
                                this.setState( { message: json['message'] } );
                            }
                            else
                            {
                                this.setState( { deleted: 0 } );
                                this.setState( { message: json['message'] } );
                            }
                        }
                    );
                }
            })
            .catch( ( err ) => { console.error( "deleteItem: " + err ) } );
    }

    render() {
        //console.log( "this.props.item_id: " + util.inspect(this.props.item_id, false, null, false) );
        
        return (
            <div>
               <div>Attempt to delete record with id: {this.state.todo_id}</div>
               <div>{this.state.message}</div>
            </div>
        );
    }
}

export default DeleteId;
