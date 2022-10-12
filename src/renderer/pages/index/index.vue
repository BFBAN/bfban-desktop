<template>
  <div>
    <HeaderIndex></HeaderIndex>

    <v-banner two-line v-if="!isLogin">
      <v-avatar
          slot="icon"
          color="deep-purple accent-4"
          size="40">
        <v-icon
            icon="mdi-lock"
            color="white">
          mdi-lock
        </v-icon>
      </v-avatar>

      BFBAN desktop依赖于bfban的线上服务，需要登录您的BFBAN账户，以取得服务支持

      <template v-slot:actions>
        <v-btn
            text
            color="deep-purple accent-4"
            :to="{name: 'signin'}">
          登录
        </v-btn>
      </template>
    </v-banner>

    <v-tabs :hide-slider="false">
      <v-tab>举报</v-tab>
      <v-tab>消息</v-tab>
      <v-tab>服务</v-tab>

      <v-spacer></v-spacer>
      <v-btn
          class="ma-3"
          elevation="0"
          fab
          dark
          x-small
          color="primary">
        <v-icon dark>search</v-icon>
      </v-btn>

      <v-tab-item class="report-list">
        <v-list :two-line="true" :flat="true">

          <v-expansion-panels :disabled="!isLogin" :flat="true" :hover="true" :tile="true" :accordion="true">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <span class="report-list-item-title">
                  <v-badge :content="reportPlayer.total || reportPlayer.data.length || 0">
                    我的举报
                  </v-badge>
                </span>
                <template v-slot:actions>
                  <v-btn color="primary"
                         elevation="0"
                         text
                         raised
                         x-small
                         :to="{name: 'report'}">report
                  </v-btn>
                  <v-btn color="primary"
                         elevation="0"
                         raised
                         x-small
                         :loading="reportPlayer.load"
                         @click="getReportPlayer(0)">刷新
                  </v-btn>
                </template>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-list-item-group color="primary">
                  <div v-for="(item, index) in reportPlayer.data" :key="index">
                    <v-list-item @click="openUrl" class="report-list-item-content">
                      <v-list-item-avatar>
                        <v-img :src="item.avatarLink"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.originName }}
                          <v-chip x-small color="primary">{{ $t('basic.status.' + item.status) }}</v-chip>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ item.updateTime }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn icon>
                          <v-icon color="grey lighten-1">mdi-information</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                  </div>
                  <v-btn
                      text
                      block
                      raised
                      x-small>
                    查看更多
                  </v-btn>
                </v-list-item-group>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <span class="report-list-item-title">追踪</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>

              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-list>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import HeaderIndex from "../../components/header/header_index.vue";

import {api, http, http_token} from '../../assets/js/index'
import BFBAN_DESKTOP from "../../assets/js/bfban";

export default new BFBAN_DESKTOP({
  components: {HeaderIndex},
  data() {
    return {
      reportPlayer: {
        data: [],
        total: 0,
        load: false
      },
      limit: 40
    }
  },
  created() {
    this.http = http_token.call(this);

    this.getReportPlayer(0);
  },
  mounted() {

  },
  methods: {
    /**
     * 取得我的举报过往列表
     * @param pageNum
     */
    getReportPlayer(pageNum) {
      if (!this.isLogin) return;

      this.reportPlayer.load = true;

      this.http.get(api["user_reports"], {
        params: {
          id: this.currentUser.userinfo.userId,
          skip: (pageNum || 1) - 1,
          limit: this.limit,
        }
      }).then(res => {
        const d = res.data;

        if (d.success == 1) {
          this.reportPlayer.data = d.data;
          this.reportPlayer.total = this.$store.state.$userinfo.reportnum || 0;
          return;
        }
      }).finally(() => {
        this.reportPlayer.load = false;
      })
    },
    openUrl() {
      // window.open('http://baidu.com')
    }
  }
})
</script>

<style>
.report-list {
  overflow-y: auto;
  height: calc(100vh - 145px);
}

.report-list .report-list-item-title {
  font-size: 13px;
  opacity: .7;
}

.report-list-item-content {
  text-align: left;
}

.report-list .v-expansion-panel-content__wrap {
  padding: 0 !important;
}

.v-speed-dial {
  position: absolute;
}

.v-btn--floating {
  position: relative;
}
</style>