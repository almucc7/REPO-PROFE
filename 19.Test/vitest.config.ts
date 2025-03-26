import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['**/*.test.ts'], //Incluye todos los test que encuentres
        globals: true,
        coverage: {
            include: ['demo1/**/*.ts', 'demo2/**/*.ts'],
        },
    },
});
