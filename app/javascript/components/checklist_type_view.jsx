import React from 'react'
import axios from 'axios'

import ChecklistCard from '../components/checklist_card';
import ChecklistDetail from '../components/checklist_detail';
import ChecklistForm from '../components/checklist_form';

export default class ChecklistTypeView extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            formOpen: false,
            detailOpen: false,
            openedChecklist: -1,
            checklists: []
        };
        
        this.setModalOpen = this.setModalOpen.bind(this)
        this.openForm = this.openForm.bind(this)
        this.closeForm = this.closeForm.bind(this)
        this.openDetail = this.openDetail.bind(this)
        this.closeDetail = this.closeDetail.bind(this)
        this.updateChecklist = this.updateChecklist.bind(this)
    }
    
    setModalOpen(modalKey, modalVal) {
        var state_copy = {}
        state_copy[modalKey] = modalVal
        this.setState(state_copy)
    }
    
    openForm() { this.setModalOpen("formOpen", true) }
    closeForm() { this.setModalOpen("formOpen", false) }
    
    openDetail(checklistId) {
        this.setModalOpen("detailOpen", true)
        this.setState({openedChecklist: checklistId})
    }
    
    closeDetail() { 
        this.setModalOpen("detailOpen", false)
    }
    
    updateChecklist(checklistData) {
        this.setState({checklists: [checklistData, ...this.state.checklists]});
        this.closeForm()
    }
    
    componentDidMount() {
        let that = this;
        
        axios({
            method: 'GET',
            url: '/checklists/get_checklists'
        })
        .then(function(response){
            const checklists = response.data.checklists
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
                        onOpen={this.openDetail}/>
        });
        
        return (
            <div className="page-content">
            
                <div className="mdl-grid">
                    {cards}
                </div>
                
                <ChecklistForm show={this.state.formOpen} onClose={this.closeForm} onSave={this.updateChecklist}/>
                <ChecklistDetail show={this.state.detailOpen} checklistId={this.state.openedChecklist} onClose={this.closeDetail}/>

                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--floating-action mdl-button-corner" onClick={this.openForm}>
                    <i className="material-icons">add</i>
                </button>
            </div>
        );
    }
}