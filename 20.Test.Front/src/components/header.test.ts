import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { createHeader } from './header';

vi.mock('./form.add');

describe('Given createHeader function', () => {
    describe('When called it', () => {
        beforeAll(() => {
            // Arrange
            // const selector = 'body';
            // const position: InsertPosition = 'beforeend';

            // Act
            createHeader();
        });
        test('The title "Game of Thrones" should be in the document', () => {
            const element = screen.getByRole('heading', {
                name: /game of thrones/i,
            });
            expect(element).toBeInTheDocument();
        });
    });
});
