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
          <Accordion.Control>What are your store hours?</Accordion.Control>
          <Accordion.Panel>
            Our store is open from Monday to Saturday, from 9:00 am to 6:00 pm.
            We are closed on Sundays.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control>
            Do you offer bulk discounts for large orders?
          </Accordion.Control>
          <Accordion.Panel>
            Yes, we offer bulk discounts for large orders. Please contact our
            sales team or visit our store for more information on bulk pricing
            and discounts.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control>
            Can I return or exchange items if I change my mind?
          </Accordion.Control>
          <Accordion.Panel>
            We have a flexible return and exchange policy. If you change your
            mind about a product, you can return it within 30 days of purchase,
            provided it is in its original condition and packaging. Please bring
            your receipt or proof of purchase for a smooth return or exchange
            process.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="credit-card">
          <Accordion.Control>
            Do you provide customization services for stationery items?
          </Accordion.Control>
          <Accordion.Panel>
            Yes, we offer customization services for various stationery items.
            Whether you need personalized notebooks, engraved pens, or
            custom-designed invitations, our team can assist you with creating
            unique and customized stationery products. Please inquire with our
            staff for more details and pricing.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control>
            Can I place an order online and have it shipped to my address?
          </Accordion.Control>
          <Accordion.Panel>
            Absolutely! We have an online store where you can browse our
            selection of stationery items and place orders. We offer shipping
            services to various locations. Simply add your desired items to the
            cart, proceed to checkout, and enter your shipping address. Shipping
            fees will be calculated based on the destination and package weight.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
