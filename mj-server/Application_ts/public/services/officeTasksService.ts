import { IOfficeTasks } from './../interfaces/iOfficeTasks';
import { OfficeTasksRepo } from '../repositories/officeTasksRepo';
import { Announcement } from '../models/announcement';
import { MockTasksRepo } from '../repositories/mockTasksRepo';
export class OfficeTaskService implements IOfficeTasks {
    private repo: IOfficeTasks;
    constructor() {
        let envName = process.env.ENV;

        if (envName !== 'test') {
            this.repo = new OfficeTasksRepo();
        } else {
            this.repo = new MockTasksRepo();
        }
    }
    //---get all--------//
    async getAllTasks(req: any, res: any, next: any): Promise<any> {
      let announcements: Announcement[] = [];
      await this.repo
      .getAllTasks(req, res, next)
      .then(results => (announcements = results))
      .catch(err => {
          next(err);
        });
        return announcements;
    }
    async getCurrentTasks(req: any, res: any, next: any): Promise<any> {
      let announcements: Announcement[] = [];
      await this.repo
      .getCurrentTasks(req, res, next)
      .then(results => (announcements = results))
      .catch(err => {
          next(err);
        });
        return announcements;
    }
    async getCompletedTasks(req: any, res: any, next: any): Promise<any> {
      let announcements: Announcement[] = [];
      await this.repo
      .getCompletedTasks(req, res, next)
      .then(results => (announcements = results))
      .catch(err => {
          next(err);
        });
        return announcements;
    }
    async viewTasks(req: any, res: any, next: any): Promise<any> {
      let announcements: Announcement[] = [];
      await this.repo
      .viewTasks(req, res, next)
      .then(results => (announcements = results))
      .catch(err => {
          next(err);
        });
        return announcements;
    }
    
    async insertTasks(req: any, res: any, next: any): Promise<any>  {
        let announcements;
        await this.repo
        .insertTasks(req,res,next)
        .then(result => {
            announcements = result;
        })
        .catch(err => {
            next(err);
        });
        return announcements;
    }
    
    async updateTasks(req: any, res: any, next: any): Promise<any>  {
        let announcements = new Announcement();
        await this.repo
        .updateTasks(req,res,next)
        .then(result => {
            announcements = result;
        })
        .catch(err => {
            next(err);
        });
        return announcements;
    }
    
    async deleteTasks(req: any, res: any, next: any): Promise<any> {
        let bIsSuccess = false;
        await this.repo
        .deleteTasks(req,res,next)
        .then(result => {
            bIsSuccess = true;
        })
        .catch(err => {
            next(err);
        });
        return bIsSuccess;
    }
}
