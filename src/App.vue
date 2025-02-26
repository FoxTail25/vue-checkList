<script setup>
import Job from './components/Job.vue';
import Add_job from './components/Add_job.vue';
import localStorWork from './assets/utils/localStorWork';
import { v4 as uuidv4 } from 'uuid';
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
      if (job.length >= 1) {
        const id = uuidv4();
        this.job_list.push({
          id: id,
          job: job,
        })
      }
      localStorWork.save(this.job_list)
    },
    change_job: function (id, job, completed = false) {
      this.job_list = this.job_list.map(el => {
        if (el.id === id) {
          el.job = job;
          el.completed = completed;
        }
        return el
      })
      localStorWork.save(this.job_list)
    },
    remove_job: function (id) {
      this.job_list = this.job_list.filter(el => el.id != id);
      localStorWork.save(this.job_list)
    },
    move_job: function (id, direction = 'up') {
      // console.log('id', id,'direct', direction)
      const ind = this.job_list.findIndex(el => el.id == id)
      if (direction === 'up') {
        if (ind > 0) {
          const temp = this.job_list[ind]
          this.job_list[ind] = { ...this.job_list[ind - 1] }
          this.job_list[ind - 1] = { ...temp };
          localStorWork.save(this.job_list)
        } else {
          console.log('выше некуда')
        }
      } else if (direction === 'down') {
        if (ind < this.job_list.length - 1) {
          const temp = this.job_list[ind]
          this.job_list[ind] = { ...this.job_list[ind + 1] }
          this.job_list[ind + 1] = { ...temp };
          localStorWork.save(this.job_list)
        } else {
          console.log('ниже некуда')
        }
      } else {
        console.log('направление не указанно')
      }
    },

  },
  beforeMount() {
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

  <main>

    <transition-group name="list-complete" tag="div">

      <Job v-for="job_item in job_list" :id="job_item.id" :job="job_item.job" :completed="job_item.completed"
        :key="job_item.id" @change_job="change_job" @remove_job="remove_job" @move_job="move_job"
        class="list-complete-item" />

        
        
        <Add_job @add_job="add_job" class="list-complete-item"/>
      </transition-group>

  </main>

  <footer>
    <h2>
      
      Developed by: <a href="https://github.com/FoxTail25" target="_blank">FoxTail25 </a>
    </h2>
  </footer>

</template>

<style scoped>


.list-complete-item {
  transition: all 0.3s ease;
  display: grid;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.list-complete-leave-active {
  /* position: absolute; */
}

main {
  padding: 20px;
  padding-top: 40px;
  overflow: hidden;
  @media (max-width: 400px) {
    padding: 5px;
    padding-top: 40px;
  }
}

header, footer {
  background: rgba(255, 255, 255, 0.192);
  /* backdrop-filter: blur(2px); */
  width: 100% ;
  max-width: 1280px;
  border-radius: 7px;
  border: 1px solid rgba(43, 43, 43, 0.568);
  position: fixed;
  left: 0;
  text-align: center;
  margin: 0 auto;

  padding: 0px;

}

header {
  top: 1px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

footer {
  bottom: 1px;
  h3 {
    color: red;
  }
  
}
</style>
