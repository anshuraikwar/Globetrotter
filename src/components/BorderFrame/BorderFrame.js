import React, { Component } from 'react';
import "./BorderFrame.css"

import {ReactComponent as SearchIcon} from '../../assets/svg/search.svg'
import spinning_globe from '../../assets/svg/spinning_globe.gif'

export default class BorderFrame extends Component {
    render() {
        const { header, disableButtons, rotate, loading, openMenu, searchQuery, menuCounter } = this.props
        var color = header ? "white" : "black"

        return (
            <React.Fragment>
                <div className={`nav-cont ${color}`}>
                    <div className='nav'>
                        <div className={`menu-btn mobile display_${!openMenu}`} onClick={() => {
                            if(!disableButtons)
                                this.props.toggleMenu()
                        }}>
                            <svg id="stroke" width="30" height="14" viewBox="0 0 30 14" stroke="inherit" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 12.5H30M0 1.5H30M0 7H30" stroke="inherit" strokeWidth="3"/>
                            </svg>
                        </div>
                        
                        <div className={`menu-btn desk display_${!openMenu} tooltip`}>
                            <span className='tttext'>non-functional</span>
                            <svg id="stroke" width="30" height="14" viewBox="0 0 30 14" stroke="inherit" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 12.5H30M0 1.5H30M0 7H30" stroke="inherit" strokeWidth="3"/>
                            </svg>
                        </div>
                        
                        <div className='head'>
                            <span>GLOBETROTTER</span>
                        </div>
                        <div className='top-right' onClick={(e) => { e.stopPropagation() }}>
                            <div className={`destList search_open_${menuCounter}`}> 
                                <div className={`flex`}>
                                    <div className='lad-wpr' onClick={() => {this.props.toggleMenuCounter(1)}}>
                                        <div className='lad-cont'>
                                            <div className='u-txt'>
                                                <div className='lad'>LIST ALL DESTINATIONS</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='search-in-cont'>
                                        <input className='search-in'  value={searchQuery} onChange={(e) => this.props.onSearchQueryChange(e)}></input>
                                    </div>
                                </div> 
                                <div className='search-results'>
                                    <div className='result-list'>
                                        {menuCounter === 1 ? this.props.getDestList([0,1,2,3,4]) : this.props.filterDest()}
                                    </div> 
                                </div>
                            </div>
                            <div className='search-btn' onClick={() => {this.props.toggleMenuCounter(2)}}>
                                <SearchIcon/>
                            </div>
                        </div>
                    </div>
                </div>
                {!header && (
                    <div className={`back-div ${color} bdrfrm`}>
                        <div className='dash'/>
                        <span onClick={() => {
                            if(!disableButtons)
                                this.props.discoverDestination()
                        }}>BACK</span>
                    </div>    
                )}
                <div className={`crd-wr ${color}`}>
                    <div className='crd-btn-cont' onClick={() => {
                            if(!disableButtons)
                                this.props.toggleCredits()
                        }}>
                        <div className='crd-btn'>CREDITS</div>
                    </div>
                </div>
                <div className={`btm-row-cont ${color}`}>
                    <div className='btm-row'>
                        <div className='share-wr tooltip'>
                            <span className='tttext'>non-functional</span>
                            <div className='share-cont'>
                                <div className='share-div'>
                                    <div className='share-btn'>
                                        <svg id="fill" width="23" height="22" viewBox="0 0 23 22" fill="inherit" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.353 4.5294C13.353 5.60149 12.4839 6.47058 11.4119 6.47058V8.47058C13.5885 8.47058 15.353 6.70605 15.353 4.5294H13.353ZM11.4119 6.47058C10.3398 6.47058 9.47069 5.60149 9.47069 4.5294H7.47069C7.47069 6.70605 9.23521 8.47058 11.4119 8.47058V6.47058ZM9.47069 4.5294C9.47069 3.45732 10.3398 2.58823 11.4119 2.58823V0.588226C9.23521 0.588226 7.47069 2.35275 7.47069 4.5294H9.47069ZM11.4119 2.58823C12.4839 2.58823 13.353 3.45732 13.353 4.5294H15.353C15.353 2.35275 13.5885 0.588226 11.4119 0.588226V2.58823ZM9.70259 6.61415L4.70259 13.9671L6.35644 15.0917L11.3564 7.73877L9.70259 6.61415ZM11.4673 7.73877L16.4673 15.0917L18.1211 13.9671L13.1211 6.61415L11.4673 7.73877ZM6.29422 17.4706C6.29422 18.5427 5.42512 19.4118 4.35304 19.4118V21.4118C6.52969 21.4118 8.29422 19.6472 8.29422 17.4706H6.29422ZM4.35304 19.4118C3.28096 19.4118 2.41187 18.5427 2.41187 17.4706H0.411865C0.411865 19.6472 2.17639 21.4118 4.35304 21.4118V19.4118ZM2.41187 17.4706C2.41187 16.3985 3.28096 15.5294 4.35304 15.5294V13.5294C2.17639 13.5294 0.411865 15.2939 0.411865 17.4706H2.41187ZM4.35304 15.5294C5.42512 15.5294 6.29422 16.3985 6.29422 17.4706H8.29422C8.29422 15.2939 6.52969 13.5294 4.35304 13.5294V15.5294ZM20.4119 17.4706C20.4119 18.5427 19.5428 19.4118 18.4707 19.4118V21.4118C20.6473 21.4118 22.4119 19.6472 22.4119 17.4706H20.4119ZM18.4707 19.4118C17.3986 19.4118 16.5295 18.5427 16.5295 17.4706H14.5295C14.5295 19.6472 16.294 21.4118 18.4707 21.4118V19.4118ZM16.5295 17.4706C16.5295 16.3985 17.3986 15.5294 18.4707 15.5294V13.5294C16.294 13.5294 14.5295 15.2939 14.5295 17.4706H16.5295ZM18.4707 15.5294C19.5428 15.5294 20.4119 16.3985 20.4119 17.4706H22.4119C22.4119 15.2939 20.6473 13.5294 18.4707 13.5294V15.5294Z"  fill="inherit"/>
                                        </svg>
                                    </div>
                                    <div className='dash'/>
                                    <span>SHARE</span>
                                </div>
                            </div>
                        </div>
                        {header && (
                            <React.Fragment>
                                <div className='dtd'>
                                    { loading ? (
                                        <div className='loader-cnt'>
                                            L <img src={spinning_globe} alt=''></img> ADING...
                                        </div>
                                        ) : (
                                        <div className='u-txt' onClick={() => {
                                            if(!disableButtons)
                                                this.props.discoverDestination()
                                        }}>
                                            <span>DISCOVER THIS DESTINATION</span>
                                        </div>
                                    )}
                                </div>
                                <div className='rndmz-div'>
                                    <span>RANDOMISE</span>
                                    <div className='dash'/>
                                    <div className={`rndm-btn rotate_${rotate}`} onClick={() => {
                                        if(!disableButtons)
                                            this.props.randomise()
                                    }}>
                                        <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.30555 7.95399L1.37673 7.58346L1.37673 7.58346L2.30555 7.95399ZM10.4045 18.7059V17.7059H10.3545L10.3047 17.7109L10.4045 18.7059ZM11.2592 18.7059L11.9732 19.406L12.6771 18.6881L11.9553 17.9881L11.2592 18.7059ZM9.50012 17L10.1963 16.2821L8.50012 14.6372L8.50012 17L9.50012 17ZM9.50012 20.5H8.50012V22.9483L10.2142 21.2001L9.50012 20.5ZM15.1968 15.0633L14.2676 14.6938L14.2676 14.6938L15.1968 15.0633ZM7.09822 4.31229L7.097 5.31229L7.14707 5.31235L7.19689 5.30741L7.09822 4.31229ZM6.24501 4.31126L5.53067 3.61145L4.82763 4.3291L5.54852 5.02882L6.24501 4.31126ZM8.00313 6.01774L7.30664 6.73531L9.006 8.38475L9.00313 6.01653L8.00313 6.01774ZM7.9989 2.52094L8.9989 2.51972L8.99594 0.0742122L7.28457 1.82113L7.9989 2.52094ZM1.47569 7.3354L1.37673 7.58346L3.23437 8.32452L3.33333 8.07646L1.47569 7.3354ZM10.4045 19.7059H11.2592V17.7059H10.4045V19.7059ZM11.9553 17.9881L10.1963 16.2821L8.80394 17.7179L10.563 19.4238L11.9553 17.9881ZM8.50012 17L8.50012 18.7466L10.5001 18.7466L10.5001 17L8.50012 17ZM8.50012 18.7466V20.5H10.5001V18.7466H8.50012ZM10.2142 21.2001L11.9732 19.406L10.5451 18.0058L8.78607 19.7999L10.2142 21.2001ZM1.37673 7.58346C-0.963047 13.4487 3.38353 19.68 9.48923 19.7465L9.51101 17.7466C4.78703 17.6952 1.42365 12.8635 3.23437 8.32452L1.37673 7.58346ZM9.48923 19.7465C9.82335 19.7502 10.162 19.7353 10.5043 19.7009L10.3047 17.7109C10.0357 17.7379 9.77091 17.7495 9.51101 17.7466L9.48923 19.7465ZM16.0272 15.6814L16.1261 15.4328L14.2676 14.6938L14.1687 14.9425L16.0272 15.6814ZM7.09943 3.31229L6.24622 3.31126L6.2438 5.31125L7.097 5.31229L7.09943 3.31229ZM5.54852 5.02882L7.30664 6.73531L8.69962 5.30018L6.9415 3.59369L5.54852 5.02882ZM9.00313 6.01653L9.00102 4.27139L7.00102 4.27381L7.00313 6.01895L9.00313 6.01653ZM9.00102 4.27139L8.9989 2.51972L6.9989 2.52215L7.00102 4.27381L9.00102 4.27139ZM7.28457 1.82113L5.53067 3.61145L6.95935 5.01106L8.71324 3.22074L7.28457 1.82113ZM16.1261 15.4328C18.4574 9.56908 14.1148 3.34435 8.01277 3.27267L7.98928 5.27253C12.7112 5.328 16.0721 10.1553 14.2676 14.6938L16.1261 15.4328ZM8.01277 3.27267C7.67926 3.26875 7.34122 3.28329 6.99954 3.31717L7.19689 5.30741C7.46549 5.28077 7.72981 5.26949 7.98928 5.27253L8.01277 3.27267Z" fill="black"/>
                                        </svg>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
                    
            </React.Fragment>
        );
    }
}
