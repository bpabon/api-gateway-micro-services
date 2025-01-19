import { BoomAdapter } from '../../plugins/hapi-boom.adapter.js';
import { NodemailerAdapter } from '../../plugins/nodemailer.adapter.js';
import { config } from './../../config/config.js';
import { TemplateEmailService } from './template/template.service.js';

export class EmailService{
    constructor(){
        this.transport = NodemailerAdapter.createTransport();
        this.templateService = new TemplateEmailService();
    }
    // Send email for users
    async sendEmail(to, subject, data, codigoTemplate ='', version = ''){
        try {
            const dataTemplate = await this.templateService.findByTemplate(codigoTemplate, version);
            if(!dataTemplate){
                throw BoomAdapter.badRequest('Template not found');
            }
            const template = await this.templateService.changeData(dataTemplate.template);
            const html = template(data);
            const mailOptions = {
                from: config.smtpEmail,
                to,
                subject,
                html
            };
            const rta = await this.transport.sendMail(mailOptions);
            return rta;
        } catch (error) {
            throw BoomAdapter.badImplementation(error.message);
        }
    }
}