import { catchAsync } from "../../helpers/catchAsync.helpers.js";
import { BoomAdapter } from "../../plugins/hapi-boom.adapter.js";
import { UserService } from "../../services/user/user.service.js";

export const validUniqueUserMiddleware = catchAsync(async (req, res, next) => {
    const userService = new UserService();
    const user = await userService.findByEmail(req.body?.email);
    if (user) {
        throw BoomAdapter.conflict('El correo electrónico ya está registrado.');
    }
    next();
});