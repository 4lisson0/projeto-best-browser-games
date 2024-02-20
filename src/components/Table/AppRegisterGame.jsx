import React, { useState, useEffect } from "react";
import axios from "axios";
import gamesApi from "../../services/gamesApi";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  Select,
  Box,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

function AppCategory() {
  const [user, setUser] = useState("Novato");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    urlAcessoJogo: "",
    urlVideo: "",
    descricao: "",
    imagem: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await gamesApi.post("/games", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        reset();
        setAlertType("success");
        setAlertMessage("Game cadastrado com sucesso");
        setFormData({ categoria: "" });
        setTimeout(() => {
          setAlertMessage("");
          getCategories();
        }, 3000);
      } else {
        setAlertType("error");
        setAlertMessage(
          "Não foi possível cadastrar o game. Token não encontrado."
        );
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setAlertType("error");
      setAlertMessage("Erro ao cadastrar game");
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
      setAlertType("success");
      setAlertMessage(response.data.message);
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (error) {
      console.log(error);
      setAlertType("error");
      setAlertMessage(error.response.data[0].message);
      setTimeout(() => setAlertMessage(""), 3000);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user).name);
    } else {
      setUser("Novato");
    }

    getCategories();
  }, []);

  return (
    <Flex direction="column" p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Nome</FormLabel>
          <Input
            id="name"
            type="text"
            {...register("name", { required: "Nome é obrigatório" })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={errors.categoria}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
            margin="10px"
          >
            <FormLabel>Categoria</FormLabel>
            <Button mt={4} background="#bdeb07">
              <a href="/categoryRegister">Editar</a>
            </Button>
          </Box>
          <Select
            placeholder="Escolha uma categoria"
            id="categoria"
            type="text"
            {...register("categoria", { required: "Categoria é obrigatório" })}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.categoria && errors.categoria.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={errors.urlAcessoJogo}>
          <FormLabel>URL de acesso ao jogo</FormLabel>
          <Input
            id="url"
            type="text"
            {...register("url", {
              required: "URL de Acesso é obrigatório",
            })}
          />

          <FormErrorMessage>
            {errors.urlAcessoJogo && errors.urlAcessoJogo.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={errors.urlVideo}>
          <FormLabel>URL do vídeo de demonstração</FormLabel>
          <Input
            id="videoURL"
            type="text"
            {...register("videoURL", {
              required: "URL de Vídeo é obrigatório",
            })}
          />
          <FormErrorMessage>
            {errors.urlVideo && errors.urlVideo.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={errors.descricao}>
          <FormLabel>Descrição</FormLabel>
          <Textarea
            id="descricao"
            type="text"
            {...register("descricao", { required: "Descrição é obrigatório" })}
          />
          <FormErrorMessage>
            {errors.descricao && errors.descricao.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={errors.imagem}>
          <FormLabel>Imagem ilustrativa</FormLabel>
          <Input
            id="imageURL"
            type="text"
            {...register("imageURL", { required: "URL Image é obrigatório" })}
          />
          <FormErrorMessage>
            {errors.imagem && errors.imagem.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} background="#bdeb07" type="submit">
          Enviar
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
    </Flex>
  );
}

export default AppCategory;
