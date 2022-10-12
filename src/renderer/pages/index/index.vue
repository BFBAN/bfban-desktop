<template>
    <div>
        <v-list :two-line="true" :flat="true">
            <v-subheader>REPORTS</v-subheader>
            <v-list-item v-for="(item, index) in myReportPlayer" :key="index">
                {{item.username}}
            </v-list-item>
        </v-list>
        <!-- <v-tabs   
            fixed-tabs
            background-color="indigo"
            dark>
            <v-tab>Item One</v-tab>
            <v-tab>Item Two</v-tab>
            <v-tab>Item Three</v-tab>
        </v-tabs> -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            myReportPlayer: [{username: 'cabbagelol'}]
        }
    }
}
</script>

<style>
</style>