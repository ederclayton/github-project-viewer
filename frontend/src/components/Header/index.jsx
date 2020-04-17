import React from 'react';
import SelectSearch from 'react-select-search';
import { languages } from './data';
import './style.css';

const Header = (props) => {
  return (
    <header className="site-header">
      <div className="container container-header">
        <span className="site-header-title">
          <b>{props.title}</b> {props.subtitle}
        </span>

        <SelectSearch 
          key="languages"
          value={props.language}
          options={languages}
          placeholder="Search by language"
          search
          onChange={props.updateLanguage}
          />
      </div>
    </header>
  )
}

export default Header;