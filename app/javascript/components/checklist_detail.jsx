import React from 'react'
import axios from 'axios'

import ChecklistItem from '../components/checklist_item';

export default class ChecklistDetail extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            items: [],
            checklistData: {}
        };
    }

    componentDidMount() {
        componentHandler.upgradeDom();
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.checklistId != nextProps.checklistId) {
            let that = this;
        
            axios({
                method: 'GET',
                url: '/checklists/' + nextProps.checklistId
            })
            .then(function(response){
                const items = response.data.items
                const checklistData = response.data.checklist[0]
                
                that.setState({items, checklistData});
            })
        }
    }
    
    render() {
        if (!this.props.show) {
            return null;
        }
        
        const items = this.state.items.map((itemData, index) => {
            return <ChecklistItem key={index} name={itemData.name}/>
        });
        
        return (
            <div className="modal-backdrop">
                <div className="modal-container">
                    <div className="mdl-dialog__content">
                        <div className="detail-title">
                            <h2>{this.state.checklistData.name}</h2>
                            <p>{this.state.checklistData.description}</p>
                        </div>
                    
                        <ul className="mdl-list">
                            {items}
                        </ul>
                    </div>
                    <div className="mdl-dialog__actions">
                        <button type="button" className="mdl-button closeToBringChecklist" onClick={this.props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        );
    }
}