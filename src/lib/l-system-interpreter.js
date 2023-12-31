import { clamp, TAU, degreesToRadians, seededRandomNormal, inchToPx } from "./helpers/math.js"

export default class PricklyPearLSystemInterpreter {
  constructor(paper, settings, segmentDefinition) {
    this.paper = paper

    this.segmentDefinition = segmentDefinition

    this.settings = {...{
      startingSegmentLength: 100,
      source: null,
    }, ...settings }

    this.cladodeLength = this.settings.startingSegmentLength

    this.cladodes = []
    this.savedCladodes = []

    this.growthOrientations = []
    this.savedGrowthOrientations = []

    return this.interpreter
  }

  addCladode(cladode) {
    this.cladodes.push(cladode)
  }

  get lastCladode() {
    return this.cladodes.slice(-1)[0]
  }

  saveCladode(cladode) {
    this.savedCladodes.push(cladode)
  }

  restoreLastSavedCladode() {
    this.cladodes.push(this.savedCladodes.pop())
  }

  addGrowthOrientation(growthOrientation) {
    this.growthOrientations.push(growthOrientation)
  }

  get lastGrowthOrientation() {
    return this.growthOrientations.slice(-1)[0]
  }

  saveGrowthOrientation(growthOrientation) {
    this.savedGrowthOrientations.push(growthOrientation)
  }

  restoreLastSavedGrowthOrientation() {
    this.growthOrientations.push(this.savedGrowthOrientations.pop())
  }

  newSegment(Klass) {
    return new (Klass.bind.apply(Klass, arguments))();
  }

  get interpreter() {
    const { source, printDPI } = this.settings
    let { cladodeLength, segmentDefinition } = this

    const rootCladode = (id) => {
      const paper = this.paper

      let basePoint = new paper.Point(paper.view.bounds.bottomCenter.x, paper.view.bounds.bottomCenter.y + cladodeLength * 0.1)
      
      let angle = seededRandomNormal({
        expectedValue: 0,
        standardDeviation: 0.2,
        source
      })()

      let length = seededRandomNormal({
        expectedValue: cladodeLength,
        standardDeviation: cladodeLength * 0.2,
        source
      })()

      length = clamp(length, cladodeLength * 0.5, cladodeLength)

      let width = (0.6311 * cladodeLength) - 5.25

      let cladode = this.newSegment(segmentDefinition.klass, paper, {
        ...segmentDefinition.settings,
        ...{ basePoint, angle, length, width, source }
      }, id)

      this.addCladode(cladode)
      this.addGrowthOrientation([0.45, 0.55])
    }

    const newCladode = (id) => {
      const { paper, lastCladode: parent, segmentDefinition } = this
      // const paper = this.paper
      // const parent = this.lastCladode
      const growthOrientation = this.lastGrowthOrientation

      let sizeFactor = clamp(seededRandomNormal({
        expectedValue: -0.02 * Math.pow(this.savedCladodes.length, 2) + 0.7,
        standardDeviation: 0.1,
        source
      })(), 0.3, 0.9)

      let growthLocation = parent.randomGrowthLocation(growthOrientation)

      let angle = seededRandomNormal({
        expectedValue: degreesToRadians(growthLocation.angle) + TAU * -0.25,
        standardDeviation: TAU * 0.025,
        source
      })()

      let length = clamp(parent.length * sizeFactor, inchToPx(1, printDPI), parent.length * 0.8)

      let width = (0.6311 * length) - 5.25

      let cladode = this.newSegment(segmentDefinition.klass, paper, {
        ...segmentDefinition.settings,
        ...{ basePoint: growthLocation.point, angle, length, width, source }
      }, id)

      this.addCladode(cladode)
      this.addGrowthOrientation([0.47, 0.53])
    }

    const rotateLeft = () => {
      this.addGrowthOrientation([0.55, 0.65])
    }

    const rotateRight = () => {
      this.addGrowthOrientation([0.35, 0.45])
    }

    const saveState = () => {
      this.saveCladode(this.lastCladode)
      this.saveGrowthOrientation(this.lastGrowthOrientation)
    }

    const restoreState = () => {
      this.restoreLastSavedCladode()
      this.restoreLastSavedGrowthOrientation()
    }

    return function(current, previous, iterationNumber) {
      let parent = this.lastCladode

      if (!parent) {
        rootCladode(iterationNumber)

      } else if (current === "P" && !!parent) {
        newCladode(iterationNumber)

      } else if (current === "-") {
        rotateLeft()

      } else if (current === "+") {
        rotateRight()

      } else if (current === "[") {
        saveState()

      } else if (current === "]") {
        restoreState()

      }

      return this.lastCladode
    }.bind(this)
  }
}
