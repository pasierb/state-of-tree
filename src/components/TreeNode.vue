<template>
  <div>
    <div class="node">
      {{node.id}}: {{node.subject}}
    </div>

    <div v-if="node.children" class="children">
      <tree-node :node="child" v-for="child in node.children" :key="child.id"></tree-node>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'tree-node': this
  },
  name: 'tree-node',
  props: ['node'],
};
</script>

<style scoped>
  .node {
    text-align: center;
  }

  .children {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>

