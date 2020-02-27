import React, { Component } from 'react'
import Konva from 'konva';
import $ from 'jquery'

class GarishLogin extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
    this.layer = null
    this.group = null
    this.group1 = null
    this.tween1=null
    this.tween2=null
    this.tween3=null
  }
  drawLogin = () => {
    let width = $('#garishLogin').width();
    let height = $('#garishLogin').height();
    let stage = new Konva.Stage({
      container: this.refs.garishLogin,
      width: width,
      height: height
    });

    this.layer = new Konva.Layer();

    let background = new Konva.Rect({
      width: width,
      height: width,
      fill: 'rgba(153,153,153,0)',
    })

    let arc1 = new Konva.Arc({
      x: stage.width() / 2,
      y: stage.height() / 2,
      innerRadius: 30,
      outerRadius: 31,
      angle: 240,
      fill: 'rgba(105, 191, 254, 1)',
    });
    let arc2 = new Konva.Arc({
      x: stage.width() / 2,
      y: stage.height() / 2,
      innerRadius: 24,
      outerRadius: 25,
      angle: 240,
      rotation: 120,
      fill: 'rgba(105, 191, 254, 0.7)',
    });
    let arc3 = new Konva.Arc({
      x: stage.width() / 2,
      y: stage.height() / 2,
      innerRadius: 18,
      outerRadius: 19,
      rotation: 240,
      angle: 240,
      fill: 'rgba(105, 191, 254, 0.4)',
    });

    var simpleText1 = new Konva.Text({
      x: 24,
      y: 25,
      text: '88',
      fontSize: 10,
      fontFamily: 'Calibri',
      fill: 'white'
    });

    // add the shape to the layer
    this.layer.add(background)
    this.layer.add(arc1)
    this.layer.add(arc2)
    this.layer.add(arc3)
    this.layer.add(simpleText1)
    // add the layer to the stage
    stage.add(this.layer);

    this.tween1 = new Konva.Tween({
      node: arc1,
      easing: Konva.Easings.Linear,
      duration: 1,
      rotation: 360,
      onFinish: ()=> {
        this.tween1.reset()
        this.tween1.play()
      }
    });
    this.tween2 = new Konva.Tween({
      node: arc2,
      easing: Konva.Easings.Linear,
      duration: 1,
      rotation: -600,//-240,正常速度，此时快速
      onFinish: ()=> {
        this.tween2.reset()
        this.tween2.play()
      }
    });
    this.tween3 = new Konva.Tween({
      node: arc3,
      easing: Konva.Easings.Linear,
      duration: 1,
      rotation: 600,
      onFinish: ()=> {
        this.tween3.reset()
        this.tween3.play()
      }
    });

    this.tween1.play()
    this.tween2.play()
    this.tween3.play()
  }

  componentDidMount() {
    this.drawLogin()
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    // if (this.props.select !== newProps.select) {
    //   console.log(newProps)
    //   this.layer.remove()
    //   this.drawInputBorder(newProps.select)
    // }
  }
  componentWillUnmount(){
    this.tween1.destroy()
    this.tween2.destroy()
    this.tween3.destroy()
  }
  render() {
    return (
      <div ref='garishLogin' style={{ width: '100%', height: '100%' }} id='garishLogin'></div>
    )
  }
}

export default GarishLogin