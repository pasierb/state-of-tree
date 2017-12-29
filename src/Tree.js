import { moveNode } from './treeTools'

export default class Tree {
  constructor ({struct, history = []}) {
    this.struct = JSON.parse(JSON.stringify(struct))
    this.history = history
    this.stash = []
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
        if (data.node.parentId && !change.oldParentId) {
          change.oldParentId = data.node.parentId
        }

        cb && cb(err, data)
      })

      this.history.push(change)
    })

    return this
  }

  rollback (changesetId) {
    const index = this.history.findIndex(changeset => changeset.id === changesetId)

    this.history.slice(index).reverse().forEach((changeset, i) => {
      moveNode({ tree: this.struct, nodeId: changeset.nodeId, parentId: changeset.oldParentId }, (err, data) => {
        if (!err) {
          this.stash.push(this.history.pop())
        }
      })
    })
  }
};
