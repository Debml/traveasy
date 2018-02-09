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
            items: [],
            dirtyItems: {"create": {}, "update": {}, "delete": {},},
            isDirty: false
        };
        
        this.resetModal = this.resetModal.bind(this);
        this.addItem = this.addItem.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.saveChecklist = this.saveChecklist.bind(this);
        this.deleteItem = this.deleteItem.bind(this)
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.show && nextProps.checklistId != -1) {
            let that = this;
            
            axios({
                method: 'GET',
                url: '/checklists/' + nextProps.checklistId
            })
            .then(function(response) {
                const checklist = response.data.checklist
                const items = response.data.items
                
                that.setState({checklist, items});
            })
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        //if there was a new item input added to the modal...
        if (prevState.items.length < this.state.items.length) {
            //move keyboard input to new input
            const newInput = document.getElementById("item_" + prevState.items.length);
            const val = newInput.value;
            
            newInput.focus();
            newInput.value = '';
            newInput.value = val;
        }
    }
    
    resetModal() {
        {/*Set items with one empty item to always have at least one input*/}
        this.setState({
            checklist: {id: -1, name: "", description: ""},
            items: [],
            dirtyItems: {"create": {}, "update": {}, "delete": {}},
            isDirty: false
        }, this.props.handleClose);
    }
    
    changeTitle() {
        var checklist = this.state.checklist;
        checklist.name = document.getElementById("checklist_name").value;
        
        const isDirty = true
        
        this.setState({checklist, isDirty});
    }
    
    changeDescription() {
        var checklist = this.state.checklist;
        checklist.description = document.getElementById("checklist_description").value;
        
        const isDirty = true
        
        this.setState({checklist, isDirty});
    }
    
    addItem(newItemInfo, itemIndex) {
        var dirtyItems = this.state.dirtyItems;
        var items = this.state.items;
        
        const isDirty = true
        
        dirtyItems["create"][itemIndex] = newItemInfo;
        this.setState({
            items: [...this.state.items, newItemInfo],
            isDirty
        });
    }
    
    changeItem(newItemInfo, itemIndex) {
        var dirtyItems = this.state.dirtyItems;
        var items = this.state.items;
        
        //if the item has 'id' property, it exists in the DB
        if ("id" in items[itemIndex]) {
            dirtyItems["update"][items[itemIndex].id] = newItemInfo;
        }
        //use input index as key
        else {
            dirtyItems["create"][itemIndex] = newItemInfo;
        }
        
        //since newItemInfo only contains updated fields, do not assign directly to avoid locally overwriting the item
        items[itemIndex].name = newItemInfo.name;
        
        const isDirty = true

        this.setState({items, dirtyItems, isDirty});
    }
    
    deleteItem(itemIndex) {
        var dirtyItems = this.state.dirtyItems
        var items = this.state.items
        
        //if the item has no 'id' property, it is not saved in the DB and should be ignored from server requests
        if ("id" in items[itemIndex]) {
            dirtyItems["delete"][items[itemIndex].id] = items[itemIndex].id
        }
        
        //remove it from "create" in case it was created before deletion
        if (itemIndex in dirtyItems["create"]) {
            delete dirtyItems["create"][itemIndex];
            
            dirtyItems["create"] = this.shiftKeys(dirtyItems["create"], itemIndex);
        }
        
        //remove it from "update" in case it was updated before deletion
        if (items[itemIndex].id in dirtyItems["update"]) {
            delete dirtyItems["update"][items[itemIndex].id]
        }
        
        items.splice(itemIndex, 1);
        
        const isDirty = true

        this.setState({items, dirtyItems, isDirty});
    }
    
    shiftKeys(hash, itemIndex) {
        var new_hash = {};
        
        Object.keys(hash).map((key) => {
            var new_key = key;
            
            if (key > itemIndex) {
                new_key = new_key - 1;
            }
            
            new_hash[new_key] = hash[key];
        });
        
        return new_hash;
    }
    
    saveChecklist() {
        if (this.state.checklist.id == -1) {
            var action = "POST";
            var url = "/checklists";
            var card_update_action = "create";
            var card_index = 0;
        }
        else {
            action = "PATCH"
            var url = "/checklists/" + this.state.checklist.id;
            var card_update_action = "update";
            var card_index = this.props.cardIndex;
        }
        
        const that = this
        
        axios({
            method: action,
            url: url,
            data: {
                checklist: this.state.checklist,
                items: this.state.dirtyItems
            },
            headers: {
                "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content
            }
        })
        .then(function(response){
            //that.resetModal() --> Closes the modal after saving
            that.setState({
                checklist: response.data.checklist,
                items: response.data.items,
                dirtyItems: {"create": {}, "update": {}, "delete": {}},
                isDirty: false
            }, that.props.handleSave(card_update_action, response.data.checklist, card_index));
            
            //save button tooltip stays on after disabling, remove it
            document.getElementById("save_checklist_tooltip").classList.remove("is-active");
        })
    }
    
    render() {
        if (!this.props.show) {return null;}
        
        const items = this.state.items.map((itemData, index) => {
            return <ItemInput key={index} index={index} disabled={!this.props.editable} lastInput={false} val={this.state.items[index].name} handleChange={this.changeItem} handleDelete={this.deleteItem}/>
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
                                <ItemInput key={items.length} index={items.length} disabled={!this.props.editable} lastInput={true} val={""} handleChange={this.addItem}/>
                            </ul>
                            
                        </form>
                    </div>
                    
                    <div className="mdl-dialog__actions">
                        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="save_checklist" onClick={this.saveChecklist} disabled={!this.state.isDirty}>
                            <i className="material-icons">save</i>
                            <div className="mdl-tooltip" data-mdl-for="save_checklist" id="save_checklist_tooltip">Save checklist</div>
                        </button>

                        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="discard_checklist" onClick={this.resetModal}>
                            <i className="material-icons">clear</i>
                            <div className="mdl-tooltip" data-mdl-for="discard_checklist">{this.state.checklist.id != -1? "Close checklist" : "Discard checklist"}</div>
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