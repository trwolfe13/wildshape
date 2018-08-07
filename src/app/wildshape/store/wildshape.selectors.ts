import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Creature } from '@ws/wildshape/models';
import * as _ from 'lodash';

import { Sort, WildshapeFilter, WildshapeState } from './wildshape.state';

export const wildshapeFeature = 'dashboard';
const wildshape = createFeatureSelector<WildshapeState>(wildshapeFeature);


function creatureFilter(f: WildshapeFilter): (c: Creature) => boolean {
  return (creature: Creature): boolean => {
    if (creature.type.toLowerCase() !== 'beast') { return false; }
    return true;
  };
}

function creatureSort(c: Creature[], sort: Sort): Creature[] {
  if (!sort) { return c; }
  return _.orderBy(c, sort.field, sort.ascending ? 'asc' : 'desc');
}

const creatures = createSelector(wildshape, (state: WildshapeState) => state.creatures);

const searchResults = createSelector(
  wildshape,
  creatures,
  (state, c) => creatureSort(c.filter(creatureFilter(state.filter)), state.sort)
);

export const selectors = {
  wildshape,
  creatures,
  searchResults
};
