import { moveNode } from './treeTools'

export default class Tree {
  constructor (source = {}) {
    this.struct = JSON.parse(JSON.stringify(source))
    this.ts = Date.now()
  }

  commit (change, cb) {
    let changes = change

    if (Array.isArray(change)) changes = [change]

    changes.reverse().forEach((change) => {
      moveNode({
        tree: this.struct,
        nodeId: change.nodeId,
        parentId: change.parentId
      })
    })
  }
};
