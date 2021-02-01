import React, { Component } from "react";
import styles from "./response-type.module.scss";
import Button from "components/Button";

import { LiterallyCanvasReactComponent as LC } from "literallycanvas";
import LiterallyCanvas from "literallycanvas/lib/js/core/LiterallyCanvas";
import defaultOptions from "literallycanvas/lib/js/core/defaultOptions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPaintBrush } from "@fortawesome/pro-regular-svg-icons";

class Canvas extends Component {
  constructor(props) {
    super(props);
    defaultOptions.imageSize.width = window.innerWidth;
    defaultOptions.imageSize.height = window.innerHeight;
    this.lc = new LiterallyCanvas(defaultOptions);
    this.lc.setColor("primary", "#ffffff");

    this.state = { tool: this.lc.tool.name };
  }

  getImage = () => {
    const canvas = this.lc.getImage();
    const img = canvas.toDataURL("image/png");
    this.props.saveDraw(img);
  };

  setColor = (color, strokeWidth) => {
    this.lc.setTool(new color(this.lc));
    this.lc.tool.strokeWidth = strokeWidth;
    this.setState({ tool: this.lc.tool.name });
  };

  render() {
    return (
      <>
        <div className={styles.send}>
          <Button onClick={this.getImage}>Absenden</Button>
        </div>
        <div className={styles.draw}>
          <LC lc={this.lc} />
        </div>
        <div className={styles.colorPicker}>
          {this.state.tool === "Eraser" ? (
            <Button onClick={() => this.setColor(this.lc.opts.tools[0], 5)}>
              <FontAwesomeIcon icon={faPaintBrush} />
            </Button>
          ) : (
            <Button onClick={() => this.setColor(this.lc.opts.tools[1], 20)}>
              <FontAwesomeIcon icon={faEraser} />
            </Button>
          )}
        </div>
      </>
    );
  }
}

export default Canvas;
