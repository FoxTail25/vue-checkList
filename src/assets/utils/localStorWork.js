class localStor {
	constructor(name){
		this.name = name
	}
	check() {
		const result = localStorage.getItem(this.name)
		return typeof(result) === null ? result : JSON.parse(result)
	}
	save(jobList) {
		jobList = JSON.stringify(jobList)
		localStorage.setItem('job_list_local_data', jobList)
	}
}

const localStorWork = new localStor('job_list_local_data')
export default localStorWork