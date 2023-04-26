import React from 'react';
import { Input } from 'antd';
import './Search.css';

export default class Search extends React.Component {
  render() {
    return (
      <div className="input">
        <Input type="text" onChange={this.props.onLabelChange} placeholder="Type to search..." autoFocus required />
      </div>
    );
  }
}

// import React from 'react';
// import { Input } from 'antd';
// import './Search.css';

// export default class Search extends React.Component {
//   render() {
//     const { onLabelChange } = this.props;
//     return (
//       <div className="input">
//         <Input type="text" onChange={onLabelChange} placeholder="Type to search..." autoFocus required />
//       </div>
//     );
//   }
// }
