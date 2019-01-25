import React, { Component } from 'react'
import { Row , Col } from 'reactstrap';

//Components
import Index from '../components/LandingWidget/index';

export default class Landingdemo extends Component {
  render() {
    return (
      <div className="scroll-main">
        <Index />
      </div>
    )
  }
}