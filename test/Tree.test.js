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
        {
          id: 4,
          subject: 'D'
        }
      ]
    },
    {
      id: 3,
      subject: 'C'
    }
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
        console.log('node: ', node)
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
    // it()
  })
})
