import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.css']
})
export class FeedbackComponent {
  feedbacks = [
    { orderId:201, customer:'Rahul', rating:5, comment:'Great Service' }
  ];
}
