import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { GlobalConstants } from 'src/app/global/global-constants';
import { CommonSetupService } from 'src/app/services/common-setup.service';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader.service';
import { ReconcilationService } from 'src/app/services/reconcilation.service';
import { WorkflowService } from 'src/app/services/workflow.service';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.sass']
})
export class WorkflowComponent implements OnInit {

  @ViewChild('roleTemplate', { static: true }) roleTemplate: TemplateRef<any>;
  
  frontEndUrl = GlobalConstants.frontEndUrl;
  
  register: FormGroup;
  register2: FormGroup;
  register3: FormGroup;
  hide = true;
  agree = false;

  workFlowData: any = [];
  activityData: any = [];
  actionData: any = [];
  companyData: any = [];
  masterData: any = [];
  levelData: any = [];
  myLevelData: any = [];
  screenData: any = [];
  BTN_VAL = 'Submit';
  submitted = false;
  APPLICATION_ID: string;
  SUB_APPLICATION_ID: string;
  CREATED_BY: string;
  tbl_columns = [
    { name: 'Workflow_Name' },
    { name: 'Workflow_Description' },
    { name: 'Company_Ref_Id' },
    { name: 'Entity_Ref_Id' },
    { name: 'Workflow_Type_Ref_Id' },
    { name: 'Level_Ref_Id' },
  ];
  tbl_data = [];
  tbl_FilteredData = [];
  ngOnInit(): void {
    this.APPLICATION_ID = localStorage.getItem('APPLICATION_ID');
    this.SUB_APPLICATION_ID = localStorage.getItem('SUB_APPLICATION_ID');
    this.CREATED_BY = localStorage.getItem('ID');
    this.startScript();
    $('#list_form').show();
    $('#list_title').show();
    $('#btn_new_entry').show();
    $('#btn_list').hide();
    $('#new_entry_form').hide();
    $('#new_entry_form_2').hide();
    $('#new_entry_form_3').hide();
    $('#new_entry_title').hide();
    this.register = this.fb.group({
      workflow_name: [''],
      workflow_description: [''],
      company_ref_id: [''],
      entity_ref_id: [''],
      workflow_type_ref_id: [''],
      level_ref_id: [''],
      termcondition: [false],
      sub_application_id: [this.SUB_APPLICATION_ID],
      application_id: [this.APPLICATION_ID],
      created_by: [this.CREATED_BY],
    });

    this.register2 = this.fb.group({
      screen_name: [''],
      field_name: [''],
      level_ref_id: [''],
      termcondition: [false],
      sub_application_id: [this.SUB_APPLICATION_ID],
      application_id: [this.APPLICATION_ID],
      created_by: [this.CREATED_BY],
      initialItemRow: this.fb.array([this.initialitemRow()])
    });
    this.register3 = this.fb.group({
      termcondition: [false],
      sub_application_id: [this.SUB_APPLICATION_ID],
      application_id: [this.APPLICATION_ID],
      created_by: [this.CREATED_BY],
      initialItemRow2: this.fb.array([this.initialitemRow2()])
    });
    this.register2.get('level_ref_id').valueChanges.subscribe(val => {
      if (val != null) {
        this.myLevelData = [];
        var level = [];
        console.log(val);
        this.workflowService.getAllLevelData(val).subscribe((data: []) => {
          level = data['initialItemRow'];
          this.myLevelData = level;
          console.log(this.myLevelData);
        })
      }
      // else if(val != 16)
      // {
      //   this.myLevelData = [];
      //   var level = [];
      //   var levelArray = [];
      //   for(let i=16;i<=val;i++)
      //   { 
      //     console.log(i);
      //     this.workflowService.getAllLevelData(i).subscribe((data: []) => {
      //       level.push(data['initialItemRow']);
      //     })
      //   }
      //   this.myLevelData = level;
      //   console.log(this.myLevelData);
      // }
      
    })
  }
  initialitemRow() {
    return this.fb.group({
      id: [''],
      level: ['', Validators.required],
      screen_name: ['', Validators.required,],
      field_name: ['', Validators.required],
      currency_id: ['', [Validators.required,Validators.pattern('[0-9]+')]],
      approval_amount: ['', [Validators.required,Validators.pattern('[0-9]+')]],
      is_approval_required: [''],
      sub_application_id: [this.SUB_APPLICATION_ID],
      application_id: [this.APPLICATION_ID],
    });
  }
  initialitemRow2() {
    return this.fb.group({
      id: [''],
      is_email_required :[''],
      is_whatsapp_required :[''],
      is_sms_required :[''],
      is_reminder_required :[''],
      is_worklist_required :[''],
      activity_ref_id: ['', Validators.required],
      sequence_number: ['', [Validators.required,Validators.pattern('[0-9]+')]],
      action_ref_id: ['', Validators.required],
      next_sequence_number: ['', [Validators.required,Validators.pattern('[0-9]+')]],
      sub_application_id: [this.SUB_APPLICATION_ID],
      application_id: [this.APPLICATION_ID],
    });
  }
  get formArr() {
    return this.register2.get('initialItemRow') as FormArray;
  }

