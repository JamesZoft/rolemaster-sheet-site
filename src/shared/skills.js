export function getTotalSkillRanks(levelRanks, giving) {
    return Object.entries(levelRanks)
      .map(([k, v]) => {
        if (k === "inDev") {
          return 0;
        }
        return parseInt(v);
      })
      .reduce((a, b) => a + b) + giving;
}