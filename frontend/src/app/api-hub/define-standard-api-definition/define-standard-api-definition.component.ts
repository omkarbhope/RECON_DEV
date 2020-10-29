import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { DynamicScriptLoaderService } from './../../services/dynamic-script-loader.service';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-define-standard-api-definition',
  templateUrl: './define-standard-api-definition.component.html',
  styleUrls: ['./define-standard-api-definition.component.sass']
})
export class DefineStandardApiDefinitionComponent implements OnInit {
  apidefinitionForm: FormGroup;
  submitted = false;
  BTN_VAL = 'Submit';
  application_id: "Unknown";
  userid: string;
  sub_application_id = "Unknown";

  constructor(private formBuilder: FormBuilder, private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit(): void {
    
    
  }
  async startScript() {
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
    this.apidefinitionForm.reset({sub_application_id:"Unknown",application_id:"Unknown",updated_date_time:new Date()});
    console.log("sub_application_id:",this.apidefinitionForm)
  }

}
