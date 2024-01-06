import paperPkg from 'paper';
const { paper } = paperPkg;

function clearCactus() {
  if (paper.project) {
    paper.project.remove();
  }
  paper.remove();
}

export default clearCactus