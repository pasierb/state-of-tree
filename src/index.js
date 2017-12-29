import Vue from 'vue/dist/vue.common'
import App from './App.vue'
import Tree from './Tree'

const tree = new Tree({
  struct: {
    id: 1,
    subject: 'A',
    children: [
      {
        id: 2,
        parentId: 1,
        subject: 'B',
        children: [
          {
            id: 4,
            parentId: 2,
            subject: 'D'
          }
        ]
      },
      {
        id: 3,
        parentId: 1,
        subject: 'C',
        children: []
      }
    ]
  }
})

const changesets = [
  { id: Math.random(), nodeId: 4, parentId: 2, oldParentId: 3 },
  { id: Math.random(), nodeId: 4, parentId: 3, oldParentId: 2 },
  { id: Math.random(), nodeId: 4, parentId: 1, oldParentId: 3 }
]

/* eslint-disable no-new */
new Vue({
  el: '#root',
  components: {
    App
  },
  data () {
    return {
      tree,
      changesets
    }
  },
  render () {
    return (<div>
      <App tree={this.tree} changesets={changesets}></App>
    </div>)
  }
})
