import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Complaint } from 'src/app/models/complaint.model';
import { ComplaintService } from 'src/app/services/complaint.service';

@Component({
  selector: 'app-submit-complaint',
  templateUrl: './submit-complaint.page.html',
  styleUrls: ['./submit-complaint.page.scss'],
})
export class SubmitComplaintPage implements OnInit {

  complaintForm!: FormGroup;
  isAlertOpen = false;
  message!: string;

  constructor(private complaintService: ComplaintService, private navCtrl: NavController) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.complaintForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('(01)[0-9]{9}')]),
      address: new FormControl(''),
      subject: new FormControl(''),
      description: new FormControl('')
    });
    
  }

  submit() {
    const complaint: Complaint = {
      complainant: this.complaintForm.controls['name'].value,
      phone: this.complaintForm.controls['phone'].value,
      address: this.complaintForm.controls['address'].value,
      subject: this.complaintForm.controls['subject'].value,
      description: this.complaintForm.controls['description'].value

    }

    this.complaintService.createComplaint(complaint).subscribe(() => {
      this.message = 'Complaint is successfully submited. We will contact you soon.'
      this.isAlertOpen = true;
    },
    () => {
      this.isAlertOpen = true;
      this.message = 'Error while submitting your complaint. Please try again later.'
    });
  }

  alertDismiss() {
    this.isAlertOpen = false;
    this.navCtrl.back()
    // this.navCtrl.navigateBack(['/tabs/support']);
  }


}
