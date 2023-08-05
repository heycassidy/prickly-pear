<script>
  import generateCactus from './generateCactus.js';

  let className;
  // creates a `class` property, even
  // though it is a reserved word
  export { className as class };
  export let color;

</script>

<canvas use:generateCactus={{ color }} class={`${className || ''}`} />