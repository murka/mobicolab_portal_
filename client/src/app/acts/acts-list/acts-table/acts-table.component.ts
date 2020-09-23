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
      const activeCheckbox = this.disablingActiveCheckboxes(filter);

      const filteringData = this.newfilteringData(
        key,
        activeCheckbox,
        this._data
      );

      this.set_FilteredData(key, filteringData);

      this.data = [...filteringData];

      filter.isActive = true;
    }
    if (event && !filter.isActive && !alone) {
      const activeCheckbox = this.disablingActiveCheckboxes(filter);

      const filteringData = this.newfilteringData(
        key,
        activeCheckbox,
        this.data
      );

      this.set_FilteredData(key, filteringData);

      this.data = [...filteringData];

      filter.isActive = true;
    }
    if (event && filter.isActive && !alone) {
    }
  }

  disablingActiveCheckboxes(filter: FilterItem): string[] {
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

  disablingNoActiveCheckboxes(key: string, data: GetAllActsQuery["getActs"]) {
    const noActiveFilters = this.getNotActiveFilters(key);

    let filteredData: GetAllActsQuery["getActs"] = [];

    noActiveFilters.forEach((filter) => {
      data.forEach((d) => {
        if (filter.items.map((v, i) => v.id).includes(d[key].id)) {
          filteredData.push(d);
        } else {
        }
      });
    });
  }

  getNotActiveFilters(key: string): FilterItem[] {
    return this.filterOptions.filter((f) => f.isActive! && f.key !== key);
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

  updateFilter(event: boolean, options: FilterItem["items"], key: string) {
    const filter = this.filterOptions.find((d) => d.key === key);

    let filteredData = this.filteringData(key, options, this._data);

    if (!filter.isActive) {
      const arrFD = this._filteredData.find((fd) => {
        if (Object.keys(fd)[0] === key) return fd;
      });
      if (!arrFD) {
        const ob: { [key: string]: GetAllActsQuery["getActs"] } = {};
        ob[`${key}`] = filteredData;
        this._filteredData.push(ob);
      }
    }

    filter.isActive = filter.items.find((item) => item.isChecked)
      ? true
      : false;

    const alone: boolean = this.filterOptions.find(
      (fd) => fd.key !== key && fd.isActive
    )
      ? false
      : true;

    const disabledToggler = (condition: boolean) =>
      filter.items.forEach((item) => {
        if (!item.isChecked) {
          item.disabled = condition;
        } else item.disabled = !condition;
      });

    if (event && !alone) {
      this.setFilteredData(key, filteredData);

      this.data = this.filteringAllData(key, filteredData);

      console.log("1");
    } else if (event && alone) {
      console.log("2");

      disabledToggler(true);

      this.setFilteredData(key, filteredData);

      this.data = filteredData;
    } else if (!event && !filter.isActive && !alone) {
      console.log("3");

      this.setFilteredData(key, this._data);
      this.checkedOptionsDisabled();

      this.data = this.filteringAllData(key, this._data);
    } else if (!event && !filter.isActive && alone) {
      console.log("4");

      disabledToggler(false);

      this.setFilteredData(key, this._data);

      this.data = [...this._data];
    } else {
      console.log("5");

      this.data = this.filteringData(key, options, this.data);
      this.setFilteredData(key, filteredData);
    }

    this.dataSource = new MatTableDataSource([
      ...this.data.map((d) => new DataSourceModel(d)),
    ]);
  }

  checkedOptionsDisabled(
    filterOptions: FilterItem[],
    data: GetAllActsQuery["getActs"]
  ): void {
    filterOptions.forEach((v) => {
      v.items.forEach((item) => {
        if (!data.map((d) => d[v.key].id).includes(item.id)) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
      });
      this.setFilteredData;
    });
  }

  setFilteredData(key: string, data: GetAllActsQuery["getActs"]): void {
    this._filteredData.find((fd) => {
      if (Object.keys(fd)[0] === key) return fd;
    })[`${key}`] = [...data];
  }

  filteringData(
    key: string,
    options: FilterItem["items"],
    data: GetAllActsQuery["getActs"]
  ): GetAllActsQuery["getActs"] {
    return [
      ...data.filter((data) => {
        if (
          options
            .map((d) => {
              if (d.isChecked) {
                return d.id;
              }
            })
            .includes(data[key].id)
        ) {
          return data;
        }
      }),
    ];
  }

  filteringAllData(
    key: string,
    data: GetAllActsQuery["getActs"]
  ): GetAllActsQuery["getActs"] {
    const activeFilters = this.filterOptions.filter(
      (f) => f.isActive && f.key !== key
    );

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
