import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class App extends Component {



  state = {
    items: ['Bharat', 'karan', 'parth']
  }


  handleAdd = () => {
    var newItems = this.state.items.concat([prompt('Create New Item')]);
    this.setState({ items: newItems });
  }

  handleRemove = (i) => {
    var newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  }

  render() {
    var items = this.state.items.map(function (item, i) {
      return (
        <div key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </div>
      );
    }.bind(this));

    return (
      <div>
        <div>
          <button onClick={this.handleAdd}>Add Item</button>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={900}
            transitionEnter={false}
            transitionLeave={false}>

            <h1>My Element...</h1>
            {items}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default App;

// (c) Bharat Jograna