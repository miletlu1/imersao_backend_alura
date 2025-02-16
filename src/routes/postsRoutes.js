import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; 
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica o diretório para armazenar as imagens enviadas
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware Multer
const upload = multer({ storage: storage });

// Define as rotas usando o objeto Express app
const routes = (app) => {
  // Permite que o servidor receba mensagem com corpo em formato JSON
  app.use(express.json());
  app.use(cors(corsOptions))
  //Get All
  app.get("/posts", listarPosts);

  //Create New
  app.post("/posts", postarNovoPost);

  //Update/Upload
  app.post("/upload", upload.single("imagem"), uploadImagem);
  
  //Upload com ID
  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;