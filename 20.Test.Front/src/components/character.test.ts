import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { createCharacter } from './character';
import { Character } from '../types/character';

describe('Given createCharacter function', () => {
    describe('When called with valid parameters', () => {
        // Arrange
        const selector = 'body';
        const position: InsertPosition = 'beforeend';
        const character: Character = {
            id: 1,
            name: 'TestName',
            family: 'TestFamily',
            age: 30,
            isAlive: true,
            reignYears: 10,
            message: '',
            category: 'king',
        } as Character;
        test('Then the component should be in the document', () => {
            // Act
            createCharacter(selector, position, character);
            const element = screen.getByRole('listitem', {
                name: `${character.id}`,
            });
            // Assert
            expect(element).toBeInTheDocument();
            expect(element).toHaveClass('character');
            expect(element).toHaveAttribute('aria-label', `${character.id}`);
            expect(element).toHaveTextContent(
                `${character.name} ${character.family}`,
            );
            expect(element).toHaveTextContent(`Edad: ${character.age} años`);
            expect(element).toHaveTextContent(
                `Años de reinado: ${character.reignYears}`,
            );

            const elementState = screen.getByTestId('state');
            expect(elementState).toHaveClass('fa-thumbs-up');
        });
    });
});
