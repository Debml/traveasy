import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import ItemInput from '../components/checklist_item_input';

export default class ChecklistModal extends React.Component {
    constructor(props) {
        super(props);
        
        {/*Set items with one empty item to always have at least one input*/}
        this.state = {
            checklist: {id: -1, name: "", description: ""},
            items: [{name: ""}]
        };
        
        this.resetModal = this.resetModal.bind(this);
        this.addItem = this.addItem.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.saveChecklist = this.saveChecklist.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.show && nextProps.checklistId != -1) {
            let that = this;
            
            axios({
                method: 'GET',
                url: '/checklists/' + nextProps.checklistId
            })
            .then(function(response) {
                const checklist = response.data.checklist[0]
                const items = response.data.items
                
                that.setState({checklist, items});
            })
        }
    }
    
    resetModal() {
        {/*Set items with one empty item to always have at least one input*/}
        this.setState({
            checklist: {id: -1, name: "", description: ""},
            items: [{name: ""}]
        }, this.props.handleClose);
    }
    
    addItem() {this.setState({items: [...this.state.items, {name: ""}]});}
    
    changeTitle() {
        var checklist = this.state.checklist;
        checklist.name = document.getElementById("checklist_name").value;
        
        this.setState({checklist});
    }
    
    changeDescription() {
        var checklist = this.state.checklist;
        checklist.description = document.getElementById("checklist_description").value;
        
        this.setState({checklist});
    }
    
    changeItem(newItemInfo, index) {
        var items = this.state.items;
        items[index] = newItemInfo
        
        this.setState({items});
    }
    
    saveChecklist() {
        if (this.state.checklist.id == -1) {
            this.createChecklist();
        }
        else {
            this.updateChecklist();
        }
    }
    
    createChecklist() {
        const that = this
        
        axios({
            method: "POST",
            url: "/checklists",
            data: {
                checklist: this.state.checklist,
                items: this.state.items
            },
            headers: {
                "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(response){
            const new_checklist = {
                id: response.data.checklist_id,
                name: that.state.checklist.name,
                description: that.state.checklist.description
            }
            
            //that.resetModal() --> This closes the modal after saving
            that.props.handleSave("create", new_checklist, 0)
        })
    }
    
    updateChecklist() {
        const that = this
        
        axios({
            method: "PUT",
            url: "/checklists/" + this.state.checklist.id,
            data: {
                checklist: this.state.checklist,
                items: this.state.items
            },
            headers: {
                "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(){
            const updatedChecklist = {
                id: that.state.checklist.id,
                name: that.state.checklist.name,
                description: that.state.checklist.description
            }
            
            that.props.handleSave("update", updatedChecklist, that.props.cardIndex)
        })
    }
    
    render() {
        if (!this.props.show) {return null;}
        
        const items = this.state.items.map((itemData, index) => {
            return <ItemInput key={index} index={index} disabled={!this.props.editable} val={this.state.items[index].name} handleChange={this.changeItem}/>
        });
        
        return (
            <div className="modal-backdrop">
                <div className="modal-container">
                    <div className="mdl-dialog__content">
                        <form id="checklist_form">
                            <div className="mdl-textfield mdl-js-textfield checklist-input-centered">
                                <input className="mdl-textfield__input checklist-input__name" type="text" id="checklist_name" value={this.state.checklist.name} 
                                    onChange={this.changeTitle} disabled={!this.props.editable}/>
                                <label className="mdl-textfield__label checklist-input__name-label" htmlFor="checklist_name">
                                    {this.state.checklist.id == -1 ? "Title" : ""}
                                </label>
                            </div>
                            
                            <div className="mdl-textfield mdl-js-textfield checklist-input-centered">
                                <input className="mdl-textfield__input checklist-input__description" type="text" id="checklist_description" value={this.state.checklist.description} 
                                    onChange={this.changeDescription} disabled={!this.props.editable}/>
                                <label className="mdl-textfield__label checklist-input__description-label" htmlFor="checklist_description">
                                    {this.state.checklist.id == -1 ? "Enter a description for your checklist" : ""}
                                </label>
                            </div>
                            
                            <ul className="mdl-list">
                                {items}
                            </ul>
                            
                        </form>
                    </div>
                    
                    <div className="mdl-dialog__actions">
                        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="save_checklist" onClick={this.saveChecklist}>
                            <i className="material-icons">done</i>
                            <div className="mdl-tooltip" data-mdl-for="save_checklist">Save checklist</div>
                        </button>

                        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="add_item" onClick={this.addItem}>
                            <i className="material-icons">add</i>
                            <div className="mdl-tooltip" data-mdl-for="add_item">Add item</div>
                        </button>

                        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="discard_checklist" onClick={this.resetModal}>
                            <i className="material-icons">clear</i>
                            <div className="mdl-tooltip" data-mdl-for="discard_checklist">Discard checklist</div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

ChecklistModal.propTypes = {
    show: PropTypes.bool,
    editable: PropTypes.bool,
    checklistId: PropTypes.number,
    cardIndex: PropTypes.number,
    handleSave: PropTypes.func,
    handleClose: PropTypes.func
}