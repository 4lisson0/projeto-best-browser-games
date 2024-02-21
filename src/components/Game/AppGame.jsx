import { useState, useEffect } from "react";
import gamesApi from "../../services/gamesApi";

import {
  Button,
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Image,
  CircularProgress,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const AppGame = () => {
  const [game, setGame] = useState([]);
  const {id} = useParams()

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await gamesApi.get(`games/${id}`);
        setGame(response.data);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchGame();
  }, []);

  return (
    <Box>
      {game.length === 0 ? (
        <CircularProgress isIndeterminate color="#bdeb07" />
      ) : (
        game && (
          <Card
            key={game.id}
            direction={{ base: "column", lg: "row" }}
            overflow="hidden"
            variant="outline"
            margin="10px"
            alignItems="center"
          >
            <Image
              objectFit="cover"
              width={{ base: "34em", md: "14rem", lg: "34rem" }}
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
              </CardBody>
              <CardFooter
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button background="#BDEB07">Editar Jogo</Button>
                <Button background="#BDEB07">Avaliar Jogo</Button>
              </CardFooter>
            </Box>
          </Card>
        )
      )}
    </Box>
  );
};

export default AppGame;
