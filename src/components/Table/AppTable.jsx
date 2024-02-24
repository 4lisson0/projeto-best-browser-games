import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  CircularProgress,
  Box,
  Stack,
  Input,
  Heading,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const AppTable = () => {
  const [user, setUser] = useState('Novato');
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const navigateTo = useNavigate();
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    if (user) {
      user = JSON.parse(user);
      setRole(user.roles[0]);
    }

    setToken(token);
  }, []);

  const getGames = async () => {
    try {
      const response = await axios.get(
        'https://api-best-browser-games.vercel.app/games',
      );
      const games = response.data;
      setGames(games);
      setFilteredGames(games);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        await axios.delete(
          `https://api-best-browser-games.vercel.app/games/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setGames(games.filter((game) => game._id !== id));
        setFilteredGames(filteredGames.filter((game) => game._id !== id));
        setAlertType('success');
        setAlertMessage('Game excluído com sucesso');
      } else {
        setAlertType('error');
        setAlertMessage(
          'Não foi possível excluir o game. Token não encontrado.',
        );
      }
    } catch (error) {
      console.error('Erro ao excluir game:', error);
      setAlertType('error');
      setAlertMessage('Erro ao excluir game');
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user).name);
    } else {
      setUser('Novato');
    }

    getGames();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(
        (game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.category.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredGames(filtered);
    }
  }, [searchTerm, games]);

  const handleGameDetails = (gameId) => {
    navigateTo(`/game/${gameId}`);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
      <Box margin="30px">
        <Heading mb={6}>Bem vindo {user}!</Heading>
        <Stack display="flex" flexDirection="row">
          <Input
            variant="filled"
            placeholder="Buscar jogo por nome ou categoria"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleClearSearch} background="#bdeb07">
            Limpar Busca
          </Button>
        </Stack>
        <Table>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Categoria</Th>
              <Th isNumeric>Nota</Th>
              <Th>URL</Th>
              <Th>Video</Th>
              <Th>Detalhes</Th>
              <Th>Descrição</Th>
              <Th>Imagem</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredGames.length === 0 ? (
              <Tr>
                <Td>
                  <CircularProgress isIndeterminate color="#bdeb07" />
                </Td>
              </Tr>
            ) : (
              filteredGames.map((game) => (
                <Tr key={game._id}>
                  <Td fontSize={15}>{game.name || 'N/A'}</Td>
                  <Td fontSize={15}>{game.category?.name || 'N/A'}</Td>
                  <Td fontSize={15} isNumeric>
                    {game.score || 'N/A'}
                  </Td>
                  <Td fontSize={15}>
                    <Button background="#bdeb07">
                      <a href={game.url || '#'}>Saiba mais</a>
                    </Button>
                  </Td>
                  <Td>
                    <Button background="#bdeb07">
                      <a href={game.videoURL || '#'}>Video</a>
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      background="#bdeb07"
                      onClick={() => handleGameDetails(game._id)}
                    >
                      Detalhes
                    </Button>
                  </Td>
                  <Td fontSize={15}>{game.description || 'N/A'}</Td>
                  <Td>
                    {game.imageURL && (
                      <img
                        src={game.imageURL}
                        style={{ maxWidth: '100px' }}
                        alt="Game Image"
                      />
                    )}
                  </Td>
                  {token && role === 'admin' && (
                    <Td>
                      <Button
                        background="#bdeb07"
                        onClick={() => handleDelete(game._id)}
                      >
                        Remover
                      </Button>
                    </Td>
                  )}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
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
    </>
  );
};

export default AppTable;
