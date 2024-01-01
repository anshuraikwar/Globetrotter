import React, { Component } from 'react';
import "./Layout.css"

import {data} from "../data";

import Header from '../Header/Header';
import BorderFrame from '../BorderFrame/BorderFrame';
import Content from '../Content/Content';

import cross_icon from '../../assets/svg/cross.svg'
import arrow_icon from '../../assets/svg/arrow.svg'
import {ReactComponent as SearchIcon} from '../../assets/svg/search.svg'
import loader from '../../assets/svg/spinning_globe.gif'

import maldives_bg from '../../assets/img/maldives/background.jpg';
import highlands_bg from '../../assets/img/highlands/background.jpg';
import dolomites_bg from '../../assets/img/dolomites/background.jpg';
import sahara_bg from '../../assets/img/sahara/background.jpg';
import yosemite_bg from '../../assets/img/yosemite valley/background.jpg';


export default class Layout extends Component {
    constructor(props) {
      super(props)
    
        this.state = {
            counter: 0,
            list: ["maldives", "dolomites", "highlands", "sahara", "yosemite"],
            loadStatus: [true, false, false, false, false], // header images load status
            subTitles: ["INDIAN OCEAN", "ITALY", "SCOTLAND", "HARRAKECH", "CALIFORNIA"],

            rotate: false,
            disableButtons: true,
            loading: true,
            
            img_switch: "next",

            mountContent: false,
            extend: false,

            backgrounds: [maldives_bg, dolomites_bg, highlands_bg, sahara_bg, yosemite_bg],
            backgroundLoaded: false,
            contentImgLoaded: false,
            header_imgs: data.map(item => item.header.src), // [dolomites_hdr, highlands_hdr, sahara_hdr, yosemite_hdr],

            yBound: 0,

            openCredits: false,
            openMenu: false,
            menuCounter: false,
            searchQuery: "",
            filterDestIndices: []
        }
    }

    componentDidMount() {
        this.preLoadImage(loader, () => {})
        this.state.header_imgs.map((url, i) => {
            this.preLoadImage(url, () => this.onHeaderImgLoad(i))
            return null;
        })
    }
    onHeaderImgLoad = (i) => {
        var status = [...this.state.loadStatus]
        status[i] = true
        this.setState({ loadStatus: status},() => {
            if(this.state.loadStatus.every(s => s===true)) {
                this.setState({ 
                    disableButtons: false,
                    loading: false
                })
                this.state.backgrounds.map((url) => {
                    this.preLoadImage(url, () => {})
                    return null;
                })
            }
        })
    }

    randomise = () => {
        const {counter, list} = this.state;
        var new_counter
        do {
            new_counter = Math.floor(Math.random() * list.length);
        } while(new_counter === counter)
        
        this.changePicture(new_counter, new_counter>counter ? "next" : "back")
    }
    changePicture = (new_counter, img_switch="next") => {
        this.setState({
            counter: new_counter,
            rotate: true,
            disableButtons: true,
            img_switch: img_switch,
            mountContent: false,
            backgroundLoaded: false,
            contentImgLoaded: false
        }, () => {
            setTimeout(()=> {
                this.setState({ 
                    rotate: false,
                    disableButtons: false
                })
            }, 3000)
        })
    }

    preLoadImage = (src, afterLoad) => {
        const newImg = new Image()
        newImg.onload = () => { afterLoad(); }
        newImg.src = src
        window[src] = newImg
    }

    loadContentBg = () => {
        if(!this.state.mountContent) {
            this.setState({ 
                mountContent: true, 
                disableButtons: true,
                loading: true
            }, () => { 
                this.preLoadImage(this.state.backgrounds[this.state.counter], () => { 
                    this.setBackgroundLoad()
                })
            })
        } else {
            this.discoverDestination() 
        }
    }
    setBackgroundLoad = () => {
        this.setState({ backgroundLoaded: true }, () => this.checkBgContentImgLoad())
    }
    setContentImgLoad = () => {
        this.setState({ contentImgLoaded: true }, () => this.checkBgContentImgLoad())
    }
    checkBgContentImgLoad = () => {
        const { backgroundLoaded, contentImgLoaded } = this.state
        if(backgroundLoaded && contentImgLoaded) this.discoverDestination()
    }
    discoverDestination = () => {
        this.setState({ 
            extend: !this.state.extend,
            disableButtons: false,
            loading: false
        }, ()=> {
            if(this.state.extend) {
                this.content = document.getElementById('content');
                this.background = document.getElementById('content-background')
                this.setState({ yBound: 0 })
            } else {
                setTimeout(() => {
                    document.getElementById('scroll-to').scrollIntoView({ behavior: 'smooth' })
                }, 1200)
            }
        })
    }

