import { IAccessTokenRes } from '@dashy/api-interfaces';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import asyncHandler = require('express-async-handler');
import { authLinkService } from '../../services/authlink.service';
import { Logger } from '../../util/logger/logger';

export const linkGuilded = asyncHandler(async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const access = ((await authLinkService.getAccess(code)) as AxiosResponse)
        .data as IAccessTokenRes;
    const accessToken = access.access_token;
    const user = await authLinkService.getUser(accessToken);
    Logger.info(user);
    res.sendStatus(200);
});
