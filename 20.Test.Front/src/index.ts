import { createCharacter } from './components/character.js';
import { createFormAdd } from './components/form.add.js';
import { createHeader } from './components/header.js';
import { getCharacters } from './services/repo.js';

// IIFE (Immediately Invoked Function Expression)

(async () => {
    const data = await getCharacters();
    createHeader();
    createFormAdd(data, 'summary.header__nav-title', 'afterend');
    data.forEach((character) => {
        createCharacter('ul.characters-list', 'beforeend', character);
    });
})();
