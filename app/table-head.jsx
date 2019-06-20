import React from "react";
import AlertTypeResourceStore from "./store/AlertTypeStore";

class tableHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caret: []
    };
  }

  sort(column, index) {
    let ar = this.state.caret;
    ar[index] = !this.state.caret[index];
    this.setState({
      caret: ar
    });
    const sortOrder = !this.state.caret[index] ? "asc" : "desc";
    this.props.sort(column, sortOrder);
  }

  render() {
    return (
      <div className="row table-heading-row">
        {this.props.columns.map((col, i) => {
          let column =
            col.label == "Description"
              ? "col-xs-3"
              : col.label == ""
              ? "col-xs-1"
              : "col-xs-2";
          return (
            <span className={`table-headings ${column}`}>
              <span onClick={() => this.sort(col.value, i)}>{col.label}</span>
              {col.value != "" && (
                <span
                  className={this.state.caret[i] ? "caret up" : "caret"}
                  aria-hidden="true"
                />
              )}
            </span>
          );
        })}
      </div>
    );
  }
}

export default tableHead;
