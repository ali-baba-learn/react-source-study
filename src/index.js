import './index.less';
import React, {Component} from '@packages/react';
import ReactDOM from '@packages/react-dom';

class Hello extends Component{
  constructor(){
    super();
    console.log('hello world');
  }

  render() {
    return <div>hello world</div>
  }
}

ReactDOM.render(<Hello></Hello>, document.getElementById('root'));