  addNewRow() {
    this.formArr.push(this.initialitemRow());
  }

  deleteRow(index) {
    if (this.formArr.length == 1) {
      return false;
    } else {
      this.formArr.removeAt(index);
      return true;
    }
  }

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private fb: FormBuilder,private workflowService: WorkflowService,private commonSetupService: CommonSetupService,private reconcilationService: ReconcilationService,private dynamicScriptLoader: DynamicScriptLoaderService,private _snackBar: MatSnackBar) {
    this.workflowService.getWorkflowData().subscribe((data: []) => {
      this.workFlowData = data;
    });
    this.workflowService.getLevelData().subscribe((data: []) => {
      this.levelData = data;
    });
    this.workflowService.getCompanyData().subscribe((data: []) => {
      this.companyData = data;
    });
    this.workflowService.getMasterData().subscribe((data: []) => {
      this.masterData = data;
    });
    this.workflowService.getScreenData().subscribe((data: []) => {
      this.screenData = data;
    });
    this.workflowService.getActivityData().subscribe((data: []) => {
      this.activityData = data;
    });
    this.workflowService.getActionData().subscribe((data: []) => {
      this.actionData = data;
    });
    
    
  }
  
  onRegister() {
    console.log('Form Value', this.register.value);
    this.submitted = true;
  
      if (this.register.invalid) {
        return;
      } else {
        this.workflowService.saveActivityData(this.register.value).subscribe((data: any) => {
        console.log("In save function ");
        console.log(data);
          if (data.status === 1) {
            Swal.fire({
              icon: 'success',
              title: 'Your record has been added successfully!',
              showConfirmButton: false,
              timer: 2000
            });
            //this.workflowData.push(data);
          }
        
          if (data.status === 2) {
            Swal.fire({
              title: 'Your record has been updated successfully!',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          }
          if (data == 0) {
            Swal.fire({
              title: 'Record Already Exist!',
              icon: 'warning',
              timer: 2000,
              showConfirmButton: false
            });
          }
          let exact_frontEndUrl = this.frontEndUrl + "/#/workflow/workflow";
          setTimeout(function(){location.href= exact_frontEndUrl} , 2000);
          //setTimeout(function(){location.href='http://localhost:4200/#/workflow/workflow'} , 2000);
        },
          (error: any) => {
            // console.log("ERROR",error.error.split(" ")[0])
            console.log("ERRRRROR", error)
            console.log("sub_application_id:",this.register)
  
            //Error Meassage
            let message=""
            try
            {
              //Get the error message from exception thrown by the django
              message=error.error.substring(1,100) 
            }catch(err){
              console.log(err)
            }
            if(message.includes("workflow_name")){
            // if (error.error.currency_code) {
              Swal.fire({
                title: 'Location Name Already Exist!',
                icon: 'warning',
                showConfirmButton: false
              });
            }
            else{
              Swal.fire({
                title: "Server Error",
                icon: 'warning',
                showConfirmButton: false
              });
            }
          });
      }
  }

  onRegister2() {
    console.log('Form Value', this.register2.value);
    this.submitted = true;
  
      if (this.register2.invalid) {
        return;
      } else {
        this.workflowService.saveActivityData(this.register2.value).subscribe((data: any) => {
        console.log("In save function ");
        console.log(data);
          if (data.status === 1) {
            Swal.fire({
              icon: 'success',
              title: 'Your record has been added successfully!',
              showConfirmButton: false,
              timer: 2000
            });
            //this.workflowData.push(data);
          }
        
          if (data.status === 2) {
            Swal.fire({
              title: 'Your record has been updated successfully!',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          }
          if (data == 0) {
            Swal.fire({
              title: 'Record Already Exist!',
              icon: 'warning',
              timer: 2000,
              showConfirmButton: false
            });
          }
          let exact_frontEndUrl = this.frontEndUrl + "/#/workflow/workflow";
          setTimeout(function(){location.href= exact_frontEndUrl} , 2000);
          //setTimeout(function(){location.href='http://localhost:4200/#/workflow/workflow'} , 2000);
        },
          (error: any) => {
            // console.log("ERROR",error.error.split(" ")[0])
            console.log("ERRRRROR", error)
            console.log("sub_application_id:",this.register2)
  
            //Error Meassage
            let message=""
            try
            {
              //Get the error message from exception thrown by the django
              message=error.error.substring(1,100) 
            }catch(err){
              console.log(err)
            }
            if(message.includes("workflow_name")){
            // if (error.error.currency_code) {
              Swal.fire({
                title: 'Location Name Already Exist!',
                icon: 'warning',
                showConfirmButton: false
              });
            }
            else{
              Swal.fire({
                title: "Server Error",
                icon: 'warning',
                showConfirmButton: false
              });
            }
          });
      }
  }

  onRegister3() {
    console.log('Form Value', this.register3.value);
    this.submitted = true;
  
      if (this.register3.invalid) {
        return;
      } else {
        this.workflowService.saveActivityData(this.register3.value).subscribe((data: any) => {
        console.log("In save function ");
        console.log(data);
          if (data.status === 1) {
            Swal.fire({
              icon: 'success',
              title: 'Your record has been added successfully!',
              showConfirmButton: false,
              timer: 2000
            });
            //this.workflowData.push(data);
          }
        
          if (data.status === 2) {
            Swal.fire({
              title: 'Your record has been updated successfully!',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          }
          if (data == 0) {
            Swal.fire({
              title: 'Record Already Exist!',
              icon: 'warning',
              timer: 2000,
              showConfirmButton: false
            });
          }
          let exact_frontEndUrl = this.frontEndUrl + "/#/workflow/workflow";
          setTimeout(function(){location.href= exact_frontEndUrl} , 2000);
          //setTimeout(function(){location.href='http://localhost:4200/#/workflow/workflow'} , 2000);
        },
          (error: any) => {
            // console.log("ERROR",error.error.split(" ")[0])
            console.log("ERRRRROR", error)
            console.log("sub_application_id:",this.register3)
  
            //Error Meassage
            let message=""
            try
            {
              //Get the error message from exception thrown by the django
              message=error.error.substring(1,100) 
            }catch(err){
              console.log(err)
            }
            if(message.includes("workflow_name")){
            // if (error.error.currency_code) {
              Swal.fire({
                title: 'Location Name Already Exist!',
                icon: 'warning',
                showConfirmButton: false
              });
            }
            else{
              Swal.fire({
                title: "Server Error",
                icon: 'warning',
                showConfirmButton: false
              });
            }
          });
      }
  }

  tbl_FilterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = this.tbl_columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.tbl_FilteredData[0]);
    // assign filtered matches to the active datatable
    this.workFlowData = this.tbl_FilteredData.filter(function(item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (
          item[keys[i]]
            .toString()
            .toLowerCase()
            .indexOf(val) !== -1 ||
          !val
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  async startScript() {
    console.log("In startScript");
    // tslint:disable-next-line:max-line-length
    await this.dynamicScriptLoader.load('form.min', 'bootstrap-colorpicker', 'dataTables.buttons', 'buttons.flash', 'jszip', 'buttons.html5', 'buttons.print').then(data => {
      this.loadData();
    }).catch(error => console.log(error));
  }

  private loadData() {
    $(".select2").select2();
    $('#tableExport').DataTable({
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ]
    });

    $('#new_entry_form').hide();
    $('#new_entry_form_2').hide();
    $('#new_entry_form_3').hide();
    $('#new_entry_title').hide();
    $('#btn_list').hide();
  }
  showNewEntry() {
    $('#list_form').hide();
    $('#list_title').hide();
    $('#btn_new_entry').hide();
    $('#btn_list').show();
    $('#new_entry_form').show();
    $('#new_entry_form_2').show();
    $('#new_entry_form_3').show();
    $('#new_entry_title').show();
    this.BTN_VAL = 'Submit';
  }

  showList() {
    $('#list_form').show();
    $('#list_title').show();
    $('#btn_new_entry').show();
    $('#btn_list').hide();
    $('#new_entry_form').hide();
    $('#new_entry_form_2').hide();
    $('#new_entry_form_3').hide();
    $('#new_entry_title').hide();
    this.submitted = false;
  }

  editWorkflowData(location) {
    this.register.patchValue({
      workflow_name: location.workflow_name,
      workflow_description: location.workflow_description,
      company_ref_id: location.company_ref_id,
      entity_ref_id: location.entity_ref_id,
      workflow_type_ref_id: location.workflow_type_ref_id,
      level_ref_id: location.level_ref_id,
      id: location.id,
    });
  
    this.BTN_VAL = 'Update';
    const id = $('#id').val();
  
    if (id !== '') {
      $('#new_entry_form').show();
      $('#new_entry_form_2').show();
      $('#new_entry_form_3').show();
      $('#new_entry_title').show();
      $('#btn_list').hide();
      $('#btn_new_entry').hide();
      $('#list_form').hide();
      $('#list_title').hide();
    }
  }
  deleteWorkflowData(id){
    this.workflowService.deleteActivityData(id).subscribe((data:any)=>{
      if (data == 1) {
        Swal.fire({
          title: 'Your record has been deleted successfully!',
          icon: 'warning',
          showConfirmButton: false
        });
    }
    let exact_frontEndUrl = this.frontEndUrl + "/#/workflow/workflow";
    setTimeout(function(){location.href= exact_frontEndUrl} , 2000);
    //setTimeout(function(){location.href='http://localhost:4200/#/workflow/workflow'} , 2000);
    });
    
  }

}
