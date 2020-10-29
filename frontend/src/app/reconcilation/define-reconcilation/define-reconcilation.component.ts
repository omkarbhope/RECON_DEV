import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { error } from 'jquery';
import { ReconcilationService } from 'src/app/services/reconcilation.service';
// import * as $ from "jquery";

declare const $: any;
declare const swal: any;
declare const flatpickr: any;

@Component({
  selector: 'app-define-reconcilation',
  templateUrl: './define-reconcilation.component.html',
  styleUrls: ['./define-reconcilation.component.sass']
})
export class DefineReconcilationComponent implements OnInit {

  defineReconcilationForm: FormGroup;
  submitted = false;
  gridSourceNameDetails = {};

  reconcilationList = true;
  reconcilationNewEntry = false;
  showTwoWays: boolean = false;
  showThreeWays: boolean = false;
  showFourWays: boolean = false;
  submitButton = "Submit";

  reconMasterData: any = [];
  companyData: any = [];
  reconTypeData: any = [];
  sourcesData: any = [];
  sourceNameMaster: any = [];
  sourceNameDetails: any = [];
  defaultoptionIds: any = [];

  initArray = [];

  constructor(private formBuilder: FormBuilder, private reconcilationService: ReconcilationService) { }

  ngOnInit(): void {
    this.defineReconcilationForm = this.formBuilder.group({
      company_ref_id: ['', Validators.required],
      name: [''],
      recon_type_ref_id: [''],
      source_name1_ref_id: [''],
      source_name2_ref_id: [''],
      source_name3_ref_id: [''],
      source_name4_ref_id: [''],
      application_id: "RHYTHMWORKS",
      sub_application_id: "RHYTHMWORKS",
      recon_rule: "A",
      probable_match_rule: "Q",
      initialItemRow: this.formBuilder.array([this.initialItemRow2()]),
      initialItemRow1: this.formBuilder.array([this.initialitemRow3()]),
    });

    this.reconcilationService.getReconcilationMaster().subscribe(data => {
      this.reconMasterData = data;
      // console.log(this.reconMasterData, 'table dataaaaaaaa');
    });
    
  }

  showSources(event) {
    if (event == '5') {
      this.showTwoWays = true;
      this.showThreeWays = false;
      this.showFourWays = false;
    } else if (event == '6') {
      this.showTwoWays = false;
      this.showThreeWays = true;
      this.showFourWays = false;
    } else if (event == '7') {
      this.showTwoWays = false;
      this.showThreeWays = false;
      this.showFourWays = true;
    } else {
      this.showTwoWays = false;
      this.showThreeWays = false;
      this.showFourWays = false;
    }
  }

  showNewEntry() {
    this.reconcilationList = true;
    this.reconcilationNewEntry = false;
  }

