import { catchAsync } from "../../helpers/catchAsync.helpers.js";
import { BoomAdapter } from "../../plugins/hapi-boom.adapter.js";
import { AuthService } from "../../services/auth/auth.service.js";

export const validateJwt = catchAsync(async (req, res, next) => {
    const authService = new AuthService();
    const token = req.headers['x-token']??'';
    const result = await authService.verifyJwt(token);
    if (!result) {
        throw BoomAdapter.unauthorized('Session token is invalid');
    }
    req.userJwt = result;
    next();
});