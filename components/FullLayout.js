import React, { Component } from 'react';
import Search from './Search'
class FullLayout extends Component {
    render() {
        return (
            <div className="container">            
            <div className={`ui full`}>
          <div className={`sticky left`}>
            <span className={`logo`}></span>
          </div>
          <div className={`feed`}>
            <Search></Search>
            {this.props.children}
          </div>
          <div className={`sticky right`}>
            <img className={`av`} src={'https://avatars.githubusercontent.com/u/44992537?v=1'}></img>
          </div>
        </div>
        </div>

        );
    }
}

export default FullLayout;