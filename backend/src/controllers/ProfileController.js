const connection = require("../database");

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization
        
        const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*')

        if(!incidents)
            return response.status(404).json({ error: 'Incident not found'})

        return response.json(incidents)
    }
}