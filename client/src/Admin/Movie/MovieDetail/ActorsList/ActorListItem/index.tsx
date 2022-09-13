import React, { useRef, useState, useEffect, useCallback, Fragment } from 'react';

import Input from 'shared/components/Input';
import { BtnIcon } from 'shared/components/Icon';
import onOutSiteClick from 'shared/hooks/onOutSideClick';

export interface IActorRoleMovie {
  id?: number;
  actorId: number | string;
  avatar: string;
  actorName: string;
  role?: string;
}

interface IActorListItemProps {
  actor: IActorRoleMovie;
  onSubmit?: (...args: any[]) => any;
  onRemove?: (...args: any[]) => any;
  isSelectedActor?: boolean;
}

const ActorListItem = ({
  actor,
  onSubmit,
  onRemove,
  isSelectedActor = false,
}: IActorListItemProps) => {
  const { avatar, actorName, actorId, role = '' } = actor;
  const [stateRole, setStateRole] = useState(role);
  const [isActive, setIsActive] = useState(false);
  const $ctnRef = useRef<HTMLDivElement>(null);
  const $inputRef = useRef<HTMLInputElement>(null);

  const activeItem = () => {
    setIsActive(true);
    if ($inputRef.current) $inputRef.current.focus();
  };

  const deActiveItem = useCallback(() => setIsActive(false), []);

  const handleClose = (e: Event) => {
    e.stopPropagation();
    deActiveItem();
  };

  const handleSubmitActor = (e: Event) => {
    e.stopPropagation();
    const actorInfo = { ...actor, role: stateRole };
    if (onSubmit) onSubmit(actorInfo);
    deActiveItem();
  };

  const handleRemoveActor = (e: Event) => {
    e.stopPropagation();
    if (onRemove) onRemove(actorId);
    deActiveItem();
  };

  const handleInputChange = (value: string) => {
    setStateRole(value);
  };

  onOutSiteClick([$ctnRef], isActive, deActiveItem, null);

  useEffect(() => {
    if (isActive && $inputRef.current) $inputRef.current.focus();
  }, [isActive]);

  return (
    <div className={`c-actor-info ${isActive ? 'active' : ''}`} ref={$ctnRef} onClick={activeItem}>
      <img className="c-actor-info__image" src={avatar}></img>
      <span className="c-actor-info__name">{actorName}</span>
      {isActive && (
        <Fragment>
          <span className="c-actor-info__as">- as -</span>
          <div className="c-actor-info__role">
            <Input
              className="c-input--transparent-no-border c-input--text-white"
              ref={$inputRef}
              value={stateRole}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange(e.target.value);
              }}
            ></Input>
          </div>
          <div className="c-actor-info__btn-ctn">
            <div className="c-actor-info__btn c-actor-info__btn--ok">
              <BtnIcon code="check-1" onClick={handleSubmitActor} _fontSize="22px"></BtnIcon>
            </div>
            <div className="c-actor-info__btn c-actor-info__btn--cancel">
              <BtnIcon code="cancel" onClick={handleClose} _fontSize="22px"></BtnIcon>
            </div>
          </div>
        </Fragment>
      )}
      {!isActive && isSelectedActor && (
        <Fragment>
          {role && (
            <Fragment>
              <span className="c-actor-info__as">- as -</span>
              <div className="c-actor-info__role">{stateRole}</div>
            </Fragment>
          )}
          <div className="c-actor-info__btn-ctn">
            <div className="c-actor-info__btn c-actor-info__btn--delete">
              <BtnIcon code="trash" onClick={handleRemoveActor} _fontSize="22px"></BtnIcon>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ActorListItem;
