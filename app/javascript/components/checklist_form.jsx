import React from 'react'
import axios from 'axios'

import ItemInput from '../components/item_input';

export default class ChecklistForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            itemsComponents: [ItemInput],
            itemsInfo: [{}]
        };
        
        this.discardForm = this.discardForm.bind(this);
        this.addItemInput = this.addItemInput.bind(this);
        this.saveChecklist = this.saveChecklist.bind(this);
        this.appendItemInfo = this.appendItemInfo.bind(this);
    }
    
    discardForm() {
        this.setState({
            itemsComponents: [ItemInput],
            itemsInfo: [{}]
        }, this.props.onClose);
    }
    
    addItemInput() {
        const itemsComponents = this.state.itemsComponents.concat(ItemInput);
        this.setState({
            itemsComponents
        });
    }
    
    appendItemInfo(newItemInfo, index) {
        var itemsInfo = this.state.itemsInfo;
        itemsInfo[index] = newItemInfo
        
        this.setState({ 
            itemsInfo 
        });
    }
    
    saveChecklist() {
        axios({
            method: 'POST',
            url: '/checklists',
            data: {checklist: {
                name: document.getElementById("checklist_name").value,
                description: document.getElementById("checklist_description").value,
                checklist_type: 1,
                items: this.state.itemsInfo
            }},
            headers: {
                'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(response){
            console.log("SAVED")
        })
    }
    
    render() {
        if (!this.props.show) {
            return null;
        }
        
        const items = this.state.itemsComponents.map((Element, index) => {
            return <Element key={index} index={index} handleChange={this.appendItemInfo}/>
        });
        
        return (
            <div className="mdl-dialog" id="toDoWindow">
                <h4 className="mdl-dialog__title">New To-Do List</h4>
                
                <div className="mdl-dialog__content">
                    <form id="checklist_form">
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="text" id="checklist_name" required/>
                            <label className="mdl-textfield__label" htmlFor="checklist_name">Name your checklist</label>
                        </div>
                        
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="text" id="checklist_description" required/>
                            <label className="mdl-textfield__label" htmlFor="checklist_description">Type a small description for your checklist</label>
                        </div>
                        
                        <div className="items">
                            {items}
                        </div>
                        
                    </form>
                </div>
                
                <div className="mdl-dialog__actions">
                    <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="save_checklist" onClick={this.saveChecklist}>
                        <i className="material-icons">done</i>
                        <div className="mdl-tooltip" data-mdl-for="save_checklist">Save checklist</div>
                    </button>

                    <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="add_item" onClick={this.addItemInput}>
                        <i className="material-icons">add</i>
                        <div className="mdl-tooltip" data-mdl-for="add_item">Add activity</div>
                    </button>

                    <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="discard_checklist" onClick={this.discardForm}>
                        <i className="material-icons">clear</i>
                        <div className="mdl-tooltip" data-mdl-for="discard_checklist">Discard checklist</div>
                    </button>
                </div>
            </div>
        );
    }
}
