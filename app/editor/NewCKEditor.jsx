import React from "react";
import ReactDOM from "react-dom";
import loadScript from "load-script";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
// const loadScript = require('load-script');

const defaultScriptUrl = "https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js";

/**
 * @author codeslayer1
 * @description CKEditor component to render a CKEditor textarea with defined configs and all CKEditor events handler
 */

@inject("alertTemplateStore", "loaderStore")
@observer
class CKEditor extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.onLoad = this.onLoad.bind(this);

    // State initialization
    this.state = {
      isScriptLoaded: this.props.isScriptLoaded,
      config: this.props.config
    };
  }

  // load ckeditor script as soon as component mounts if not already loaded
  componentDidMount() {
    const { loaderStore } = this.props;
    loaderStore.loadingStart();
    if (!this.props.isScriptLoaded) {
      loadScript(this.props.scriptUrl, this.onLoad);
    } else {
      this.onLoad();
    }
  }

  componentWillUnmount() {
    this.unmounting = true;
  }

  onLoad() {
    const { loaderStore } = this.props;
    if (this.unmounting) return;

    this.setState({
      isScriptLoaded: true
    });

    if (!window.CKEDITOR) {
      loaderStore.loadingComplete();
      console.error("CKEditor not found");
      return;
    }

    window.CKEDITOR.dtd.$removeEmpty.span = false;
    window.CKEDITOR.name = "hello";

   /* if (!window.CKEDITOR.plugins.get("dragFields")) {
      window.CKEDITOR.plugins.add("dragFields", {
        init(editor) {
          editor.on("paste", function(evt) {
            let content = evt.data.dataTransfer.getData("text");
            evt.data.dataValue =
              `<span th:text="${  content  }">\${${  content  }}<span>`;
          });
        }
      });
    }*/
    // Initialize the editor with the hcard plugin.
    // window.CKEDITOR.inline( 'my_editor', {
    // extraPlugins: 'dragFields'
    // /} );

    this.editorInstance = window.CKEDITOR.appendTo(
      ReactDOM.findDOMNode(this),
      this.state.config,
      this.props.content
    );

    // Register listener for custom events if any
    for (const event in this.props.events) {
      // const eventHandler = this.props.events[event];
      // this.editorInstance.on(event, eventHandler);
      const { events } = this.props;
      const {editorInstance} = this;
      if (event == "mode") {
        editorInstance.on(event, function() {
          const eventHandler = events[event];
          let editable = editorInstance.editable();
          if (this.mode === "source") {
            editable.attachListener(editable, "input", eventHandler);
          }
        });
      } else {
        editorInstance.on(event, events[event]);
      }
    }
    loaderStore.loadingComplete();
  }

  render() {
    return <div className={this.props.activeClass} id="my_editor" />;
  }
}

CKEditor.defaultProps = {
  content: "",
  config: {},
  isScriptLoaded: false,
  scriptUrl: defaultScriptUrl,
  activeClass: "",
  events: {}
};

CKEditor.propTypes = {
  content: PropTypes.any,
  config: PropTypes.object,
  isScriptLoaded: PropTypes.bool,
  scriptUrl: PropTypes.string,
  activeClass: PropTypes.string,
  events: PropTypes.object
};

export default CKEditor;
