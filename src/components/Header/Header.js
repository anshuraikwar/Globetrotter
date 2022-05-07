import React, { Component } from 'react';
import "./Header.css"

export default class Header extends Component {  
    constructor(props) {
      super(props)
    
      this.state = {
        list: this.props.data.list,
        subTitles: this.props.data.subTitles,
        H1S: [],
        H3S: [],
        IMAGES: [],
        LAYERS: []
      }
    }

    componentDidMount() {
        const {list, subTitles} = this.state

        const H1S = list.map((name) => {
            return (
                <div className={`h1 ${name}`} key={`h1_${name}`}>
                    <h1>{name.toUpperCase()}</h1>
                </div>
            )
        })
        this.setState({ H1S })

        const H3S = list.map((name, i) => {
            return (
                <div className={`h3 ${name}`} key={`h3_${name}`}>
                    <h3>{subTitles[i]}</h3>
                </div>
            )
        })
        this.setState({ H3S })

        const IMAGES = list.map((name) => {
            return <div className={`image ${name}`} key={`image_${name}`}></div>
        })
        const LAYERS = [1,2,3].map((i) => {
            return (
                <div className={`layer layer${i}`} key={`layer${i}`}>
                    {IMAGES}
                    <div className='filter'></div>
                </div>
            )
        })
        this.setState({ LAYERS })
    }
    
    render() {
        const {counter, /*list, subTitles,*/ rotate, disableButtons, img_switch/*, extend*/} = this.props.data;
        const { list, H1S, H3S, LAYERS } = this.state

        return (
            <div className={`header-comp`}>
                <div className="header">
                    <div className="ver-align">
                        <div className={`title ${list[counter]} ${img_switch}`}>
                            <div className='h1-cont'>
                                {H1S}
                            </div>
                            <div className="seperator"></div>
                            <div className='h3-cont'>
                                {H3S}
                            </div>
                        </div>

                        <div className={`btn-tray `}>
                            <div className="btn" onClick={() => { 
                                if(!disableButtons) 
                                    this.props.changePicture(counter-1 === -1? 4 : counter-1, "back")
                            }}>
                                <svg width="28" height="8" viewBox="0 0 28 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 2V7.5H1.5L7 2Z" fill="white"/>
                                    <path d="M7 7.5V2L1.5 7.5H7ZM7 7.5H27.5" stroke="white"/>
                                </svg>                                    
                            </div>
                            <div className="seperator"></div>
                            <div className="btn" onClick={() => { 
                                if(!disableButtons) 
                                    this.props.changePicture((counter+1)%list.length)
                            }}>
                                <svg width="28" height="9" viewBox="0 0 28 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.5 2V8H26L20.5 2Z" fill="white"/>
                                    <path d="M20.5 8V2L26 8H20.5ZM20.5 8H0" stroke="white"/>
                                </svg>                                    
                            </div>
                        </div>
                    </div>
                    <div className={`background ${list[counter]} ${rotate?"rotate":""} ${img_switch}`}>
                        <div className="wrapper">
                            {LAYERS}
                        </div>
                    </div>
                </div>
                <div className={`bdr-fr`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
