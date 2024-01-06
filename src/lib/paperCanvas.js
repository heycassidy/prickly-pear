
import paperPkg from 'paper';
const { paper } = paperPkg;
// import PricklyPear from './sketches/prickly-pear.js'
import { alea } from 'seedrandom';

let prng = new alea(Math.random())

let seed = prng()
// let seed = 0.9124023119688898
// let seed = 0.6443698578192487
// let seed = 0.9148026960901916


console.log(`seed used: ${seed}`)

export default function paperCanvas(node) {
  paper.setup(node);

  console.log(paper);

  // let pricklyPearDrawing = new PricklyPear(paper, { seed })

  // pricklyPearDrawing.render()
}