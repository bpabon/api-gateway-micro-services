export class ChatWebsockets {
    static joinRoomDto(object) {
        const { type, roomId } = object;
        if (!type || !roomId) return ['Identifier or Type room is required'];
        return [undefined, object]
    }
    static messageRoomDto(object) {
        const { type, roomId, content } = object;
        if (!type || !roomId, !content) return ['Identifier or Type or Content room is required'];
        return [undefined, object]
    }
}