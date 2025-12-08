import MainPresenter from './presenter/main-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import PointModel from './model/point-model.js';

import { RenderPosition, render } from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';


const pageMain = document.querySelector('.page-main');
const pageContainer = pageMain.querySelector('.page-body__container');
const tripInfo = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-main__trip-controls');
const tripEvents = document.querySelector('.trip-events');

const pointModel = new PointModel();

render(new TripInfoView(), tripInfo, RenderPosition.AFTERBEGIN);

const filterPresenter = new FilterPresenter({ filterContainer: tripFilters, pointModel });

const mainPresenter = new MainPresenter({ mainContainer: pageContainer, pointModel }, { emptyMessagesContainer: tripEvents });

filterPresenter.init();

mainPresenter.init();
