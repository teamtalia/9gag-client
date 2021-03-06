/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { message } from 'antd';
import { getLocationOrigin } from 'next/dist/next-server/lib/utils';
import React from 'react';

import { MoreActionsContainer, MoreActionsItem } from '../styles';

interface ActionType {
  label: string;
  action: VoidFunction;
  id: string;
}
interface MoreActionsProps {
  // setVisible: any;
  post: any;
}

const MoreActions: React.FC<MoreActionsProps> = ({ post }) => {
  const actions: ActionType[] = [
    {
      id: '0',
      label: 'Copiar Link',
      action: async () => {
        try {
          await navigator.clipboard.writeText(
            `${getLocationOrigin()}/talia/${post.id}`,
          );
          message.success('Link copiado.');
        } catch (err) {
          message.success('Error ao copiar o link.');
        }
      },
    },
  ];

  function handleAction(e, action) {
    e.preventDefault();
    action();
  }

  return (
    <MoreActionsContainer>
      {actions.map((action, i) => (
        <MoreActionsItem key={action.id}>
          <a href="#" onClick={e => handleAction(e, action.action)}>
            {action.label}
          </a>
        </MoreActionsItem>
      ))}
    </MoreActionsContainer>
  );
};

export default MoreActions;
