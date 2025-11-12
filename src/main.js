import ComponentPresenter from './presenter/component-presenter';
import NewTripInfoView from './view/trip-info-view.js';
import NewTripFiltersView from './view/trip-filters-view.js';

import { render } from './render.js';
import { RenderPosition } from './render.js';

const pageMain = document.querySelector('.page-main');
const pageContainer = pageMain.querySelector('.page-body__container');
const tripInfo = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-main__trip-controls');

render(new NewTripInfoView(), tripInfo, RenderPosition.AFTERBEGIN);
render(new NewTripFiltersView(), tripFilters);

const componentPresenter = new ComponentPresenter({ container: pageContainer });

componentPresenter.init();
