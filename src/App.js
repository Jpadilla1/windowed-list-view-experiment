import React, { Component } from 'react';
import WindowedListView from './WindowedListView';
import meme from './meme.jpeg';

const NUMBER_OF_ITEMS = 100*100;

const items = [];

for (let i = 1; i <= NUMBER_OF_ITEMS; i++) {
   items.push(`${i}. Lorem ipsum dolor sit amet, consectetur adipisicing elit.`);
}

const renderChildren = (item) => (
  <div>
    { /* <img src={meme} alt="meme" className='listItem-img'/> */ }
    <p>{item}</p>
  </div>
);

class App extends Component {
  render() {
    return (
      <WindowedListView
        items={items}
        height={500}
        renderChildren={renderChildren}
      />
    );
  }
}

export default App;
