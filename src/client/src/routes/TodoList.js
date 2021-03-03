import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = { todo: [] };

        //this.apihost = "localhost";
        //this.apiport = 8082;

        this.apihost = process.env.REACT_APP_SERVER_HOST;
        this.apiport = process.env.REACT_APP_SERVER_PORT;
    }


    componentDidMount()
    {
      this.getTodoList();
    }

    /*
        {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'yourValue',
            password: 'yourOtherValue',
        })
        }
    */

   getTodoList = () => 
    {
      fetch( 'http://'+this.apihost+':'+this.apiport+'/api/todo/get'
             //,{ mode: "no-cors", method: 'GET', headers: { "Accept": "application/json" } }
           )
         .then( ( response ) => { 
             if( response.ok )
             {
                response.json().then( 
                   ( json ) => { 
                     console.log(json); 
                     //this.setState( { todo: JSON.parse(json) } );
                     this.setState( { todo: json } );
                   }
                );
             }
           }
         )
         .catch( 
           ( err ) => { console.error( "Fetch Error: " + err ) }
         );
    }

    deleteTodoItem = ( todo_id ) => 
    {
      console.log( "deleteTodoItem: " + todo_id );
      /*fetch( 'http://'+this.apihost+':'+this.apiport+"/api/todo/delete/:"+todo_id,
             { mode: "no-cors", method: 'DELETE' }
           )
         .then( ( response ) => { 
             if( response.ok )
             {
                //response.json().then( 
                //   ( json ) => { 
                //     console.log(json);
                //     this.setState( { todo: json } );
                //   }
                //);
             }
           }
         )
         .catch( 
           ( err ) => { console.error( "Fetch Error: " + err ) }
         );*/
    }

    updateTodoItem = ( todo_id ) => 
    {
      console.log( "updateTodoItem: " + todo_id );
      /*fetch( 'http://'+this.apihost+':'+this.apiport+"/api/todo/delete/:"+todo_id,
             { mode: "no-cors", method: 'DELETE' }
           )
         .then( ( response ) => { 
             if( response.ok )
             {
                //response.json().then( 
                //   ( json ) => { 
                //     console.log(json);
                //     this.setState( { todo: json } );
                //   }
                //);
             }
           }
         )
         .catch( 
           ( err ) => { console.error( "Fetch Error: " + err ) }
         );*/
    }

    createTodoItem = ( name, description, date ) => 
    {
      console.log( "createTodoItem" );
      /*fetch( 'http://'+this.apihost+':'+this.apiport+"/api/todo/delete/:"+todo_id,
             { mode: "no-cors", method: 'DELETE' }
           )
         .then( ( response ) => { 
             if( response.ok )
             {
                //response.json().then( 
                //   ( json ) => { 
                //     console.log(json);
                //     this.setState( { todo: json } );
                //   }
                //);
             }
           }
         )
         .catch( 
           ( err ) => { console.error( "Fetch Error: " + err ) }
         );*/
    }
    

    renderTodo = ( item, id, array ) => {
        //console.log( "renderTodo item: " + util.inspect(item, false, null, true ));
        //console.log( "renderTodo id: " + util.inspect(id, false, null, true ));
        //console.log( "renderTodo array: " + util.inspect(array, false, null, true ));
        //console.log( "======" );
        //return( <div key={item}>{item.id} {item.name} {item.description} {item.date}</div> );
        return(  <TableRow key={item.id}>
                   <TableCell></TableCell>
                   <TableCell numeric>{item.id}</TableCell>
                   <TableCell text>{item.name}</TableCell>
                   <TableCell text>{item.description}</TableCell>
                   <TableCell text>{item.date}</TableCell>
                   <TableCell text>
                      <Button component={Link} to={"/todo/update/"+item.id}>Update</Button>
                      <Button component={Link} to={"/todo/delete/"+item.id}>Delete</Button>
                   </TableCell>
                 </TableRow>
         );
     }     

    render() {
        const { todo } = this.state;
        return (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell text></TableCell>
                  <TableCell text>ID</TableCell>
                  <TableCell text>Name</TableCell>
                  <TableCell text>Description</TableCell>
                  <TableCell text>Date</TableCell>
                  <TableCell text>Actions</TableCell>
                </TableRow>
                <TableRow>
                   <TableCell text>
                      {/*<Button onClick={this.createTodoItem}>Add New</Button>*/}
                      <Button component={Link} to="/todo/create">Add New</Button>
                   </TableCell>
                   <TableCell text></TableCell>
                   <TableCell text></TableCell>
                   <TableCell text></TableCell>
                   <TableCell text></TableCell>
                   <TableCell text></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                 {todo.map(this.renderTodo)}
              </TableBody>
            </Table>
          </Paper>
        );
    }
}

export default TodoList;
