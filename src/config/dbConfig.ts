import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao: string|undefined) {
  let mongoClient;

  try {
      if(stringConexao === undefined){
        throw Error("Faltando string de conexão!!");
      } else {
        mongoClient = new MongoClient(stringConexao);
        console.log('Conectando ao cluster do banco de dados...');
        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');
        return mongoClient; 
      }
  } catch (erro: any) {
      console.error('Falha na conexão com o banco!', erro);
      process.exit();
  }
}