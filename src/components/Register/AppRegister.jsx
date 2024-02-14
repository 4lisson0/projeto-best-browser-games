import { useRef, useState } from 'react';
import gamesApi from '../../services/gamesApi';
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

const AppRegister = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await gamesApi.post('/users', data);

      reset();
      setAlertType('success');
      setAlertMessage('Usuário cadastrado com sucesso');
      setTimeout(() => setAlertMessage(''), 3000);
    } catch (error) {
      setAlertType('error');
      setAlertMessage(error.response.data[0].message);
      setTimeout(() => setAlertMessage(''), 3000);
    }
  };

  const password = useRef({});
  password.current = watch('password', '');

  return (
    <Container p={12} maxW={1440}>
      <Heading as="h1" textAlign="center">
        Faça seu cadastro
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
          <FormControl isInvalid={errors.name} mb={4}>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              id="name"
              type="text"
              {...register('name', { required: 'Nome é obrigatório' })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email} mb={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' },
              })}
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
              {...register('password', {
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'Senha deve ter pelo menos 6 caracteres',
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.confirmPassword} mb={4}>
            <FormLabel htmlFor="confirmPassword">Confirmar Senha</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Confirmação de senha é obrigatória',
                validate: (value) =>
                  value === password.current || 'As senhas não coincidem',
              })}
            />
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.birthDate} mb={4}>
            <FormLabel htmlFor="birthDate">Data de Nascimento</FormLabel>
            <Input
              id="birthDate"
              type="date"
              {...register('birthDate', {
                required: 'Data de Nascimento é obrigatória',
              })}
            />
            <FormErrorMessage>
              {errors.birthDate && errors.birthDate.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.country} mb={4}>
            <FormLabel htmlFor="country">País</FormLabel>
            <Input
              id="country"
              type="text"
              {...register('country', { required: 'País é obrigatório' })}
            />
            <FormErrorMessage>
              {errors.country && errors.country.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.state} mb={4}>
            <FormLabel htmlFor="state">Estado</FormLabel>
            <Input
              id="state"
              type="text"
              {...register('state', { required: 'Estado é obrigatório' })}
            />
            <FormErrorMessage>
              {errors.state && errors.state.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" background="#bdeb07" width="full" mt={4}>
            Registrar
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

export default AppRegister;
