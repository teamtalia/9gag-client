import React, { useCallback, useContext } from 'react';
import { Dropdown } from 'antd';
import { DashOutlined } from '@ant-design/icons';
import { BiTrendingUp } from 'react-icons/bi';
import { FaHotjar } from 'react-icons/fa';
import { HiOutlineClock } from 'react-icons/hi';
import { MdLocationOn } from 'react-icons/md';

import { Container, DropdownMenu, DropdownMenuItem } from './styles';
import AppContext from '../../contexts/AppContext';

const SideBar: React.FC = () => {
  const {
    feedOrder,
    setFeedOrder,
    setFeedRevalidate,
    feedRevalidate,
  } = useContext(AppContext);

  const isActive = name => (name === feedOrder ? 'selected' : '');

  const handleChangeOrder = useCallback(
    (e, order) => {
      e.preventDefault();
      if (order === feedOrder && !feedRevalidate) {
        setFeedRevalidate(true);
      }
      setFeedOrder(order);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [feedOrder, feedRevalidate],
  );

  const Menu = (
    <DropdownMenu>
      <DropdownMenuItem>Melhores Postagens</DropdownMenuItem>
      <DropdownMenuItem>Mais Recentes</DropdownMenuItem>
    </DropdownMenu>
  );

  return (
    <Container>
      <section>
        <ul>
          <li>
            <a
              href="#"
              className={isActive('hot')}
              onClick={e => handleChangeOrder(e, 'hot')}
            >
              <FaHotjar size={16} />
              <span>Em Alta</span>
            </a>
            {/* <Dropdown overlay={Menu} trigger={['click']}>
              <a className="more" href="#">
                <DashOutlined size={16} />
              </a>
            </Dropdown> */}
          </li>
          {/* <li>
            <a href="#">
              <BiTrendingUp size={16} />
              <span>Tendência</span>
            </a>
          </li> */}

          <li>
            <a
              href="#"
              className={isActive('fresh')}
              onClick={e => handleChangeOrder(e, 'fresh')}
            >
              <HiOutlineClock size={16} />
              <span>Recente</span>
            </a>
          </li>
        </ul>
      </section>
      <header>
        <h3>Popular</h3>
      </header>
      <section>
        <ul>
          <li>
            <a href="#">
              <MdLocationOn size={16} />
              <span>Brasil</span>
            </a>
          </li>
        </ul>
      </section>
    </Container>
  );
};

export default SideBar;
