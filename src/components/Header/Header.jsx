import React from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

import './Header.css';

const Header = (props) => {
  const { active, setActive } = props;
  const arr = [
    { label: 'Search', key: 'search' },
    { label: 'Rated', key: 'rated' },
  ];
  return (
    <div className="header__nav">
      <Tabs items={arr} mode="horizontal" onChange={setActive} selectedkeys={active} />
    </div>
  );
};

Header.defaultProps = {
  setActive: () => {},
  active: 'search',
};
Header.propTypes = {
  setActive: PropTypes.func,
  active: PropTypes.string,
};
export default Header;
