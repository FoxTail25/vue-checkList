

<script>

export default {
	props: {
		id: Number,
		job: String,
		completed: Boolean,
	},
	emits: ['change_job', 'remove_job'],
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
		}
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
			<button @click="change_isEdit" class="change">Изменить задачу</button>
		</template>
		<template v-else class="job_text">
			<textarea v-model="newJob" class="job_text" :class="fin" ref="ta" @input="ta_auto_height"></textarea>
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
		grid-template-columns: 80px auto auto;
	}
	.job_finish {
		text-align: center;
		@media (max-width:600px) {
				/* grid-template-columns: 80px auto auto; */
				grid-row: 2/3;
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
			grid-column: 1/4;
		}
	}

	.change,
	.save {
		grid-row: 2/ 3;
		grid-column: 2/ 3;
		width: fit-content;
		text-align: center;
		margin: 0 auto;
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
				grid-column: 3/4;
				width: fit-content;
				justify-self: flex-end;
			}
	}

}


/* .job_container {
	width: 100%;
	display: grid;
	grid-template-columns: 90px auto 90px;
	gap: 5px;
	margin-bottom: 5px;
	border-radius: 7px;
	padding: 5px;


	.job_finish {
		min-width: 95px;
		grid-column: 0/1;
		display: grid;
		justify-content: center;
	}

	.job_text {
		display: block;
		text-align: center;
	}

	.job_text textarea,
	.job_text p {
		width: 100%;
		border: 1px solid gray;
		padding: 5px;
		border-radius: 7px;
		margin-bottom: 5px;
		background-color: white;

		font-size: 1.2em;
		line-height: 1.5em;
		font-weight: normal;

		text-align: left;
	}

	textarea {
		display: block;
		resize: none;
		outline: none;
	}

	.job_complite {
		text-decoration: line-through;
	}

	label {
		align-self: flex-start;
	}

	label.job_complite {
		text-decoration: none;
		color: green;
	}

	.save {
		background-color: rgb(197, 252, 202);
	}

	.change {
		background-color: rgb(255, 255, 218);
	}

	.delete {
		background-color: rgb(255, 232, 232);
	}

} */

/* @media (max-width: 600px) {
	
} */
</style>