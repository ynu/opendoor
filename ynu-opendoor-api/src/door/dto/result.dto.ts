import { ApiModelProperty } from '@nestjs/swagger';

export class ResultDto {

    @ApiModelProperty()
    readonly code: number;

    @ApiModelProperty()
    readonly message: string;

    @ApiModelProperty()
    readonly data: object;

    constructor(code = 0, message = 'ok', data = {}) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
