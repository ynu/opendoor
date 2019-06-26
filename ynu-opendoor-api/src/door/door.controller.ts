import {
    Controller,
    Req,
    Body,
    Post,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Put,
} from '@nestjs/common';
import {
    ApiUseTags,
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiImplicitParam,
    ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { DoorService } from './door.service';
import { ResultDto } from './dto/result.dto';

@Controller('door')
@ApiUseTags('door')
export class DoorController {
    constructor(private readonly doorService: DoorService) { }

    @Get('opendoor/:door')
    @ApiOperation({ title: '执行开门' })
    @ApiOkResponse({ type: ResultDto })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    opendoor(@Param('door') door: string): Promise<ResultDto> {
        return this.doorService.opendoor(door);
    }

}
