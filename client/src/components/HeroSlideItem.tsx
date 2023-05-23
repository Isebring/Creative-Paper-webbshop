import {
  Box,
  Button,
  MediaQuery,
  rem,
  Title,
  useMantineTheme,
} from '@mantine/core';

interface HeroSlideItemProps {
  imageSrc?: string;
}

function HeroSlideItem({ imageSrc }: HeroSlideItemProps) {
  const theme = useMantineTheme();
  return (
    <MediaQuery query="(max-width: 730px)" styles={{ flexDirection: 'row' }}>
      <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
        <MediaQuery query="(max-width: 730px)" styles={{ width: '50%' }}>
          <Box
            sx={{
              width: '50%',
              height: '100%',
              backgroundColor: theme.colors.violet[1],
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
              padding: '2rem',
            }}
          >
            <MediaQuery
              query="(max-width: 640px)"
              styles={{ fontSize: rem(18) }}
            >
              <Title sx={{ textAlign: 'center' }}>
                Shop Summer & New Weekend Deals
              </Title>
            </MediaQuery>
            <MediaQuery
              query="(max-width: 640px)"
              styles={{ fontSize: rem(13), marginTop: '.5rem' }}
            >
              <Title order={4} sx={{ textAlign: 'center' }}>
                We have all the different things you need to feel organized in
                your day to day life.
              </Title>
            </MediaQuery>
            <MediaQuery
              query="(max-width: 640px)"
              styles={{ width: '6.3rem', height: '2rem', fontSize: rem(12) }}
            >
              <Button
                sx={{
                  background: theme.colors.violet[6],
                  color: theme.colors.violet[0],
                  fontWeight: 'bold',
                  marginTop: '1rem',
                  height: '2.4rem',
                  width: '8rem',
                  borderRadius: '.5rem',
                  borderStyle: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    background: theme.colors.violet[4],
                    color: theme.colors.violet[0],
                    border: '2px solid white',
                  },
                }}
              >
                Go to Deals
              </Button>
            </MediaQuery>
          </Box>
        </MediaQuery>
        <MediaQuery
          query="(max-width: 640px)"
          styles={{ height: '100%', width: '50%' }}
        >
          <Box sx={{ width: '50%', height: '100%' }}>
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={imageSrc}
              alt="product-image"
            />
          </Box>
        </MediaQuery>
      </Box>
    </MediaQuery>
  );
}

export default HeroSlideItem;
