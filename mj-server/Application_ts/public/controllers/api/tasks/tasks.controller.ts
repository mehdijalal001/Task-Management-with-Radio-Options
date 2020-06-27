import { ITasks } from '../../../interfaces/iTasks';
import { TasksService } from '../../../services/taskService';

class TasksController implements ITasks {
    private service: ITasks;
    constructor(router) {
        this.service = new TasksService();
      

        router.get('/', this.getAllTasks.bind(this));
        router.get('/mytasksduetoday', this.getMyTasksDueToday.bind(this));
        router.get('/category/:categoryId/:DueDate', this.getTaskByCategoryIdAndDueDate.bind(this));
        router.get('/current', this.getCurrentTasks.bind(this));
        router.get('/complete', this.getCompletedTasks.bind(this));
        router.get('/view/:id', this.viewTasks.bind(this));
        router.get('/:id', this.getTaskById.bind(this));
        router.post('/insert', this.insertTasks.bind(this));
        router.post('/update/:id', this.updateTasks.bind(this));
        router.post('/updatestatus/:id', this.updateStatus.bind(this));
        router.post('/deleteall', this.deleteAll.bind(this));
        router.delete('/:id', this.deleteTasks.bind(this));
       
    }
    
    getMyTasksDueToday(req: any, res: any, next: any): Promise<any> {
        return this.service
        .getMyTasksDueToday(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getAllTasks(req: any, res: any, next: any): Promise<any> {
        return this.service
        .getAllTasks(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getCurrentTasks(req: any, res: any, next: any): Promise<any> {
        return this.service
        .getCurrentTasks(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getCompletedTasks(req: any, res: any, next: any): Promise<any> {
        return this.service
        .getCompletedTasks(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getTaskByCategoryIdAndDueDate(req: any, res: any, next: any): Promise<any> {
        console.log('---geting by category id and due date----');
        return this.service
        .getTaskByCategoryIdAndDueDate(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    getTaskById(req: any, res: any, next: any): Promise<any> {
        console.log('--------get task by id-------');
        return this.service
        .getTaskById(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    viewTasks(req: any, res: any, next: any): Promise<any> {
        return this.service
        .viewTasks(req, res, next)
        .then(results =>{
            res.json(results)
            })
            .catch(err => {
                next(err);
            });
    }
    
    insertTasks(req: any, res: any, next: any): Promise<any> {
        return this.service
        .insertTasks(req, res, next)
        .then(results => res.json(results))
        .catch(err => {
            next(err);
        });
    }
    updateTasks(req: any, res: any, next: any):  Promise<any> {
        return this.service
        .updateTasks(req, res, next)
        .then(results => res.json(results))
        .catch(err => {
            next(err);
        });
    }
    updateStatus(req: any, res: any, next: any):  Promise<any> {
        return this.service
        .updateStatus(req, res, next)
        .then(results => res.json(results))
        .catch(err => {
            next(err);
        });
    }


    deleteTasks(req: any, res: any, next: any): Promise<any> {
        return this.service
        .deleteTasks(req, res, next)
        .then(results => res.json(results))
        .catch(err => {
            next(err);
        });
    }
    deleteAll(req: any, res: any, next: any): Promise<any> {
        return this.service
        .deleteAll(req, res, next)
        .then(results => res.json(results))
        .catch(err => {
            next(err);
        });
    }
}

module.exports = TasksController;
