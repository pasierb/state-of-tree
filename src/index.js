import Vue from 'vue/dist/vue.common';
import App from './App.vue';
import Tree from './Tree';

const tree = new Tree({
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
          subject: 'D',
        },
      ],
    },
    {
      id: 3,
      parentId: 1,
      subject: 'C',
      children: [],
    },
  ],
});

new Vue({
  el: '#root',
  components: {
    App,
  },
  data() {
    return {
      tree,
    }
  },
  render() {
    return (<div>
      <App tree={this.tree}></App>
    </div>);
  },
});
