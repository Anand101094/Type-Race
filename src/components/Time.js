import React, { Component } from 'react'

class Time extends Component {

    constructor(props){
        super(props)
        this.state={
            count:0,
            speed:0
        }
        this.tick=this.tick.bind(this)
        this.startTimer=this.startTimer.bind(this)
        this.stopTimer=this.stopTimer.bind(this)
    }

    componentDidMount(){
        this.startTimer()
    }
    
    tick() {
        if (this.props.arr.length) {
            this.setState((prevState, props) => ({
                count: prevState.count + 1
            }))
        } else {
            this.stopTimer()
        }
    }

    startTimer() {
        clearInterval(this.timer)
        this.timer=setInterval(this.tick,1000);
        this.timer2=setInterval(this.handleSpeed,2000)
    }

    stopTimer() {
        clearInterval(this.timer)
        clearInterval(this.timer2)
    }

    handleSpeed = () =>{
        let length= Number(this.props.length-this.props.arr.length)
        let time=this.state.count
        const speed= (length/time)*60
        console.log(length,time,speed)
        this.setState({
            speed
        })
    }

    render() {
        console.log(this.props)
        return(
            <div className="container">
                <span className="right green-text text-darken-2">Timer : {this.state.count}</span><br/>
                <span className="red-text">Speed : {this.state.speed} wpm</span>
                {/* <button className="btn red" onClick={this.handleSpeed}>Display Result</button> */}
            </div>
        )
    }
}

export default Time
