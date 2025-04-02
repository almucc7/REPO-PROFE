import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { createFormAdd } from './form.add';
import { Character } from '../types/character';
import { MESSAGES } from '../data/messages';

describe('Given createFormAdd function', () => {
    describe('When called it', () => {
        const spyLog = vi.spyOn(console, 'log');
        beforeAll(() => {
            // Arrange
            // const selector = 'body';
            // const position: InsertPosition = 'beforeend';
            // Act
            createFormAdd([{ id: 1 } as Character]);
        });
        test('The form should be in the document', async () => {
            const element = screen.getByRole('form', {
                name: 'add_form',
            }) as HTMLFormElement;
            expect(element).toBeInTheDocument();
            // const inputName = element.elements.namedItem(
            //     'name',
            // ) as HTMLInputElement;
            const inputName = screen.getByRole('textbox', {
                name: 'Name',
            }) as HTMLInputElement;
            expect(inputName.value).toBe('');
            await userEvent.type(inputName, 'Sergio');
            expect(inputName.value).toBe('Sergio');
            // console.log(element.elements.namedItem('family'));
            // console.log(element.elements.namedItem('age'));
            const inputIsAlive = screen.getByRole('checkbox', {
                name: 'Esta vivo',
            }) as HTMLInputElement;
            expect(inputIsAlive).not.toBeChecked();
            expect(inputIsAlive.checked).toBe(false);
            await userEvent.click(inputIsAlive);
            expect(inputIsAlive.checked).toBe(true);
            const selectCategory = screen.getByRole('combobox', {
                name: 'Category',
            }) as HTMLInputElement;
            expect(selectCategory.value).toBe('');
            await userEvent.selectOptions(selectCategory, 'fighter');
            expect(selectCategory.value).toBe('fighter');
            const submitButton = screen.getByRole('button', {
                name: 'Crear',
            }) as HTMLInputElement;
            await userEvent.click(submitButton);
            expect(spyLog).toHaveBeenCalledWith(
                'Form submitted:',
                expect.objectContaining({
                    id: 2,
                    name: 'Sergio',
                    family: '',
                    age: NaN,
                    message: MESSAGES['fighter'],
                    isAlive: true,
                    category: 'fighter',
                }),
            );

            // console.log(element.elements.namedItem('submit'));
        });
    });
});
