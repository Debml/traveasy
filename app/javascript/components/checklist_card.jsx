import React from 'react'

export default class ChecklistCard extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleOpen = this.handleOpen.bind(this);
    }
      
    componentDidMount() {
        componentHandler.upgradeDom();
    }
    
    handleOpen() {
        this.props.onOpen(this.props.checklistId)
    }
    
    render() {
        return (
            <div className="mdl-card-square mdl-card mdl-shadow--4dp mdl-cell mdl-cell--4-col">
                <div className="mdl-card__title mdl-card--expand">
                    <h2 className="mdl-card__title-text">{this.props.name}</h2>
                </div>
                <div className="mdl-card__supporting-text">{this.props.description}</div>
                <div className="mdl-card__actions mdl-card--border">
                    <p className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.handleOpen}>VIEW CHECKLIST</p>
                </div>
                {/*top right icons go here -> (delete, edit, share)<div className="mdl-card__menu"></div>*/}
            </div>
        );
    }
}