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
                        {this.props.currentCompany ? this.props.currentCompany : "Выберите страховую компанию"}
                    </div>
                    {this.props.companiesList.map((el, key)=>(
                        <div className="company"
                            style={{
                                display: this.state.opened ? "block" : "none"
                            }}
                            key={key}
                        >
                            {el}
                        </div>
                    ))}
                </div>
            </div>
        )
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