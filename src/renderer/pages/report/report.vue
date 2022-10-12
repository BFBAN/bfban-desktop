<template>
  <div>
    <v-toolbar
        color="primary accent-4"
        cards
        dark
        flat>
      <v-btn icon :to="{name: 'index'}">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-title class="text-h6 font-weight-regular">
        Report
      </v-card-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-container>
      <!-- 游戏类型 -->
      <v-btn-toggle v-model="toggle_none">
        <v-btn>
          <v-icon>mdi-format-align-left</v-icon>
        </v-btn>

        <v-btn>
          <v-icon>mdi-format-align-center</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>mdi-format-align-right</v-icon>
        </v-btn>

        <v-btn>
          <v-icon>mdi-format-align-justify</v-icon>
        </v-btn>
      </v-btn-toggle>

      <!-- 游戏id -->

      <!-- 作弊方式 -->
      <v-combobox
          v-model="select"
          :items="items"
          label="I use a scoped slot"
          multiple
          chips>
        <template v-slot:selection="data">
          <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item)"
          >
            <v-avatar
                class="accent white--text"
                left
                v-text="data.item.slice(0, 1).toUpperCase()"
            ></v-avatar>
            {{ data.item }}
          </v-chip>
        </template>
      </v-combobox>

      <!-- 描述 -->
      <v-textarea
          counter
          label="Text"
          :rules="rules"
          :value="value"
      ></v-textarea>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "report",
  data() {
    return {
      rules: [v => v.length <= 25 || 'Max 25 characters'],
      value: 'Hello!',
      items: []
    }
  }
}
</script>

<style scoped>

</style>