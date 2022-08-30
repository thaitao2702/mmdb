import React from 'react';
import { useGlobalContext } from 'shared/context';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { InlineIcon } from 'shared/components/Icon';
import useToast from 'shared/hooks/toast';

import './styles.scss';

const iconMapping: { [key: string]: string } = {
    'success': 'check',
    'warning': 'exclamation',
    'error': 'exclamation-triangle'
}

const Toast = () => {
    const { state: { toast } } = useGlobalContext();
    const Toast = useToast();
    return (
        <div className="toast-ctn">
            <TransitionGroup>
                {toast.map((t: any) => (
                    <CSSTransition key={t.id} classNames="toast-transition" timeout={200}>
                        <div className={`toast toast-${t.type} flex-vertical-center`}>
                            <div className="toast__icon">
                                <InlineIcon code={iconMapping[t.type as string]} _fontSize="28px" _top="4px"></InlineIcon>
                            </div>
                            <div className="toast__content">
                                <div className="toast__title">{t.type}</div>
                                <div className="toast__message">{t.message}</div>
                            </div>
                            <div className="toast__close-btn btn flex-center" onClick = {()=>Toast.close(t.id)}>
                                <InlineIcon code="times" _fontSize="16px" _top="3px"></InlineIcon>
                            </div>
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>

        </div>
    )
}

export default Toast;