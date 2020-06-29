import { ITasks } from "../interfaces/iTasks";

export class MockTasksRepo implements ITasks {

    getMyTasksDueToday(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    getMyTasksDueTomorrow(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    getAllTasks(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    getCurrentTasks(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    getCompletedTasks(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    getTaskById(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    getTaskByCategoryIdAndDueDate(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    viewTasks(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    insertTasks(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    updateStatus(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    updateTasks(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    deleteTasks(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    deleteAll(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
