<script setup>
import Arrow_up from './icon/arrow_up.vue';
import Arrow_down from './icon/arrow_down.vue';


</script>

<script>

export default {
	props: {
		id: Number,
		job: String,
		completed: Boolean,
	},
	emits: ['change_job', 'remove_job', 'move_job'],
	data() {
		return {
			isEdit: false,
			newJob: this.job,
		}
	},
	methods: {
		change_completed: function () {
			this.$emit('change_job', this.id, this.job, !this.completed)
		},
		change_isEdit: function () {
			this.isEdit = !this.isEdit;
			// this.ta_auto_height();

		},
		save_change_in_job: function () {
			this.$emit('change_job', this.id, this.newJob, this.completed);
			this.change_isEdit();
		},
		remove_job: function () {
			this.$emit('remove_job', this.id)
		},
		ta_auto_height: function () {
			const ta = this.$refs.ta
			ta.style.height = '1em';
			ta.style.height = ta.scrollHeight + 2 + 'px';
		},
		move_up:function(){
			this.$emit('move_job', this.id, 'up')
		},
		move_down:function(){
			this.$emit('move_job', this.id, 'down')
		},
	},
	computed: {
		fin: function () {
			return {
				job_complite: this.completed,
			}
		},
	},
	updated() {
		if (this.isEdit) {
			this.$refs.ta.focus();
			this.ta_auto_height();
		}
	}

}
</script>

<template>
	<div class="job_container">
		<label class="job_finish">
			выполнено
			<input type="checkbox" :checked="fin.job_complite" @click="change_completed">
		</label>
		<template v-if="!isEdit" class="job_text">
			<p class="job_text" :class="fin">
				{{ job }}
			</p>
			<div class="btn_move_block">
				<button @click="move_up" aria-label="up_job" class="move_btn">
					<Arrow_up />
				</button>
				<button @click="move_down" aria-label="down_job" class="move_btn">
					<Arrow_down />
				</button>
			</div>
			<button @click="change_isEdit" class="change">Изменить задачу</button>
		</template>
		<template v-else class="job_text">
			<textarea v-model="newJob" class="job_text" :class="fin" ref="ta" @input="ta_auto_height"></textarea>
			<div class="btn_move_block">
				<button @click="move_up" aria-label="up_job" class="move_btn">
					<Arrow_up />
				</button>
				<button @click="move_down" aria-label="down_job" class="move_btn">
					<Arrow_down />
				</button>
			</div>
			<button @click="save_change_in_job" class="save">Сохранить изменения</button>
		</template>
		<button class="job_remove delete" @click="remove_job">Удалить задачу</button>
	</div>
</template>


<style scoped>
.job_container {
	width: 100%;
	display: grid;
	grid-template-columns: 80px auto 80px;
	grid-template-rows: auto auto;
	gap: 5px;
	background-color: rgb(236, 236, 236);
	margin-bottom: 5px;
	padding: 5px;
	border-radius: 7px;
	
	@media (max-width:600px) {
		grid-template-columns: 80px auto auto auto;
	}
	.job_finish {
		text-align: center;
		grid-column: 1/2;
		@media (max-width:600px) {
				/* grid-template-columns: 80px auto auto; */
				grid-row: 2/4;
			}
	}

	.job_text {
		display: block;
		background-color: white;
		border: 1px solid gray;
		padding: 5px;
		border-radius: 7px;
		font-size: 1.2em;
		line-height: 1.5em;
		font-weight: normal;
		resize: none;

		@media (max-width:600px) {
			grid-column: 1/5;
		}
	}
	.btn_move_block {
		grid-row: 2/ 3;
		grid-column: 2/ 3;

		@media (max-width:600px) {
				grid-column: 2/3;
			}
	}

	.change,
	.save {
		grid-row: 2/ 3;
		grid-column: 2/ 3;
		width: fit-content;
		text-align: center;
		margin: 0 auto;
		@media (max-width:600px) {
				grid-column: 3/4;
			}
	}
	.move_btn {
		min-height: 24px;
		min-width: 24px;
	}

	.job_complite {
		text-decoration: line-through;
	}

	.save {
		background-color: rgb(197, 252, 202);
	}

	.change {
		background-color: rgb(255, 255, 218);
	}

	.delete {
		background-color: rgb(255, 232, 232);
		@media (max-width:600px) {
				grid-column: 4/5;
				width: fit-content;
				justify-self: flex-end;
			}
	}

}

</style>