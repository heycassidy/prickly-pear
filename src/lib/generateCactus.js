import { paper } from 'paper';
import pkg from 'seedrandom';
import PricklyPearDrawing from './prickly-pear.js';
const { alea } = pkg;

function generateCactus(node, userSettings) {
  let prng = new alea(Math.random());

  const defaultSettings = {
    seed: prng(),
    color: '#aaaaaa'
  }

  const settings = {
    ...defaultSettings,
    ...userSettings
  }

  paper.setup(node);

  let pricklyPearDrawing = new PricklyPearDrawing(paper, settings)

  pricklyPearDrawing.render()

}

export default generateCactus