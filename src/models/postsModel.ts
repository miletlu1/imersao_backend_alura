import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"
// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

type Imagem = {
    imgUrl: string,
    descricao: string,
    alt: string
}

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    const db = conexao.db("imersaoDB");
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}

export async function criarPost(novoPost: Imagem) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id: string, novoPost: Imagem) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);// Cria novo objeto de identificacao a partir do ID dado
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}