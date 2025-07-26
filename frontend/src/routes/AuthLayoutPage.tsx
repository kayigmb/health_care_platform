import {Box, Container} from '@mui/material';
import {Outlet} from 'react-router';

export function AuthLayoutPage() {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: {xs: '1rem', sm: 0},
                backgroundColor: '#f9f9f9',
            }}
        >
            <Container
                sx={{
                    border: '1px solid lightgray',
                    borderRadius: '0.5rem',
                    padding: {xs: '1.5rem 1rem', sm: '2rem'},
                    backgroundColor: 'white',
                    boxShadow: 1,
                }}
                maxWidth="sm"
            >
                <Outlet/>
            </Container>
        </Box>
    );
}
