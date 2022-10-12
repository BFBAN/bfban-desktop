<template>
    <span class="privilege-tagbox">
      <span v-for="(p_item, p_index) in tags" :key="p_index">
        <v-chip class="tag" x-small outlined :color="p_item.class">{{ $t('basic.privilege.' + p_item.value) }}</v-chip>
      </span>
    </span>
</template>

<script>
import privileges from "/resources/conf/privilege.json";

export default {
  props: {
    data: [],
    tagSize: {
      type: String,
      default: ''
    },
    tagType: {
      type: String,
      default: 'border'
    }
  },
  data () {
    return {
      privileges: privileges.child,
      tags: []
    }
  },
  created () {
    this.update();
  },
  watch: {
    'data': function (val, old) {
      this.update(val);
    }
  },
  methods: {
    update (privilegeArray) {
      const that = this;
      this.tags = that.privileges.filter(i => {
        return privilegeArray ? privilegeArray.includes(i.value) : that.data.includes(i.value);
      });
    }
  }
}
</script>

<style scoped>
.privilege-tagbox {
  user-select: none;
}

.tag {
  cursor: pointer;
  margin-right: 5px;
}
</style>