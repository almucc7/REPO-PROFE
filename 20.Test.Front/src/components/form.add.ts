import { Category, MESSAGES } from '../data/messages.js';
import { Character } from '../types/character.js';
import { render } from './base.js';

function setID(characters: Character[]) {
    const ids = characters.map((character) => character.id);
    const maxID = Math.max(...ids);
    return maxID + 1;
}

export function createFormAdd(
    characters: Character[] = [],
    selector: string = 'body',
    position: InsertPosition = 'afterbegin',
) {
    // Function to handle form submission
    function handleSubmit(event: Event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const character: Character = {
            id: setID(characters),
            name: data.name as string,
            family: data.family as string,
            category: data.category as
                | 'king'
                | 'fighter'
                | 'adviser'
                | 'squire',
            message: MESSAGES[data.category as Category],
            age: parseInt(data.age as string), // Convert age to a number
            isAlive: data.isAlive === 'on', // Convert checkbox value to boolean
        };

        console.log('Form submitted:', character); // Log the form data to the console
    }

    const template = /*html*/ `
    <form class="add_form" aria-label="add_form">
        <label>
            <span>Name</span>
            <input type="text" name="name">
        </label>
        <label>
            <span>Family</span>
            <input type="text" name="family">
        </label>
        <label>
            <span>Edad</span>
            <input type="number" name="age">
        </label>
        <label>
            <input type="checkbox" name="isAlive" />
            <span>Esta vivo</span>
        </label>
        <label>
            <span>Category</span>
            <select name="category" id="category">
                <option value="" disabled selected hidden></option>
                <option value="king">King</option>
                <option value="fighter">Fighter</option>
                <option value="adviser">Adviser</option>
                <option value="squire">Squire</option>
            </select>
        </label>
        <button type="submit">Crear</button>
    </form>
    `;

    const element = render(selector, position, template);
    // Add event listener to the form to prevent default behavior
    element!.addEventListener('submit', handleSubmit);
    return element as HTMLFormElement;
}
