import React, { Component } from 'react';

class Tab extends Component {

    onClick (){
        const { label, onClick } = this.props;
        onClick(label);
    }

    render() {

        let activeTab = this.props.activeTab;
        let label = this.props.label;

        let className = 'tab-list-item';

        if (activeTab === label) {
            className += ' tab-list-active';
        }

        return (
            <li
                className={className}
                onClick={this.onClick.bind(this)}
            >
                {label}
            </li>
        );
    }
}


export default Tab;