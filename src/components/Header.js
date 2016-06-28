import React from 'react';
import ReactDOM from 'react-dom';

import {Appbar, Button} from 'muicss/react';

import InlineTextEdit from './InlineTextEdit';

const Header = (props) => (
  <header id='header'>
    <Appbar style={{paddingLeft: '15px', paddingRight: '15px', backgroundColor: '#343434'}}>
      <table width='100%'>
        <tbody>
          <tr style={{verticalAlign: 'middle'}}>
            <td className='mui--appbar-height'>
             <a className='sidedrawer-toggle mui--visible-xs-inline-block mui--visible-sm-inline-block'
              onClick={(event) => {
                var drawer = document.getElementById('sidedrawer');
                //TODO: Use state for this instead.
                if (drawer.style.width === '0px' || drawer.style.width === '') {
                  drawer.style.width = 'auto';
                  drawer.style.minWidth = '200px';
                } else {
                  drawer.style.width = '0px';
                  drawer.style.minWidth = '';
                }
              }}
             >☰</a>
             <InlineTextEdit
               value={props.paste_title}
               onUpdate={(value) => props.onEditPasteTitle(value)}
               className='mui--text-title'
               style={{color: '#ddd', border: '1px dashed #ddd'}}
             />
            </td>
            <td className='mui--appbar-height' style={{textAlign: 'right'}}>
              <Button
                variant='raised'
                style={{backgroundColor: '#404246', color: '#ddd'}}
                onClick={props.onSavePaste}>Save Paste</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Appbar>
  </header>
);

Header.propTypes = {
    onSavePaste: React.PropTypes.func.isRequired,
    onEditPasteTitle: React.PropTypes.func.isRequired,
    paste_title: React.PropTypes.string.isRequired
};

export default Header;
