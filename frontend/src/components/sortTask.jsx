export const sortTaskbyDate = (tasks,order='asc')=>{
    return tasks.sort((a,b)=>{
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        if(order == "asc"){
            return dateA-dateB;
        }else{
            return dateB-dateA;
        };
    });
};