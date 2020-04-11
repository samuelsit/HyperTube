import React, { Component } from 'react'
import '../../css/Scroll.css'

class Scroll extends Component {
    state = {
        intervalId: 0
    }
    
    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, 0);
    }
    
    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), 1000);
        this.setState({ intervalId: intervalId });
    }
    
    render () {
        return (
            <button title='Back to top' className='scroll' onClick={ () => { this.scrollToTop(); }}>
                <span className='arrow-up fas fa-chevron-up'></span>
            </button>
        )
    }
}

export default Scroll