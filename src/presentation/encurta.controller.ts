import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { link } from 'fs';
import { ObjectId } from 'mongoose';
import {
  CreateLinkDto,
  CreateLinkDtoResponse,
  FindLinkDtoParams,
  FindLinkDtoResponse,
  UpdateLinkDto,
} from 'src/DTOs/link.dto';
import KeyGuard from 'src/guard/key.guard';
import { LinkService } from 'src/service/link.service';

@ApiHeader({
  name: 'x-api-key',
  description: 'Key da api',
})
@ApiUnauthorizedResponse({ description: 'Não foi autorizada a request' })
@UseGuards(KeyGuard)
@Controller('encurta')
export default class EncurtaController {
  constructor(private linkService: LinkService) {}
  @Post()
  @ApiOperation({
    description:
      'Recebe uma URL longa e gera um link encurtado correspondente. O link encurtado pode ser usado para redirecionar para a URL original, facilitando o compartilhamento e a gestão de links.',
  })
  @ApiResponse({
    status: 201,
    description: 'O link foi criado com sucesso',
    type: CreateLinkDtoResponse,
  })
  async create(
    @Body() { link }: CreateLinkDto,
  ): Promise<CreateLinkDtoResponse> {
    const generated_link = await this.linkService.create(link);
    return generated_link;
  }

  @Get(':id')
  @ApiOperation({
    description:
      'Retorna as informações detalhadas de um link encurtado específico, incluindo a URL original, o ID do banco de dados, a URL encurtada e o número total de cliques registrados para esse link.',
  })
  @ApiResponse({
    status: 200,
    description: 'O link foi encontrado',
    type: FindLinkDtoResponse,
  })
  @ApiResponse({ status: 400, description: 'Não é um Id Válido' })
  @ApiResponse({ status: 404, description: 'não foi encontrado um link' })
  async find(@Param() { id }: FindLinkDtoParams) {
    const link = await this.linkService.find(id);
    return link;
  }


  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'O link foi deleteado corretamente',
  })
  @ApiOperation({
    description:
      'Remove o link encurtado especificado pelo ID. A exclusão inclui a remoção da URL encurtada e todas as informações associadas ao link, como contagem de cliques e dados do banco de dados.',
  })
  @ApiResponse({ status: 400, description: 'Não é um Id Válido' })
  @ApiResponse({ status: 404, description: 'não foi encontrado um link' })
  async drop(@Param() { id }: FindLinkDtoParams): Promise<void> {
    const link = await this.linkService.delete(id);
  }
  @Patch(':id')
  @HttpCode(204)
  @ApiOperation({
    description:
      'Atualiza a URL original de um link encurtado existente. Esta operação modifica apenas a URL original associada ao link, mantendo inalterados o ID do banco de dados, a URL encurtada e a contagem de cliques.',
  })
  @ApiResponse({ status: 204, description: 'O link foi alterado' })
  @ApiResponse({ status: 400, description: 'Não é um Id Válido' })
  @ApiResponse({ status: 404, description: 'não foi encontrado um link' })
  async update(
    @Param() { id }: FindLinkDtoParams,
    @Body() { link }: UpdateLinkDto,
  ) {
    await this.linkService.update(id, link);
  }
}
