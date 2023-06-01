import {
  ActionIcon,
  Box,
  Burger,
  createStyles,
  Flex,
  Group,
  Header,
  Paper,
  rem,
  Transition,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconMoonStars,
  IconShoppingCart,
  IconSunHigh,
} from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../contexts/UseShoppingCartContext';
import UserDropdownMenu from './UserDropdownMenu';

const HEADER_HEIGHT = rem(90);

const useStyles = createStyles((theme) => ({
  root: {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },

  iconsStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
}));
export interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

export function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const { cartQuantity } = useShoppingCart();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [logoType, setLogoType] = useState('dark');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // const theme = useMantineTheme();

  const handleToggle = () => {
    toggleColorScheme();
    setLogoType(colorScheme === 'dark' ? 'dark' : 'light');
  };

  const logo =
    logoType === 'dark' ? (
      <img
        style={{ width: '50%', marginTop: '0.5rem', marginBottom: '0.5rem' }}
        src="/assets/logo.svg"
        alt="Creative Paper logo"
      />
    ) : (
      <img
        style={{ width: '50%', marginTop: '0.5rem', marginBottom: '0.5rem' }}
        src="/assets/logolight.svg"
        alt="Creative Paper logo"
      />
    );

  const items = links.map((link, index) => (
    <ul
      style={{
        marginLeft: '1rem',
        marginRight: '1rem',
        paddingLeft: '0',
        textAlign: 'center',
      }}
      key={index}
    >
      <Link
        key={link.label}
        to={link.link}
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
        onClick={() => {
          setActive(link.link);
          close();
        }}
      >
        {link.label}
      </Link>
    </ul>
  ));

  const [isBurgerVisible, setIsBurgerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsBurgerVisible(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.marginBottom = opened ? '200px' : '0';
    }
  }, [opened]);

  function ToggleDarkAndLightMode() {
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
      <ActionIcon
        variant="outline"
        color={dark ? 'gray' : 'violet'}
        onClick={handleToggle}
        title="Toggle color scheme"
      >
        {dark ? (
          <IconSunHigh size="1.3rem" stroke="1.3" />
        ) : (
          <IconMoonStars size="1.3rem" stroke="1.3" />
        )}
      </ActionIcon>
    );
  }

  function handleLinkClick() {
    setActive(links[0].link);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <Header
        height={HEADER_HEIGHT}
        mb={headerRef.current ? (isBurgerVisible ? 200 : 0) : 0}
        ref={headerRef}
        className={classes.root}
      >
        <Flex justify="space-between" className={classes.header}>
          <Group spacing={1}>
            <Box w="6.5rem">
              <Burger
                opened={opened}
                onClick={toggle}
                className={classes.burger}
                size="md"
                ml="1rem"
              />
            </Box>
          </Group>

          <Link to="./" onClick={handleLinkClick}>
            <Flex justify="center" align="center">
              {logo}
            </Flex>
          </Link>

          <Flex gap={7} justify="space-between" mr="0.5rem">
            <ToggleDarkAndLightMode />
            <Box
              sx={{
                marginLeft: '0.4rem',
                color: colorScheme === 'dark' ? '#ADB5BD' : '#845EF7',
              }}
            >
              <UserDropdownMenu />
            </Box>
            <Link to="/checkout">
              <Box
                onClick={handleLinkClick}
                data-cy="cart-link"
                sx={{
                  color: colorScheme === 'dark' ? '#ADB5BD' : '#845EF7',
                  marginRight: '0.7rem',
                }}
              >
                <IconShoppingCart
                  onClick={handleLinkClick}
                  size="1.8rem"
                  stroke="1.2"
                />
                {cartQuantity > 0 && (
                  <Box
                    sx={{
                      borderRadius: '10rem',
                      background: 'black',
                      color: 'white',
                      width: '1.1rem',
                      height: '1.1rem',
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      display: 'flex',
                      transform: 'translate(-20%, -290%)',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: '0.3rem',
                    }}
                    data-cy="cart-items-count-badge"
                  >
                    {cartQuantity}
                  </Box>
                )}
              </Box>
            </Link>
          </Flex>
        </Flex>

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Header>

      {isDesktop && (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {items}
        </Box>
      )}
    </>
  );
}
