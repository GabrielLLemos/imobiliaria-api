import mongoose from "mongoose"
import express, { request, response } from "express"
import cors from "cors"
import 'dotenv/config'

import Imovel from "./src/models/Imovel.js";

const app = express();

const uri = process.env.mongo

mongoose.connect(uri)
    .then(() => {
        console.log("Conectado ao Mongo DB")
    })
    .catch((error) => {
        console.log("Erro ao conectar no Banco.", error)
    })

app.use(cors())
app.use(express.json())

let imoveis = []

//POST
app.post("/imoveis", async (request, response) => {

    const novoImovel = {
        title: request.body.title, 
        price: request.body.price, 
        description: request.body.description,
        bathCount: request.body.bathCount,
        roomCount: request.body.roomCount,
        type: request.body.type,
    }
    await Imovel.create(novoImovel)
    return response.json(novoImovel)
})

//GET
//Querystring ?nomeparametro=valor
app.get("/imoveis", (request, response) => {
    const {title, type} = request.query
    console.log(title)

    if(title && type){
        const result = imoveis.filter(index => 
            (index.title && index.title.toLowerCase().includes(title.toLowerCase())) ||
            (index.type && index.type.toLowerCase().includes(type.toLowerCase()))
        );
        return response.json(result)
    }
    return response.json(imoveis)
})

//GET
//Função de pesquisa
app.get("/imoveis/search", async (request, response) => {

    try {
        // Realiza uma busca no banco de dados procurando por imóveis onde o título ou a descrição
        // correspondem ao valor fornecido na 'query', ignorando diferenças entre maiúsculas e minúsculas
        const result = await Imovel.find({
            $or: [
                { title: { $regex: new RegExp(request.query.title, 'i') }}, // Busca case-insensitive no campo title
                { type: { $regex: new RegExp(request.query.type, 'i') }} // Busca case-insensitive no campo type
            ]
        });

        console.log(result)
        // Retorna os resultados da busca em formato JSON
        response.json(result);
    } catch (error) {
        // Se ocorrer algum erro durante a busca, retorna um status de erro 500 (Internal Server Error)
        // junto com uma mensagem de erro em formato JSON
        response.status(500).json({ error: error });
    }
});

//Delete
//Queryparams :nomeparametro
app.delete("/imoveis/:id", async (request, response) => {
    
    const result = await Imovel.findOneAndDelete({id: request.params.id})
    return response.json(result)
})

//Editar
app.put("/imoveis/:id", async(request, response) => {

    const result = await Imovel.findOneAndUpdate(
        {id: request.params.id},
        request.body,
        {new: true}
    )
    return result
})

app.listen(3333, () => console.log("Executando aplicação"))