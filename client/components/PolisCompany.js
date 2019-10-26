import React from 'react'

export default class PolisCompany extends React.Component{
    constructor(){
        super()
        this.state = {
            opened: false
        }
    }
    render(){
        return(
            <div className="polisCompany">
                
                
                <div className="polisDate">
                    {this.props.tel ? "Телефон " + this.props.tel : ""}
                </div>
                <div className="companiesContainer">
                    <div
                        className="chooseCompany"
                        style={{
                            opacity: this.state.opened ? 0 : 1,
                            color: this.props.currentCompany ? "black" : "gray"
                        }}
                    >
                        {this.props.currentCompany ? 
                            <div className="chosenCompany">
                                <div
                                    className="compIcons"
                                    style={{
                                        backgroundImage: `url(${this.switch(this.props.currentCompany)})`
                                    }}
                                ></div><div>{this.props.currentCompany}</div>
                            </div>
                             : "Выберите страховую компанию"
                        }
                    </div>
                    {this.props.companiesList.map((el, key)=>(
                        <div className="company"
                            style={{
                                display: this.state.opened ? "flex" : "none"
                            }}
                            key={key}
                        >
                            <div
                                className="compIcons"
                                style={{
                                    backgroundImage: `url(${this.switch(el)})`
                                }}
                            ></div>
                            <div
                                className="compText"
                            >
                                {el}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    switch(pic){
        switch(pic){
            case "СК Рандеву": return "/public/randevu.png"
            case "СК МЕД-АСКЕР": return "/public/medask.png"
            case "Страх-трах": return "/public/trah.png"
        }
    }
    componentDidUpdate(){
        if(this.props.closeCurtain) this.setState({
            opened: false
        })
    }
    componentDidMount(){
        document.querySelector(".companiesContainer").addEventListener("click", (e)=>{
            this.setState(prevstate=>({
                opened: prevstate.opened ? false : true
            }), ()=>{
                if(this.state.opened){
                    this.props.polisCurtains(true)
                } else {
                    this.props.polisCurtains(false)
                }
            })
        })
        document.querySelectorAll(".company").forEach(el=>{
            el.addEventListener("click", (e)=>{
                this.props.changeCompany(e.target.innerText)
            })
        })
    }
}