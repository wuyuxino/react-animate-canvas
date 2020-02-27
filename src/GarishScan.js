import React, { Component } from 'react'
import Konva from 'konva';
import $ from 'jquery'

class GarishScan extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
    this.tween=null
  }
  drawScan = () => {
    let width = $('#scan').width();
    let height = $('#scan').height();
    let stage = new Konva.Stage({
      container: 'scan',
      width: width,
      height: height
    });

    let layer = new Konva.Layer();

    let scan = new Konva.Wedge({
      x: stage.width() / 2,
      y: stage.height() / 2,
      radius: 200,
      angle: 100,
      fillLinearGradientStartPoint: { x: width / 2 -100, y: height / 2 + 200 },
      fillLinearGradientEndPoint: { x: width / 2 + 200, y: height / 2 },
      // fillLinearGradientEndPoint: { x: width / 2 -100, y: height / 2 + 200 },
      fillLinearGradientColorStops: [0, 'red', 0.3, 'red', 1, 'red'],
      // fillLinearGradientColorStops: [0, 'rgba(255,0,0,0.6)', 0.3, 'rgba(255,0,0,0.3)', 1, 'rgba(255,0,0,0.1)'],
      rotation: 0
    });

    // add the shape to the layer
    layer.add(scan)

    // add the layer to the stage
    stage.add(layer)

    this.tween = new Konva.Tween({
      node: scan,
      easing: Konva.Easings.Linear,
      duration: 1,
      rotation: 360,
      onFinish: ()=> {
        this.tween.reset()
        this.tween.play()
      }
      // yoyo: true,
    });
    this.tween.play()
  }

  componentDidMount() {
    this.drawScan()
  }
  componentWillUnmount(){
    this.tween.destroy()
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }} id='scan'></div>
    )
  }
}

export default GarishScan
