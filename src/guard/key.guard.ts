import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import ApiKeyService from "src/service/api_key.service";

@Injectable()
export default class KeyGuard implements CanActivate {
    constructor(private keyService: ApiKeyService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const key = request.headers['x-api-key']
        const isValidKey = await this.keyService.checkKey(key);
        if(!isValidKey)
            throw new UnauthorizedException("Chave de API invalida")
        return true;
    }
}