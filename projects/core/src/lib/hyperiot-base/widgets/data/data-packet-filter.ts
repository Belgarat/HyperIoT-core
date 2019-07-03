export class DataPacketFilter {
    packetId: number;
    fields: string[];

    constructor(packetId: number, fields: string[]) {
        this.packetId = packetId;
        this.fields = fields;
    }
}