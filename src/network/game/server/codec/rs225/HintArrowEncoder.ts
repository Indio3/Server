import Packet from '#/io/Packet.js';
import MessageEncoder from '#/network/game/server/codec/MessageEncoder.js';
import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import HintArrow from '#/network/game/server/model/HintArrow.js';

export default class HintArrowEncoder extends MessageEncoder<HintArrow> {
    prot = ServerProt225.HINT_ARROW;

    encode(buf: Packet, message: HintArrow): void {
        const { type, nid, pid, x, z, y } = message;

        if (type === 1) {
            buf.p1(type);
            buf.p2(nid);
            buf.p2(0);
            buf.p1(0);
        } else if (type >= 2 && type <= 6) {
            // 2 - 64, 64 offset - centered
            // 3 - 0, 64 offset - far left
            // 4 - 128, 64 offset - far right
            // 5 - 64, 0 offset - bottom left
            // 6 - 64, 128 offset - top left

            buf.p1(type);
            buf.p2(x);
            buf.p2(z);
            buf.p1(y);
        } else if (type === 10) {
            buf.p1(type);
            buf.p2(pid);
            buf.p2(0);
            buf.p1(0);
        } else if (type === -1) {
            buf.p1(-1);
            buf.p2(0);
            buf.p2(0);
            buf.p1(0);
        }
    }
}
