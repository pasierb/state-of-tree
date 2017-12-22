export function removeNode (tree, id) {
  if (!tree.children || tree.children.length === 0) return null

  const index = tree.children.findIndex((node) => node.id === id)

  if (index > -1) {
    return tree.children.splice(index, 1)[0]
  } else {
    return tree.children
      .map((node) => removeNode(node, id))
      .filter((result) => !!result)[0]
  }
}

export function attachNode (tree, node, parentId) {
  if (tree.id === parentId) {
    if (!tree.children) tree.children = []

    tree.children.push(node)
  } else if (tree.children && tree.children.length > 0) {
    tree.children.forEach(child => attachNode(child, node, parentId))
  }
}

export function moveNode ({ tree, nodeId, parentId }, cb) {
  const node = removeNode(tree, nodeId)

  cb && cb(node)

  attachNode(tree, node, parentId)

  return tree
}

export function countChildren (node, cache = {}) {
  if (node.children && node.children.length > 0) {
    node.children.forEach(childNode => countChildren(childNode, cache))

    cache[node.id] = node.children.reduce((sum, childNode) => cache[childNode.id] + sum, node.children.length)
  } else {
    cache[node.id] = 0
  }

  return cache
}

export function countChildrenGroupBy ({ node, group }, cache = {}) {
  if (node.children && node.children.length > 0) {
    node.children.forEach(childNode => countChildrenGroupBy({ node: childNode, group }, cache))

    cache[node.id] = node.children.reduce((sum, childNode) => {
      Object.assign(sum, cache[childNode.id])
      sum[childNode[group]] = (sum[childNode[group]] || 0) + (cache[childNode.id][group] || 0) + 1

      return sum
    }, {})
  } else {
    cache[node.id] = {}
  }

  return cache
}
