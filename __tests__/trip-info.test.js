import {createTripInfoTemplate} from '../src/components/trip-info.js'

test('create template for trip info', () => {
  expect(createTripInfoTemplate()).toBe(`<div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Geneva &mdash; Chamonix &mdash; Geneva &mdash; Amsterdam</h1>

              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
            </div>`);
});