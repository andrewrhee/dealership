import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <a href='/schedule-test-flight'>
          Schedule Test Flight! No Pilot's License Required
        </a>
      </footer>
    );
  }
}

export default Footer;
