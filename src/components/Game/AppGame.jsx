import {
  Button,
  ButtonGroup,
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";

const AppGame = () => {
  return (
    <Card
      direction={{ base: "column", lg: "row" }}
      overflow="hidden"
      variant="outline"
      margin="10px"
      alignItems='center'
    >
      <Image
        objectFit="cover"
        width={{ base: "36rem", md: "14rem", lg: "36rem" }}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Agar.io_Logo.png/800px-Agar.io_Logo.png"
        alt="Caffe Latte"
      />
      <Box display="flex" flexDirection="column" width="100vw">
        <CardBody display="flex" flexDirection="column" alignItems="center" gap='10'>
          <Heading size="md">Nome do Jogo</Heading>
          <Text>Descrição do Jogo</Text>
          <Text>Score do Jogo</Text>
          <Text>Categoria</Text>
          <Text>URL de Acesso</Text>
          <Text>URL do Vídeo</Text>
          <Text>Detalhes</Text>
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
  );
};

export default AppGame;
