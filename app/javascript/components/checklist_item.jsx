import React from 'react'

export default class ChecklistItem extends React.Component {
    render() {
        return (
            <li className="mdl-list__item">
                <i className="material-icons list-bullet">check_box_outline_blank</i>
                <span className="mdl-list__item-primary-content"><h6 className="list-item">{this.props.name}</h6></span>
            </li>
        );
    }
}