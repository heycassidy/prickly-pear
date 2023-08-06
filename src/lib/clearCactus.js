import { paper } from 'paper';

function clearCactus() {
  if (paper.project) {
    paper.project.remove();
  }
  paper.remove();
}

export default clearCactus