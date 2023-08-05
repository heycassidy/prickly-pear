<script>
  // import paperCanvas from "./paperCanvas.js";
  import { paper } from 'paper';
  import pkg from 'seedrandom';
  import PricklyPearDrawing from './prickly-pear.js';
  
  const { alea } = pkg;
  // import PricklyPear from './sketches/prickly-pear.js'

  let prng = new alea(Math.random());
  let seed = prng();

  console.log(`seed used: ${seed}`);

  function paperCanvas(node) {
    paper.setup(node);

    let pricklyPearDrawing = new PricklyPearDrawing(paper, { seed })

    pricklyPearDrawing.render()
  }
</script>

<canvas use:paperCanvas />