import React from "react";
import AlertTypeStore from "./store/AlertTypeStore";
import EditorTabs from "./editor/EditorTabs";
import connectToStores from "alt/utils/connectToStores";
class EditTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  onSave() {
    this.props.history.push("/");
  }

  cancel() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        {this.props.templates.templates ? (
          <EditorTabs
            templates={this.props.templates.templates}
            onSave={this.onSave.bind(this)}
          />
        ) : null}
      </div>
    );
  }

  static getStores() {
    return [AlertTypeStore];
  }

  static getPropsFromStores() {
    return { templates: AlertTypeStore.getState() };
  }
}
export default connectToStores(EditTemplate);
