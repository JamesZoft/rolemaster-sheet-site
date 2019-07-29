const xpLevelMap = {
  0: 0,
  10000: 1,
  20000: 2,
  30000: 3,
  40000: 4,
  50000: 5,
  70000: 6,
  90000: 7,
  110000: 8,
  130000: 9,
  150000: 10,
  180000: 11,
  210000: 12,
  240000: 13,
  270000: 14,
  300000: 15,
  340000: 16,
  380000: 17,
  420000: 18,
  460000: 19,
  500000: 20,
  550000: 21,
  600000: 22,
  650000: 23,
  700000: 24,
  750000: 25,
  800000: 26,
  850000: 27,
  900000: 28,
  950000: 29,
  1000000: 30
};

const calculateLevelFromExpPartial = xpLevelMap => exp => {
  const levelsUnderXp = Object.keys(xpLevelMap).filter(el => {
    return el <= exp;
  });
  levelsUnderXp.pop();
  return xpLevelMap[levelsUnderXp[levelsUnderXp.length - 1]] || 0;
};

const calculateLevelFromExp = calculateLevelFromExpPartial(xpLevelMap);

export { xpLevelMap };

export default calculateLevelFromExp;
