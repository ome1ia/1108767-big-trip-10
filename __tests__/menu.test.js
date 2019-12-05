import {createMenuTemplate} from '../src/components/menu.js'

test('create template for site menu', () => {
  expect(createMenuTemplate()).toBe(`<nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
              <a class="trip-tabs__btn" href="#">Stats</a>
            </nav>`);
});