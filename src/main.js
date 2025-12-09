import MainPresenter from './presenter/main-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import PointModel from './model/point-model.js';

import { RenderPosition, render } from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';


const pageMain = document.querySelector('.page-main');
const mainContainer = pageMain.querySelector('.page-body__container');
const tripInfo = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-main__trip-controls');
const emptyMessagesContainer = document.querySelector('.trip-events');

const pointModel = new PointModel();

render(new TripInfoView(), tripInfo, RenderPosition.AFTERBEGIN);

const filterPresenter = new FilterPresenter({ filterContainer, pointModel });

const mainPresenter = new MainPresenter({ mainContainer, emptyMessagesContainer, pointModel });

filterPresenter.init();

mainPresenter.init();
