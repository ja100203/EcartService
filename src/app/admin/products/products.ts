import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/pagination/pagination';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent {

  allProducts = [
    { id:101, name:'iPhone', price:80000, category:'Electronics', qty:10, status:'Active' },
    { id:102, name:'Shoes', price:3000, category:'Fashion', qty:5, status:'Active' },
    { id:103, name:'Laptop', price:60000, category:'Electronics', qty:2, status:'Inactive' },
    { id:104, name:'Watch', price:7000, category:'Fashion', qty:8, status:'Active' },
    { id:105, name:'Bag', price:2500, category:'Fashion', qty:0, status:'Inactive' },
    { id:106, name:'TV', price:45000, category:'Electronics', qty:4, status:'Active' }
  ];

  currentPage = 1;
  itemsPerPage = 5;

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.allProducts.slice(start, start + this.itemsPerPage);
  }

  onPageChange(page:number) {
    this.currentPage = page;
  }

  // XLS EXPORT
  exportExcel() {
    const ws = XLSX.utils.json_to_sheet(this.allProducts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, 'products.xlsx');
  }

  // PDF EXPORT
  exportPDF() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['ID','Name','Price','Category','Qty','Status']],
      body: this.allProducts.map(p => [
        p.id, p.name, p.price, p.category, p.qty, p.status
      ])
    });
    doc.save('products.pdf');
  }
}
