import React, { Component } from 'react'

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1
        }
    }
    climb() {
        this.setState({
            counter: this.state.counter + 1,
        })
    }
    render() {
        return (
            <div onClick={this.climb.bind(this)}>
                <h1>count:{this.state.counter}</h1>
            </div>
        )
    }
}
