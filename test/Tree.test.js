import Tree from '../src/Tree'

let tree
const treeSource = {
  id: 1,
  subject: 'A',
  children: [
    {
      id: 2,
      subject: 'B',
      children: [
        { id: 4, subject: 'D' }
      ]
    },
    { id: 3, subject: 'C' }
  ]
}

/* eslint-env node, jest */
/* eslint-disable handle-callback-err */
describe('Tree', function () {
  beforeEach(function () {
    tree = new Tree({ struct: treeSource })
  })

  describe('#commit', function () {
    it('should apply single changeset', function (done) {
      tree.commit({ nodeId: 4, parentId: 1 }, (err, { node }) => {
        expect(node).toEqual({ id: 4, subject: 'D' })
        done()
      })
    })

    it('should apply multiple changes', function (done) {
      const changesets = [
        { nodeId: 4, parentId: 1 },
        { nodeId: 2, parentId: 3 }
      ]
      let i = 0

      tree.commit(changesets, (err, { node }) => {
        switch (i) {
          case 0: {
            expect(node).toEqual({ id: 4, subject: 'D' })
            break
          }
          case 1: {
            expect(node).toEqual({ id: 2, subject: 'B', children: [] })
            break
          }
        }

        i++
        if (i === changesets.length) done()
      })
    })

    it('should record changeset', function () {
      const changeset = { id: Date.now(), nodeId: 4, parentId: 1 }

      tree.commit(changeset)
      expect(tree.history[tree.history.length - 1].id).toEqual(changeset.id)
    })
  })

  describe('#rollbackTo', function () {
    let changesets = [
      { id: 0, nodeId: -1, parentId: null, oldParentId: null }, // invalid changeset, never to be invoked
      { id: 1, nodeId: 4, parentId: 3, oldParentId: 1 },
      { id: 2, nodeId: 4, parentId: 2, oldParentId: 3 }
    ]

    beforeEach(function () {
      tree = new Tree({
        struct: {
          id: 1,
          subject: 'A',
          children: [
            {
              id: 2,
              subject: 'B',
              children: [
                {
                  id: 4,
                  subject: 'D'
                }
              ]
            },
            { id: 3, subject: 'C' }
          ]
        },
        history: [...changesets]
      })
    })

    it('should rollback changes to specified changeset id', function () {
      tree.rollback(1)

      expect(tree.struct).toEqual({
        id: 1,
        subject: 'A',
        children: [
          { id: 2, subject: 'B', children: [] },
          { id: 3, subject: 'C', children: [] },
          { id: 4, subject: 'D' }
        ]
      })
    })

    it('should remove rollbacked changes from history', function () {
      tree.rollback(1)

      expect(tree.history.length).toBe(1)
    })

    it('should move rollbacked changes to stash', function () {
      expect(tree.stash.length).toBe(0)

      tree.rollback(1)

      expect(tree.stash).toEqual([
        { id: 2, nodeId: 4, parentId: 2, oldParentId: 3 },
        { id: 1, nodeId: 4, parentId: 3, oldParentId: 1 }
      ])
    })
  })
})
