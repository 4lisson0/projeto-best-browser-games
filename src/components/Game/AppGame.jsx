import { useState, useEffect } from 'react';
import gamesApi from '../../services/gamesApi';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import {
  Button,
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Image,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Input,
  FormErrorMessage,
  CircularProgress,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const AppGame = () => {
  const [categories, setCategories] = useState([]);
  const [isEditing, SetIsEditing] = useState(false);
  const [game, setGame] = useState([]);
  const { id } = useParams();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const getCategories = async () => {
    try {
      const response = await axios.get(
        'https://api-best-browser-games.vercel.app/categories',
      );

      const categories = response.data;
      setCategories(categories);
      setAlertType('success');
      setAlertMessage(response.data.message);
      setTimeout(() => setAlertMessage(''), 3000);
    } catch (error) {
      console.log(error);
      setAlertType('error');
      setAlertMessage(error.response.data[0].message);
      setTimeout(() => setAlertMessage(''), 3000);
    }
  };

  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      category: {
        _id: data.categoria,
      },
      description: data.descricao,
      url: data.url,
      imageURL: data.imageURL,
      videoURL: data.videoURL,
    };
    try {
      const {
        data: { message },
      } = await gamesApi.put(`games/${game._id}`, formData);

      reset();
      setAlertType('success');
      setAlertMessage(message);
      SetIsEditing(false);
      fetchGame();
      setTimeout(() => setAlertMessage(''), 3000);
    } catch (error) {
      setAlertType('error');
      setAlertMessage(error.response.data[0].message);
      setTimeout(() => setAlertMessage(''), 3000);
    }
  };

  const fetchGame = async () => {
    try {
      const response = await gamesApi.get(`games/${id}`);
      setGame(response.data);
    } catch (error) {
      setAlertType('error');
      setAlertMessage(error.response.data[0].message);
      setTimeout(() => setAlertMessage(''), 3000);
    }
  };

  useEffect(() => {
    getCategories();
    fetchGame();
  }, []);

  const handleClickEditGame = () => {
    setValue('name', game.name);
    setValue('categoria', game.category._id);
    setValue('url', game.url);
    setValue('videoURL', game.videoURL);
    setValue('descricao', game.description);
    setValue('imageURL', game.imageURL);
    SetIsEditing(true);
  };

  return (
    <Box>
      {game.length === 0 ? (
        <CircularProgress isIndeterminate color="#bdeb07" />
      ) : (
        game && (
          <Card
            key={game.id}
            direction={{ base: 'column', lg: 'row' }}
            overflow="hidden"
            variant="outline"
            margin="10px"
            alignItems="center"
          >
            <Image
              objectFit="cover"
              width={{ base: '34em', md: '14rem', lg: '34rem' }}
              src={game.imageURL}
              alt="Caffe Latte"
            />
            <Box display="flex" flexDirection="column" width="100vw">
              <CardBody
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="8"
              >
                {!isEditing ? (
                  <>
                    <Heading size="md">{game.name}</Heading>
                    <Text>{game.description}</Text>
                    <Text>{game.score}</Text>
                    <Text>Score do Jogo (usuario)</Text>
                    <Text>{game.category.name}</Text>
                    <Button background="#bdeb07">
                      <a href={game.url}>Jogar</a>
                    </Button>
                    <Button background="#bdeb07">
                      <a href={game.videoURL}>Video</a>
                    </Button>
                  </>
                ) : (
                  <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <FormControl isInvalid={errors.name}>
                        <FormLabel>Nome</FormLabel>
                        <Input
                          id="name"
                          type="text"
                          {...register('name', {
                            required: 'Nome é obrigatório',
                          })}
                        />
                        <FormErrorMessage>
                          {errors.name && errors.name.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.categoria}>
                        <FormLabel>Categoria</FormLabel>
                        <Select
                          placeholder="Escolha uma categoria"
                          id="categoria"
                          type="text"
                          {...register('categoria', {
                            required: 'Categoria é obrigatório',
                          })}
                        >
                          {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>
                          {errors.categoria && errors.categoria.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.url}>
                        <FormLabel>URL de acesso ao jogo</FormLabel>
                        <Input
                          id="url"
                          type="text"
                          {...register('url', {
                            required: 'URL de Acesso é obrigatório',
                          })}
                        />
                        <FormErrorMessage>
                          {errors.url && errors.url.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.videoURL}>
                        <FormLabel>URL do vídeo de demonstração</FormLabel>
                        <Input
                          id="videoURL"
                          type="text"
                          {...register('videoURL', {
                            required: 'URL de Vídeo é obrigatório',
                          })}
                        />
                        <FormErrorMessage>
                          {errors.videoURL && errors.videoURL.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.descricao}>
                        <FormLabel>Descrição</FormLabel>
                        <Textarea
                          id="descricao"
                          type="text"
                          maxLength={255}
                          placeholder="Digite até 255 caracteres..."
                          {...register('descricao', {
                            required: 'Descrição é obrigatório',
                          })}
                        />
                        <FormErrorMessage>
                          {errors.descricao && errors.descricao.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.imageURL}>
                        <FormLabel>Imagem ilustrativa</FormLabel>
                        <Input
                          id="imageURL"
                          type="text"
                          {...register('imageURL', {
                            required: 'URL Image é obrigatório',
                          })}
                        />
                        <FormErrorMessage>
                          {errors.imageURL && errors.imageURL.message}
                        </FormErrorMessage>
                      </FormControl>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="baseline"
                      >
                        <Button mt={4} background="#bdeb07" type="submit">
                          Enviar
                        </Button>
                        <Button
                          onClick={() => SetIsEditing(false)}
                          background="#FFCAD4"
                        >
                          Cancelar
                        </Button>{' '}
                      </Box>
                    </form>
                  </>
                )}
              </CardBody>
              <CardFooter
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                {isEditing ? (
                  <></>
                ) : (
                  <>
                    <Button onClick={handleClickEditGame} background="#BDEB07">
                      Editar Jogo
                    </Button>
                    <Button background="#BDEB07">Avaliar Jogo</Button>
                  </>
                )}
              </CardFooter>
            </Box>
          </Card>
        )
      )}
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
  );
};

export default AppGame;
