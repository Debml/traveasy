import React from 'react'
import axios from 'axios'

import ItemInput from '../components/item_input';

export default class ChecklistForm extends React.Component {
    constructor(props) {
        super(props);
        
        {/*Set itemsInfo with one empty item to always have at least one input*/}
        this.state = {itemsInfo: [{}]};
        
        this.resetForm = this.resetForm.bind(this);
        this.addItem = this.addItem.bind(this);
        this.saveChecklist = this.saveChecklist.bind(this);
        this.appendItemInfo = this.appendItemInfo.bind(this);
    }
    
    resetForm() {
        {/*Set itemsInfo with one empty item to always have at least one input*/}
        this.setState({itemsInfo: [{}]}, this.props.onClose);
    }
    
    addItem() {
        this.setState({itemsInfo: [...this.state.itemsInfo, {}]});
    }
    
    appendItemInfo(newItemInfo, index) {
        var itemsInfo = this.state.itemsInfo;
        itemsInfo[index] = newItemInfo
        
        this.setState({itemsInfo});
    }
    
    saveChecklist() {
        const that = this
        const checklist_name = document.getElementById("checklist_name").value
        const checklist_description = document.getElementById("checklist_description").value
        
        axios({
            method: 'POST',
            url: '/checklists',
            data: {checklist: {
                name: checklist_name,
                description: checklist_description,
                checklist_type: 1,
                items: this.state.itemsInfo
            }},
            headers: {
                'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(response){
            const new_checklist = {
                id: response.data.checklist_id,
                name: checklist_name,
                description: checklist_description
            }
            
            that.resetForm()
            that.props.onSave(new_checklist)
        })
    }
    
    render() {
        if (!this.props.show) {
            return null;
        }
        
        const items = this.state.itemsInfo.map((itemData, index) => {
            return <ItemInput key={index} index={index} placeholder={"Item #" + (index+1)} handleChange={this.appendItemInfo}/>
        });
        
        return (
            <div className="modal-backdrop">
                <div className="modal-container">
                    <h4 className="mdl-dialog__title">New checklist</h4>
                    
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

                        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="add_item" onClick={this.addItem}>
                            <i className="material-icons">add</i>
                            <div className="mdl-tooltip" data-mdl-for="add_item">Add activity</div>
                        </button>

                        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="discard_checklist" onClick={this.resetForm}>
                            <i className="material-icons">clear</i>
                            <div className="mdl-tooltip" data-mdl-for="discard_checklist">Discard checklist</div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
