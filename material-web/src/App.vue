<template>
        <router-view v-if="isReload"></router-view>
</template>

<script>
    export default{
      name: 'APP',
	  provide(){
		  return{
			  reload:this.reload
		  }
	  },
	  data(){
		  return{
			  isReload:true
		  }
	  },
	  methods:{
		  reload(){
			  this.isReload = false;
			  this.$nextTick(function(){
				  this.isReload=true;
			  })
		  }
	  }
    }
</script>
