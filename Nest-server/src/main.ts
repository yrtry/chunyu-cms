import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import * as history from 'connect-history-api-fallback';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /* 设置请求实体大小 */
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  /* 设置 HTTP 标头来帮助保护应用免受一些众所周知的 Web 漏洞的影响 */
  app.use(
    helmet({
      contentSecurityPolicy: false, //取消https强制转换
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  /* 启动 vue 的 history模式 */
  /*app.use(
    history({
      rewrites: [
        {
          from: /^\/swagger-ui\/.*$/,
          to: function (context) {
            return context.parsedUrl.pathname;
          },
        },
      ],
    }),
  );*/

  /* 配置静态资源目录 */
  app.useStaticAssets(join(__dirname, '../public'));
  /* 配置上传文件目录为 资源目录 */
  if (process.env.uploadPath) {
    app.useStaticAssets(process.env.uploadPath, {
      prefix: '/upload',
    });
  }

  /* 启动swagger */
  setupSwagger(app);
  /* 允许跨域 */
  app.enableCors();

  /* 监听启动端口 */
  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
