

function getSum(array) {
    let result = 0;
    array.forEach(element => result += element)
    return result
}


function getAverageSalary(jobs) {
    let salaryArr = [];
    jobs.forEach(job => {
        let index = salaryArr.findIndex(element => element.area === job.area) === -1
            ? salaryArr.push({area: job.area, salaries: [job.salary]})
            : salaryArr[index].salaries.push(job.salary)
    });
    
    return salaryArr.map(element => { 
        return { area: element.area, averageSalary: getSum(element.salaries)/element.salaries.length }
    })
}

function companiesInNeed(){

}
