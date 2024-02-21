import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";

const AppTable = () => {
  const [user, setUser] = useState("Novato");
  const [games, setGames] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const navigateTo = useNavigate();

  const getGames = async () => {
    try {
      const response = await axios.get(
        "https://api-best-browser-games.vercel.app/games"
      );
      const games = response.data;
      setGames(games);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await axios.delete(
          `https://api-best-browser-games.vercel.app/games/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGames(games.filter((game) => game._id !== id));
        setAlertType("success");
        setAlertMessage("Game excluído com sucesso");
      } else {
        setAlertType("error");
        setAlertMessage(
          "Não foi possível excluir o game. Token não encontrado."
        );
      }
    } catch (error) {
      console.error("Erro ao excluir game:", error);
      setAlertType("error");
      setAlertMessage("Erro ao excluir game");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user).name);
    } else {
      setUser("Novato");
    }

    getGames();
  }, []);

  const handleGameDetails = (gameId) => {
    navigateTo(`/game/${gameId}`);
  };

  return (
    <>
      <Box margin="30px">
        <Heading mb={6}>Bem vindo {user}!</Heading>
        <Stack display="flex" flexDirection="row">
          <Input variant="filled" placeholder="Buscar Game" />
          <Button background="#bdeb07">Buscar</Button>
        </Stack>
        <Table>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Categoria</Th>
              <Th isNumeric>Score</Th>
              <Th>URL de Acesso</Th>
              <Th>URL do Vídeo</Th>
              <Th>Detalhes</Th>
              <Th>Descrição</Th>
              <Th>Imagem</Th>
            </Tr>
          </Thead>
          <Tbody>
            {games.length === 0 ? (
              <Tr>
                <Td>
                  <CircularProgress isIndeterminate color="#bdeb07" />
                </Td>
              </Tr>
            ) : (
              games.map((game) => (
                <Tr key={game._id}>
                  <Td fontSize={15}>{game.name}</Td>
                  <Td fontSize={15}>{game.category.name}</Td>
                  <Td fontSize={15} isNumeric>
                    {game.score}
                  </Td>
                  <Td fontSize={15}>
                    <Button background="#bdeb07">
                      <a href={game.url}>Saiba Mais</a>
                    </Button>
                  </Td>
                  <Td>
                    <Button background="#bdeb07">
                      <a href={game.videoURL}>Video</a>
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      background="#bdeb07"
                      onClick={() => handleGameDetails(game._id)}
                    >
                      Mais Detalhes
                    </Button>
                  </Td>
                  <Td fontSize={15}>{game.description}</Td>
                  <Td>
                    <img
                      src={game.imageURL}
                      style={{ maxWidth: "100px" }}
                      alt="Imagem do jogo"
                    />
                  </Td>
                  <Td>
                    <Button
                      background="#bdeb07"
                      onClick={() => handleDelete(game._id)}
                    >
                      Deletar
                    </Button>
                  </Td>
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
