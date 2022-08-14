const MAX_TEAMS = 2;

export const chooseTeam = (isHomeFull, isVisitorFull) => {
  if (!isHomeFull && !isVisitorFull) {
    return ~~(Math.random() * MAX_TEAMS);
  }

  if (isHomeFull) {
    return 1;
  }

  if (isVisitorFull) {
    return 0;
  }
};
