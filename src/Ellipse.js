import React, { Component } from 'react'
import Konva from 'konva';
import $ from 'jquery'

class Ellipse extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
    this.layer = null
    this.group = null
    this.group1 = null
    this.tween1=null
    this.tween2=null
  }
  drawEllipse = () => {
    let width = $('#ellipse').width();
    let height = $('#ellipse').height();
    let stage = new Konva.Stage({
      container: 'ellipse',
      width: width,
      height: height
    });

    this.layer = new Konva.Layer();
    this.group = new Konva.Group({
      x: stage.width() / 2,
      y: stage.height() / 2,
      rotationDeg: 60,
      offset: {
        x: stage.width() / 2,
        y: stage.height() / 2
      }
    })
    this.group1 = new Konva.Group({
      x: stage.width() / 2,
      y: stage.height() / 2 - 50,
      offset: {
        x: stage.width() / 2,
        y: stage.height() / 2 - 50
      }
    })
    let group = this.group
    let group1 = this.group1

    let ellipse = new Konva.Circle({
      x: stage.width() / 2,
      y: stage.height() / 2,
      radius: 150,
      stroke: 'rgba(0,255,255,0.5)',
      strokeWidth: 4
    });

    let wedge1 = new Konva.Shape({
      x: stage.width() / 2,
      y: stage.height() / 2,
      rotation: -120,
      sceneFunc: function (context, shape) {
        context.beginPath();
        context.arc(0, 0, 30, 0, -Math.PI / 3, true)
        context.strokeStyle = 'rgba(0,255,255,1)'
        context.lineWidth = 5
        context.stroke()
      }
    });
    let wedge2 = new Konva.Shape({
      x: stage.width() / 2,
      y: stage.height() / 2,
      rotation: 60,
      sceneFunc: function (context, shape) {
        context.beginPath();
        context.arc(0, 0, 30, 0, -Math.PI / 3, true)
        context.strokeStyle = 'rgba(0,255,255,1)'
        context.lineWidth = 5
        context.stroke()
      }
    });

    let ellipseTop = new Konva.Circle({
      x: stage.width() / 2,
      y: stage.height() / 2 - 50,
      radius: 120,
      stroke: 'rgba(0,255,255,0.5)',
      strokeWidth: 4
    });

    let wedgeTop1 = new Konva.Shape({
      x: stage.width() / 2,
      y: stage.height() / 2 - 50,
      rotation: -120,
      sceneFunc: function (context, shape) {
        context.beginPath();
        context.arc(0, 0, 50, 0, -Math.PI / 3, true)
        context.strokeStyle = 'rgba(0,255,255,1)'
        context.lineWidth = 5
        context.stroke()
      }
    });
    let wedgeTop2 = new Konva.Shape({
      x: stage.width() / 2,
      y: stage.height() / 2 - 50,
      rotation: 60,
      sceneFunc: function (context, shape) {
        context.beginPath();
        context.arc(0, 0, 50, 0, -Math.PI / 3, true)
        context.strokeStyle = 'rgba(0,255,255,1)'
        context.lineWidth = 5
        context.stroke()
      }
    });



    // add the shape to the layer
    group.add(ellipse)
    group.add(wedge1)
    group.add(wedge2)
    group1.add(ellipseTop)
    // group1.add(wedgeTop1)
    // group1.add(wedgeTop2)
    // add the layer to the stage
    this.layer.add(group)
    this.layer.add(group1)
    stage.add(this.layer);

    this.tween1 = new Konva.Tween({
      node: group,
      easing: Konva.Easings.Linear,
      duration: 1,
      rotation: 420,
      onFinish: ()=> {
        this.tween1.reset()
        this.tween1.play()
      }
      // yoyo: true,
    });
    this.tween2 = new Konva.Tween({
      node: group1,
      easing: Konva.Easings.Linear,
      duration: 1,
      rotation: -360,
      onFinish: ()=> {
        this.tween2.reset()
        this.tween2.play()
      }
      // yoyo: true,
    });

    this.tween1.play()
    this.tween2.play()
  }

  componentDidMount() {
    this.drawEllipse()
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
  }
  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        transform: 'rotateX(70deg)',
      }}>
        <div style={{ width: '100%', height: '100%' }} id='ellipse'></div>
      </div>

    )
  }
}

export default Ellipse
