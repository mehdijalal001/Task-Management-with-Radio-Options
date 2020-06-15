import { IOfficeTasks } from '../../../interfaces/iOfficeTasks';
import { OfficeTaskService } from '../../../services/officeTasksService';

class OfficeTasksController implements IOfficeTasks {
    private service: IOfficeTasks;
    constructor(router) {
        this.service = new OfficeTaskService();
        router.get('/', this.getAllTasks.bind(this));
        router.get('/current', this.getCurrentTasks.bind(this));
        router.get('/complete', this.getCompletedTasks.bind(this));
        router.get('/:id', this.viewTasks.bind(this));
        router.post('/insert', this.insertTasks.bind(this));
        router.post('/update/:id', this.updateTasks.bind(this));
        router.delete('/:id', this.deleteTasks.bind(this));
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


    deleteTasks(req: any, res: any, next: any): Promise<any> {
        return this.service
        .deleteTasks(req, res, next)
        .then(results => res.json(results))
        .catch(err => {
            next(err);
        });
    }
}

module.exports = OfficeTasksController;
