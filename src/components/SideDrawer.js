import React from 'react';
import ReactDOM from 'react-dom';

import {Button, Divider} from 'muicss/react';

import config from 'config';

const APP_TITLE = config['app_title'];

const SideDrawer = (props) => (
  <div id='sidedrawer' className='mui--no-user-select'>
    <div id='sidedrawer-brand' className='mui--appbar-line-height'>{APP_TITLE}</div>
    <div className='mui-divider'></div>
    <ul>
      {
        props.files.map(file => {
          return (
            <li key={file.id}>
              <strong
                className={file.id === props.selected_file_id ? 'current' : ''}
                onClick={() => props.onSelectFile(file.id)}>
                <span className="mui--pull-left">{file.name}</span>
                <span className="mui--pull-right">
                  <a
                    href='#'
                    style={{color: '#a00'}}
                    onClick={(event) => {
                      //Make sure we do not bubble out
                      event.stopPropagation();
                      //Do not actually navigate anywhere (will mess with react-router).
                      //May be better to use a button instead.
                      event.preventDefault();
                      props.onDeleteFile(file.id);
                    }}>
                    <i className="icon-cancel" />
                  </a>
                </span>
                <div className="mui--clearfix"></div>
              </strong>
            </li>
          );
        })
      }
      <li>
        <Button
          style={{width: '100%', backgroundColor: '#344134'}}
          onClick={props.onAddFile}
          >
          <i className="icon-plus" style={{color: '#ddd'}} />
        </Button>
      </li>
    </ul>
  </div>
);

SideDrawer.propTypes = {
  files: React.PropTypes.array.isRequired,
  selected_file_id: React.PropTypes.string.isRequired,
  onSelectFile: React.PropTypes.func.isRequired,
  onAddFile: React.PropTypes.func.isRequired,
  onDeleteFile: React.PropTypes.func.isRequired
};

export default SideDrawer;
