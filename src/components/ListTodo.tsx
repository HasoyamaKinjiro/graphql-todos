import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { CircularProgress, Stack, Typography } from '@mui/material';

import ItemTodo from './ItemTodo';
import TotalCount from './TotalCount';

import { ALL_TODOS, UPDATE_TODO, DELETE_TODO } from '../apollo/todos';

const ListTodo = () => {
    const { loading, error, data } = useQuery(ALL_TODOS, {
        variables: {
            options: {
                paginate: {
                    limit: 1000
                }
            }
        }
    });
    const [toggleTodo, { error: updateError }] = useMutation(UPDATE_TODO);
    const [removeTodo, { error: removeError }] = useMutation(DELETE_TODO);

    const handleDeleteTodo = async (id: string) => {
        try {
            await removeTodo({
                variables: { id },
                update (cache) {
                    cache.modify({
                        fields: {
                            todos (existingTodos = { data: [] }) {
                                return {
                                    ...existingTodos,
                                    data: existingTodos.data.filter(
                                        (todo: any) => todo.id !== id
                                    )
                                };
                            }
                        }
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <CircularProgress color="success"/>
    }

    if (error || updateError || removeError) {
        return <Typography variant="h2">Error: {error?.name || updateError?.name || removeError?.name}</Typography>
    }

    return (
        <>
            <TotalCount total={data.todos.data.length}/>
            <Stack direction="column" spacing={2} mt={4}>
                {data.todos.data.map((todo: any) => (
                    <ItemTodo
                        key={todo.id}
                        onToggle={toggleTodo}
                        onDelete={handleDeleteTodo}
                        {...todo}
                    />
                ))}
            </Stack>
        </>
    );
};

export default ListTodo;
