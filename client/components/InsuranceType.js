import React from 'react'

export default class InsuranceType extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <div className="insuranceType">
                {this.props.typesList.map((el, key)=>(
                    <div
                        key={key}
                        style={{
                            background: el===this.props.currentType ? "#ed462f" : "white",
                            color: el===this.props.currentType ? "white" : "rgb(100, 100, 100)"
                        }}
                    >
                        {el}
                    </div>
                ))}
            </div>
        )
    }
    componentDidMount(){
        document.querySelectorAll(".insuranceType>div").forEach(el=>{
            el.addEventListener("click", (e)=>{
                this.props.changeType(e.target.innerText)
            })
        })
    }
}