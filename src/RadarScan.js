// 雷达扫描
import React, { Component } from 'react'
import $ from 'jquery'
import Konva from 'konva'
 
 
class RadarScan extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
    this.layer = null
    this.tween = null
  }
  isChinese = (temp, fontSize) => {
    let width = 0
    const re = new RegExp('[\u4E00-\u9FA5]+')
    // const phoneReg = new RegExp(/^1[345789]\d{9}$/)
    for (let i = 0; i < temp.length; i++) {
      if (re.test(temp[i])) {
        width = width + fontSize
      } else {
        width = width + fontSize / 2
      }
    }
    return width
  }
  drawRandar = () => {

    let width = this.props.width//画布宽度
    let height = this.props.height//画布高度
    let fontSize = this.props.fontSize ? this.props.fontSize : 10
    let radius = width > height ? (height / 2 - fontSize * 3) : (width / 2 - fontSize * 3)
    let borderWidth = this.props.borderWidth ? this.props.borderWidth : 1//线条宽度
    let borderColor = this.props.borderColor ? this.props.borderColor : '#0ff'//线条颜色
    let fontColor = this.props.fontColor ? this.props.fontColor : '#fff'//文字颜色
    let titles = ['power', 'switch', 'window', 'mechanics', 'door']
    let x = width / 2
    let y = height / 2 + ((1 - Math.cos(Math.PI / 5)) * radius / 2)//36度角

    let LinePadding = this.props.LinePadding ? this.props.LinePadding : 25
    let backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : '#000'

    let stage = new Konva.Stage({
      container: this.refs.randarScan,
      width: width,
      height: height,
    })
    this.layer = new Konva.Layer()

    let pentagon1 = new Konva.RegularPolygon({
      x: x,
      y: y,
      sides: 5,
      radius: radius,
      stroke: borderColor,
      strokeWidth: borderWidth
    })
    let pentagon2 = new Konva.RegularPolygon({
      x: x,
      y: y,
      sides: 5,
      radius: pentagon1.radius() - LinePadding,
      stroke: borderColor,
      strokeWidth: borderWidth
    })
    let pentagon3 = new Konva.RegularPolygon({
      x: x,
      y: y,
      sides: 5,
      radius: pentagon2.radius() - LinePadding,
      stroke: borderColor,
      strokeWidth: borderWidth
    })

    let text1 = new Konva.Text({
      x: x - titles[0].length / 2 * fontSize,
      y: y - pentagon1.radius() - 2 * fontSize,
      text: titles[0],
      fontSize: 10,
      fill: fontColor
    })
    let text2 = new Konva.Text({
      x: x + pentagon1.radius() * Math.cos(Math.PI / 10) + fontSize,//18度角
      y: y - pentagon1.radius() * Math.sin(Math.PI / 10) - fontSize / 2,
      text: titles[1],
      fontSize: 10,
      fill: fontColor
    })
    let text3 = new Konva.Text({
      x: x + pentagon1.radius() * Math.sin(Math.PI / 5) - (this.isChinese(titles[2],fontSize) / 2),
      y: y + pentagon1.radius() * Math.cos(Math.PI / 5) + fontSize,
      text: titles[2],
      fontSize: 10,
      fill: fontColor
    })
    let text4 = new Konva.Text({
      x: x - pentagon1.radius() * Math.sin(Math.PI / 5) - (this.isChinese(titles[3],fontSize) / 2),
      y: y + pentagon1.radius() * Math.cos(Math.PI / 5) + fontSize,
      text: titles[3],
      fontSize: 10,
      fill: fontColor
    })
    let text5 = new Konva.Text({
      x: x - pentagon1.radius() * Math.cos(Math.PI / 10) - (fontSize + this.isChinese(titles[4],fontSize)),//18度角,
      y: y - pentagon1.radius() * Math.sin(Math.PI / 10) - fontSize / 2,
      text: titles[4],
      fontSize: 10,
      fill: fontColor
    })

    let circle = new Konva.Circle({
      x: x,
      y: y,
      radius: pentagon3.radius() / 2,
      fillRadialGradientStartRadius: 0,
      fillRadialGradientEndRadius: pentagon3.radius() / 2,
      fillRadialGradientColorStops: [0, '#fff', 0.9, '#fff', 1, '#fff'],
      shadowBlur: 10,
      shadowColor: '#0ff'
    })

    let wedge = new Konva.Wedge({
      x: x,
      y: y,
      radius: radius,
      angle: 72,
      fill: 'rgba(255, 255, 255, 0.3)',
      rotation: 0
    })

    let shadow = new Konva.RegularPolygon({
      x: x,
      y: y,
      sides: 5,
      radius: pentagon1.radius() + 16,
      stroke: backgroundColor,
      strokeWidth: 21
    })

    this.layer.add(pentagon1)
    this.layer.add(pentagon2)
    this.layer.add(pentagon3)

    this.layer.add(circle)
    this.layer.add(wedge)

    this.layer.add(shadow)

    this.layer.add(text1)
    this.layer.add(text2)
    this.layer.add(text3)
    this.layer.add(text4)
    this.layer.add(text5)



    stage.add(this.layer)

    this.tween = new Konva.Tween({
      node: wedge,
      easing: Konva.Easings.Linear,
      duration: 2,
      rotation: 360,
      onFinish: ()=> {
        this.tween.reset()
        this.tween.play()
      },
      // yoyo: true
    })
    this.tween.play()
  }

  componentDidMount() {
    this.drawRandar()
  }
  componentWillUnmount() {
    this.tween.destroy()
  }

  render() {
    return (
      <div ref='randarScan' style={{ background: this.props.backgroundColor ? this.props.backgroundColor : '#000' }}></div>
    )
  }
}


export default RadarScan