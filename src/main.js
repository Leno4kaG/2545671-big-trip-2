import MainPresenter from './presenter/main-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import PointModel from './model/point-model.js';

import { render } from './render.js';
import { RenderPosition } from './render.js';

const pageMain = document.querySelector('.page-main');
const pageContainer = pageMain.querySelector('.page-body__container');
const tripInfo = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-main__trip-controls');

const pointModel = new PointModel();

render(new TripInfoView(), tripInfo, RenderPosition.AFTERBEGIN);
render(new FiltersView(), tripFilters);

const componentPresenter = new MainPresenter({ container: pageContainer, pointModel });

componentPresenter.init();
