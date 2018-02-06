import React from 'react'
import axios from 'axios'

import ChecklistItem from '../components/checklist_item';

export default class ChecklistDetail extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            items: []
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
                url: '/items/' + nextProps.checklistId
            })
            .then(function(response){
                const items = response.data.items
                that.setState({
                    items
                });
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
            <div className="mdl-dialog">
                <div className="mdl-dialog__content">
                    <ul className="mdl-list">
                        {items}
                    </ul>
                </div>
                <div className="mdl-dialog__actions">
                    <button type="button" className="mdl-button closeToBringChecklist" onClick={this.props.onClose}>Close</button>
                </div>
            </div>
        );
    }
}