import { BoomAdapter } from "../../plugins/hapi-boom.adapter.js";
import { catchAsync } from "../../helpers/catchAsync.helpers.js";

export class ChatsController{
    constructor(){}
    // Join room chat
    joinRoom = catchAsync(async (req, res) => {
        return BoomAdapter.badRequest('Not implemented');
    });
}