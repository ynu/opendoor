import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ResultDto } from './dto/result.dto';
import dgram from 'dgram';

const dataDict = {
    1: Buffer.from([
        0x20,
        0x40,
        0x7e,
        0x00,
        0x29,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x9e,
        0x4a,
        0x4c,
        0x0d,
        0x00,
        0x00,
        0x02,
        0x00,
        0x01,
        0x00,
        0x00,
        0x00,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0x01,
        0x00,
        0x00,
        0x00,
    ]),
    2: Buffer.from([
        0x20,
        0x40,
        0x26,
        0xd4,
        0x8f,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x9e,
        0x4a,
        0x4c,
        0x0d,
        0x00,
        0x00,
        0x02,
        0x00,
        0x01,
        0x00,
        0x00,
        0x00,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0x00,
        0x00,
        0x00,
        0x00,
    ]),
    3: Buffer.from([
        0x20,
        0x40,
        0x0f,
        0x45,
        0x0a,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x74,
        0xc8,
        0x4c,
        0x0d,
        0x00,
        0x00,
        0x02,
        0x00,
        0x01,
        0x00,
        0x00,
        0x00,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0x00,
        0x00,
        0x00,
        0x00,
    ]),
    4: Buffer.from([
        0x20,
        0x40,
        0x0d,
        0x91,
        0x0c,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x74,
        0xc8,
        0x4c,
        0x0d,
        0x00,
        0x00,
        0x02,
        0x00,
        0x01,
        0x00,
        0x00,
        0x00,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0xff,
        0x01,
        0x00,
        0x00,
        0x00,
    ]),
};

const doorHostMapping = {
    1: process.env.BACKEND_HOST_1,
    2: process.env.BACKEND_HOST_1,
    3: process.env.BACKEND_HOST_2,
    4: process.env.BACKEND_HOST_2,
};

@Injectable()
export class DoorService {
    opendoor(door: string): Promise<ResultDto> {
        return new Promise((resolve, reject) => {
            const client = dgram.createSocket('udp4');
            const host = doorHostMapping[door];
            const port = parseInt(process.env.BACKEND_PORT, 10);
            const data = dataDict[door];
            if (!host) {
                return resolve(new ResultDto(-1, 'error', 'door not support'));
            }
            client.send(data, 0, data.length, port, host, (err, bytes) => {
                client.close();
                if (err) {
                    return resolve(new ResultDto(-1, 'error', err));
                }
                return resolve(new ResultDto());
            },
            );
        });
    }

}
