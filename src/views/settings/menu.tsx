import React from 'react';
import Link, { LinkProps } from 'next/link';
import { BsFillLockFill } from 'react-icons/bs';
import { FaPen, FaUserAlt } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';
import { MenuContainer } from './styles';

interface ActiveLinkProps extends LinkProps {
  icon?: any;
  title: string;
  otherActivateHrefs?: string[];
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  icon,
  title,
  otherActivateHrefs,
  ...rest
}) => {
  const { asPath } = useRouter();

  let isActive = false;

  if (asPath === rest.href || asPath === rest.as) {
    isActive = true;
  } else if (
    !!otherActivateHrefs &&
    otherActivateHrefs.filter(h => asPath === h).length
  ) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      <li className={isActive ? 'selected' : ''}>
        {icon}
        <span>{title}</span>
      </li>
    </Link>
  );
};

const Menu: React.FC = () => {
  return (
    <MenuContainer>
      <ul>
        <ActiveLink
          title="Conta"
          icon={<FaUserAlt />}
          href="/settings/account"
          otherActivateHrefs={['/settings']}
        />
        <ActiveLink
          title="Senha"
          icon={<BsFillLockFill />}
          href="/settings/password"
        />
        <ActiveLink title="Perfil" icon={<FaPen />} href="/settings/profile" />
      </ul>
    </MenuContainer>
  );
};

export default Menu;
