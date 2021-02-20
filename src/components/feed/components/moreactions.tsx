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
      label: 'Copy Link',
      action: async () => {
        try {
          await navigator.clipboard.writeText(
            `${getLocationOrigin()}/talia/${post.id}`,
          );
          message.success('Link Copied.');
        } catch (err) {
          message.success('Error on copy link.');
        }
      },
    },
    {
      id: '1',
      label: 'Email',
      action: () => { },
    },
    {
      id: '2',
      label: 'Twitter',
      action: () => { },
    },
    {
      id: '3',
      label: 'Download',
      action: () => { },
    },
    {
      id: '4',
      label: "I don't like this",
      action: () => { },
    },
    {
      id: '5',
      label: "I've seen this",
      action: () => { },
    },
    {
      id: '6',
      label: 'Reportt',
      action: () => { },
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
