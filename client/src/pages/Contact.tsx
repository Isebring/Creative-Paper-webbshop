import {
  ActionIcon,
  Box,
  Button,
  Container,
  createStyles,
  Group,
  Modal,
  rem,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconCircleCheck,
} from '@tabler/icons-react';
import * as Yup from 'yup';

const useStyles = createStyles((theme) => ({
  wrapper: {
    marginTop: '1rem',
    boxSizing: 'border-box',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors.blue[3]} 0%, ${theme.colors.blue[7]} 100%)`,
    borderRadius: theme.radius.md,
    padding: `calc(${theme.spacing.xl} * 5)`,

    [theme.fn.smallerThan('sm')]: {
      padding: `calc(${theme.spacing.xl} * 3)`,
    },
  },

  title: {
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: rem(300),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    '&:hover': {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
    .required('Email is required'),
  name: Yup.string()
    .min(2, 'Name should have at least 2 letters')
    .required('This field is required'),
  message: Yup.string()
    .min(10, 'Message should have at least 10 characters')
    .required('Message is required'),
});

export function Contact() {
  const { classes } = useStyles();
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      name: '',
      message: '',
    },
  });

  const icons = social.map((Icon, index) => (
    <ActionIcon
      key={index}
      size={28}
      className={classes.social}
      variant="transparent"
    >
      <Icon size="1.4rem" stroke={1.5} />
    </ActionIcon>
  ));

  const handleSubmit = () => {
    console.log('Contact');
    open();
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={classes.wrapper}>
      <Container>
        <SimpleGrid
          cols={2}
          spacing={50}
          breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        >
          <div>
            <Title className={classes.title}>Contact us</Title>
            <Text className={classes.description} mt="sm" mb={30}>
              Leave your email and we will get back to you as quicky as
              possible. Usually within 48 hours.
            </Text>

            <Group mt="xl">{icons}</Group>
          </div>
          <div className={classes.form}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="Email"
                withAsterisk
                placeholder="your@email.com"
                {...form.getInputProps('email')}
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />
              <TextInput
                label="Name"
                withAsterisk
                placeholder="Your name here"
                mt="md"
                {...form.getInputProps('name')}
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />
              <Textarea
                label="Message"
                withAsterisk
                placeholder="You can type your question here..."
                minRows={4}
                mt="md"
                {...form.getInputProps('message')}
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />
              <Group position="right" mt="md">
                <Button type="submit" className={classes.control}>
                  Send message
                </Button>
              </Group>
            </form>
          </div>
        </SimpleGrid>
      </Container>
      <Modal opened={opened} onClose={close} title="Message sent!" centered>
        <Text>
          Thank you for your message! We'll get back to you within 48 hours.
        </Text>
        <Box sx={{ textAlign: 'center' }}>
          <IconCircleCheck size="3rem" stroke="0.05rem" />
        </Box>
      </Modal>
    </div>
  );
}
