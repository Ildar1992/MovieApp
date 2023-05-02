import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends React.Component {
  static defaultProps = {
    onLabelChange: () => {},
  };
  static propTypes = {
    onLabelChange: PropTypes.func,
  };
  render() {
    return (
      <section className="search">
        <Input
          className="search__input"
          onChange={this.props.onLabelChange}
          placeholder="Type to search..."
          autoFocus
          required
        />
      </section>
    );
  }
}
export default Search;
