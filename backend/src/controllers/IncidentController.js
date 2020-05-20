const connection = require('../database/connection')

module.exports = {

    async index(request, response) {
        // esse page = 1 é um valor padrão caso não tenha
        const {page = 1} = request.query;
        // pegar incidents de 5 em 5 (paginação)

        // o colchete é pq é retornado no formato array. o colchete na declaração indica q queremos apenas a primeira posição, e o objeto vem diretamente, fora do array.
        const [count] = await connection('incidents').count();

        console.log(count);
        //join para trazer os dados da tabela ongs tb
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 
            'ongs.name', 
            'ongs.whatsapp', 
            'ongs.email', 
            'ongs.city', 
            'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async create(request, response) {
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;
        

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id });
        
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({ error : 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}