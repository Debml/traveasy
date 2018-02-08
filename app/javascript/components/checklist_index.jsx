import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import ChecklistCard from '../components/checklist_card';
import ChecklistModal from '../components/checklist_modal';

export default class ChecklistIndex extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            openModal: false,
            editable: true,
            openedChecklistId: -1,
            openedChecklistCardIndex: -1,
            checklists: []
        };
        
        this.setModalOpen = this.setModalOpen.bind(this);
        this.newChecklist = this.newChecklist.bind(this);
        this.viewChecklist = this.viewChecklist.bind(this);
        this.disableChecklist = this.disableChecklist.bind(this);
        this.closeChecklist = this.closeChecklist.bind(this);
        this.deleteChecklist = this.deleteChecklist.bind(this);
        this.updateChecklistCardView = this.updateChecklistCardView.bind(this);
    }
    
    componentDidMount() {
        let that = this;
        
        axios({
            method: 'GET',
            url: '/checklists/get_checklists'
        })
        .then(function(response){
            const checklists = response.data.checklists;
            that.setState({checklists});
        })
    }
    
    setModalOpen(openModal, editable) {
        this.setState({
            openModal: openModal,
            editable: editable
        });
    }
    
    newChecklist() {
        this.setState({
            openedChecklistId: -1,
            openedChecklistCardIndex: -1
        });
        this.setModalOpen(true, true);
    }
    
    viewChecklist(checklistId, cardIndex) {
        this.setState({
            openedChecklistId: checklistId,
            openedChecklistCardIndex: cardIndex
        });
        this.setModalOpen(true, true);
    }
    
    disableChecklist() {this.setModalOpen(true, false);}
    
    closeChecklist() {this.setModalOpen(false, false);}
    
    deleteChecklist(checklistId, checklistIndex) {
        let that = this;
        
        axios({
            method: 'DELETE',
            url: '/checklists/' + checklistId,
            headers: {'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content}
        })
        .then(function() {
            that.updateChecklistCardView("delete", null, checklistIndex)
        })
    }
    
    updateChecklistCardView(action, checklist, checklistIndex) {
        if (action == "create") {
            this.setState({checklists: [checklist, ...this.state.checklists]});
        }
        else if (action == "update") {
            var checklists = this.state.checklists;

            //if updated checklist is the first one, just replace it
            if (checklistIndex == 0) {
                checklists[0] = checklist;
            }
            //if updated checklist is not the first one, remove it from the list and add it to the start (cards are ordered by checklist.updated_at attribute)
            else {
                checklists.splice(checklistIndex, 1);
                checklists = [checklist, ...checklists]
            }

            this.setState({checklists});
        }
        else if (action == "delete") {
            var checklists = this.state.checklists;
            checklists.splice(checklistIndex, 1);
            this.setState({checklists});
        }
    }
    
    render() {
        const cards = this.state.checklists.map((checklistData, index) => {
            return <ChecklistCard key={index}
                                  index={index}
                                  checklistId={checklistData.id}
                                  name={checklistData.name}
                                  description={checklistData.description}
                                  handleOpen={this.viewChecklist}
                                  handleDelete={this.deleteChecklist}/>
        });
        
        return (
            <main className="mdl-layout__content">
                <div className="page-content">
                
                    <div className="mdl-grid">
                        {cards}
                    </div>
                    
                    <ChecklistModal show={this.state.openModal} 
                                    editable={this.state.editable} 
                                    checklistId={this.state.openedChecklistId} 
                                    cardIndex={this.state.openedChecklistCardIndex} 
                                    handleSave={this.updateChecklistCardView} 
                                    handleClose={this.closeChecklist}/>

                    <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--floating-action mdl-button-corner" onClick={this.newChecklist}>
                        <i className="material-icons">add</i>
                    </button>
                </div>
            </main>
        );
    }
}

ChecklistIndex.propTypes = {}