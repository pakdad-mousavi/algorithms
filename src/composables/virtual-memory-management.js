class LruCache {
  constructor(size) {
    this.size = size;
    this.cache = new Array(size).fill(null);
  }

  update = (val) => {
    this.cache.unshift(val);
    this.cache.pop();
  };

  getLruItem = () => this.cache[this.size - 1];
}

const replacementStrategies = {
  fifo: (_) => {
    const queue = [];
    return {
      update: (item) => queue.push(item),
      getVictimPage: () => queue.shift(),
    };
  },
  lru: ({ frameCount }) => {
    return { update, getVictimPage };
  },
  optimal: ({ refStr }) => {
    return { update, getVictimPage };
  },
};

export const runPageReplacementAlgorithm = (refStr, frameCount, replacementStrategy) => {
  const ctx = { refStr, frameCount };
  const strategy = replacementStrategies[replacementStrategy];
  const { update, getVictimPage } = strategy(ctx);

  const log = [];
  let totalPageFaults = 0;
  const frames = new Array(frameCount).fill(null);

  for (const pageId of refStr) {
    let isPageFault = false;
    let victimPageFrameIdx;
    const emptyFrameIdx = frames.findIndex((f) => f === null);
    if (!frames.includes(pageId)) {
      if (emptyFrameIdx >= 0) {
        frames[emptyFrameIdx] = pageId;
      } else {
        const victimPage = getVictimPage();
        victimPageFrameIdx = frames.findIndex((f) => f === victimPage);
        frames.splice(victimPageFrameIdx, 1, pageId);
      }
      update(pageId);
      totalPageFaults++;
      isPageFault = true;
    }
    log.push({ frames: frames.slice(), isPageFault, victimPageFrameIdx });
  }

  return { log, totalPageFaults };
};
