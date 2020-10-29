import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicScriptLoaderService } from './../../services/dynamic-script-loader.service';
import { CommonSetupService } from 'src/app/services/common-setup.service';
import Swal from 'sweetalert2';

declare const $: any;
// declare const Swal: any;

// @ts-ignore
@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.sass']
})
export class UomComponent implements OnInit {

  uomForm: FormGroup;
  submitted = false;
  BTN_VAL='Submit';
  APPLICATION_ID: string;
  USERID: string;
  uomdata = [];

  private uom_code: number;
  private uom_description: string;
  private id: number;

  constructor(private formBuilder: FormBuilder,private commonSetupService: CommonSetupService,private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {
    this.showList()
    this.APPLICATION_ID = localStorage.getItem('APPLICATION_ID');
    this.USERID = localStorage.getItem('ID');

    this.uomForm = this.formBuilder.group({
      uom_code: ['', Validators.required],
      uom_description: ['', Validators.required],
      sub_application_id: 'sub_application_id',
      is_deleted: 'N',
      ID: [''],
      application_id: '5',
      USERID: [this.USERID]
  });

  this.commonSetupService.getUomData().subscribe((data:[])=>{
    this.uomdata = data;
  });

  'use strict';
  this.startScript();


  }

  editUomData(uom){
    this.uomForm.patchValue({
      uom_code: uom.uom_code,
      uom_description: uom.uom_description,
      ID: uom.id
    });
    this.BTN_VAL='Update';

    var id=$("#ID").val();
		if(id!='')
		{
			$("#new_entry_form").show();
			$("#new_entry_title").show();
			$("#btn_list").hide();
			$("#btn_new_entry").hide();
			$("#list_form").hide();
			$("#list_title").hide();
		}
  }

  deleteUomData(ID){
//   	Swal.fire('Hello world!')
	Swal.fire({
  		title: 'Are you sure?',
  		text: 'You will not be able to recover this imaginary file!',
  		icon: 'warning',
  		showCancelButton: true,
  		confirmButtonText: 'Yes, delete it!',
  		cancelButtonText: 'No, keep it'
	}).then((result) => {
  			if (result.value){
  				this.commonSetupService.deleteUomData(ID).subscribe((data:any)=>{
                    Swal.fire({icon: 'success', title: 'Deleted!', text: 'Your file has been deleted!', showConfirmButton: false, timer: 3000})

        		})
  				setTimeout(function(){location.href='http://127.0.0.1:4200/#/common-setup/uom'} , 2000);
  			}
			else if (result.dismiss === Swal.DismissReason.cancel){
    			Swal.fire({icon: 'error', title: 'Canceled!', text: 'Your file is safe :)', showConfirmButton: false, timer: 3000})
  			}
		})
// 	setTimeout(function(){location.href='http://127.0.0.1:4200/#/common-setup/uom'} , 2000);
  }

  async startScript() {
    // tslint:disable-next-line:max-line-length
    console.log('in startscript');
    await this.dynamicScriptLoader.load('form.min', 'bootstrap-colorpicker', 'dataTables.buttons', 'buttons.flash', 'jszip', 'buttons.html5', 'buttons.print').then(data => {
      this.loadData();
    }).catch(error => console.log(error));
  }

  private loadData() {
    $('#tableExport').DataTable({
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ]
    });

    $("#new_entry_form").hide();
    $("#new_entry_title").hide();
    $("#btn_list").hide();
  }

  showNewEntry()
  {
    $("#list_form").hide();
    $("#list_title").hide();
    $("#btn_new_entry").hide();
    $("#btn_list").show();
    $("#new_entry_form").show();
    $("#new_entry_title").show();
  }

	showList()
  {
    $("#list_form").show();
    $("#list_title").show();
    $("#btn_new_entry").show();
    $("#btn_list").hide();
    $("#new_entry_form").hide();
    $("#new_entry_title").hide();
  }

  // convenience getter for easy access to form fields
  get f() { return this.uomForm.controls; }

  onSubmit() {
    this.submitted = true;

//     stop here if form is invalid
    if (this.uomForm.invalid) {
        return;
    }
    else{

//       this.id = this.uomForm.get("ID").value

      this.commonSetupService.saveUomData(this.uomForm.value).subscribe((data:any)=>{
        if (data == 1) {
            Swal.fire('Your record has been added successfully!')
        }
        if (data == 2) {
          Swal.fire('Your record has been updated successfully!')
        }
	      setTimeout(function(){location.href='http://127.0.0.1:4200/#/common-setup/uom'} , 3000);

          Swal.fire({icon: 'success', title: 'Your record has been added successfully!', showConfirmButton: false, timer: 3000})

      },
            error => {
            //Failure
            console.log(error);
            Swal.fire('Record Already Exists!')

      });

    }
  }

}
