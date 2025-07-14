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
  let pageFaults = 0;
  const frames = new Array(frameCount).fill(null);
  log.push(frames.slice());

  for (const pageId of refStr) {
    const emptyFrameIdx = frames.findIndex((f) => f === null);
    if (!frames.includes(pageId)) {
      if (emptyFrameIdx >= 0) {
        frames[emptyFrameIdx] = pageId;
      } else {
        const pageToReplace = getVictimPage();
        const frameIdx = frames.findIndex((f) => f === pageToReplace);
        frames.splice(frameIdx, 1, pageId);
      }
      update(pageId);
      pageFaults++;
    }
    log.push(frames.slice());
  }

  return { log, pageFaults };
};
