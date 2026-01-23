import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';

import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

import PointsApiService from './points-api-service.js';

import { BASE_URL, AUTHORIZATION } from './consts.js';

const headerContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-main__trip-controls');
const mainContainer = document.querySelector('.trip-events');

const pointModel = new PointModel({
  pointsApiService: new PointsApiService(BASE_URL, AUTHORIZATION)
});

pointModel.init();

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({ filterContainer, filterModel, pointModel });

const tripInfoPresenter = new TripInfoPresenter({ headerContainer, pointModel });

const mainPresenter = new MainPresenter({ mainContainer, headerContainer, pointModel, filterModel });

filterPresenter.init();
mainPresenter.init();
tripInfoPresenter.init();

