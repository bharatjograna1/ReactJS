import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class App extends Component {

  state = {
    nameState: false,
    data: ["a", "b", "c", "d", "e"],
    inputState: "",
  }

  handleSetState = () => {
    var myArray = this.state.data.slice(0, 4);

    this.setState({ nameState: !this.state.nameState });
    this.setState({ data: myArray })

    this.forceUpdate();
    ReactDOM.findDOMNode(document.getElementById('bharat')).style.color = 'green';

    this.setState({ inputState: "" })
    ReactDOM.findDOMNode(this.refs.username).focus();
  }
  setInput = (e) => {
    this.setState({ inputState: e.target.value });
  }


  render() {
    return (
      <div>
        <h3>Array: {this.props.propArray}</h3>
        <h3>Bool: {this.props.propBool ? "True..." : "False..."}</h3>
        <h3>Func: {this.props.propFunc(3)}</h3>
        <h3>Number: {this.props.propNumber}</h3>
        <h3>String: {this.props.propString}</h3>
        <h3>Object: {this.props.propObject.objectName1}</h3>
        <h3>Object: {this.props.propObject.objectName2}</h3>
        <h3>Object: {this.props.propObject.objectName3}</h3>
        <h1 id='bharat'>{this.state.nameState === false ? "Bharat Jograna" : "Bharat"}</h1>
        <h4>State Array: {this.state.data}</h4>

        <button onClick={this.handleSetState}>setState</button>

        <h4>Random number: {Math.random()}</h4>

        <LifeCycle myNumber="Bharat a propss" />

        <input ref="username" type='text' value={this.state.inputState} onChange={this.setInput} /> {this.state.inputState}

      </div>
    );
  }
}


App.propTypes = {
  propArray: PropTypes.array.isRequired,
  propBool: PropTypes.bool.isRequired,
  propFunc: PropTypes.func,
  propNumber: PropTypes.number,
  propString: PropTypes.string,
  propObject: PropTypes.object
}

App.defaultProps = {
  propArray: [1, 2, 3, 4, 5],
  propBool: true,
  propFunc: function (e) { return e },
  propNumber: 1,
  propString: "String value...",

  propObject: {
    objectName1: "objectValue1",
    objectName2: "objectValue2",
    objectName3: "objectValue3"
  }
}


class LifeCycle extends App {
  componentWillMount() {
    console.log('Component WILL MOUNT!')
  }
  componentDidMount() {
    console.log('Component DID MOUNT!')
  }
  render() {
    console.log('Component  render!')
    return (
      <div>
        {this.props.myNumber}
      </div>
    );
  }
  componentWillReceiveProps(newProps) {
    console.log('Component WILL RECIEVE PROPS!')
  }
  shouldComponentUpdate(newProps, newState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('Component WILL UPDATE!');
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('Component DID UPDATE!')
  }
  componentWillUnmount() {
    console.log('Component WILL UNMOUNT!')
  }

}
