import React, { Component } from 'react';
import "./Content.css"

// import prev_icon from '../../assets/svg/prev.svg'
// import next_icon from '../../assets/svg/next.svg'
// import camera_icon from '../../assets/svg/camera.svg'
// import cross_icon from '../../assets/svg/cross.svg'

import {data} from "../data";

export default class Content extends Component {
    constructor(props) {
      super(props)
    
        this.state = {
            contentImgLoadStatus: [],
            img_credits: false
        }
    }
    componentDidMount() {
        const { counter } = this.props

        let images = []
        data[counter]['rows'].map((row, i) => {
            if(i !== 1) row.map((column) => {
                column.map((ele) => {
                    if(ele.type === "img")
                        images.push(ele.src)
                    return null
                })
                return null
            })
            return null
        })

        this.setState({ contentImgLoadStatus: Array(images.length).fill(false) }, () => {
            images.map((url, i) => {
                this.props.preLoadImage(url, () => this.onContentImgLoad(i))
                return null
            })
        })
    }
    onContentImgLoad = (i) => {
        var status = [...this.state.contentImgLoadStatus]
        status[i] = true
        this.setState({ contentImgLoadStatus: status},() => {
            if(this.state.contentImgLoadStatus.every(s => s===true))
                this.props.setContentImgLoad()
                this.getImgComps()
        })
    }
    toggleImgCredits = (val) => { 
        this.setState({ img_credits: val })
    }
    getImgComps = () => {
        var IMAGES = [], imgNum = 1
        var { counter } = this.props
        data[counter]['rows'].map((row, ri) => {
            if(ri !== 1) 
                row.map((column, ci) => {
                    column.map((ele, ei) => {
                        var id = ((ri+1)*100)+((ci+1)*10)+(ei+1)
                        if(ele.type === "img") {
                            IMAGES.push(
                                <div className={`img_${imgNum++} imgWpr`} key={`counter_${counter}_${id}`} id={`counter_${counter}_${id}`} >
                                    <div className="imgCont">
                                        <img src={ele.src} alt=""/>
                                        <div className={`credits open_${this.state.img_credits === id}`}>
                                            
                                            {/* <div className={`closeCrds`} onClick={() => { this.toggleImgCredits(false) }}>
                                                <img src={cross_icon} alt=""/>
                                            </div> */}

                                            <span>
                                                Image by <a href={ele.profile} target="_blank" rel="noreferrer">{ele.photographer}</a> on <a href={ele.href}  rel="noreferrer">Unsplash</a>
                                            </span>
                                        </div>
                                    </div>
                                    {/* <div className={`camera-icon`} onClick={() => { this.toggleImgCredits(id) }}>
                                        <img src={camera_icon} alt=""/>
                                    </div> */}
                                </div>
                            )
                        }
                        return null
                    })
                    return null
                })
            return null
        })
        return IMAGES
    }
    getRowComponents = (row, ri) => {
        var COLUMNS = row.map((column, ci) => {
            var imgNum = 1
            var ELEMENTS = column.map((ele, ei) => {
                if(ele.type === "img")
                    return (
                        <div className={`img_${imgNum++} imgWpr`} key={`col_${ci+1}_ele_${ei+1}`} >
                            <div className="imgCont">
                                <img src={ele.src} alt=""/>
                                <div className={`credits`}>
                                    <span>
                                        Image by <a href={ele.profile} target="_blank" rel="noreferrer">{ele.photographer}</a> on <a href={ele.href}  rel="noreferrer">Unsplash</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                else return (
                        <div className={`text-div align_${ele.align}`} key={`col_${ci}_ele_${ei}`}>
                            <div className="heading"> {ele.heading} </div>
                            <div className='text'> {ele.text} </div>
                            <div className='discover-btn tooltip'>
                                <div className='tttext'>non-functional</div>
                                <span>Discover</span>
                            </div>
                        </div>
                    )
            })
            return (
                <div className={`col col_${ci+1}`} key={`col_${ci}`}>
                    {ELEMENTS}
                </div>
            )
        })
        return (
            <div className={`row row_${ri+1} nc_${row.length}`} key={`row_${ri}`}>
                {COLUMNS}
            </div>
        )
    }

    /* scrollSlider = (id) => {
         document.getElementById(id).scrollIntoView()
    } */

    render() {
        const { counter, list } = this.props

        const ROWS = data[counter]['rows'].map((row, i) => {
            if(i === 1) {
                return (
                    <div className={`imgSliderCnt`} key={`imgSlider`}>
                        {/* <div className='prev icon'> <img src={prev_icon} alt="" onClick={() => {this.scrollSlider('scrollToFront')}}/> </div> */}
                        <div className={`imgSlider`}>
                            <div className={`slider`}>
                                {/* <div className='scrollTo' id='scrollToFront'/> */}
                                {this.getImgComps()}
                                {/* <div className='scrollTo' id='scrollToEnd'/> */}
                            </div>
                        </div>
                        {/* <div className='next icon'> <img src={next_icon} alt="" onClick={() => {this.scrollSlider('scrollToEnd')}}/> </div> */}
                    </div>
                )
            } else return this.getRowComponents(row, i);
        })

        return (
            <div className={`content-comp`} onScroll={(e) => this.props.onContentScroll(e)}>
                <div className='scroll-to' id='scroll-to'/>
                {this.props.children}
                <div className={`content ${list[counter]}`} id='content'>
                    <div className="hor-align">
                        <div className="title">
                            <h2> {data[counter]['title']}</h2>
                            <div className='dash'/>
                        </div>
                        {ROWS}
                    </div>
                </div>
            </div>
        );
    }
}
