import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"
import { Request, Response } from "express";

export async function listarPosts(req: Request, res: Response) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

export async function postarNovoPost(req: Request, res: Response) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);  
    } catch(erro: any) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function uploadImagem(req: Request, res: Response) {
    if(req.file !== undefined){
        const novoPost = {
            descricao: "",
            imgUrl: req.file.originalname,
            alt: ""
        };

        try {
            const postCriado = await criarPost(novoPost);
            const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
            fs.renameSync(req.file.path, imagemAtualizada)
            res.status(200).json(postCriado);  
        } catch(erro: any) {
            console.error(erro.message);
            res.status(500).json({"Erro":"Falha na requisição"})
        }
    } else {
        console.error("Falha na requisição: Faltando imagem para upload");
        res.status(422).json({"Erro": "Falha na requisição: faltando imagem para upload"});
    }
}

export async function atualizarNovoPost(req: Request, res: Response) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);  
    } catch(erro: any) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}