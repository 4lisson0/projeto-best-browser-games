import { useState, useEffect } from "react";
import axios from "axios";
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
    Input
} from '@chakra-ui/react'

const AppTable = () => {
    const [games, setGames] = useState([])

    const getGames = async () => {
        try {
            const response = await axios.get(
                'https://api-best-browser-games.vercel.app/games'
            );

            const games = response.data
            setGames(games);
            console.log(games)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getGames()
    }, [])

    return (
        <>
            <Box margin="30px">
                <Stack display="flex" flexDirection="row">
                    <Input variant='filled' placeholder='Buscar Game' />
                    <Button background='#bdeb07'>Buscar</Button>
                    
                </Stack>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>Categoria</Th>
                            <Th>URL de Acesso</Th>
                            <Th>URL do Vídeo</Th>
                            <Th>Descrição</Th>
                            <Th>Imagem</Th>
                            <Th>Score</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {games.length === 0 ? <CircularProgress isIndeterminate color='#bdeb07' /> :
                            games.map(game => (
                                <Tr key={game.id}>
                                    <Td fontSize={15}>{game.name}</Td>
                                    <Td fontSize={15}>{game.category}</Td>
                                    <Td fontSize={15}>{game.score}</Td>
                                    <Td fontSize={15}>
                                        <Button background='#bdeb07'>
                                            <a href={game.url}>Saiba Mais</a>
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button background='#bdeb07'>
                                            <a href={game.videoURL}>Video</a>
                                        </Button>
                                    </Td>
                                    <Td fontSize={15}>{game.description}</Td>
                                    <Td>
                                        <img src={game.imageURL} style={{ maxWidth: "100px" }} />
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody >
                </Table>
            </Box>
        </>
    );
};

export default AppTable;
