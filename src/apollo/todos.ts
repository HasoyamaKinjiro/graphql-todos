import { gql } from '@apollo/client';

export const ALL_TODOS = gql`
    query Todos ($options: PageQueryOptions) {
        todos (options: $options) {
            data {
                id
                title
                completed
            }
        }
    }
`;


export const ADD_TODO = gql`
    mutation AddTodo ($title: String!, $completed: Boolean!) {
        createTodo (input: { title: $title, completed: $completed }) {
            id
            title
            completed
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation UpdateTodo ($id: ID!, $completed: Boolean!) {
        updateTodo (id: $id, input: { completed: $completed }) {
            id
            title
            completed
        }
    }
`;

export const DELETE_TODO = gql`
    mutation DeleteTodo ($id: ID!) {
        deleteTodo (id: $id)
    }
`;
