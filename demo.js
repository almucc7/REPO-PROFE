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

console.log(new PrismaClient());

const Prisma = function () {
    this.film = mockPrisma.film;
};

console.log(new Prisma());

const Sample = function () {
    return {
        name: 'sample',
    };
};

console.log(new Sample());
