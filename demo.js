const mockPrisma = {
    film: {
        findMany: () => {},
        findUniqueOrThrow: () => {},
        create: () => {},
        update: () => {},
        delete: () => {},
    },
};

const PrismaClient = function () {
    return mockPrisma;
};

console.log('Opción 1', new PrismaClient());

const Prisma = function () {
    this.film = mockPrisma.film;
};

console.log('Opción 2', new Prisma());

const Sample = function () {
    this.user = `Pepe`;
    return {
        name: 'sample',
    };
};

console.log(new Sample());
