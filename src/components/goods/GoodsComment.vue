<template>
    <cmtbox :newsid="id"></cmtbox>
</template>

<script>
import cmtbox from '../sub-components/Comment.vue'
export default {
    methods: {
        
    },
    components:{
        cmtbox
    },
    props:['id']
}
</script>

<style scoped>

</style>