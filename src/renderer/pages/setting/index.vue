<template>
    <div>
        <v-breadcrumbs :items="items"></v-breadcrumbs>

        <router-link :to="{name: 'keypress'}">键盘设置 </router-link>
    </div>
</template>

<script>
export default {
    data () {
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