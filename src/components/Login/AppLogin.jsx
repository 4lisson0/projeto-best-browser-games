import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  FormErrorMessage,
  Heading,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import gamesApi from '../../services/gamesApi';

const AppLogin = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await gamesApi.post('/users/login', data);

      localStorage.setItem('token', response.data.token);
    } catch (error) {
      setAlertType('error');
      setAlertMessage(error.response.data[0].message);
      setTimeout(() => setAlertMessage(''), 3000);
    }
  };

  return (
    <Container p={12} maxW={1440}>
      <Heading as="h1" textAlign="center">
        Faça seu login
      </Heading>
      <Box
        maxW="lg"
        w="100%"
        mx="auto"
        my={8}
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email} mb={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              {...register('email', { required: 'Email obrigatório' })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} mb={4}>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input
              id="password"
              type="password"
              {...register('password', { required: 'Senha obrigatória' })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" background="#bdeb07" width="full">
            Entrar
          </Button>
        </form>
        {alertMessage && (
          <Alert
            status={alertType}
            position="absolute"
            top="10vh"
            left="50%"
            transform="translateX(-50%)"
            zIndex="999"
            width="80%"
            maxWidth="400px"
          >
            <AlertIcon />
            {alertMessage}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default AppLogin;
