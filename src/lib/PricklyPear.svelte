<script>
  import generateCactus from './generateCactus.js';

  // creates a `class` property, even
  // though it is a reserved word
  
  let { class: className, color } = $props();

</script>

<canvas use:generateCactus={{ color }} class={`${className || ''}`}></canvas>