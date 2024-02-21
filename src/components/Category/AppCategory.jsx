import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import gamesApi from "../../services/gamesApi";
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
  Input,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

function AppForm() {
  const [user, setUser] = useState("Novato");
  const [categories, setCategories] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [formData, setFormData] = useState({
    categoria: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://api-best-browser-games.vercel.app/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao obter as categorias:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await gamesApi.post("/categories", data, {});
        console.log(response.data);
        reset();
        setAlertType("success");
        setAlertMessage("Categoria cadastrada com sucesso");
        setFormData({ categoria: "" });
        getCategories();
      } else {
        setAlertType("error");
        setAlertMessage(
          "Não foi possível cadastrar a categoria. Token não encontrado."
        );
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setAlertType("error");
      setAlertMessage("Erro ao cadastrar categoria");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await axios.delete(
          `https://api-best-browser-games.vercel.app/categories/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(categories.filter((category) => category._id !== id));
        setAlertType("success");
        setAlertMessage("Categoria excluída com sucesso");
      } else {
        setAlertType("error");
        setAlertMessage(
          "Não foi possível excluir a categoria. Token não encontrado."
        );
      }
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      setAlertType("error");
      setAlertMessage("Erro ao excluir categoria");
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
    <>
      <Box margin="30px">
        <Box margin="20px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Adicionar uma Nova Categoria</FormLabel>
              <Input
                id="name"
                type="text"
                maxLength={255}
                placeholder="Digite até 255 caracteres..."
                {...register("name", { required: "Nome é obrigatório" })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
              <FormHelperText>
                Coloque o nome da Categoria desejada
              </FormHelperText>
              <Button mt={4} background="#bdeb07" type="submit">
                Enviar
              </Button>
            </FormControl>
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
        </Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Categoria</Th>
              <Th>Editar</Th>
              <Th>Deletar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.length === 0 ? (
              <Tr>
                <Td>
                  <CircularProgress isIndeterminate color="#bdeb07" />
                </Td>
              </Tr>
            ) : (
              categories.map((category) => (
                <Tr key={category._id}>
                  <Td fontSize={15}>{category.name}</Td>
                  <Td fontSize={15}>
                    <Button background="#bdeb07">Editar</Button>
                  </Td>
                  <Td fontSize={15}>
                    <Button
                      background="#bdeb07"
                      onClick={() => handleDelete(category._id)}
                    >
                      Deletar
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export default AppForm;
