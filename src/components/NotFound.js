import React, { Component } from 'react';

class NotFound extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h2>404 Not Found</h2>
        <p>Oops, the page can not be found.</p>
      </div>
    )
  }
}

export default NotFound;
