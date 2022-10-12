<template>
    <header>
        <v-app-bar :height="80">
            <v-toolbar-title>
                <img class="drag logo" src="@/assets/images/logo.png"  alt="logo" height="35"/>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-avatar icon size="30">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg"  alt="John">
            </v-avatar>

            <v-menu  left bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item :dense="true">
                        <v-list-item-title>登录</v-list-item-title>
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
    </header>
</template>

<script>
export default {
    data () {
        return {}
    },
    methods: {
        appQuit () {
            window.close()
        }
    }
}
</script>

<style>
@import '../../assets/css/header.css';

.drag {
    -webkit-app-region: drag;
}
</style>