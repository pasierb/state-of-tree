<template>
  <div>
    <tree :tree="workingTree"></tree>
    <div>
      <form @submit.prevent="newChange">
        <input v-model="change.sourceNodeId" />
        <input v-model="change.targetNodeId" />
        <button type="submit">Go!</button>
      </form>
    </div>
    <div>
      <div>Current changeset: {{currentChangesetId}}</div>
      <table>
        <tbody>
          <tr v-for="(change, i) in changes" :key="i">
            <td>{{change}}</td>
            <td>
              <a @click.prevent="rollbackTo(change.id)">rollback</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import { moveNode } from './treeTools';
import TreeComponent from './components/Tree.vue';
import Tree from './Tree';

export default {
  props: ['tree'],
  components: {
    'tree': TreeComponent,
  },
  data() {
    return {
      changes: [],
      workingTree: new Tree(this.tree.struct),
      change: {},
      currentChangesetId: null,
    };
  },
  methods: {
    rollbackTo(changeId) {
      const changes = [...this.changes].reverse()
      const index = changes.findIndex((change) => change.id === parseInt(changeId));
      // console.log(index);

      changes.slice(index).forEach(this.rollback);
    },
    rollback({ nodeId, parentId, oldParentId }) {
      this.commit({
        nodeId,
        parentId: oldParentId,
        oldParentId: parentId
      })
    },
    commit(change) {
      const newTree = new Tree(this.workingTree.struct);

      newTree.commit(change, ({ node }) => {
        if (!change.oldParentId) {
          change.oldParentId = node.parentId;
        }
      });

      // this.changes.push(change);
      this.workingTree = newTree;
      this.currentChangesetId = change.id;

      return change;
    },
    newChange(e) {
      const { sourceNodeId, targetNodeId } = this.change;
      const change = {
        id: Date.now(),
        nodeId: parseInt(sourceNodeId),
        parentId: parseInt(targetNodeId),
      };

      this.commit(change);
      this.change = {};

      this.changes.push(change);
    },
  },
}
</script>
