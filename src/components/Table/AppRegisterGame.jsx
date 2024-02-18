import React, { FC, FormEvent, useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../services/gamesApi";
import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  Select,
  Box,
} from "@chakra-ui/react";

function AppForm() {
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    urlAcessoJogo: "",
    urlVideo: "",
    descricao: "",
    imagem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await gamesApi.post("/games", formData, config);

      console.log(response.data);

      setFormData({
        nome: "",
        categoria: "",
        urlAcessoJogo: "",
        urlVideo: "",
        descricao: "",
        imagem: "",
      });
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://api-best-browser-games.vercel.app/categories"
      );

      const categories = response.data;
      setCategories(categories);
      console.log(categories);
    } catch (error) {
      console.error("Erro ao obter as categorias:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ChakraProvider>
      <Flex direction="column" p={4}>
        <form onSubmit={handleSubmit}>
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
            <Box display="flex" justifyContent="space-between" alignItems='center'>
              <FormLabel>Categoria</FormLabel>
              <Button mt={4} background="#bdeb07">
                Editar
              </Button>
            </Box>
            <Select
              placeholder="Selecione a categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              isRequired
            >
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
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
          <Button mt={4} background="#bdeb07" type="submit">
            Enviar
          </Button>
        </form>
      </Flex>
    </ChakraProvider>
  );
}

export default AppForm;
