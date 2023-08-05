<script>
  import { paper } from 'paper';
  import pkg from 'seedrandom';
  import PricklyPearDrawing from './prickly-pear.js';
  const { alea } = pkg;

  let className;
  // creates a `class` property, even
  // though it is a reserved word
  export { className as class };
  export let color;

  let prng = new alea(Math.random());
  let seed = prng();

  console.log(`seed used: ${seed}`);

  function paperCanvas(node) {
    paper.setup(node);

    let pricklyPearDrawing = new PricklyPearDrawing(paper, { seed, color })

    pricklyPearDrawing.render()
  }
</script>

<canvas use:paperCanvas class={`${className || ''}`} />