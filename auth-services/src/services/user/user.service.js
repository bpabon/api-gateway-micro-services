import { AppDataSource } from '../../db/postgresql/ormconfig.js';
import  User  from '../../db/postgresql/entity/user.entity.js';
import { AuthService } from '../auth/auth.service.js';

export class UserService {
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async findAll() {
        return this.userRepository.find();
    }

    async findOne(id, selectFields = []) {
        const select = selectFields && selectFields.length > 0 ? selectFields : undefined;
        const user = await this.userRepository.findOne({select, where: { id } });
        delete user.password;
        return user
    }
    async findByEmail(email,selectFields = []){
        const select = selectFields && selectFields.length > 0 ? selectFields : undefined;
        const user =  await this.userRepository.findOne({ select, where: { email } });
        return user
    }

    async create(user) {
        const auth = new AuthService();
        const hash = await auth.encryptPassword(user.password);
        const createUser = this.userRepository.create({
            ...user,
            connection: false,
            password: hash
        });
        const newUser = await this.userRepository.save(createUser);
        delete newUser.password;
        return newUser;
    }

    async update(id, user) {
        await this.userRepository.update(id, user);
        return this.userRepository.findOne({ where: { id } });
    }

    async delete(id) {
        await this.userRepository.delete(id);
    }
    async deleteAll() {
        return this.userRepository.clear();
    }
}