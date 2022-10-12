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

    <v-list
        two-line
        subheader>
      <v-subheader>全局</v-subheader>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>账户</v-list-item-title>
          <v-list-item-subtitle>链接您的BFBAN账户，访问BFBAN官方账户中心</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="{name: 'keypress'}">
        <v-list-item-content>
          <v-list-item-title>键盘</v-list-item-title>
          <v-list-item-subtitle>设定BFBAN桌面快捷键</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>主题</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>自动更新程序</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-list>
      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>工具</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>自动更新程序</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }
  }
}
</script>

<style>
</style>