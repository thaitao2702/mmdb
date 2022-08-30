import React, { useRef, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './styles.scss';

import ActorListItem from './ActorListItem/';
import { InputIconPrepend } from 'shared/components/Input';
import NoResultFound from 'shared/components/NoResultFound';
import PageLoader from 'shared/components/PageLoader';

import { useApi } from 'shared/hooks/api';
import usePreventRaceCondition from 'shared/hooks/api/preventRaceCondition';
import onOutSiteClick from 'shared/hooks/onOutSiteClick';
import { ApiUrl } from 'shared/config/apiUrl';
import { handleImageUrl } from 'shared/utils';

import { IActorRoleMovie } from 'Admin/Movie/MovieDetail/ActorsList/ActorListItem';

interface ISearchResultActor {
  id: number | number;
  avatar: string;
  name: string;
}

interface IGetActorsResponse {
  success: boolean;
  data: ISearchResultActor[];
}

interface IActorListProps {
  actors?: IActorRoleMovie[];
  movieId: string | number;
  movieTitle: string;
  onChange?: (...args: any[]) => any;
}

const ActorList = ({ actors, movieId, onChange, movieTitle }: IActorListProps) => {
  const isControlled = actors != undefined;
  const $inputRef = useRef<HTMLInputElement>(null);
  const [searchResultActors, setSearchResultActors] = useState<IActorRoleMovie[]>([]);
  const [stateSelectedActors, setStateSelectedActors] = useState<IActorRoleMovie[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const makeRequest = useApi('get', ApiUrl.getActorByName)[1];
  const [getActors, { loading }] = usePreventRaceCondition(makeRequest);
  const $searchCtn = useRef(null);
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const selectedActors = isControlled ? actors || [] : stateSelectedActors;

  const activeSearch = () => setIsActiveSearch(true);
  const deActiveSearch = useCallback(() => setIsActiveSearch(false), []);

  const addActor = (actor: IActorRoleMovie) => {
    if (isControlled && onChange) onChange([...selectedActors, actor]);
    else setStateSelectedActors((prev) => [...prev, actor]);
  };

  const editActor = (editedActor: IActorRoleMovie) => {
    const actorIndex = selectedActors.findIndex((actor) => actor.actorId === editedActor.actorId);
    let newList = [...selectedActors];
    newList.splice(actorIndex, 1, editedActor);
    if (isControlled && onChange) onChange(newList);
    else setStateSelectedActors(newList);
  };

  const removeActor = (id: number | string) => {
    const newList = selectedActors.filter((actor) => actor.actorId !== id);
    if (isControlled && onChange) onChange(newList);
    else setStateSelectedActors(newList);
  };

  onOutSiteClick([$searchCtn, $inputRef], isActiveSearch, deActiveSearch, null);

  const handleSearchInputChange = async (value: string) => {
    setSearchValue(value);
    if (value) {
      const params = { searchValue: value };
      const response = (await getActors(params)) as IGetActorsResponse;
      if (response.success && response.data) {
        const processedData = response.data.map((actor) => ({
          actorName: actor.name,
          actorId: actor.id,
          avatar: handleImageUrl(actor.avatar),
          role: '',
          movieId: movieId,
          movieTitle: movieTitle,
        }));
        setSearchResultActors(processedData);
      }
    }
  };

  const handleSearchInputChangeDebounced = debounce(handleSearchInputChange, 400);

  const removeAddedActor = (list: IActorRoleMovie[]) => {
    const addedIds = selectedActors.map((actor) => actor.actorId);
    return list.filter((actor) => addedIds.indexOf(actor.actorId) === -1);
  };

  const searchResultActorsFiltered = removeAddedActor(searchResultActors);

  return (
    <div className="c-actor-list mt-20">
      <div className="c-actor-list__heading">Cast</div>
      <div className="c-actor-list__add-section">
        <InputIconPrepend
          placeHolder="Search Actor"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearchInputChangeDebounced(e.target.value)
          }
          ref={$inputRef}
          onClick={activeSearch}
          code="plus"
        ></InputIconPrepend>
        <div className="c-actor-list__search-result" ref={$searchCtn}>
          {isActiveSearch && !loading && searchResultActorsFiltered.length > 0 && (
            <TransitionGroup>
              {searchResultActorsFiltered.map((actor) => (
                <CSSTransition key={actor.actorId} classNames="c-actor-info" timeout={300}>
                  <ActorListItem
                    key={actor.actorId}
                    actor={actor}
                    onSubmit={addActor}
                  ></ActorListItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
          {isActiveSearch && !loading && searchValue && searchResultActorsFiltered.length === 0 && (
            <NoResultFound></NoResultFound>
          )}
          {isActiveSearch && loading && <PageLoader></PageLoader>}
        </div>
      </div>
      <div className="c-actor-list__list-section">
        {selectedActors.length > 0 && (
          <TransitionGroup>
            {selectedActors.map((actor) => (
              <CSSTransition key={actor.actorId} classNames="c-actor-info" timeout={300}>
                <ActorListItem
                  actor={actor}
                  onSubmit={editActor}
                  onRemove={removeActor}
                  isSelectedActor={true}
                ></ActorListItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
    </div>
  );
};

export default ActorList;
