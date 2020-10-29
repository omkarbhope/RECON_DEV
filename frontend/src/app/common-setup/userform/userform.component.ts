import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReconcilationService } from 'src/app/services/reconcilation.service';
import { CommonSetupService } from 'src/app/services/common-setup.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DynamicScriptLoaderService } from './../../services/dynamic-script-loader.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.sass']
})
export class UserformComponent implements OnInit {
  @ViewChild('roleTemplate', { static: true }) roleTemplate: TemplateRef<any>;
  
  register: FormGroup;
  hide = true;
  agree = false;

  // Form 3
  thirdForm: FormGroup;
  hide3 = true;
  agree3 = false;
  myGender: string;
  genders: string[] = ['Men', 'Women', 'Other'];
  companyData: any = [];
  countryData: any = [];
  userFormData: any = [];
  cityData: any = [];
  stateData: any = [];
  roleData: any = [];
  BTN_VAL = 'Submit';
  submitted = false;
  APPLICATION_ID: string;
  SUB_APPLICATION_ID: string;
  CREATED_BY: string;
  tbl_columns = [
    { name: 'First_Name' },
    { name: 'Middle_Name' },
    { name: 'Last_Name' },
    { name: 'Address1' },
    { name: 'Address2' },
    { name: 'Address3' },
    { name: 'Email' },
    { name: 'Company' },
    { name: 'Country' },
    { name: 'State' },
    { name: 'City' }
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
    $('#new_entry_title').hide();
    this.register = this.fb.group({
      first_name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last_name: [''],
      middle_name: [''],
      phone: ['', [Validators.required, Validators.pattern('[7-9][0-9]{9}')]],
      pincode: ['', [Validators.required, Validators.pattern('4[0-9]{5}')]],
      employee_seq_no: [''],
      password: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      address1: [''],
      address2: [''],
      address3: [''],
      termcondition: [false],
      company_ref_id: [''],
      role_ref_id: [''],
      state_ref_id: [''],
      country_ref_id: [''],
      city_ref_id: [''],
      sub_application_id: [this.SUB_APPLICATION_ID],
      application_id: [this.APPLICATION_ID],
      created_by: [this.CREATED_BY],
      
    });
  }

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private fb: FormBuilder,private commonSetupService: CommonSetupService,private reconcilationService: ReconcilationService,private dynamicScriptLoader: DynamicScriptLoaderService,private _snackBar: MatSnackBar) {
    this.initThirdForm();
    this.initForm();
    this.reconcilationService.getCompanyData().subscribe(data => {
      this.companyData = data;
    });
    this.reconcilationService.getCountryData().subscribe(data => {
      this.countryData = data;
    });
    this.reconcilationService.getCityData().subscribe(data => {
      this.cityData = data;
    });
    this.reconcilationService.getStateData().subscribe(data => {
      this.stateData = data;
    });
    this.reconcilationService.getRoleData().subscribe(data => {
      this.roleData = data;
    });
    this.commonSetupService.getUserFormData().subscribe((data: []) => {
      this.userFormData = data;
    });
    
  }
  initForm() {
    
    
  }
  
  initThirdForm() {
    this.thirdForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      password: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      address: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      termcondition: [false]
    });
  }
  
  onRegister() {
    console.log('Form Value', this.register.value);
    this.submitted = true;
  
      if (this.register.invalid) {
        return;
      } else {
        this.commonSetupService.saveUserFormData(this.register.value).subscribe((data: any) => {
        console.log("In save function ");
        console.log(data);
          if (data.status === 1) {
            Swal.fire({
              icon: 'success',
              title: 'Your record has been added successfully!',
              showConfirmButton: false,
              timer: 2000
            });
            //this.userFormData.push(data);
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
          setTimeout(function(){location.href='http://localhost:4200/#/common-setup/userform'} , 2000);
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
            if(message.includes("first_name")){
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
  onThirdFormSubmit() {
    console.log('Form Value', this.thirdForm.value);
  }

  tbl_FilterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = this.tbl_columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.tbl_FilteredData[0]);
    // assign filtered matches to the active datatable
    this.userFormData = this.tbl_FilteredData.filter(function(item) {
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
    $('#new_entry_title').hide();
    $('#btn_list').hide();
  }
  showNewEntry() {
    $('#list_form').hide();
    $('#list_title').hide();
    $('#btn_new_entry').hide();
    $('#btn_list').show();
    $('#new_entry_form').show();
    $('#new_entry_title').show();
    this.BTN_VAL = 'Submit';
  }

  showList() {
    $('#list_form').show();
    $('#list_title').show();
    $('#btn_new_entry').show();
    $('#btn_list').hide();
    $('#new_entry_form').hide();
    $('#new_entry_title').hide();
    this.submitted = false;
  }

  editUserFormData(location) {
    this.register.patchValue({
      first_name: location.first_name,
      middle_name: location.middle_name,
      last_name: location.last_name,
      address1: location.address1,
      address2: location.address2,
      address3: location.address3,
      id: location.id,
      state_ref_id: location.state_id,
      city_ref_id: location.city_id,
      country_ref_id: location.country_id,
      company_ref_id: location.company_ref_id,
      role_ref_id: location.role_ref_id,
      phone: location.phone,
      pincode: location.pincode,
      email: location.email,
      gender: location.gender
    });
  
    this.BTN_VAL = 'Update';
    const id = $('#id').val();
  
    if (id !== '') {
      $('#new_entry_form').show();
      $('#new_entry_title').show();
      $('#btn_list').hide();
      $('#btn_new_entry').hide();
      $('#list_form').hide();
      $('#list_title').hide();
    }
  }
  deleteUserFormData(id){
    this.commonSetupService.deleteUserFormData(id).subscribe((data:any)=>{
      if (data == 1) {
        Swal.fire({
          title: 'Your record has been deleted successfully!',
          icon: 'warning',
          showConfirmButton: false
        });
    }
  setTimeout(function(){location.href='http://localhost:4200/#/common-setup/userform'} , 2000);
    });
    
  }
}




