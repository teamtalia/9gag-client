import React from 'react';
import { Dropdown } from 'antd';
import { DashOutlined } from '@ant-design/icons';
import { BiTrendingUp } from 'react-icons/bi';
import { FaHotjar } from 'react-icons/fa';
import { HiOutlineClock } from 'react-icons/hi';
import { MdLocationOn } from 'react-icons/md';

import { Container, DropdownMenu, DropdownMenuItem } from './styles';

const SideBar: React.FC = () => {
  const Menu = (
    <DropdownMenu>
      <DropdownMenuItem>Top Posts</DropdownMenuItem>
      <DropdownMenuItem>Most Recent</DropdownMenuItem>
    </DropdownMenu>
  );

  return (
    <Container>
      <section>
        <ul>
          <li>
            <a href="#" className="selected">
              <FaHotjar size={16} />
              <span>Em Alta</span>
            </a>
            <Dropdown overlay={Menu} trigger={['click']}>
              <a className="more" href="#">
                <DashOutlined size={16} />
              </a>
            </Dropdown>
          </li>
          <li>
            <a href="#">
              <BiTrendingUp size={16} />
              <span>Tendência</span>
            </a>
          </li>

          <li>
            <a href="#">
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
