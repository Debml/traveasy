import React from 'react'
import axios from 'axios'

import ChecklistCard from '../components/checklist_card';
import ChecklistModal from '../components/checklist_modal';

export default class ChecklistIndex extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            openModal: false,
            editable: true,
            openedChecklist: -1,
            checklists: []
        };
        
        this.setModalOpen = this.setModalOpen.bind(this);
        this.newChecklist = this.newChecklist.bind(this);
        this.closeChecklist = this.closeChecklist.bind(this);
        this.viewChecklist = this.viewChecklist.bind(this);
        this.addNewChecklistCard = this.addNewChecklistCard.bind(this);
    }
    
    setModalOpen(openModal, editable) {
        this.setState({
            openModal: openModal,
            editable: editable
        });
    }
    
    newChecklist() {
        this.setModalOpen(true, true);
        this.setState({openedChecklist: -1});
    }
    
    viewChecklist(checklistId) {
        this.setModalOpen(true, false);
        this.setState({openedChecklist: checklistId});
    }
    
    closeChecklist() {
        this.setModalOpen(false, false);
    }
    
    addNewChecklistCard(newChecklist) {
        this.setState({checklists: [newChecklist, ...this.state.checklists]});
        this.closeChecklist();
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
    
    render() {
        const cards = this.state.checklists.map((checklistData, index) => {
            return <ChecklistCard 
                        key={index}
                        checklistId={checklistData.id}
                        name={checklistData.name}
                        description={checklistData.description}
                        onOpen={this.viewChecklist}/>
        });
        
        return (
            <main className="mdl-layout__content">
                <div className="page-content">
                
                    <div className="mdl-grid">
                        {cards}
                    </div>
                    
                    <ChecklistModal show={this.state.openModal} editable={this.state.editable} openedChecklist={this.state.openedChecklist} onClose={this.closeChecklist} onSave={this.addNewChecklistCard}/>

                    <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--floating-action mdl-button-corner" onClick={this.newChecklist}>
                        <i className="material-icons">add</i>
                    </button>
                </div>
            </main>
        );
    }
}

ChecklistIndex.propTypes = {}