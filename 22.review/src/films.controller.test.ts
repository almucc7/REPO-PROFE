import { FilmsController } from './films.controller';
import { NextFunction, Request, Response } from 'express';
import { vi, Mock } from 'vitest';
import { FilmCreateDTO } from './dto/films.dto';

vi.mock('../dto/films.dto');

const mockRepo = {
    read: vi.fn().mockResolvedValueOnce([]),
    readById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    toggleCategory: vi.fn(),
    delete: vi.fn(),
};

describe('FilmsController', () => {
    FilmCreateDTO.parse = vi.fn();
    FilmCreateDTO.partial = vi.fn().mockReturnValue(FilmCreateDTO.parse);

    const filmsController = new FilmsController(mockRepo);

    const req = {
        params: { id: '1' },
        body: {},
    } as unknown as Request;
    const res = {
        json: vi.fn(),
        status: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    const error = new Error('Error');

    test('should be defined', () => {
        expect(filmsController).toBeDefined();
        expect(filmsController).toBeInstanceOf(FilmsController);
    });

    describe('getAll method', () => {
        test('should call json when repo response is valid ', async () => {
            // Act
            await filmsController.getAll(req, res, next);
            // Assert
            expect(mockRepo.read).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({
                results: [],
                error: '',
            });
        });
        test('should call next when repo throw an error ', async () => {
            // Arrange
            (mockRepo.read as Mock).mockRejectedValueOnce(error);
            // Act
            await filmsController.getAll(req, res, next);
            // Assert
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getById method', () => {
        test('should call json when repo response is valid ', async () => {
            // Arrange
            (mockRepo.readById as Mock).mockResolvedValueOnce({});
            // Act
            await filmsController.getById(req, res, next);
            // Assert
            expect(mockRepo.readById).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith({
                results: [{}],
                error: '',
            });
        });
        test('should call next when repo throw an error ', async () => {
            // Arrange
            (mockRepo.readById as Mock).mockRejectedValueOnce(error);
            // Act
            await filmsController.getById(req, res, next);
            // Assert
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
