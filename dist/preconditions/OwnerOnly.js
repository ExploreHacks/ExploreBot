"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrecondition = void 0;
const framework_1 = require("@sapphire/framework");
const env_parser_1 = require("../lib/env-parser");
const OWNERS = (0, env_parser_1.envParseArray)('OWNERS');
class UserPrecondition extends framework_1.Precondition {
    async run(message) {
        return OWNERS.includes(message.author.id) ? this.ok() : this.error({ message: 'This command can only be used by the owner.' });
    }
}
exports.UserPrecondition = UserPrecondition;
//# sourceMappingURL=OwnerOnly.js.map