import { FilmRepo } from '../repo/films.repository';
import { FilmsController } from './films.controller';
import { vi } from 'vitest';
import { Request, Response } from 'express';
import { Film } from '@prisma/client';

describe('Given a instance of FilmsController', () => {
    const mockFilms: Film[] = [];
    const repoFilmsMock = {
        read: vi.fn().mockResolvedValue(mockFilms),
        readById: vi.fn().mockResolvedValue(mockFilms),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    } as unknown as FilmRepo;
    const req = {
        params: {},
    } as Request;
    const res = {
        json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn();
    const controller = new FilmsController(repoFilmsMock);
    const error = new Error('Error');
    test('Then it should be instance of FilmController', () => {
        expect(controller).toBeInstanceOf(FilmsController);
    });

    describe('When calling getAll', () => {
        test('Then it should call repoFilms.read receiving valid data', async () => {
            const data = {
                results: mockFilms,
                error: '',
            };
            await controller.getAll(req, res, next);
            expect(repoFilmsMock.read).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(data);
        });
        test('Then it should call repoFilms.read receiving an error', async () => {
            repoFilmsMock.read = vi.fn().mockRejectedValueOnce(error);
            await controller.getAll(req, res, next);
            expect(repoFilmsMock.read).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('When calling getById', () => {
        test('Then it should call repoFilms.readById receiving valid data', async () => {
            const data = {
                results: mockFilms,
                error: '',
            };
            await controller.getById(req, res, next);
            expect(repoFilmsMock.readById).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(data);
        });
        test('Then it should call repoFilms.readById receiving an error', async () => {
            repoFilmsMock.readById = vi.fn().mockRejectedValueOnce(error);
            await controller.getById(req, res, next);
            expect(repoFilmsMock.readById).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
