import { HandlebarsAdapter } from "../../../plugins/handlebars.adapter.js";
import { AppDataSource } from '../../../db/postgresql/ormconfig.js';
import TemplateEmail from '../../../db/postgresql/entity/template_email.entity.js';

export class TemplateEmailService {
    constructor() {
        this.TemplateEmailRepository = AppDataSource.getRepository(TemplateEmail);
    }
    async findAll() {
        return this.TemplateEmailRepository.find();
    }

    async findOne(id) {
        return this.TemplateEmailRepository.findOne({ where: { id } });
    }
    async findByTemplate(codigo, version) {
        return this.TemplateEmailRepository.findOne({ where: { codigo, version } });
    }

    async create(template) {
        const createTemplate = this.TemplateEmailRepository.create(template);
        const newTemplate = await this.TemplateEmailRepository.save(createTemplate);
        return newTemplate;
    }

    async update(id, template) {
        await this.TemplateEmailRepository.update(id, template);
        return this.TemplateEmailRepository.findOne({ where: { id } });
    }

    async delete(id) {
        await this.TemplateEmailRepository.delete(id);
    }
    changeData(data) {
        return HandlebarsAdapter.compile(data);
    }
}