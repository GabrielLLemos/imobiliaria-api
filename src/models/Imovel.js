import { Schema, model } from 'mongoose';

// Define um novo esquema (schema) para documentos MongoDB representando imóveis
const ImovelSchema = new Schema({
    // Título do imóvel (do tipo String e obrigatório)
    title: {
        type: String,
        required: true,
    },
    
    // Preço do imóvel (do tipo Number, obrigatório, com valor padrão de 0)
    price: {
        type: Number,
        required: true,
        default: 0
    },

    // Descrição do imóvel (do tipo String e obrigatório)
    description: {
        type: String,
        required: true,
    },

    // Número de banheiros do imóvel (do tipo Number e obrigatório)
    bathCount: {
        type: Number,
        required: true,
    },

    // Número de quartos do imóvel (do tipo Number e obrigatório)
    roomCount: {
        type: Number,
        required: true,
    },

    // Tipo do imóvel, por exemplo, "Aluguel" (do tipo String e obrigatório)
    type: {
        type: String,
        required: true,
    }
});

// Exporta o modelo MongoDB baseado no esquema ImovelSchema, nomeando-o como 'Imovel'
export default model('Imovel', ImovelSchema);