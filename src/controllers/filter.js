import Filter from '../components/filter.js';
import {render} from '../utils/render.js';

export default class FilterController {
  constructor({pointsModel, container}) {
    this._pointsModel = pointsModel;
    this._container = container;

    this._activeFilter = `everything`;

    this._filterComponent = null;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  _onFilterChange(newFilter) {
    this._activeFilter = newFilter;
    this._pointsModel.setFilter(newFilter);
  }

  render() {
    const filterComponent = new Filter();
    this._filterComponent = filterComponent;
    filterComponent.setFilterChangeHandler(this._onFilterChange);
    render(this._container, filterComponent, `after`);
  }
}
