import React from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";

@inject("alertPermissionStore")
class EditorConrol extends React.Component {
  render() {
    const {
      data,
      edited,
      activeTab,
      onPublish,
      onReject,
      onDraft,
      onCancel,
      alertPermissionStore
    } = this.props;
    // Here the edited state means that the data has changed by using ckeditor
    const role = alertPermissionStore.permissions.role.toLocaleLowerCase();
    if (role === "view") {
      return null;
    }
    return (
      <div className="col-md-12 col-sm-12 col-xs-12 button-panel">
        {role === "publish" &&
        data.state &&
        data.state === "DRAFT" &&
        !edited[activeTab] ? (
          <div>
            <button
              type="button"
              className="btn sm btn-primary"
              onClick={onPublish}
            >
              Publish
            </button>
          </div>
        ) : null}
        {role === "publish" &&
        data.state &&
        data.state === "DRAFT" &&
        (edited[activeTab] === undefined || edited[activeTab] === false) ? (
          <div>
            <button
              type="button"
              className="btn sm btn-primary"
              onClick={onReject}
            >
              Reject
            </button>
          </div>
        ) : null}
        {edited[activeTab] ? (
          <div>
            <button
              type="button"
              className="btn sm btn-primary"
              onClick={onDraft}
            >
              Save as Draft
            </button>
          </div>
        ) : null}
        {edited[activeTab] ? (
          <div>
            <button
              type="button"
              className="btn sm btn-primary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

EditorConrol.propTypes = {
  data: PropTypes.object.isRequired,
  edited: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
  onPublish: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onDraft: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default EditorConrol;
