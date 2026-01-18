import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  standalone: true,
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.css']
})
export class FeedbackComponent {
  submit() {
    alert('Feedback submitted');
  }
}
