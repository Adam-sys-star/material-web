<template>
	<div class="components-container" id="cashier">
<!-- <Header></Header> -->
		<Cashier></Cashier>
	</div>
</template>

<script>
	import Cashier from "@/views/goodsSale/Cashier.vue"
	
	export default {
		components: {
			Cashier
		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped>
#cashier {
	  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  text-align: center;
	  color: #2c3e50;
	  margin-top: 60px;
	}
</style>
