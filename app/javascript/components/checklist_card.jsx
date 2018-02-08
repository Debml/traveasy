import React from 'react'

export default class ChecklistCard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {showOptions: false};
        
        this.openChecklist = this.openChecklist.bind(this);
        this.showOptionsButton = this.showOptionsButton.bind(this);
        this.hideOptionsButton = this.hideOptionsButton.bind(this);
    }
      
    componentDidMount() {componentHandler.upgradeDom();}
    
    openChecklist() {this.props.onOpen(this.props.checklistId);}
    
    setButtonState(boolVal) {this.setState({showOptions: boolVal});}
    
    showOptionsButton() {this.setButtonState(true);}
    
    hideOptionsButton() {this.setButtonState(false);}
    
    render() {
        return (
            <div className="mdl-card-square mdl-card mdl-shadow--4dp mdl-cell mdl-cell--4-col" onMouseEnter={this.showOptionsButton} onMouseLeave={this.hideOptionsButton}>
                <div className="mdl-card__title mdl-card--expand"><h2 className="mdl-card__title-text">{this.props.name}</h2></div>
                <div className="mdl-card__supporting-text">{this.props.description}</div>
                
                <div className="mdl-card__actions mdl-card--border">
                    <p className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.handleOpen}>VIEW CHECKLIST</p>
                </div>
                
                {this.state.showOptions && <div className="mdl-card__menu"><i className="material-icons icon-clickable">delete</i></div>}
            </div>
        );
    }
}

ChecklistCard.propTypes = {
    onOpen: PropTypes.func,
    checklistId: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string
}