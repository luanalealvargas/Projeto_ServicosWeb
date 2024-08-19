import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { LinkService } from './service/link.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly linkService: LinkService) {}

  @Get(':link')
  @ApiOperation({description:"Redireciona o usuário para a URL original associada ao código encurtado fornecido. Além do redirecionamento, incrementa o contador de visualizações do link. Se o código não for encontrado, retorna um erro apropriado."})
  async redirect(@Param("link") link:string, @Res() res:Response){
    const originalLink = await this.linkService.handleView(link)
    res.redirect(originalLink);
  }
}
