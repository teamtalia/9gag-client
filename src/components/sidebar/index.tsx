import React, { useCallback, useContext, useMemo } from 'react';
import { Dropdown } from 'antd';
import { DashOutlined } from '@ant-design/icons';
import { BiTrendingUp } from 'react-icons/bi';
import { FaHotjar } from 'react-icons/fa';
import { HiOutlineClock } from 'react-icons/hi';
import { MdLocationOn } from 'react-icons/md';

import Avatar from 'antd/lib/avatar/avatar';
import { Container, DropdownMenu, DropdownMenuItem } from './styles';
import AppContext from '../../contexts/AppContext';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';

type CategoriesData = {
  id: string;
  name: string;
  slug: string;
  posts: number;
  tags: {
    name: string;
    id: string;
    slug: string;
  }[];
};
interface CategoriesPayload {
  categories: CategoriesData[];
}

const SideBar: React.FC = () => {
  const {
    feedOrder,
    setFeedOrder,
    setFeedRevalidate,
    feedRevalidate,
  } = useContext(AppContext);

  const { data } = useFetch<CategoriesPayload>('/categories', api, {});

  const categories = useMemo(() => (data && data.categories) || [], [data]);

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
            {categories.map(category => (
              <a href="#">
                <Avatar
                  size={28}
                  src={`/images/categories-icons/${category.slug}.svg`}
                />
                <span>{category.name}</span>
              </a>
            ))}
          </li>
        </ul>
      </section>
    </Container>
  );
};

export default SideBar;
