import React, { Component } from 'react'
import '../../css/Scroll.css'

class Scroll extends Component {
    
    scrollToTop() {
        window.scrollTo(0, 0)
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