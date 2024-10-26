<script setup>
import Job from './components/Job.vue';
import Add_job from './components/Add_job.vue';
import localStorWork from './assets/utils/localStorWork';
</script>

<script>
export default {
  data() {
    return {
      job_list: [
        {
          id: 1,
          job: 'Задача_1', 
          completed: false
        },
        {
          id: 2,
          job: 'Задача_2',
          completed: false
        },
        {
          id: 3,
          job: 'Задача_3',
          completed: false
        },
      ],
    }
  },
  methods: {
    add_job: function (job) {
      if(job.length >= 1) {

        const id = this.job_list.length + 1;
        this.job_list.push({
          id: id,
          job: job,
        })
      }
      localStorWork.save(this.job_list)
    },
    change_job: function (id, job, completed = false ) {
      // console.log(id, job, completed)
      this.job_list = this.job_list.map(el => {
        if(el.id === id) {
          el.job = job;
          el.completed = completed;
        }
        return el
      })
      localStorWork.save(this.job_list)
    },
    remove_job: function(id) {
      this.job_list = this.job_list.filter(el => el.id != id);
      localStorWork.save(this.job_list)
    },
    
  },
  mounted() {
    //  сработывает сразу после отрисовки компонента.
    const localStorData = localStorWork.check()
    if (localStorData !== null) {
      this.job_list = localStorData
      console.log('данные обновлены из localStorage')
    }
  }

}
</script>


<template>
  
  <header>
    <h1>
      Список задач
    </h1>
  </header>

<Job 
v-for="job_item in job_list"
:id="job_item.id"
:job="job_item.job"
:completed="job_item.completed"
:key="job_item.id"
@change_job="change_job"
@remove_job="remove_job"
/>
<Add_job
@add_job="add_job"
/>

</template>

<style scoped>
header {
  margin-top: 10px;
  text-align: center;
}
</style>
