import { AppDataSource } from '../../db/postgresql/ormconfig.js';
import Conversation from '../../db/postgresql/entity/conversation.entity.js';

export class ConversationService {
    constructor() {
        this.conversationRepository = AppDataSource.getRepository(Conversation);
    }
    async findAll() {
        return this.conversationRepository.find();
    }

    async findOne(id) {
        return this.conversationRepository.findOne({ where: { id } });
    }
    async findByType(type) {
        return this.conversationRepository.findOne({ where: { type } });
    }

    async create(data) {
        const createConversation = this.conversationRepository.create(data);
        const newConversation = await this.conversationRepository.save(createConversation);
        return newConversation;
    }

    async update(id, type) {
        await this.conversationRepository.update(id, type);
        return this.conversationRepository.findOne({ where: { id } });
    }

    async delete(id) {
        await this.conversationRepository.delete(id);
    }
    async deleteAll() {
        return this.conversationRepository.clear();
    }
}