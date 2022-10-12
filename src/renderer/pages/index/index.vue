<template>
    <div>
        <v-tabs :hide-slider="false">
            <v-tab>举报</v-tab>
            <v-tab>消息</v-tab>
            <v-tab>服务</v-tab>

            <v-tab-item class="report-list">
                <v-list :two-line="true" :flat="true">

                    <v-expansion-panels :flat="true" :hover="true" :tile="true" :accordion="true">
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <span class="report-list-item-title">我的举报</span>
                                <v-bottom @click="getReportPlayer(0)">刷新</v-bottom>
                            </v-expansion-panel-header>

                            <v-expansion-panel-content>
                                <v-list-item-group color="primary">
                                    <div v-for="(item, index) in myReportPlayer" :key="index">
                                        <v-list-item  @click="openUrl" class="report-list-item-content">
                                            <v-list-item-avatar>
                                                <v-img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'"></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    {{item.originName}}
                                                    <v-chip color="primary">Primary</v-chip>
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    {{item.updateTime}}
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
import {api, http, http_token} from '../../assets/js/index'

import {
  Workflow,
  Item,
  makeDatasource,
  IDatasourceConstructed,
} from 'vscroll'

const Datasource = makeDatasource()

export default {
    comments: {Datasource},
    data () {
        return {
            myReportPlayer: [],
            limit: 20
        }
    },
    created () {
        this.http = http_token.call(this);

        this.getReportPlayer(0);
    },
    mounted() {
        this.workflow = new Workflow({
        consumer,
        datasource: this.datasource,
        })
    },
    methods: {
        unmounted() {
            this.workflow.dispose()
        },
        getReportPlayer (pageNum) {
            var uId = 544;

            this.http.get(api["user_reports"], {
                params: {
                    id: uId,
                    skip: (pageNum || 1) - 1,
                    limit: this.limit,
                }
            }).then(res => { 
                const d = res.data;

                if (d.success == 1) {
                    this.myReportPlayer = d.data;
                    return;
                }
            })
        },
        openUrl () {
            // window.open('http://baidu.com')
        }
    } 
}
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
</style>