import React, { Component } from 'react';
import Text from './components/Text'
import Time from './components/Time'

class App extends Component {

  state = {
    word: '',
    para: '',
    arr: [],
    length: 0,
    show: false,
  }

  componentDidMount = () => {
    this.getText()
  }

  getText = async () => {
    const data = await fetch(`http://www.randomtext.me/api/`)
    const jsonData = await data.json()
    this.setState({
      para: jsonData.text_out,
    }, () => {
      const arr = this.state.para.split(' ')
      this.setState({
        arr
      }, () => {
        const length = this.state.arr.length
        this.setState({
          length
        })
      })
    })
  }

  handleChange = (e) => {
    const value = e.target.value
    const { arr } = this.state
    if (value.includes(' ') && value.trim() === arr[0]) {
      this.handleKey()
    } else {
      this.setState({
        word: value,
      })
    }
  }

  handleKey = () => {
    this.setState((prevState, props) => ({
      arr: prevState.arr.slice(1),
      word: ''
    }))
  }

  handleClick = () => {
    this.setState({
      show: true
    })
  }

  render() {
    const button = <button className="btn center pink lighten-2" onClick={this.handleClick}>Start Race</button>

    return (
      <div className="App center container">
        <h3 className='center'>Typing Race</h3>
        {this.state.show ? (
          <React.Fragment>
            <Text para={this.state.para} />
            <div className="input-field">
              <textarea id='text' className='materialize-textarea' onChange={this.handleChange} value={this.state.word}></textarea>
              <label htmlFor='text'>Start Typing...</label>
            </div>
            <br />
            <Time arr={this.state.arr} length={this.state.length}/>
          </React.Fragment>

        ) : button}

      </div>
    );
  }
}

export default App;
