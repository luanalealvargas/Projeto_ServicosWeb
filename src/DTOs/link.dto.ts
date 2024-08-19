import { ApiProperty } from "@nestjs/swagger";
import { IsObjectId } from "class-validator-mongo-object-id";

export class CreateLinkDto {
    @ApiProperty({
        description: 'O link no qual você quer encurtar'
    })
    link: string
}
export class UpdateLinkDto {
    @ApiProperty({
        description: 'O link no qual você quer encurtar'
    })
    link: string
}
export class CreateLinkDtoResponse {
    @ApiProperty()
    id: string;
    @ApiProperty()
    generated_link: string;

}
export class FindLinkDtoParams{
    @ApiProperty(    )
    @IsObjectId({
        message: 'Não é um id válido',
    })
    id: string;
}
export class FindLinkDtoResponse {
    @ApiProperty()
    _id: string;
    @ApiProperty()
    original_link: string;
    @ApiProperty()
    short_link: string;
    @ApiProperty()
    exp_date: Date;
    @ApiProperty()
    views: number;

}