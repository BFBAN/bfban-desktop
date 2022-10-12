<template>
  <div>
    <v-app-bar :height="!isLogin ? 60 : 80" flat dark color="primary">
      <template v-if="isLogin">
        <v-toolbar-title>
          <v-row justify="center">
            <v-col>
              <v-avatar icon size="45">
                {{ userinfo.username ? userinfo.username[0] : 'L' }}
              </v-avatar>
            </v-col>
            <v-col style="text-align: left; font-size: 16px">
              <div>{{ userinfo.username || 'User Name' }}</div>
              <PrivilegesTag :data="userinfo.privilege || []"></PrivilegesTag>
            </v-col>
          </v-row>
        </v-toolbar-title>
      </template>

      <v-spacer></v-spacer>

      <v-menu left bottom transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              dark
              icon
              v-bind="attrs"
              v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item :dense="true" v-if="!isLogin">
            <v-list-item-title>登录</v-list-item-title>
          </v-list-item>
          <v-list-item :dense="true" v-else>
            <v-list-item-title @click="onSignout">注销</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item :dense="true">
            <v-list-item-title>检查更新</v-list-item-title>
          </v-list-item>
          <v-list-item :dense="true">
            <router-link :to="{name: 'setting'}">
              <v-list-item-title>设置</v-list-item-title>
            </router-link>
          </v-list-item>
          <v-list-item :dense="true">
            <v-list-item-title>关于</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item :dense="true">
            <v-list-item-title @click="appQuit">退出</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>
  </div>
</template>

<script>
import BFBAN_DESKTOP from "../../assets/js/bfban";
import PrivilegesTag from "../PrivilegesTag";

import {api, http, http_token, storage, account_storage} from '../../assets/js/index'

export default new BFBAN_DESKTOP({
  data() {
    return {
      // userinfo: {
      //   username: '',
      //   privilege: []
      // }
    }
  },
  components: {PrivilegesTag},
  created() {
    this.http = http_token.call(this);

    this.getMyUserInfo();
  },
  methods: {
    /**
     * 关闭程序
     */
    appQuit() {
      window.close()
    },
    /**
     * 取得用户详细信息
     */
    getMyUserInfo() {
      if (!this.isLogin) return;

      this.http.get(api["user_me"], {}).then(res => {
        const d = res.data;

        if (d.success == 1) {
          this.$store.dispatch('setUserInfo', d.data);
        }
      })
    },
    /**
     * 表头账户注销
     */
    onSignout() {
      http.post(api["account_signout"], {
        headers: {
          'x-access-token': this.$store.state.user.token
        }
      }).then(res => {
        const d = res.data;

        if (d.success === 1) {
          this.$Message.success(d.message);
          return;
        }

        this.$Message.error(d.code);
      }).catch(e => {
        this.$Message.error(e.toString());
      }).finally(() => {
        // 清除与账户相关的数据
        account_storage.clearAll();

        this.$store.dispatch('signout').then(() => {
          this.$router.push('/');
        });
      });
    },
  },
  computed: {
    userinfo () {
      return Object.assign(this.currentUser ,this.$store.state.$userinfo);
    }
  }
})
</script>

<style>
@import '../../assets/css/header.css';

.drag {
  -webkit-app-region: drag;
}
</style>