    onContentScroll = () => {
        let BCR = this.content.getBoundingClientRect();
        var contentScrollOverflow = this.content.clientHeight - window.innerHeight
        var backgroundScrollOverflow = this.background.clientHeight - window.innerHeight
        var yBound = (Math.abs(BCR.top) * backgroundScrollOverflow) / contentScrollOverflow

        this.setState({ yBound: yBound })
    }

    toggleCredits = () => {
        this.setState({ 
            openCredits: !this.state.openCredits,
            disableButtons:  !this.state.openCredits
        })
    }
    toggleMenu = () => {
        this.setState({ 
            openMenu: !this.state.openMenu,
            disableButtons:  !this.state.openMenu,
            openMenuCredits: false,
            expandDestList: false
        }, () => {
            setTimeout(() => { 
                this.setState({ 
                    menuCounter: false, 
                    searchQuery: "",
                    filterDestIndices: [] 
                })
            }, 500)
        })
    }
    toggleMenuCounter = (val) => {
        if(this.state.menuCounter === val) val=false
        this.setState({ menuCounter: val })
        if(!val) this.setState({ searchQuery: "" })
        if(!this.state.openMenu) this.setState({ openMenu: true })
    }

    onSearchQueryChange = (e) => {
        this.setState({ searchQuery: e.target.value.toUpperCase() })
    }
    filterDest = () => {
        const { list, subTitles, searchQuery } = this.state
        var indices = []
        if(searchQuery !== "")
            list.forEach((title, i) => {
                if(title.toUpperCase().includes(searchQuery) || subTitles[i].toUpperCase().includes(searchQuery)) 
                    indices.push(i);
            })
        return this.getDestList(indices)
    }
    getDestList = (items) => {
        const { list, subTitles } = this.state
        const DESTINATIONS = items.map((i) => {
            return (
              <div className='dest' key={list[i]} onClick={() => {
                  this.preSetImgCounterFromMenu(i)
              }}>
                  <div className='t'>{list[i].toUpperCase()}</div>
                  <div className='st'>{subTitles[i]}</div>
              </div>
            )
        });
        return DESTINATIONS
    }
    preSetImgCounterFromMenu = (new_counter) => {
        const { openMenu } = this.state
        var timeOut = openMenu ? 500 : 0
        if(openMenu) this.toggleMenu()
        setTimeout(() => {
            this.setImgCounterFromMenu(new_counter)
        }, timeOut)
    }
    setImgCounterFromMenu = (new_counter) => {
        const { counter, extend } = this.state
        if(new_counter === counter) return
        var timeOut = extend ? 1000 : 0
        if(extend) this.discoverDestination()
        setTimeout(() => {
            this.changePicture(new_counter, new_counter>counter ? "next" : "back")
        }, timeOut)
    }

