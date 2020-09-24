import { Component, OnInit, ViewChild } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ColumnModel } from "./models/column.model";
import { DataTableService } from "./data-table.service";
import { SelectionModel } from "@angular/cdk/collections";
import { ActControlService } from "src/app/services/controls/act-control.service";
import { GetAllActsQuery } from "src/types/generated";
import { DataSourceModel } from "./models/datasource.model";
import { FilterItem, Item } from "./models/fileter.item.modle";

@Component({
  selector: "app-acts-table",
  templateUrl: "./acts-table.component.html",
  styleUrls: ["./acts-table.component.scss"],
})
export class ActsTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[];
  columnsToDisplay: ColumnModel[];
  allColumnActive: boolean = false;
  dataSource = new MatTableDataSource<DataSourceModel>([]);
  selection = new SelectionModel(true, []);
  filterOptions: FilterItem[];
  data: GetAllActsQuery["getActs"];
  _data: GetAllActsQuery["getActs"];
  _filteredData: { [key: string]: GetAllActsQuery["getActs"] }[] = [];

  constructor(
    private readonly dataTableService: DataTableService,
    private readonly acs: ActControlService
  ) {}

  ngOnInit(): void {
    this.acs.getActs().subscribe((data: GetAllActsQuery["getActs"]) => {
      console.log(data);

      this._data = data;
      this.data = this._data;
      this.dataSource = new MatTableDataSource([
        ...data.map((d) => new DataSourceModel(d)),
      ]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filterOptions = this.initFileterOptions(data);
    });
    this.columnsToDisplay = this.dataTableService.getColumns();
    this.initDisplayedColumns();
    this.updateAllComponent();
  }

  initDisplayedColumns() {
    this.displayedColumns = [
      "select",
      ...this.columnsToDisplay
        .filter((column) => column.isActive)
        .map((row) => row.key),
    ];
  }

  drop(event: CdkDragDrop<DataSourceModel[]>) {
    moveItemInArray(
      this.columnsToDisplay,
      event.previousIndex,
      event.currentIndex
    );
    this.displayedColumns = [
      "select",
      ...this.columnsToDisplay
        .filter((column) => column.isActive)
        .map((row) => row.key),
    ];
  }

  updateAllComponent(): void {
    this.initDisplayedColumns();
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
    this.initDisplayedColumns();
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

  initFileterOptions(data: GetAllActsQuery["getActs"]): FilterItem[] {
    const filterOptions = this.dataTableService.getFileters();

    return filterOptions.map((d) => {
      let keyItems: Item[] = [];
      data.forEach((data) => {
        const newItem = new Item(
          data[d.key].id,
          data[d.key].label,
          false,
          false
        );
        keyItems.push(newItem);
      });

      const uniqueItems = [
        ...keyItems.filter(
          (v, i, a) => a.findIndex((d) => d.id === v.id) === i
        ),
      ];

      return new FilterItem(d.label, d.key, false, uniqueItems);
    });
  }

  newUpdateFilter(event: boolean, options: FilterItem["items"], key: string) {
    const filter = this.filterOptions.find((d) => d.key === key);

    const alone: boolean = this.filterOptions.find(
      (fd) => fd.key !== key && fd.isActive
    )
      ? false
      : true;

    if (event && !filter.isActive && alone) {
      const activeCheckbox = this.toggleActiveCheckboxes(filter);

      const filteringData = this.newfilteringData(
        key,
        activeCheckbox,
        this._data
      );

      this.set_FilteredData(key, filteringData);

      this.data = [...filteringData];

      filter.isActive = true;

      this.disablingNoActiveCheckboxesAndFilteringData(filteringData);
    }
    if (event && !filter.isActive && !alone) {
      const activeCheckbox = this.toggleActiveCheckboxes(filter);

      const filteringData = this.newfilteringData(
        key,
        activeCheckbox,
        this.data
      );

      this.set_FilteredData(key, filteringData);

      this.data = [...filteringData];

      filter.isActive = true;

      this.disablingNoActiveCheckboxesAndFilteringData(filteringData);
    }
    if (!event && filter.isActive && !alone) {
      filter.isActive = false;

      const filteringData = this.filteringAllData(this._data);

      this.data = [...filteringData];

      this.disablingNoActiveCheckboxesAndFilteringData(filteringData);
    }

    if (!event && filter.isActive && alone) {
      filter.isActive = false;

      this.data = [...this._data];

      this.filterOptions.forEach((filter) => {
        filter.items
          .filter((it) => it.disabled)
          .forEach((it) => (it.disabled = false));
        this.set_FilteredData(filter.key, this.data);
      });
    }

    this.dataSource = new MatTableDataSource([
      ...this.data.map((d) => new DataSourceModel(d)),
    ]);
  }

  toggleActiveCheckboxes(filter: FilterItem): string[] {
    let activeCheckbox: string[] = [];
    filter.items.forEach((item) => {
      if (!item.isChecked) {
        item.disabled = true;
      } else {
        activeCheckbox.push(item.id);
      }
    });
    return activeCheckbox;
  }

  disablingNoActiveCheckboxesAndFilteringData(
    data: GetAllActsQuery["getActs"]
  ) {
    const noActiveFilters = this.getNotActiveFilters();

    noActiveFilters.forEach((filter, i) => {
      let filteredData: GetAllActsQuery["getActs"] = [];
      data.forEach((d) => {
        if (filter.items.map((v) => v.id).includes(d[filter.key].id)) {
          filteredData.push(d);
        }
      });

      const uniqueOptionsItems = [
        ...new Set(filteredData.map((data) => data[filter.key].id)),
      ];

      let activeCheckbox: string[] = [];
      filter.items.forEach((item) => {
        if (!uniqueOptionsItems.includes(item.id)) {
          item.disabled = true;
        } else {
          activeCheckbox.push(item.id);
          item.disabled = false;
        }
      });
      this.set_FilteredData(
        filter.key,
        this.newfilteringData(filter.key, activeCheckbox, this._data)
      );
    });
  }

  getNotActiveFilters(): FilterItem[] {
    return this.filterOptions.filter((f) => !f.isActive);
  }

  set_FilteredData(key: string, data: GetAllActsQuery["getActs"]) {
    const arrFD = this._filteredData.find((fd) => {
      if (Object.keys(fd)[0] === key) return fd;
    });
    if (!arrFD) {
      const ob: { [key: string]: GetAllActsQuery["getActs"] } = {};
      ob[`${key}`] = data;
      this._filteredData.push(ob);
    } else {
      arrFD[`${key}`] = data;
    }
  }

  newfilteringData(
    key: string,
    options: string[],
    data: GetAllActsQuery["getActs"]
  ): GetAllActsQuery["getActs"] {
    return [
      ...data.filter((data) => {
        if (options.includes(data[key].id)) {
          return data;
        }
      }),
    ];
  }

  filteringAllData(
    data: GetAllActsQuery["getActs"]
  ): GetAllActsQuery["getActs"] {
    const activeFilters = this.filterOptions.filter((f) => f.isActive);

    const getFileteredData = (): GetAllActsQuery["getActs"] => {
      let filData: GetAllActsQuery["getActs"] = [...data];

      const filtering = (key: string) => {
        const itemsId = this._filteredData
          .find((fd) => {
            if (Object.keys(fd)[0] === key) {
              return fd;
            }
          })
          [`${key}`].map((_fd) => _fd.id);
        filData = [
          ...filData.filter((data) => {
            if (itemsId.includes(data.id)) {
              return data;
            }
          }),
        ];
      };

      activeFilters.forEach((v) => {
        filtering(v.key);
      });
      return filData;
    };

    return getFileteredData();
  }
}
