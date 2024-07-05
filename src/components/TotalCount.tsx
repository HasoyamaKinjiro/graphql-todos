import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';

import { ALL_TODOS } from '../apollo/todos';
import { totalCountBox } from '../styles/TotalCountStyles';

interface TotalCountProps {
    total: number | string
}

const TotalCount = ({ total }: TotalCountProps) => {
    const { data } = useQuery(ALL_TODOS);

    return (
        <Box sx={totalCountBox}>
            {
                data?.todos &&
                <Typography variant="h5">Total todos: {total}</Typography>
            }
        </Box>
    );
};

export default TotalCount;
