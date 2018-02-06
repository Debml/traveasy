import React from 'react'

import ChecklistTypeView from '../components/checklist_type_view';

export default class ChecklistIndex extends React.Component {
    render() {
        return (
            <main className="mdl-layout__content mdlFlex">
                <ChecklistTypeView type={"to_do"} tab_num={1} is_active={true}></ChecklistTypeView>
            </main>
        );
    }
}