import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, FormControl, TextField, Typography } from '@mui/material';

import { ADD_TODO, ALL_TODOS } from '../apollo/todos';
import { addTodoForm } from '../styles/AddTodoStyles';

const AddTodo = () => {
    const [text, setText] = useState('');
    const [isAdd, setIsAdd] = useState(false)
    const [addTodo, { error }] = useMutation(ADD_TODO, {
        // Update all todos and make new request to the server. In most cases this is redundant.

        /*refetchQueries: [
            { query: ALL_TODOS }
        ]*/

        // Update the cache and avoid making new requests.

        update (cache, { data: { createTodo } }) {
            const { todos }: any = cache.readQuery({ query: ALL_TODOS });
            cache.writeQuery({
                query: ALL_TODOS,
                data: {
                    todos: {
                        ...todos,
                        data: [createTodo, ...todos.data]
                    }
                }
            })
        }
    });

    const handleAddTodo = () => {
        if (text.trim().length) {
            addTodo({
                variables: {
                    title: text,
                    completed: false
                }
            })
            setText('');
            setIsAdd(true);
        }
    }

    const handleKey = (event: any) => {
        if (event.key === 'Enter') handleAddTodo();
    }

    if (error) {
        return <Typography variant="h2">Error: {error.name}</Typography>
    }

    return (
        <>
            <FormControl sx={addTodoForm}>
                <TextField
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyUp={handleKey}
                    variant="outlined"
                />
                <Button onClick={handleAddTodo} variant="contained">Add todo</Button>
            </FormControl>
            {
                isAdd &&
                <Typography variant="h5">
                    This is just an imitation of adding, just to check if the request works
                </Typography>
            }
        </>
    );
};

export default AddTodo;
