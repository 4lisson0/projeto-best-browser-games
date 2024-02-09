import { Table, Thead, Tbody, Tr, Th, Td, Image } from "@chakra-ui/react";
import "./table-styles.css"
import { useState } from "react";

const table = (props) => {
    const [data, setData] = useState('')
}

const JogosTable = () => {
    return (
        <Table variant="simple" className="custom-table">
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Categoria</Th>
                    <Th>URL de acesso ao jogo</Th>
                    <Th>URL do vídeo de demonstração</Th>
                    <Th>Descrição</Th>
                    <Th>Imagem ilustrativa</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Jogo 1</Td>
                    <Td>Ação</Td>
                    <Td>
                        <a href="#">Acessar</a>
                    </Td>
                    <Td>
                        <a href="#">Ver vídeo</a>
                    </Td>
                    <Td>Descrição do Jogo 1</Td>
                    <Td>
                        <Image src="caminho_para_imagem_1.jpg" alt="Imagem do Jogo 1" />
                    </Td>
                </Tr>
                <Tr>
                    <Td>Jogo 2</Td>
                    <Td>Aventura</Td>
                    <Td>
                        <a href="#">Acessar</a>
                    </Td>
                    <Td>
                        <a href="#">Ver vídeo</a>
                    </Td>
                    <Td>Descrição do Jogo 2</Td>
                    <Td>
                        <Image src="caminho_para_imagem_2.jpg" alt="Imagem do Jogo 2" />
                    </Td>
                </Tr>
                {/* Adicione mais linhas conforme necessário */}
            </Tbody>
        </Table>
    );
};

export default JogosTable;
