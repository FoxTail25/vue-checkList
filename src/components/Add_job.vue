<script>
export default {
	emits: ['add_job'],
	data() {
		return {
			new_job: ''
		}
	},
	methods: {
		add_new_job: function () {
			this.$emit('add_job', this.new_job);
			this.new_job = '';
		},
		autoGrow_ta: function () {
			const el = this.$refs.ta
			el.style.height = '16px';
			el.style.height = el.scrollHeight + 6 + 'px';
		}
	},

}
</script>

<template>
	<div class="add_job">

		<textarea v-model="new_job" placeholder="Новая задача" @change="add_new_job" @input="autoGrow_ta"
			class="input_new_job" ref="ta" />
		<button @click="add_new_job" class="add_btn">добавить задачу в список дел
		</button>
	</div>
</template>

<style scoped>
.add_job {
	display: grid;
	grid-template-columns: 90px auto 100px;
	grid-template-rows: 1fr 1fr;
	gap: 10px;

	@media (max-width:600px) {
		grid-template-columns: 1fr;
		gap: 0;
	}
}

.input_new_job {
	grid-column: 2/3;
	margin-bottom: 5px;
	padding: 3px;
	border-radius: 5px;
	height: calc(2em + 6px);
	resize: none;
	overflow: auto;

	@media (max-width:600px) {
		grid-column: auto;
	}
}

.add_btn {
	grid-column: 2/3;

	@media (max-width:600px) {
		grid-column: auto;
		grid-row: 2/3;
	}
}

/* .input_new_job {} */
</style>