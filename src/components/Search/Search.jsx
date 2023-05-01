import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import './Search.css';

export default class Search extends React.Component {
  static defaultProps = {
    onLabelChange: () => {},
  };
  static propTypes = {
    onLabelChange: PropTypes.func,
  };
  render() {
    return (
      <div className="search">
        <Input
          className="search__input"
          onChange={this.props.onLabelChange}
          placeholder="Type to search..."
          autoFocus
          required
        />
      </div>
    );
  }
}
