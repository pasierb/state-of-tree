import { moveNode } from './treeTools'

export default class Tree {
  constructor ({struct, history = []}) {
    this.struct = JSON.parse(JSON.stringify(struct))
    this.history = history
  }

  commit (change, cb) {
    let changes = change

    if (!Array.isArray(change)) changes = [change]

    changes.forEach((change) => {
      moveNode({
        tree: this.struct,
        nodeId: change.nodeId,
        parentId: change.parentId
      }, (err, data) => {
        if (data.node.parentId) {
          change.oldParentId = data.node.parentId
        }

        cb && cb(err, data)
      })

      this.history.push(change)
    })

    return this
  }
};
