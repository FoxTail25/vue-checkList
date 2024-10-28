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
    move_job: function(id, direction = 'up'){
      // console.log('id', id,'direct', direction)
      const ind = this.job_list.findIndex(el => el.id == id)
      if(direction === 'up') {
        if(ind > 0) {
          const temp = this.job_list[ind]
          this.job_list[ind] = {...this.job_list[ind-1]}
          this.job_list[ind-1] = {...temp}
        } else {
          console.log('выше некуда')
        }
      } else if(direction === 'down') {
        if(ind < this.job_list.length-1) {
          const temp = this.job_list[ind]
          this.job_list[ind] = {...this.job_list[ind+1]}
          this.job_list[ind+1] = {...temp}
        } else {
          console.log('ниже некуда')
        }
      } else {
        console.log('направление не указанно')
      }
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

  <transition-group name="list" tag="p">

    <Job 
    v-for="job_item in job_list"
    :id="job_item.id"
    :job="job_item.job"
    :completed="job_item.completed"
    :key="job_item.id"
    @change_job="change_job"
    @remove_job="remove_job"
    @move_job="move_job"
    class="list-item"
    />

  </transition-group>
<Add_job
@add_job="add_job"
/>

</template>

<style scoped>
header {
  margin-top: 10px;
  text-align: center;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
