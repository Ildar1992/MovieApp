import React from 'react';
import { Tabs } from 'antd';

import './Header.css';

const Header = (props) => {
  const { active, setActive } = props;
  const arr = [
    { label: 'Search', key: 'search' },
    { label: 'Rated', key: 'rated' },
  ];
  return (
    <div className="header__nav">
      <Tabs items={arr} className="tabs__properties" mode="horizontal" onChange={setActive} selectedkeys={active} />
    </div>
  );
};
export default Header;

// import React from 'react';
// import { Tabs } from 'antd';

// import './Header.css';

// const Header = () => {
//   const arr = [
//     { key: 'search', label: 'Search' },
//     { key: 'rated', label: 'Rated' },
//   ];
//   return (
//     <div className="header__nav">
//       <Tabs items={arr} className="tabs__properties" mode="horizontal" />
//     </div>
//   );
// };
// export default Header;
