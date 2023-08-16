import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { parse } from 'url';

import ViewService from '@api/view/view.service';

@Controller('/')
export default class ViewController {
  constructor(private viewService: ViewService) {}

  async handler(req: Request, res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, <string>parsedUrl.pathname, parsedUrl.query);
  }

  @Get('/')
  public async showHome(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);

    await this.viewService
      .getNextServer()
      .render(req, res, '/index', Object.assign(parsedUrl.query));
  }

  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, <string>parsedUrl.pathname, parsedUrl.query);
  }
}
