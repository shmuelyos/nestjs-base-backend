import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import compression from "compression";
import { ConfigService } from "@nestjs/config";
import session from "express-session";
import MongoStore from "connect-mongo";
import fs from "fs";


async function bootstrap() {
  const paths = {
    key: __dirname.slice(0, -4) + "ssl\\cert.key",
    cert: __dirname.slice(0, -4) + "ssl\\cert.crt"
  };

  if (!fs.existsSync(paths.key) || !fs.existsSync(paths.cert)) {
    throw new Error("SSL certificates not found");
  }

  const httpsOptions = {
    key: fs.readFileSync(paths.key),
    cert: fs.readFileSync(paths.cert)
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions
  });

  const configService = app.get(ConfigService);

  let cookie = {
    maxAge: parseInt(configService.get("SESSION_EXPIRATION")),
    sameSite: configService.get("SAME_SITE") as "lax" | "strict" | "none" | boolean,
    httpOnly: configService.get("HTTP_ONLY") == "true",
    secure: configService.get("SECURE") == "true",
    domain: configService.get("COOKIE_DOMAIN"),
    path: "/"
  };
  console.log("cookie:");
  console.log(cookie);

  app.use(session({
      secret: configService.get("SESSION_SECRET"),
      store: MongoStore.create({ mongoUrl: configService.get("MONGODB_URI") }),
      resave: false,
      saveUninitialized: false,
      cookie
    })
  );

  app.use((req, res, next) => {
    console.log("Request received:", req.method, req.url);
    res.on("finish", () => {
      console.log("Response sent:", res.statusCode);
      console.log("Session data:", req.session);
    });
    next();
  });

  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: configService.get("FRONTEND_URL"),
    credentials: true
  });

  const httpAdapter = app.getHttpAdapter().getInstance();
  // Trust the first proxy
  httpAdapter.set("trust proxy", 1);

  await app.listen(configService.get("PORT"));
}

bootstrap();

