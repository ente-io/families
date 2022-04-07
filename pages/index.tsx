import { Container } from '@mui/material';

function HomePage() {
    return (
        <Container
            maxWidth={false}
            sx={{
                textAlign: 'center',
            }}>
            Welcome to Next.js!
        </Container>
    );
}

export default HomePage;
