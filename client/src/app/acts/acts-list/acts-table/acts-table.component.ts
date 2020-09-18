import { Component, OnInit } from "@angular/core";
import { ColumnModel } from "./models/column.model";
import { DataTableService } from "./data-table.service";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-acts-table",
  templateUrl: "./acts-table.component.html",
  styleUrls: ["./acts-table.component.scss"],
})
export class ActsTableComponent implements OnInit {
  displayedColumns: string[];
  columnsToDisplay: ColumnModel[];
  allColumnActive: boolean = false;
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel(true, []);

  constructor(private readonly dataTableService: DataTableService) {}

  ngOnInit(): void {
    this.columnsToDisplay = this.dataTableService.getColumns();
    this.displayedColumns = [
      "select",
      ...this.columnsToDisplay.map((row) => row.key),
    ];
  }

  updateAllComponent(): void {
    this.allColumnActive =
      this.columnsToDisplay != null &&
      this.columnsToDisplay.every((c) => c.isActive);
  }

  someActive(): boolean {
    if (this.columnsToDisplay == null) {
      return false;
    }

    return (
      this.columnsToDisplay.filter((c) => c.isActive).length > 0 &&
      !this.allColumnActive
    );
  }

  setAll(active: boolean): void {
    this.allColumnActive = active;
    if (this.columnsToDisplay == null) {
      return;
    }
    this.columnsToDisplay.forEach((c) => (c.isActive = active));
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    console.log(this.selection);

    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }
}
