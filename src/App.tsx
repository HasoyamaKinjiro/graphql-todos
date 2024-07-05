import React from 'react';

import AddTodo from './components/AddTodo';
import ListTodo from './components/ListTodo';

import './App.css';

const App = () => (
    <div className="App">
        <AddTodo/>
        <ListTodo/>
    </div>
);

export default App;
