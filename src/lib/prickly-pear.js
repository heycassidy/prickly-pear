import pkg from 'seedrandom';
const { alea } = pkg;
import LSystem from "./helpers/l-system.js"
import PricklyPearLSystemInterpreter from "./l-system-interpreter.js"
import { inchToPx } from "./helpers/math.js"
import Cladode from './shapes/Cladode.js';

export default class PricklyPear {
  constructor(paper, settings) {
    this.paper = paper

    this.settings = {...{
      printDPI: 96,
      printWidth: 12,
      printHeight: 12,
      bleedSize: 0.125,
      safeArea: 0.375,
      seed: null,
      color: '#55AA55'
    }, ...settings }

    this.settings.source = this.settings.seed ? new alea(this.settings.seed) : null

    this.group = new paper.Group()
  }

  get zoomFactor() {
    return 1
  }

  get palette() {
    const { paper } = this.paper

    const baseColor = new paper.Color(this.settings.color)
    const outline = baseColor.multiply(0.5)

    return {
        cactus: baseColor,
        dark: outline,
    }
  }

  hsbColor(hue, saturation, brightness) {
    const { paper } = this.paper

    return new paper.Color({
      hue,
      saturation: saturation * 0.01,
      brightness: brightness * 0.01,
    })
  }

  pageSetup() {
    const { paper } = this.paper
    const { zoomFactor } = this
    const { printWidth, printHeight, printDPI } = this.settings

    let posterSize = new paper.Size(printWidth * printDPI, printHeight * printDPI)

    paper.view.setViewSize(posterSize)
    paper.view.setCenter(posterSize.divide(2 * zoomFactor))
    paper.view.setScaling(zoomFactor)
  }

  drawCactus() {
    const { paper } = this.paper
    const { group } = this
    const { source, printHeight, printDPI } = this.settings
    
    let pricklyPearLSystem = new LSystem('P[-X][X][+X]', [
      ['X', [
        'P[-X][+X]',
        'P[-X][+X]',
        'P[-X][+X]',
        'P[P][+X]',
        'P[-X][P]',
        'P[-X][+X][X]',
        'P[-X][+X][X]',
        'P[-X][+X][X]',
        'P[-X][+X][X][-X]',
      ]],
      ['P', [
        'P',
        'P',
        'P',
        'P',
        'P',
        'P',
        'P',
        'PP',
        'X',
      ]]
    ], source)

    let interpreter = new PricklyPearLSystemInterpreter(paper, {
      startingSegmentLength: inchToPx(printHeight * 0.5, printDPI),
      printDPI,
      source
    }, {
      klass: Cladode,
      settings: {
        palette: this.palette,
        printDPI
      }
    })

    let finalCladodes = pricklyPearLSystem.render(interpreter, 3).sort((a, b) => b.id - a.id)

    group.addChildren(finalCladodes.map(c => c.draw()))
  }

  render() {
    this.pageSetup()
    this.drawCactus()
  }
}