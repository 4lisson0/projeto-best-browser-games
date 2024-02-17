import React, { FC, FormEvent, useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import gamesApi from "../../services/gamesApi";
import {
    ChakraProvider,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Flex,
    Select,
    Spacer,
    Image,
} from '@chakra-ui/react';

function AppForm() {
    const [formData, setFormData] = useState({
        nome: '',
        categoria: '',
        urlAcessoJogo: '',
        urlVideo: '',
        descricao: '',
        imagem: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        await gamesApi.post('/games', {
        })

            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(formData);
    };

    const [categories, setCategory] = useState([])

    const getCategory = async () => {
        try {
            const response = await axios.get(
                'https://api-best-browser-games.vercel.app/categories'
            );

            const categories = response.data
            setCategory(categories);
            console.log(categories)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategory()
    }, [])

    return (
        <ChakraProvider>
            <Flex direction="column" p={4}>
                <FormControl>
                    <FormLabel>Nome</FormLabel>
                    <Input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        isRequired
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                        placeholder='Select option'
                        name="categoria"
                        onChange={handleChange}
                        isRequired>
                        {categories.map(category => (
                            <option key={category.id}>{category.name}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>URL de acesso ao jogo</FormLabel>
                    <Input
                        type="text"
                        name="urlAcessoJogo"
                        value={formData.urlAcessoJogo}
                        onChange={handleChange}
                        isRequired
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>URL do vídeo de demonstração</FormLabel>
                    <Input
                        type="text"
                        name="urlVideo"
                        value={formData.urlVideo}
                        onChange={handleChange}
                        isRequired
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Descrição</FormLabel>
                    <Textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        isRequired
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Imagem ilustrativa</FormLabel>
                    <Input
                        type="text"
                        name="imagem"
                        value={formData.imagem}
                        onChange={handleChange}
                        isRequired
                    />
                </FormControl>
                <Button mt={4} background='#bdeb07' onClick={handleSubmit}>
                    Enviar
                </Button>
            </Flex>
        </ChakraProvider>
    );
}

export default AppForm;
