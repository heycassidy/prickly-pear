import paperPkg from 'paper';
import seedrandomPkg from 'seedrandom';
import PricklyPearDrawing from './prickly-pear.js';
const { paper } = paperPkg;
const { alea } = seedrandomPkg;

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