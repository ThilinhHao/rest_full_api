import React from 'react';

export enum COMMON_ID {
  SeriesName = 'SeriesName',
  seriesDetailPost = 'seriesDetailPost',
  treePost = 'treePost',
  preventCreateChildSeries = 'preventCreateChildSeries',
  setEditTimeCount = 'setEditTimeCount',
}

class RefPool {
  pool: any;
  static current: RefPool | null = null;

  constructor() {
    this.pool = {};
    RefPool.current = this;
  }

  static getInstance() {
    if (RefPool.current == null) {
      RefPool.current = new RefPool();
    }
    return RefPool.current;
  }

  getLength() {
    return Object.keys(this.pool).length;
  }

  addRef(id: number | string) {
    const keyName = `${id}`;
    const keys = Object.keys(this.pool);
    if (keys.includes(keyName)) {
      return this.pool[keyName];
    }
    this.pool[keyName] = React.createRef();
    return this.pool[keyName];
  }

  getRef(id: number | string) {
    const keyName = `${id}`;
    const keys = Object.keys(this.pool);
    if (keys.includes(keyName)) {
      return this.pool[keyName];
    }
    return null;
  }

  removeRef(id: number | string) {
    const keyName = `${id}`;
    delete this.pool[keyName];
  }

  getOrCreateRef(id: number | string) {
    return this.addRef(id);
  }
}

export default RefPool;
