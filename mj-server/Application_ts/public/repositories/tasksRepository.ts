import {TYPES} from 'mssql';

import { LogErrors } from '../common/logErrors.controller';
import { ITasks } from '../interfaces/iTasks';
import { TasksModel } from '../models/tasksModel';
import { DataFormatter } from '../providers/dataFormatter/dbFormatData';
import { SQLDBProvider } from '../providers/dbProvider/sqlDBProvider';

// The repository class implements the calls to the database.
// The repository class's responsabilities are the following:

//  -   make use of the SQLDBProvider class to call into the database.
//  -   execute calls to the database via methods that uses stored procedures or
//  -   via methods that uses inline queries.

//  The repository class methods catch the database errors and logged the errors into the database (table dbo.Errors)

export class TasksRepo implements ITasks {
  constructor() {}

  public async getMyGroupedTasksByDueDate(req:any,res:any,next:any): Promise<any> {

    console.log('---geting due today------');
    let DueDate = req.params.duedate;
    console.log(req.params);
    console.log(DueDate);
    DueDate = new Date(DueDate);
    console.log(DueDate);
    let modelToArray: TasksModel[] = [];
    let provider = new SQLDBProvider();
    let UserID = 1007;
    let inputParameters = [
      { name: 'UserId', dataType: TYPES.Int, value: UserID },
      { name: 'EndDate', dataType: TYPES.DateTime, value: DueDate }
    ];
    let CustomQuery = `SELECT ts.CategoryID, ts.Status, COUNT(ts.CategoryID) AS totaltasks, ct.Name AS CategoryName
    FROM MJ.Tasks AS ts
    LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
    WHERE ts.Status !=1 OR ts.Status IS NULL AND ts.UserID = @UserID AND CAST(ts.EndDate AS DATE) = CAST(@EndDate AS DATE)
    GROUP BY ts.CategoryID, ct.Name, ts.Status
    ORDER BY ct.Name ASC`;
    await provider
      .executeQuery(CustomQuery,inputParameters)
      .then(results => {
        if (results) {
            modelToArray = TasksModel.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return modelToArray;
  }
  public async getMyGroupedTasksBetweenDates(req:any,res:any,next:any): Promise<any> {

    console.log('---geting due today------');
    let StartDate = req.params.startdate;
    let EndDate = req.params.enddate;
    //console.log(req.params);
    //console.log(StartDate);
    StartDate = new Date(StartDate);
    EndDate = new Date(EndDate);
    //console.log(StartDate);
    //console.log(EndDate);
    let modelToArray: TasksModel[] = [];
    let provider = new SQLDBProvider();
    let UserID = 1007;
    let inputParameters = [
      { name: 'UserId', dataType: TYPES.Int, value: UserID },
      { name: 'StartingDate', dataType: TYPES.DateTime, value: StartDate },
      { name: 'EndingDate', dataType: TYPES.DateTime, value: EndDate }
    ];
    let CustomQuery = `SELECT ts.CategoryID, ts.Status, COUNT(ts.CategoryID) AS totaltasks, ct.Name AS CategoryName
    FROM MJ.Tasks AS ts
    LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
    WHERE ts.Status !=1 OR ts.Status IS NULL AND ts.UserID = @UserID AND CAST(ts.EndDate AS DATE) BETWEEN CAST(@StartingDate AS DATE) AND CAST(@EndingDate AS DATE)
    GROUP BY ts.CategoryID, ct.Name, ts.Status
    ORDER BY ct.Name ASC`;
    await provider
      .executeQuery(CustomQuery,inputParameters)
      .then(results => {
        if (results) {
            modelToArray = TasksModel.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return modelToArray;
  }

  public async getTaskByCategoryIdAndDueDate(req:any,res:any,next:any): Promise<any> {
    let provider = new SQLDBProvider();
    let modelToArray: TasksModel[] = [];
    let categoryID = req.params.categoryId;
    let DueDate = req.params.DueDate;

    let newDuedate = DataFormatter.dateFormate(DueDate);
    //console.log('----here------');
    //console.log(categoryID);
    let UserID = 1007;
    let inputParameters =[];
    let CustomQuery:any;
    if(categoryID=='all'){
       inputParameters = [
        //{ name: 'CategoryID', dataType: TYPES.Int, value: categoryID },
        { name: 'EndDate', dataType: TYPES.DateTime, value: newDuedate },
        { name: 'UserId', dataType: TYPES.Int, value: UserID }
      ];
       CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
      FROM MJ.Tasks  AS ts 
      LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
      WHERE ts.Status!=1 OR ts.Status IS NULL AND ts.UserID = @UserID AND  CAST(ts.EndDate AS DATE) = CAST(@EndDate AS DATE)`;
      
    }else{
       inputParameters = [
        { name: 'CategoryID', dataType: TYPES.Int, value: categoryID },
        { name: 'EndDate', dataType: TYPES.DateTime, value: newDuedate },
        { name: 'UserId', dataType: TYPES.Int, value: UserID }
      ];
       CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
      FROM MJ.Tasks  AS ts 
      LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
      WHERE ts.Status!=1 OR ts.Status IS NULL AND ts.CategoryID = @CategoryID AND ts.UserID = @UserID AND  CAST(ts.EndDate AS DATE) = CAST(@EndDate AS DATE)`;
      
    }

    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        //console.log(results);
        if (results) {
            modelToArray = TasksModel.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return modelToArray;
  }
  public async getTaskByCategoryIdStartEndDate(req:any,res:any,next:any): Promise<any> {
    let provider = new SQLDBProvider();
    let modelToArray: TasksModel[] = [];
    let categoryID = req.params.categoryId;
    let StartDate = req.params.startdate;
    let EndDate = req.params.enddate;

    StartDate = new Date(StartDate);
    EndDate = new Date(EndDate);
    console.log('----here with start date end date repos------');
    console.log(categoryID);
    console.log(StartDate);
    console.log(EndDate);
    let UserID = 1007;
    let inputParameters =[];
    let CustomQuery:any;
    if(categoryID=='all'){
      console.log('----all is called in start end date-----');
       inputParameters = [
        //{ name: 'CategoryID', dataType: TYPES.Int, value: categoryID },
        { name: 'StartDate', dataType: TYPES.DateTime, value: StartDate },
        { name: 'EndDate', dataType: TYPES.DateTime, value: EndDate },
        { name: 'UserId', dataType: TYPES.Int, value: UserID }
      ];
       CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
      FROM MJ.Tasks  AS ts 
      LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
      WHERE ts.Status!=1 OR ts.Status IS NULL AND ts.UserID = @UserID AND  CAST(ts.EndDate AS DATE) BETWEEN CAST(@StartDate AS DATE) AND CAST(@EndDate AS DATE)`;
      
    }else{
       inputParameters = [
        { name: 'CategoryID', dataType: TYPES.Int, value: categoryID },
        { name: 'StartDate', dataType: TYPES.DateTime, value: StartDate },
        { name: 'EndDate', dataType: TYPES.DateTime, value: EndDate },
        { name: 'UserId', dataType: TYPES.Int, value: UserID }
      ];
       CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
      FROM MJ.Tasks  AS ts 
      LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
      WHERE ts.Status!=1 OR ts.Status IS NULL AND ts.CategoryID = @CategoryID AND ts.UserID = @UserID AND  CAST(ts.EndDate AS DATE) BETWEEN CAST(@StartDate AS DATE) AND CAST(@EndDate AS DATE)`;
      
    }

    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        //console.log(results);
        if (results) {
            modelToArray = TasksModel.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return modelToArray;
  }

  public async getAllTasks(req:any,res:any,next:any): Promise<any> {

    let modelToArray: TasksModel[] = [];
    let provider = new SQLDBProvider();
    let UserID = 1007;
    let inputParameters = [
      { name: 'UserId', dataType: TYPES.Int, value: UserID }
    ];
    let CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
    FROM MJ.Tasks AS ts
    LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
    WHERE ts.UserID = @UserID
    ORDER BY ts.TaskID DESC`;
    await provider
      .executeQuery(CustomQuery,inputParameters)
      .then(results => {
        if (results) {
            modelToArray = TasksModel.MapDBToArray(results);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return modelToArray;
  }

  public async getCurrentTasks(req:any,res:any,next:any): Promise<any> {}
  public async getCompletedTasks(req:any,res:any,next:any): Promise<any> {}


  public async getTaskById(req:any,res:any,next:any): Promise<any> {
    let provider = new SQLDBProvider();
    let modelData: TasksModel = new TasksModel();
    let id = req.params.id;
    let UserID = 1007;
    let inputParameters = [
      { name: 'id', dataType: TYPES.Int, value: id },
      { name: 'UserId', dataType: TYPES.Int, value: UserID }
    ];
    let CustomQuery = `SELECT ts.*, ct.Name AS CategoryName
    FROM MJ.Tasks  AS ts 
    LEFT JOIN MJ.Lookup_Category AS ct ON ts.CategoryID = ct.ID
    WHERE ts.TaskID = @id AND ts.UserID = @UserID`;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        if (results) {
            modelData = TasksModel.MapDBToObject(results.recordset[0]);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return [modelData];
  }

  public async viewTasks(req:any,res:any,next:any): Promise<any> {
    let provider = new SQLDBProvider();
    let modelData: TasksModel = new TasksModel();
    let id = req.params.id;

    let inputParameters = [{ name: 'id', dataType: TYPES.Int, value: id }];
    let CustomQuery = `SELECT nf.*, st.Name
    FROM IAP.AA_Announcement  AS nf 
    LEFT JOIN IAP.AA_Lookup_Status AS st ON nf.StatusID = st.ID
    WHERE nf.AnnouncementID = @id;`;
    await provider
      .executeQuery(CustomQuery, inputParameters)
      .then(results => {
        if (results) {
            modelData = TasksModel.MapDBToObject(results.recordset[0]);
        }
      })
      .catch(err => {
        return LogErrors.logErrors(err);
      });

    return [modelData];
  }

  public async insertTasks(req:any,res:any){
    console.log('-----inserting--------');
    //let returnValue: boolean = true;
    let body = req.body;
    console.log(body);
    //let CreatedBy = req.authInfo.name;
    //let ModifiedBy = req.authInfo.name;
    let UserID = 1007;
    let CreatedBy = 'Mehdi Jalal';
    let ModifiedBy = 'Mehdi Jalal';
    let CreatedDate = new Date();
    let ModifiedDate = new Date();
    let StartDate = new Date(DataFormatter.formatDate(body.StartDate));
    let EndDate = new Date(DataFormatter.formatDate(body.EndDate));

    let provider = new SQLDBProvider();

    let inputParameters = [
      { name: 'TaskName', dataType: TYPES.VarChar, value: body.TaskName },
      { name: 'CategoryID', dataType: TYPES.VarChar, value: body.CategoryID },
      { name: 'StartDate', dataType: TYPES.DateTime, value: StartDate },
      { name: 'EndDate', dataType: TYPES.DateTime, value: EndDate },
      { name: 'Description', dataType: TYPES.VarChar, value: body.Description },
      { name: 'CreatedDate', dataType: TYPES.DateTime, value: CreatedDate },
      { name: 'ModifiedDate', dataType: TYPES.DateTime, value: ModifiedDate },
      { name: 'CreatedBy', dataType: TYPES.VarChar, value: CreatedBy },
      { name: 'ModifiedBy', dataType: TYPES.VarChar, value: ModifiedBy },
      { name: 'UserID', dataType: TYPES.VarChar, value: UserID }

    ];
    let CustomQuery = `INSERT INTO MJ.Tasks
    (TaskName, CategoryID, StartDate, EndDate, Description, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, UserID)
     VALUES 
    (@TaskName, @CategoryID, @StartDate, @EndDate, @Description, @CreatedDate, @ModifiedDate, @CreatedBy, @ModifiedBy, @UserID); SELECT @@IDENTITY AS id`;

    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
       LogErrors.logErrors(err);
    });
    if(result.recordset[0].id)
    {
      return result.recordset[0].id;
    }else{
        throw new console.error('error inserting newsfeed');
    }

  }

  public async updateTasks(req:any,res:any){
    //let returnValue: boolean = true;
    let body = req.body;
    console.log('-------updating tasks-----');
    console.log(body);
    let UserID = 1007;
    let ModifiedBy = 'Mehdi Jalal';
    //let ModifiedBy = req.authInfo.name;
    let ModifiedDate = new Date();
    let StartDate = new Date(DataFormatter.formatDate(body.StartDate));
    let EndDate = new Date(DataFormatter.formatDate(body.EndDate));

    let provider = new SQLDBProvider();

    let inputParameters = [
      { name: 'TaskID', dataType: TYPES.Int, value: body.TaskID },
      { name: 'TaskName', dataType: TYPES.VarChar, value: body.TaskName },
      { name: 'CategoryID', dataType: TYPES.VarChar, value: body.CategoryID },
      { name: 'StartDate', dataType: TYPES.DateTime, value: StartDate },
      { name: 'EndDate', dataType: TYPES.DateTime, value: EndDate },
      { name: 'Description', dataType: TYPES.VarChar, value: body.Description },
      { name: 'Status', dataType: TYPES.VarChar, value: body.Status },
      { name: 'ModifiedDate', dataType: TYPES.DateTime, value: ModifiedDate },
      { name: 'ModifiedBy', dataType: TYPES.VarChar, value: ModifiedBy },
      { name: 'UserID', dataType: TYPES.VarChar, value: UserID }


  ];
    let CustomQuery = `UPDATE MJ.Tasks
    SET TaskName = @TaskName,
        CategoryID = @CategoryID,
        StartDate = @StartDate, 
        EndDate = @EndDate, 
        Description = @Description, 
        Status = @Status, 
        ModifiedDate = @ModifiedDate,
        ModifiedBy = @ModifiedBy,
        UserID = @UserID
     WHERE TaskID = @TaskID`;

    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    if(result.rowsAffected[0]>0){
       return result.rowsAffected[0];
    }else{
      throw new console.error('Un expected error, updating newsfeed');
    }
    
  }
  public async updateStatus(req:any,res:any){
    //let returnValue: boolean = true;
    let body = req.body;
    console.log(body);
    let UserID = 1007;
    let ModifiedBy = 'Mehdi Jalal';
    //let ModifiedBy = req.authInfo.name;
    let ModifiedDate = new Date();

    let provider = new SQLDBProvider();

    let inputParameters = [
      { name: 'TaskID', dataType: TYPES.VarChar, value: body.TaskID },
      { name: 'Status', dataType: TYPES.VarChar, value: body.Status },
      { name: 'ModifiedDate', dataType: TYPES.DateTime, value: ModifiedDate },
      { name: 'ModifiedBy', dataType: TYPES.VarChar, value: ModifiedBy },
      { name: 'UserID', dataType: TYPES.VarChar, value: UserID }

      

  ];
    let CustomQuery = `UPDATE MJ.Tasks
    SET Status = @Status, 
        ModifiedDate = @ModifiedDate,
        ModifiedBy = @ModifiedBy,
        UserID = @UserID
     WHERE TaskID = @TaskID AND UserID = @UserID`;

    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    if(result.rowsAffected[0]>0){
       return result.rowsAffected[0];
    }else{
      throw new console.error('Un expected error, updating newsfeed');
    }
    
  }


  public async deleteTasks(req:any,res:any,next:any): Promise<boolean> {
    let provider = new SQLDBProvider();
    let id = req.params.id;
    let UserID = 1007;
    let inputParameters = [
      { name: 'TaskID', dataType: TYPES.Int, value: id },
      { name: 'UserID', dataType: TYPES.VarChar, value: UserID }
    ];
    let CustomQuery = `DELETE FROM MJ.Tasks WHERE TaskID = @TaskID AND UserID = @UserID`;
    const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
      return LogErrors.logErrors(err);
    });
    console.log(result.rowsAffected);
    if(result.rowsAffected>0){
      return result.rowsAffected;
    }
  }

  public async deleteAll(req:any,res:any,next:any): Promise<any> {
    let provider = new SQLDBProvider();
    let body = req.body;
    let UserID = 1007;
    var rfinal:number[] = [];
    await Promise.all(body.map(async items=>{
      let inputParameters = [
        { name: 'TaskID', dataType: TYPES.Int, value: items.TaskID },
        { name: 'UserID', dataType: TYPES.VarChar, value: UserID }
      ];
      let CustomQuery = `DELETE FROM MJ.Tasks WHERE TaskID = @TaskID AND UserID = @UserID`;
      const result = await provider.executeQuery(CustomQuery, inputParameters).catch(err => {
        return LogErrors.logErrors(err);
      });
      console.log(result.rowsAffected);
      if(result.rowsAffected>0){
        //return result.rowsAffected;
        rfinal.push(result.rowsAffected[0]);
      }else{
        throw new console.error('Un expected error, updating newsfeed');
      }
    }));
    if(rfinal.includes(1)){
        return 1
    }else{
        console.log('------Error update---------');
        return 0;
    }
  }


}
