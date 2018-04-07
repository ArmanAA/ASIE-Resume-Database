import React from 'react';
import MaterialTitlePanel from './MaterialTitlePanel';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import '../MenuBar.css';

const styles = {
  sidebar: {
    width: 256,
    height: '100vh',
    backgroundColor: '#111'
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
    textAlign: "center",
  },
};

const SidebarContent = (props) => {
  const style = props.style ? {...styles.sidebar, ...props.style} : styles.sidebar;

  return (
    <MaterialTitlePanel title="Menu" style={style}>
        <Link to="/dashboard" style={styles.sidebarLink}><h2 className='Link'>Dashboard</h2></Link>
        <Link to="/candidates" style={styles.sidebarLink}><h2 className='Link'>Candidates</h2></Link>
        <Link to="/employers" style={styles.sidebarLink}><h2 className='Link'>Employers</h2></Link>
        <Link to="/facilitators" style={styles.sidebarLink}><h2 className='Link'>Facilitators</h2></Link>
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default SidebarContent;