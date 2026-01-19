import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bulk-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bulk-uploads.html',
  styleUrls: ['./bulk-uploads.css']
})
export class BulkUploadComponent {

  uploadedProducts: any[] = [];
  validProducts: any[] = [];
  invalidProducts: any[] = [];

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      this.processData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  }

  processData(data: any[]) {
    this.uploadedProducts = [];
    this.validProducts = [];
    this.invalidProducts = [];

    data.forEach((row: any, index: number) => {
      const product = {
        id: row['ID'],
        name: row['Name'],
        price: row['Price'],
        category: row['Category'],
        qty: row['Quantity'],
        status: row['Status'],
        rowNumber: index + 2 // Excel row
      };

      if (this.isValid(product)) {
        this.validProducts.push(product);
      } else {
        this.invalidProducts.push(product);
      }

      this.uploadedProducts.push(product);
    });
  }

  isValid(product: any): boolean {
    return (
      product.id &&
      product.name &&
      product.price > 0 &&
      product.category &&
      product.qty >= 0 &&
      (product.status === 'Active' || product.status === 'Inactive')
    );
  }

  saveProducts() {
    alert(`${this.validProducts.length} products successfully added`);
    console.log('Saved Products:', this.validProducts);
  }
}
