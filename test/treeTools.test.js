import {
  removeNode,
  attachNode,
  countChildren
} from '../src/treeTools'

/* eslint-env node, jest */

describe('removeNode', function () {
  let tree

  beforeEach(function () {
    tree = {
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
  })

  it('should return removed node', function () {
    expect(removeNode(tree, 4)).toEqual({
      id: 4,
      subject: 'D'
    })
  })

  it('should remove node from tree', function () {
    removeNode(tree, 4)

    expect(tree).toEqual({
      id: 1,
      subject: 'A',
      children: [
        {
          id: 2,
          subject: 'B',
          children: []
        },
        {
          id: 3,
          subject: 'C'
        }
      ]
    })
  })
})

describe('attachNode', function () {
  let tree
  let node = {
    id: 4,
    subject: 'D'
  }

  beforeEach(function () {
    tree = {
      id: 1,
      subject: 'A',
      children: [
        {
          id: 2,
          subject: 'B'
        },
        {
          id: 3,
          subject: 'C'
        }
      ]
    }
  })

  it('should move node to target parent', function () {
    attachNode(tree, node, 3)

    expect(tree).toEqual({
      id: 1,
      subject: 'A',
      children: [
        {
          id: 2,
          subject: 'B'
        },
        {
          id: 3,
          subject: 'C',
          children: [
            {
              id: 4,
              subject: 'D'
            }
          ]
        }
      ]
    })
  })
})

describe('childrenCount', function () {
  let tree

  beforeEach(function () {
    tree = {
      id: 1,
      subject: 'A',
      type: 'Corpo',
      children: [
        {
          id: 2,
          subject: 'B',
          type: 'Group',
          children: [
            {
              id: 4,
              subject: 'D',
              type: 'Plant'
            }
          ]
        },
        {
          id: 3,
          subject: 'C',
          type: 'Plant'
        }
      ]
    }
  })

  it('should count children', function () {
    const res = countChildren({ node: tree })

    expect(res[1]).toEqual(3)
    expect(res[3]).toEqual(0)
  })

  it('should count children by type', function () {
    const res = countChildren({ node: tree, group: 'type' })

    expect(res[1]['Plant']).toEqual(2)
    expect(res[2]['Plant']).toEqual(1)
    expect(res[1]['Group']).toEqual(1)
  })
})