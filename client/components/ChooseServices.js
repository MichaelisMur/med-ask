import React from 'react'

export default class ChooseServices extends React.Component{
    constructor(){
        super()
        this.state = {
            opened: false,
            search: ""
        }
    }
    render(){
        return(
            <div>
                <div className="curtainServices"
                    style={{
                        display: this.state.opened ? "block" : "none"
                    }}
                    onClick={()=>{
                        this.setState({opened: false})
                    }}
                ></div>
                <div className="ChooseServices">
                    <div className="servicesContainer">

                        <input
                            className="chooseCompany"
                            style={{
                                border: "none"
                            }}
                            placeholder={this.state.opened ? "" : "Введите запрашиваемую услугу для пациента"}
                            onChange={(e)=>{
                                this.setState({search: e.target.value})
                            }}
                            value={this.state.search}
                        ></input>

                        {this.props.servicesList.map((el, key)=>{
                            return(
                            <div className="service"
                                style={{
                                    display: this.state.opened &&
                                    this.props.chosenServices.map((e)=>(e.title)).indexOf(el) === -1 &&
                                    el.toLowerCase().includes(this.state.search.toLowerCase()) ? "block" : "none"
                                }}
                                key={key}
                            >
                                {el}
                            </div>
                        )})}

                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        document.querySelector(".servicesContainer").addEventListener("click", (e)=>{
            this.setState(prevstate=>({
                opened: prevstate.opened ? false : true
            }))
        })
        document.querySelectorAll(".service").forEach(el=>{
            el.addEventListener("click", (e)=>{
                this.setState({search: ""})
                this.props.addService(e.target.innerText)
            })
        })
    }
}