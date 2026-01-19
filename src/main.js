import MainPresenter from './presenter/main-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';

import { RenderPosition, render } from './framework/render.js';
import { BASE_URL, AUTHORIZATION } from './consts.js';


const headerContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-main__trip-controls');
const mainContainer = document.querySelector('.trip-events');

const pointModel = new PointModel({
  pointsApiService: new PointsApiService(BASE_URL, AUTHORIZATION)
});
const filterModel = new FilterModel();

render(new TripInfoView(), headerContainer, RenderPosition.AFTERBEGIN);

const filterPresenter = new FilterPresenter({ filterContainer, filterModel, pointModel });

const mainPresenter = new MainPresenter({ mainContainer, headerContainer, pointModel, filterModel });

pointModel.init();
filterPresenter.init();
mainPresenter.init();

