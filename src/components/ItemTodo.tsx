import React from 'react';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { itemTodoBox } from '../styles/ItemTodoStyles';

interface ItemTodoProps {
    id: string;
    title: string;
    completed: boolean;
    onToggle: (variables: { variables: { id: string; completed: boolean } }) => void;
    onDelete: (id: string) => void;
}

const ItemTodo = ({ id, title, completed, onToggle, onDelete }: ItemTodoProps) => (
    <Box sx={itemTodoBox}>
        <Checkbox
            checked={completed}
            onChange={() => onToggle({
                variables: {
                    id: id,
                    completed: !completed
                }
            })}
        />
        <Typography>{title}</Typography>
        <Button
            color="error"
            onClick={() => onDelete(id)}
        >
            <CloseIcon/>
        </Button>
    </Box>
);

export default ItemTodo;
