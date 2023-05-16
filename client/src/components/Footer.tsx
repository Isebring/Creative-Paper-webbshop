import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  createStyles,
  Group,
  rem,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(15),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  actionIcon: {
    background:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    '&:hover': {
      background:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[2],
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md} ${theme.spacing.md}`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },

  form: {
    display: 'flex',
    alignItems: 'center',
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },

  input: {
    marginRight: theme.spacing.md,
    [theme.fn.smallerThan('sm')]: {
      marginRight: 0,
      marginBottom: theme.spacing.md,
    },
  },
}));

interface FooterCenteredProps {
  links: { link: string; label: string }[];
}

export function FooterCentered({ links }: FooterCenteredProps) {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<'a'>
      color="gray"
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links}>{items}</Group>
        <Box>
          <Title order={3} align="center" mb="md">
            Sign up to our newsletter!
          </Title>
          <form className={classes.form}>
            <TextInput
              className={classes.input}
              placeholder="Enter your email"
            />
            <Button variant="outline">Sign up</Button>
          </form>
        </Box>

        <Group spacing="xs" position="right" noWrap mt={10}>
          <ActionIcon
            size="lg"
            variant="outline"
            radius="xl"
            className={classes.actionIcon}
          >
            <IconBrandInstagram size="1.5rem" stroke="1.4" />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="outline"
            radius="xl"
            className={classes.actionIcon}
          >
            <IconBrandTwitter size="1.5rem" stroke="1.4" />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="outline"
            radius="xl"
            className={classes.actionIcon}
          >
            <IconBrandYoutube size="1.5rem" stroke="1.4" />
          </ActionIcon>
        </Group>
      </div>
    </footer>
  );
}
