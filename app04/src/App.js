import React, { Component } from 'react';

export default class App extends Component {
  state = {
    data:
      [{
        "id": 1,
        "name": "Bharat",
        "subject": "Reactjs"
      },
      {
        "id": 2,
        "name": "karan",
        "subject": "Reactj"
      },
      {
        "id": 3,
        "name": "parth",
        "subject": "React"
      }],
    namestate: "Bharat"
  }

  render() {
    var i = 0;
    return (
      <div className="App">
        <header className="App-header">



          example of nested elements...
          <Header nameh2={"given from parent props"} />
          <Content />



          example of styling...
          <h1 style={mystyle}>React js</h1>



          example of comment section...
          {/* <p>Edit <code>src/App.js</code> and save to reload.</p> */}
          <br />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a><br />



          example of javascript in JSX...
          <h3>addition of 5 n 7 = {5 + 7}</h3>

          <h3>ternary expression result: {i === 0 ? 'Bharat' : 'Karan'}</h3>



          example of stateful component...
          <table>
            <tbody>
              {this.state.data.map((person, i) => <TableRow key={i}
                data={person} />)}
            </tbody>
          </table>

          <PropsDemo firstProps={this.state.namestate} />

        </header>
      </div>
    );
  }
}


class Header extends App {
  render() {
    return (
      <div>
        <h5>this is stateless component</h5>
        <h1>Header</h1>
        <h2>{this.props.nameh2}</h2>
      </div>
    );
  }
}


class Content extends App {

  state = {
    content_state: "Content",
  }

  render() {
    return (
      <div>
        <h5>this is stateful component</h5>
        <h2>{this.state.content_state}</h2>
      </div>
    );
  }
}

class TableRow extends App {

  state = {
    username: "Validate"
  }

  render() {
    return (
      <tr>
        <td>{this.props.data.id}</td>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.subject}</td>
        <td><button >{this.state.username}</button></td>
      </tr >
    );
  }
}

class PropsDemo extends App {
  render() {
    return (
      <div>
        <h5>{this.props.firstProps}</h5>
        <h5>{this.props.secondProps}</h5>
      </div>
    );
  }
}
PropsDemo.defaultProps = {
  firstProps: "defaultProps01",
  secondProps: "defaultProps02"
}

var mystyle = {
  fontsize: 35,
  color: '#009',
}
