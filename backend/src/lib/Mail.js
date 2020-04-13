const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail');

class Mail {
  constructor() {
    //Faz o destructor vindo do arquivo de configurações do email
    const { host, port, secure, auth } = mailConfig;
    //Transporter é como nodemailer chama uma conexão com serviço externo para 
    //enviar email
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      // É possivel enviar nulo no auth por que alguns emails não precisam de 
      //autenticação para enviar
      auth: auth.user ? auth : null,
    });
  };
  //O metodo sendEmail não está sendo chamado direto pois ele precisa agrupar as 
  //informações vindas de um eventual controller ou outra classe junto as informações 
  //padrões vindas da configuração
  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  };
}

module.exports = new Mail();
