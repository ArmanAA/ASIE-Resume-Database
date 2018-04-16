import React from 'react';
import MaterialTitlePanel from './MaterialTitlePanel';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../MenuBar.css';

const styles = {
  sidebar: {
    width: 256,
    height: 'auto',
    minHeight: '100vh',
    backgroundColor: '#494D55',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    textDecoration: 'none',
    textAlign: "center",
  },
};

const SidebarContent = (props) => {
  const style = props.style ? {...styles.sidebar, ...props.style} : styles.sidebar;

  return (
    <MaterialTitlePanel title="Menu" style={style}>
        <NavLink to="/candidates" style={styles.sidebarLink} activeClassName="active"><h2 className='NavLink'>Candidates</h2></NavLink>
        <NavLink to="/employers" style={styles.sidebarLink} activeClassName="active"><h2 className='NavLink'>Employers</h2></NavLink>
        {
          props.admin ?
            <NavLink to="/facilitators" style={styles.sidebarLink} activeClassName="active"><h2 className='NavLink'>Facilitators</h2></NavLink>
          :
            <span/>
        }
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default SidebarContent;