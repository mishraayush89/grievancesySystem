import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { listAllGrievance, getItem } from "./../firebase/FirebaseUitls";

export default class Dashboard extends Component {
  state = {
    items: [],
    last: null,
    hasMore: true
  };

  fetchMoreData = async () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    const { last, items, hasMore } = this.state;
    if (last === null) {
      getItem().then(val => {
        this.setState({
          items: items.concat(val),
          last: val
        });
      });
    } else {
      const callback = listAllGrievance(last);
      if (callback !== undefined) {
        callback.then(async snap => {
          if (snap !== undefined) {
            const docs = snap.docs;
            let block = [];
            await Promise.all(
              docs.map(async item => {
                block.push(item.data());
              })
            );
            if (block[block.length - 1].createdAt !== last.createdAt) {
              this.setState({
                items: items.concat(block),
                last: block[block.length - 1]
              });
            } else {
              this.setState({
                hasMore: false
              });
            }
          } else {
            if (hasMore === true) {
              this.setState({
                hasMore: false
              });
            }
          }
        });
      }
    }
  };

  render() {
    const { items, hasMore } = this.state;
    return (
      <div>
        <h2>Grievance</h2>
        <InfiniteScroll
          dataLength={items.length}
          next={this.fetchMoreData()}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {this.state.items.map((i, index) => {
            return <div key={index}>div - #{index}</div>;
          })}
        </InfiniteScroll>
      </div>
    );
  }
}
