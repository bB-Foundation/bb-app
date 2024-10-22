import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from 'src/redux-store';
import cities from 'src/assets/data/cities';
import {setCity} from 'src/redux-store/slices/quests-page';
import {noCityItem} from './city-dropdown.api';

export const useDropdownLogic = () => {
  const dispatch = useDispatch();

  const {
    modalQuestsFilters: {city},
  } = useSelector((state: RootState) => state.questsPage);

  const setCityHandler = (value: string | null) => {
    dispatch(setCity(value ?? undefined));
  };

  return {value: city, setCityHandler};
};

export const useCitiesData = () => {
  const {
    modalQuestsFilters: {country},
  } = useSelector((state: RootState) => state.questsPage);

  const filteredCities = useMemo(() => {
    if (!country) return [noCityItem, ...cities];

    return [noCityItem, ...cities.filter(c => c.countryId === country)];
  }, [country]);

  return filteredCities;
};
