import React from 'react';
import ReactDOM from 'react-dom';

import {Appbar, Button} from 'muicss/react';

const Footer = () => (
  <footer id='footer'
    style={{paddingLeft: '15px',
            paddingRight: '15px',
            paddingTop: '10px',
            paddingBottom: '10px',
            backgroundColor: '#25282c'}}>
    <table width='100%'>
      <tbody>
        <tr style={{verticalAlign: 'middle'}}>
          <td></td>
          <td style={{textAlign: 'right'}}>
            <a href='http://www.dewyatt.com' target='_blank'>dewyatt</a>
          </td>
        </tr>
      </tbody>
    </table>
  </footer>
);

export default Footer;