    getCredits = () => {
        const { counter, extend } = this.state
        let credits = extend ? data[counter].background : data[counter].header
        return (
            <React.Fragment>
                {extend?"BACKGROUND":""} IMAGE BY <a href={credits.profile} target="_blank" rel="noreferrer">{credits.photographer}</a> on <a href={credits.href} target="_blank" rel="noreferrer">Unsplash</a> <br/>
                UI BY <a href="https://dribbble.com/Giulio_Cuscito" target="_blank" rel="noreferrer">Giulio Cuscito</a> on <a href="https://dribbble.com/shots/8867020--Roto-transitions-Concept" target="_blank" rel="noreferrer">Dribble</a>
            </React.Fragment>
        )
    }


    
    render() {
        const {counter, list, rotate, disableButtons, loading, mountContent, extend, backgrounds, yBound, openCredits, openMenu, menuCounter, searchQuery} = this.state
        
        return (
            <div className="layout-wrapper">
                <div className={`layout disable_${disableButtons} extend_${extend}`} onClick={() => {
                    if(openCredits) this.toggleCredits()
                    if(openMenu) this.toggleMenu()
                    if(menuCounter !== false) this.toggleMenuCounter(false) 
                }}>
                    {mountContent && (
                        <div className={`content-background`} id={`content-background`} style={{'top': `-${yBound}px`}}>
                            <div className="hor-align">
                                <img src={backgrounds[counter]} alt=''></img>
                                {/* <div className='background-gradient'/> */}
                            </div>
                        </div>
                    )}
                    <Header
                        data={this.state} 
                        changePicture={this.changePicture}
                    >
                        <BorderFrame 
                            header={true}
                            disableButtons={disableButtons} 
                            rotate={rotate}
                            loading={loading}
                            randomise={this.randomise}
                            discoverDestination={this.loadContentBg}

                            toggleCredits={this.toggleCredits}
                            toggleMenu={this.toggleMenu}
                            openMenu={openMenu}

                            toggleMenuCounter={this.toggleMenuCounter}
                            menuCounter={menuCounter}
                            searchQuery={searchQuery}
                            onSearchQueryChange={this.onSearchQueryChange}
                            getDestList={this.getDestList}
                            filterDest={this.filterDest}
                        ></BorderFrame>
                    </Header>

                    
                    {!openMenu && <div className={`crd-cont open_${openCredits}`} onClick={(e) => { e.stopPropagation() }}>
                        <div className='credits ver'>
                            {this.getCredits()} 
                        </div>
                    </div>}

                    <div className={`menu-cont open_${openMenu}`} onClick={(e) => { e.stopPropagation() }}>
                        <div className='menu'>
                            <div className='cls-btn-cont'> 
                                <img src={cross_icon} alt="" onClick={(e) => { e.stopPropagation(); this.toggleMenu() }}/> 
                            </div>
                            <div className={`option open_${menuCounter===1}`}> 
                                <div className='text cursor-pointer' onClick={() => { this.toggleMenuCounter(1) }}> 
                                    <span>LIST ALL DESTINATIONS</span> 
                                    <img src={arrow_icon} alt=""/> 
                                </div> 
                                <div className={`destList`}> {this.getDestList([0,1,2,3,4])} </div>
                            </div>
                            <div className={`option open_${menuCounter===2}`}> 
                                <div className='text cursor-pointer' onClick={() => { this.toggleMenuCounter(2) }}> 
                                    <span>SEARCH</span> 
                                    <img src={arrow_icon} alt=""/>  
                                </div>
                                <div className={`destList`}> 
                                    <div className='search-in-cont'>
                                        <input className='search-in' value={searchQuery} onChange={(e) => this.onSearchQueryChange(e)}></input>
                                        <SearchIcon/>
                                    </div> 
                                    {this.filterDest()} 
                                </div>
                            </div>
                            <div className='option'> 
                                <div className='text tooltip'> 
                                    <span className='tttext'>non-functional</span>
                                    <span>SHARE</span> 
                                </div> 
                            </div>
                            <div className={`option menu-crd-btn open_${menuCounter===4}`}> 
                                <div className='text cursor-pointer' onClick={() => { this.toggleMenuCounter(4) }}> 
                                    <span>CREDITS</span> 
                                    <img src={arrow_icon} alt=""/> 
                                </div>
                                <div className={`credits-cont`}>
                                    <div className={`credits`}> {this.getCredits()} </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                    
                    {mountContent && (
                        <Content
                            counter={counter}
                            list={list}
                            onContentScroll={this.onContentScroll}
                            preLoadImage={this.preLoadImage}
                            setContentImgLoad={this.setContentImgLoad}
                            
                            disableButtons={disableButtons} 
                            discoverDestination={this.discoverDestination}
                        >
                            <BorderFrame 
                                header={false}
                                discoverDestination={this.discoverDestination}

                                toggleCredits={this.toggleCredits}
                                toggleMenu={this.toggleMenu}
                                openMenu={openMenu}
                                
                                toggleMenuCounter={this.toggleMenuCounter}
                                menuCounter={menuCounter}
                                searchQuery={searchQuery}
                                onSearchQueryChange={this.onSearchQueryChange}
                                getDestList={this.getDestList}
                                filterDest={this.filterDest}
                            ></BorderFrame>
                        </Content>
                    )}
                    
                </div>
            </div>
        );
    }
}
