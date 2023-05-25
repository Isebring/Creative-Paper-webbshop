import { Box, Container, MediaQuery, Text, Title } from '@mantine/core';

interface PageHeroProps {
  title: string;
  line1: string;
  line2: string;
}

export const PageHero = ({ title, line1, line2 }: PageHeroProps) => {
  return (
    <Container size="lg">
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Title>{title}</Title>
          <Text
            fz="lg"
            fw={500}
            style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}
          >
            {line1}
            <br /> {line2}
          </Text>
          <Text fz="lg" fs="italic">
            We. Stationery. You
          </Text>
        </Box>
        <MediaQuery
          query="(max-width: 650px)"
          styles={{
            img: {
              width: '3.6rem',
              height: '3.6rem',
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '1.5rem',
              marginTop: '1rem',
              padding: '.3rem',
            }}
          >
            <img
              src="/assets/plantpurple.svg"
              alt="purple plant leaf"
              style={{ width: '90%' }}
            />
          </Box>
        </MediaQuery>
      </Container>
    </Container>
  );
};
