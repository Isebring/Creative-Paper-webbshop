import {
  Accordion,
  Box,
  Container,
  createStyles,
  rem,
  Title,
} from '@mantine/core';
import { IconMessages } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    fontSize: rem(220),
    fontWeight: 900,
    lineHeight: 1,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[7],
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  secondTitle: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),
    marginBottom: rem(30),
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[9],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(30),
    },
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function Faq() {
  const { classes } = useStyles();
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        FAQ
      </Title>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1.2rem',
        }}
      >
        <IconMessages size="5rem" stroke="0.04rem" />
      </Box>
      <Title className={classes.secondTitle}>Frequently Asked Questions</Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control>
            What is the best laptop for gaming?
          </Accordion.Control>
          <Accordion.Panel>
            The best laptop for gaming would typically have a powerful
            processor, dedicated graphics card, high RAM and storage capacity,
            and a high refresh rate display. Some popular options include the
            Asus ROG Zephyrus G14, Acer Predator Helios 300, and MSI GE75
            Raider.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control>
            What is the difference between an SSD and an HDD in a laptop?
          </Accordion.Control>
          <Accordion.Panel>
            An SSD (Solid State Drive) is a type of storage device that uses
            flash memory to store data, while an HDD (Hard Disk Drive) uses
            spinning disks and a read/write head to access and store data. SSDs
            are generally faster and more durable, while HDDs are less expensive
            and have larger storage capacities.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control>
            How much RAM do I need in a laptop?
          </Accordion.Control>
          <Accordion.Panel>
            The amount of RAM you need in a laptop depends on the tasks you plan
            to perform. For basic tasks like web browsing and word processing,
            8GB of RAM is usually sufficient. For more demanding tasks like
            photo/video editing or gaming, 16GB or more may be necessary.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="credit-card">
          <Accordion.Control>
            What is the battery life of a typical laptop?
          </Accordion.Control>
          <Accordion.Panel>
            The battery life of a laptop varies depending on the model and
            usage. Most laptops have a battery life of 5-8 hours, but some
            high-end models can last up to 12 hours or more. Battery life can
            also be affected by factors such as screen brightness, CPU usage,
            and connectivity options.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control>
            What is the warranty period for a laptop?
          </Accordion.Control>
          <Accordion.Panel>
            The warranty period for a laptop varies depending on the
            manufacturer and model. Most laptops come with a one-year warranty,
            but some manufacturers offer longer warranties of two or three
            years. It's important to check the warranty details before making a
            purchase to ensure you are covered for any potential issues.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
