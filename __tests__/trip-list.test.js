import {createTripListTemplate} from '../src/components/trip-list.js'

test('create template for trip list', () => {
  expect(createTripListTemplate()).toBe(`<ul class="trip-days"></ul>`);
});