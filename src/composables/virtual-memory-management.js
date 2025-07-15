class LruCache {
  constructor(size) {
    this.size = size;
    this.cache = new Array(size).fill(null);
  }
  update = (val) => {
    if (this.cache.includes(val)) {
      const pos = this.cache.indexOf(val);
      this.cache.splice(pos, 1);
    } else {
      this.cache.pop();
    }
    this.cache.unshift(val);
  };
  getLruItem = () => this.cache[this.size - 1];
}

const replacementStrategies = {
  fifo: () => {
    const queue = [];
    return {
      update: (item) => {
        if (!queue.includes(item)) queue.push(item);
      },
      getVictimPage: () => queue.shift(),
    };
  },
  lru: ({ frameCount }) => {
    const cache = new LruCache(frameCount);
    return {
      update: cache.update,
      getVictimPage: cache.getLruItem,
    };
  },
  optimal: ({ frames, refStr }) => {
    let currentIdx = 0;
    const getVictimPage = () => {
      const nextUse = frames.map((f) => refStr.indexOf(f, currentIdx));
      const farthest = Math.max(...nextUse);
      // Pick the first non-reoccurring page or the farthest
      const victimIdx = nextUse.includes(-1) ? nextUse.indexOf(-1) : nextUse.indexOf(farthest);
      return frames[victimIdx];
    };
    return {
      update: () => {
        currentIdx++;
      },
      getVictimPage,
    };
  },
};

export const runPageReplacementAlgorithm = (refStr, frameCount, replacementStrategy) => {
  const log = [];
  let totalPageFaults = 0;
  const frames = new Array(frameCount).fill(null);

  const ctx = { refStr, frames, frameCount };
  const strategy = replacementStrategies[replacementStrategy];
  const { update, getVictimPage } = strategy(ctx);

  // Run the respective page replacement algorithm
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
      totalPageFaults++;
      isPageFault = true;
    }
    update(pageId);
    log.push({ frames: frames.slice(), isPageFault, victimPageFrameIdx });
  }

  return { log, totalPageFaults };
};
