import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './App.css';

import LoginForm from './routes/LoginForm';
import LogOutPage from './routes/LogOutPage';
import TodoList from './routes/TodoList';
import SignUpForm from './routes/SignUpForm';
import CreateForm from './routes/CreateForm';
import UpdateForm from './routes/UpdateForm';
import DeleteId from './routes/DeleteId';

//import logo from './logo.svg';
//const util = require('util');

//console.log( "app.js process.env: " + util.inspect(process.env, false, null, false) );


class App extends Component {

  constructor(props) {
    super(props);

    this.state = { login: { email: '',
                            password: '',
                            isLoggedin: false,
                            token: '' } 
                 };

    this.parentSetCallback = this.parentSetCallback.bind(this);
    this.parentGetCallback = this.parentGetCallback.bind(this);
    this.Login  = this.Login.bind(this);
    this.Logout = this.Logout.bind(this);
    this.Home   = this.Home.bind(this);
  }

  componentDidMount()
  {
  }


  Home = () => {
    //console.log( "Home this.state.login: " + util.inspect(this.state.login, false, null, false) );

    if( this.state.login.isLoggedin === true )
    {
      return(
        <div>
          <h2>Home</h2>
          <div>You are logged in.</div>
        </div>);
    }
    else
    {
      return(
        <div>
          <h2>Home</h2>
          <div>You are not logged in.</div>
          <Link to="/login">Login</Link><br/>
          {/*<LoginForm parentObject={parentObject} />*/}
        </div>);
    }
  };
  
  Login = () => {
    let parentObject = { parentGetCallback: this.parentGetCallback,
                         parentSetCallback: this.parentSetCallback };
    //console.log( "Login parentObject: " + util.inspect(parentObject, false, null, false) );
    return (
    <div>
      <h2>Login</h2>
      <LoginForm parentObject={parentObject}  />
    </div> );
  };

  Logout = () => {
    let parentObject = { parentGetCallback: this.parentGetCallback,
                         parentSetCallback: this.parentSetCallback };
    return (
      <div>
        <h2>Logout</h2>
        <LogOutPage parentObject={parentObject}  />
      </div> );
  };
  
  SignUp = () => (
    <div>
      <h2>SignUpForm</h2>
      <SignUpForm />
    </div>
  );
  
  TodoListManage = () => (
    <div>
      {/*<h2>Todo List</h2>*/}
      <br/>
      <TodoList />
    </div>
  );
  
  TodoListCreate = () => (
    <div>
      <h2>Todo List Create</h2>
      <CreateForm />
    </div>
  );
  
  TodoListUpdate = ( { match } ) => {
    return(
      <div>
         <h2>Todo List Update</h2>
         <UpdateForm match={match} />
       </div>
    );
  }
  
  TodoListDelete = ( { match } ) => (
    <div>
      <h2>Todo Item Delete</h2>
      {/*<div>match.params.id: {match.params.id}</div>*/}
      <DeleteId match={match} />
      {/*<TodoList />*/}
    </div>
  );
  
  // callback for communication with children components
  // allows the child to send values to the parent
  parentSetCallback( dataFromChild )
  {
    //console.log( "parentSetCallback dataFromChild: " + util.inspect(dataFromChild, false, null, false) );
    if( dataFromChild )
    {
      this.setState( { login: dataFromChild } );
      //console.log( "parentSetCallback this.state.login: " + util.inspect(this.state.login, false, null, false) );
    }
  }

  // callback for communication with children components
  // allows the child to get values to from parent
  parentGetCallback( field )
  {
      //console.log( "parentGetCallback this.state: " + util.inspect(this.state, false, null, false) );
      //console.log( "parentGetCallback this.state[field]: " + util.inspect(this.state[field], false, null, false) );
      return this.state[field];
  }
 
  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <h1>Todo List</h1>
          <Router>
             <div>
                <Link to="/">Home</Link><br/>
                {(this.state.login.isLoggedin === true) ? 
                  (<div><Link to='/logout'>Logout</Link><br/>
                        <Link to="/todo">Todo List Manage</Link><br/>
                   </div>) : 
                  (<div><Link to='/login'>Login</Link><br/></div>) }
                {/*<Link to="/login">Login</Link>*/} {/*| <Link to="/signup">SignUp</Link><br/>*/}{/*<br/>*/}
                {/*<Link to="/todo/create">Todo List Create</Link><br/>*/}
                {/*<Link to="/todo/update">Todo List Update</Link><br/>*/}
                {/*<Link to="/todo/delete">Todo List Delete</Link><br/>*/}
                {/*<Link to="/todo">Todo List Manage</Link><br/>*/}
                <Switch>
                  <Route exact path="/" component={this.Home} />
                  <Route exact path="/login" component={this.Login} />
                  <Route exact path="/logout" component={this.Logout} />
                  <Route exact path="/signup" component={this.SignUp} />
                  <Route exact path="/todo" component={this.TodoListManage} />
                  <Route exact path="/todo/create" component={this.TodoListCreate} />
                  <Route exact path="/todo/update/:id" component={this.TodoListUpdate} />
                  {/*<Route exact path="/todo/update/:id" render={({props})=>{ <TodoListUpdate props={props} />}} />*/}
                  <Route exact path="/todo/delete/:id" component={this.TodoListDelete} />
                </Switch>
             </div>
          </Router>        

        </header>
      </div>
    );
  }
}

export default App;
