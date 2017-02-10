import React, { Component } from 'react';
import uuid from 'uuid';

import './index.css';

class WindowedListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: 0,
      end: 0,
      numberOfItemsToRender: 0,
      itemHeight: 0
    };

    this.getItems = this.getItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.updateSizeAndAmountToRender = this.updateSizeAndAmountToRender.bind(this);
    this.updatePositions = this.updatePositions.bind(this);
  }

  componentDidMount() {
    this.updateSizeAndAmountToRender();
  }

  updateSizeAndAmountToRender() {
    const listItemHeight = document.querySelector('.listItem').offsetHeight;
    const size = parseInt((this.props.height / listItemHeight), 10) + 4;

    this.setState({
      itemHeight: listItemHeight,
      numberOfItemsToRender: size
    }, () => this.updatePositions(0));
  }

  onScroll(detail) {
    const scrollOffsetTop = detail.target.scrollTop;
    
    this.updatePositions(scrollOffsetTop)
  }
  
  updatePositions(offset) {
    let start = parseInt(offset / this.state.itemHeight, 10);
    const end = start + this.state.numberOfItemsToRender - 2;
    
    if (start > 2 && start < this.props.items.length && end < this.props.items.length) {
      start -= 2;
      this.setState({ start, end });
    } else if (start < 2 && start < this.props.items.length && end < this.props.items.length) {
      this.setState({ start: 0, end: this.state.numberOfItemsToRender });
    }
  } 

  getItems() {
    const start = this.state.start;
    const end = this.state.end;
    return this.props.items.slice(start, end + 1).map((item, i) =>
      <div className='listItem' key={uuid.v4()}>
        {this.props.renderChildren(item)}
      </div>
    );
  }

  render() {
    const items = this.getItems();
    
    const paddingTop = this.state.itemHeight * this.state.start;
    const height = (this.props.items.length * this.state.itemHeight) - paddingTop;

    if (this.state.itemHeight === 0) {
      const item = this.props.items[0];
      return (
        <div className='listItem' style={{ opacity: 0 }}>
          {this.props.renderChildren(item)}
        </div>
      );
    }

    return (
      <div className='container' style={{ height: this.props.height }} onScroll={this.onScroll}>
        <div style={{ paddingTop: paddingTop, minHeight: height, maxHeight: height }}>
          {items}
        </div>
      </div>
    );
  }
}

export default WindowedListView;
