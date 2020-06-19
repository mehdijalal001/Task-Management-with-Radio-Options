export interface IOfficeTasks {
    getAllTasks(req:any, res:any,next:any): Promise<any>;
    getCompletedTasks(req?:any, res?:any,next?:any): Promise<any>;
    getCurrentTasks(req?:any, res?:any,next?:any): Promise<any>;
    getTaskById(req?:any, res?:any,next?:any): Promise<any>;
    viewTasks(req?:any, res?:any,next?:any): Promise<any>;
    insertTasks(req?:any, res?:any,next?:any): Promise<any>;
    updateTasks(req?:any, res?:any,next?:any): Promise<any>;
    deleteTasks(req?:any, res?:any,next?:any): Promise<any>;
  }
  