import React from 'react'

export default class ItemInput extends React.Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    
    saveItem() {
        this.props.handleChange({name: document.getElementById("item_name_"+this.props.index).value}, this.props.index)
    }
    
    render() {
        return (
            <div>
                <div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input" type="text" id={"item_name_"+this.props.index} onChange={this.saveItem.bind(this)}/>
                    <label className="mdl-textfield__label" htmlFor={"item_name_"+this.props.index}>{this.props.placeholder}</label>
                </div>
                
                {/**<div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input" type="text" id={"item_notes_"+this.props.index}/>
                    <label className="mdl-textfield__label" htmlFor={"item_name_"+this.props.index}>Notes</label>
                </div>**/}
            </div>
        );
    }
}