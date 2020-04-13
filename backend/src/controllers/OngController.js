const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');
const Mail = require('../lib/Mail');

module.exports = {

  async list(request, response) {
    const ongs = await connection('ongs').select('*');
    return response.json(ongs)
  },

  async listEmail(request, response) {
    const { email } = request.body;

    const ong = await connection('ongs')
      .select('*')
      .where('email', email)
      .first();
    return response.json(ong);

  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = generateUniqueId();
    try {
      await connection('ongs').insert({
        id, name, email, whatsapp, city, uf,
      });
    } catch (error) {
      console.log(error.message);
    }

    return response.json({ id });
  },

  async recuperarID(request, response) {
    const { email } = request.body;

    const id = await connection('ongs').select('id').where('email', email).first();

    const text = 'Seu ID de acesso = ' + id.id;

    await Mail.sendMail({
      to: email,
      subject: 'Be The Hero - Recuperação de ID',
      text: text,
    });

    return response.json(id);
  }

};