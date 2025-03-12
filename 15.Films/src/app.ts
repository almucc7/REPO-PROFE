import express from 'express';
import createDebug from 'debug';
import { resolve } from 'path';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Film } from '@prisma/client';
import { debugLogger } from './middleware/debug-logger.js';
import {
    notFoundController,
    notMethodController,
} from './controllers/base.controller.js';
import { errorManager } from './controllers/errors.controller.js';
import { createFilmsRouter } from './router/films.router.js';
import { createUsersRouter } from './router/users.router.js';
import type { Repository } from './repo/repository.type.js';
import { UsersRepo } from './repo/users.repository.js';
import { FilmRepo } from './repo/films.repository.js';
import { FilmsController } from './controllers/films.controller.js';
import { UsersController } from './controllers/users.controller.js';
import { AuthInterceptor } from './middleware/auth.interceptor.js';
import { Payload } from './services/auth.service.js';
import { ReviewsController } from './controllers/reviews.controller.js';
import { ReviewRepo } from './repo/reviews.repository.js';
import { createReviewsRouter } from './router/reviews.router.js';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();

// Definir __dirname manualmente para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDatabase() {
    const count = await prisma.film.count(); // Verifica si ya hay películas
    if (count === 0) {
        console.log('📀 Insertando datos iniciales en la base de datos...');
        const seedPath = path.join(__dirname, '../data/films.seed.sql');
        const seedSql = fs.readFileSync(seedPath, 'utf-8');
        await prisma.$executeRawUnsafe(seedSql);
        console.log('✅ Datos insertados correctamente.');
    } else {
        console.log('⚡ La base de datos ya tiene datos, omitiendo seed.');
    }
}

export { seedDatabase };


const debug = createDebug('movies:app');
debug('Loaded module');

//Amplio la interfaz de express añadiendo un user al payload
//Declaro que en el módulo quiero hacer un cambio (no se importa express)
declare module 'express' {
    interface Request {
        user?: Payload;
    }
}

export const createApp = () => {
    debug('Iniciando App...');

    const app = express();
    const __dirname = resolve();
    const publicPath = resolve(__dirname, 'public');

    app.disable('x-powered-by');

    debug('Registrando Middleware...');

    // Middlewares
    app.use(cors());
    if (!process.env.DEBUG) {
        app.use(morgan('dev'));
    }
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(debugLogger('debug-logger'));
    app.use(express.static(publicPath));

    // Controllers, Repositories... instances

    const filmsRepo: Repository<Film> = new FilmRepo();  //Habrá que quitar: : Repository<Film> 
    const usersRepo = new UsersRepo();
    const reviewsRepo: ReviewRepo = new ReviewRepo();

    const authInterceptor = new AuthInterceptor(reviewsRepo);
    const filmsController = new FilmsController(filmsRepo);
    const usersController = new UsersController(usersRepo);
    const reviewsController = new ReviewsController(reviewsRepo);

    const filmsRouter = createFilmsRouter(authInterceptor, filmsController);
    const usersRouter = createUsersRouter(authInterceptor, usersController);
    const reviewsRouter = createReviewsRouter(
        authInterceptor,
        reviewsController,
    );

    // Routes registry
    app.use('/api/films', filmsRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/reviews', reviewsRouter);

    app.get('*', notFoundController); // 404
    app.use('*', notMethodController); // 405

    app.use(errorManager);

    return app;
};
