import { UserService } from "../../services/user/user.service.js";
import { catchAsync } from "../../helpers/catchAsync.helpers.js";
import { BoomAdapter } from "../../plugins/hapi-boom.adapter.js";

export class UsersController{
    constructor(){
        this.userService = new UserService();
    }
    // Update status connection of user true or false
    updateConnection = catchAsync(async (req, res, next) =>{
        const update = await this.userService.update(req.userJwt.id, {connection: req.body.connection});
        if(!update) throw BoomAdapter.badRequest(`Error updating user`);
        const user = await this.userService.findOne(req.userJwt.id,['email','connection']);
        return res.status(200).json({msg: "Status updated", user: user})
    });
}