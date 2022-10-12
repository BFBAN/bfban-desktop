<template>
    <div>
        
    </div>
</template>

<script>
import Mousetrap  from "mousetrap";

export default {
    data () {
        return {

        }
    },
    created () {
        Mousetrap.bind(['command+k', 'ctrl+k'], function() {
            console.log('command k or control k');
            // return false to prevent default browser behavior
            // and stop event from bubbling
            return false;
        });
    },
    methods: {

    }
}
</script>