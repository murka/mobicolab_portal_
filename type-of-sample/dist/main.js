"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const configService = new config_1.ConfigService();
async function bootstrap() {
    const logger = new common_1.Logger('bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const port = configService.get('PORT');
    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map