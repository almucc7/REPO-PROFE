import { createFormAdd } from './form.add';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'; //nameSpace for jest-dom matchers
import { vi } from 'vitest';

vi.spyOn(console, 'log');

describe('createFormAdd', () => {
    test('should create a form with the correct structure', async () => {
        // Act
        const form = createFormAdd([], 'body', 'afterbegin');

        // Assert
        expect(form).toBeInstanceOf(HTMLFormElement);

        // const f = document.querySelector('form.add_form');
        // expect(f).toBeInstanceOf(HTMLFormElement);

        const formElement = screen.getByRole('form', {
            name: 'add_form',
        }) as HTMLFormElement;
        expect(formElement).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Name'), 'Pepe');
        await userEvent.type(screen.getByLabelText('Family'), 'Pérez');
        await userEvent.type(screen.getByLabelText('Edad'), '30');
        const button = screen.getByRole('button', { name: 'Crear' });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('type', 'submit');
        button.click();

        const character = {
            id: -Infinity,
            name: 'Pepe',
            family: 'Pérez',
            category: '',
            message: undefined,
            age: 30,
            isAlive: false,
        };

        expect(console.log).toHaveBeenCalledWith('Form submitted:', character);
    });
});
