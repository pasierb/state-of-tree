<template>
  <div>
    Tree: {{tree.ts}}

    <div>
      <tree-node :node="tree.struct"></tree-node>
    </div>
  </div>
</template>

<script>
import TreeNode from './TreeNode.vue';

export default {
  name: 'tree',
  props: ['tree'],
  components: {
    TreeNode,
  },
}
</script>
