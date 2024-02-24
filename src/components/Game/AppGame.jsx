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
  const [isEditing, setIsEditing] = useState(false);
  const [game, setGame] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [userRating, setUserRating] = useState(0); // Novo estado para armazenar a avaliação do usuário
  const { id } = useParams();
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
      setIsEditing(false);
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
    setIsEditing(true);
  };

  const handleRatingChange = (event) => {
    setUserRating(parseInt(event.target.value));
  };

  const handleSubmitRating = async () => {
    try {
      console.log("Avaliação submetida:", userRating);
    } catch (error) {
      console.error("Erro ao submeter a avaliação:", error);
    }
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
                {/* Adicionar campo para a avaliação */}
                <Select placeholder="Avalie o jogo" onChange={handleRatingChange}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Select>
                <Button onClick={handleSubmitRating}>Enviar Avaliação</Button>
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
