import { DocumentBuilder } from "@nestjs/swagger";

const swaggerConfig = new DocumentBuilder()
    .setTitle('POS API')
    .setVersion('1.0')
    .build();

export default swaggerConfig;