  showList() {
    this.reconcilationList = false;
    this.reconcilationNewEntry = true;

    // company name  data
    this.reconcilationService.getCompanyData().subscribe(data => {
      this.companyData = data;
    });

    // Recon Type (master type)Data
    this.reconcilationService.getReconTypeData().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].master_type === 'Recon Type') {
          this.reconTypeData.push(data[i]);
        }
      }
    });

    // Source Names from Src Master
    this.reconcilationService.getSourceMaster().subscribe(data => {
      this.sourceNameMaster = data;
      for (let i = 0; i < data.length; i++) {
        this.sourcesData[data[i].id] = data;
        this.defaultoptionIds[i] = parseInt(data[i].id);
      }
    });

  }

  filterSources(currentSelect) {
    var allSelectedSourceIds = {};
    var selectedIndex = $.isNumeric(currentSelect.options[currentSelect.selectedIndex].value) ? parseInt(currentSelect.options[currentSelect.selectedIndex].value) : currentSelect.options[currentSelect.selectedIndex].value;

    // get selected value of every dropdown 
    $('.sources').each(function (s) {
      if ('' != this.options[this.selectedIndex].value) {
        allSelectedSourceIds[this.id] = parseInt(this.options[this.selectedIndex].value);
      }
    });

    // remove selected option from other dropdowns
    $('.sources').each(function (s) {
      var currentDropdown = this;
      $(this.options).each(function (o) {
        if (-1 < Object.values(allSelectedSourceIds).indexOf(parseInt(this.value)) && currentDropdown.options[currentDropdown.selectedIndex].value != parseInt(this.value) && currentSelect.id != currentDropdown.id &&
          '' != this.value) {
          $(this).remove();
        } else {
        }
      });
    });

    // Source Names from Src Details in both grids
    this.reconcilationService.getSourceDetails(allSelectedSourceIds[currentSelect.id]).subscribe(data => {
      this.gridSourceNameDetails[currentSelect.id] = data;
    });
  }

  changeSourceName(currentGridSelect, rowId) {

    var attr_id = currentGridSelect.id;
    var ref_id = attr_id.replace('field_id', 'ref_id');
    var field_name = attr_id.replace('field_id', 'field_name');
    var section_identifier_id = attr_id.replace('field_id', 'section_identifier_id');

    // at => get selected grid row
    if ($(currentGridSelect).parents('table').attr('id') == 'recon_rule_grid') {
      var gridRow = (<FormArray>(this.defineReconcilationForm.get('initialItemRow'))).at(rowId);
      gridRow.get(ref_id.slice(0, -1)).patchValue($(currentGridSelect.options[currentGridSelect.selectedIndex]).attr('headerRefId'));
      gridRow.get(field_name.slice(0, -1)).patchValue(currentGridSelect.options[currentGridSelect.selectedIndex].text);
      gridRow.get(section_identifier_id.slice(0, -1)).patchValue($(currentGridSelect.options[currentGridSelect.selectedIndex]).attr('sectionId'));
    } else {
      var gridRow1 = (<FormArray>(this.defineReconcilationForm.get('initialItemRow1'))).at(rowId);
      gridRow1.get(ref_id.slice(2, -1)).patchValue($(currentGridSelect.options[currentGridSelect.selectedIndex]).attr('headerRefId'));
      gridRow1.get(field_name.slice(2, -1)).patchValue(currentGridSelect.options[currentGridSelect.selectedIndex].text);
      gridRow1.get(section_identifier_id.slice(2, -1)).patchValue($(currentGridSelect.options[currentGridSelect.selectedIndex]).attr('sectionId'));
    }
  }

  // for Grid 1
  initialItemRow2() {
    return this.formBuilder.group({
      details_id: [''],
      source_name_1_field_id: [''],
      source_name_2_field_id: [''],
      source_name_3_field_id: [''],
      source_name_4_field_id: [''],

      source_name_1_ref_id: [''],
      source_name_1_field_name: [''],
      source_name_1_section_identifier_id: [''],

      source_name_2_ref_id: [''],
      source_name_2_field_name: [''],
      source_name_2_section_identifier_id: [''],

      source_name_3_ref_id: [''],
      source_name_3_field_name: [''],
      source_name_3_section_identifier_id: [''],

      source_name_4_ref_id: [''],
      source_name_4_field_name: [''],
      source_name_4_section_identifier_id: [''],

      application_id: "RHYTHMWORKS",
      sub_application_id: "RHYTHMWORKS",
    });
  }

  get formArr() {
    return this.defineReconcilationForm.get('initialItemRow') as FormArray;
  }

  addNewRow() {
    this.formArr.push(this.initialItemRow2());
  }

  deleteRow(index) {
    if (this.formArr.length == 1) {
      return false;
    } else {
      this.formArr.removeAt(index);
      return true;
    }
  }

  // for grid 2
  initialitemRow3() {
    return this.formBuilder.group({
      details_id: [''],
      source_name_1_field_id: [''],
      source_name_2_field_id: [''],
      source_name_3_field_id: [''],
      source_name_4_field_id: [''],

      source_name_1_ref_id: [''],
      source_name_1_field_name: [''],
      source_name_1_section_identifier_id: [''],

      source_name_2_ref_id: [''],
      source_name_2_field_name: [''],
      source_name_2_section_identifier_id: [''],

      source_name_3_ref_id: [''],
      source_name_3_field_name: [''],
      source_name_3_section_identifier_id: [''],

      source_name_4_ref_id: [''],
      source_name_4_field_name: [''],
      source_name_4_section_identifier_id: [''],

      application_id: "RHYTHMWORKS",
      sub_application_id: "RHYTHMWORKS",
    });
  }

  get formArr1() {
    return this.defineReconcilationForm.get('initialItemRow1') as FormArray;
  }

  addNewRow1() {
    this.formArr1.push(this.initialitemRow3());
  }

  deleteRow1(index) {
    if (this.formArr1.length == 1) {
      return false;
    } else {
      this.formArr1.removeAt(index);
      return true;
    }
  }

  // this.getData().subscribe(data => {
  //   data.books.forEach(book  => this.formGroup.setControl('books', this.formBuilder.array([this.createBookForm(book)])))
  // });

  //   this.employeeForm.setControl('InitialItemRow', this.setExistingSkills(employee.skills));

  // setExistingSkills(skillSets: ISkill[]): FormArray {
  //   const formArray = new FormArray([]);
  //   skillSets.forEach(s => {
  //     formArray.push(this.fb.group({
  //       skillName: s.skillName,
  //       experienceInYears: s.experienceInYears,
  //       proficiency: s.proficiency
  //     }));
  //   });

  //   return formArray;
  // }
  // initarray will append formdata
  initialItemRow = [];
  initialItemRow1 = [];

  onSubmit(event: Event) {
    event.preventDefault();
    console.log("In submit");
    // console.log(this.defineReconcilationForm.value, 'define recon');
    // let stringifiedData = JSON.stringify(this.defineReconcilationForm.value);  

    
    // console.log(stringifiedData, 'Json data');
  }

}