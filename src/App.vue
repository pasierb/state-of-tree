<template>
  <div class="row">
    <div class="col-4">
      <div>
        <form @submit.prevent="newChange">
          <div class="form-group">
            <label for="" class="control-label">Node id:</label>
            <input v-model="change.sourceNodeId" class="form-control" type="number" />
          </div>
          <div class="form-group">
            <label for="" class="control-label">New parent node id: </label>
            <input v-model="change.targetNodeId" class="form-control" type="number" />
          </div>
          <button type="submit">Go!</button>
        </form>
      </div>
      <div>
        <h2>history</h2>
        <table class="table">
          <tbody>
            <tr v-for="(change, i) in tree.history" :key="i">
              <td>{{change}}</td>
              <td>
                <a @click.prevent="rollback($event, change)">rollback</a>
              </td>
            </tr>
          </tbody>
        </table>

        <h2>stash</h2>
        <table class="table">
          <tbody>
            <tr v-for="(change, i) in tree.stash" :key="i">
              <td>{{change}}</td>
              <td>
                <a @click.prevent="fastForward($event, change)">fast forward</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-8">
      <tree :tree="tree"></tree>
    </div>
  </div>
</template>

<script>
// import { moveNode } from './treeTools';
import TreeComponent from './components/Tree.vue';
import Tree from './Tree';

export default {
  props: {
    'tree': { type: Object, required: true },
    'changesets': { type: Array, default: () => [] }
  },
  components: {
    'tree': TreeComponent,
  },
  data() {
    return {
      change: {},
    };
  },
  mounted () {
    this.tree.commit(this.changesets)
  },
  methods: {
    newChange(e) {
      const { sourceNodeId, targetNodeId } = this.change

      this.tree.commit({
        id: Date.now(),
        nodeId: parseInt(sourceNodeId),
        parentId: parseInt(targetNodeId)
      })
      this.change = {}
    },
    rollback (event, change) {
      this.tree.rollback(change.id)
    },
    fastForward (event, change) {
      this.tree.fastForward(change)
    }
  },
}
</script>
