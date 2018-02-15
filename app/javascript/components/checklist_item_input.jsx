import React from 'react'
import PropTypes from 'prop-types'

export default class ItemInput extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {showOptions: false};
        
        this.saveItem = this.saveItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.showOptionsButton = this.showOptionsButton.bind(this);
        this.hideOptionsButton = this.hideOptionsButton.bind(this);
    }
    
    componentDidMount() {/*componentHandler.upgradeDom();*/}
    
    saveItem() {this.props.handleChange({name: document.getElementById("item_"+this.props.index).value}, this.props.index)}
    
    deleteItem() {this.props.handleDelete(this.props.index)}
    
    setButtonState(boolVal) {this.setState({showOptions: boolVal})}
    
    showOptionsButton() {this.setButtonState(true)}
    
    hideOptionsButton() {this.setButtonState(false)}
    
    render() {
        return (
            <li className="mdl-list__item" onMouseEnter={this.showOptionsButton} onMouseLeave={this.hideOptionsButton}>
                <i className="material-icons list-item__bullet">{this.props.lastInput ? "add" : "check_box_outline_blank"}</i>
                <div className="mdl-textfield mdl-js-textfield mdl-list__item-primary-content">
                    <input className="mdl-textfield__input custom-input" type="text" id={"item_"+this.props.index} value={this.props.val} disabled={this.props.disabled} onChange={this.saveItem}/>
                </div>
                
                {!this.props.lastInput && this.state.showOptions && <i className="material-icons list-item__options icon-clickable" onClick={this.deleteItem}>delete</i>}
            </li>
        );
    }
}

ItemInput.propTypes = {
    disabled: PropTypes.bool,
    lastInput: PropTypes.bool,
    index: PropTypes.number,
    val: PropTypes.string,
    handleChange: PropTypes.func,
    handleDelete: PropTypes.func
}