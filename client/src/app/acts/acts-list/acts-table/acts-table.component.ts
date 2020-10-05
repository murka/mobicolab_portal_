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
import { FormControl, FormGroup } from "@angular/forms";
import { Moment } from "moment";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { saveAs } from "file-saver";
import { FilesControlService } from "src/app/services/controls/files-control.service";
import { FilesDataService } from "src/app/services/data/files-data.service";

@Component({
  selector: "app-acts-table",
  templateUrl: "./new-acts-table.component.html",
  styleUrls: ["./acts-table.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class ActsTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[];
  columnsToDisplay: ColumnModel[];
  expandedElement: DataSourceModel | null;
  allColumnActive: boolean = false;
  dataSource = new MatTableDataSource<DataSourceModel>([]);
  selection = new SelectionModel(true, []);
  filterOptions: FilterItem[];
  data: GetAllActsQuery["getActs"];
  _data: GetAllActsQuery["getActs"];
  filteredData: GetAllActsQuery["getActs"];
  _filteredData: { [key: string]: GetAllActsQuery["getActs"] }[] = [];
  selectedWithActs: DataSourceModel[];
  selectedWithActsPdf: DataSourceModel[];
  selectedWithProtocols: DataSourceModel[];

  rangeFilter: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private readonly dataTableService: DataTableService,
    private readonly acs: ActControlService,
    private readonly fcs: FilesControlService,
    private readonly fds: FilesDataService
  ) {}

  ngOnInit(): void {
    this.acs.getActs().subscribe((data: GetAllActsQuery["getActs"]) => {
      this._data = data;
      this.data = this._data;
      this.filteredData = this.data;
      this.initDataSource(this._data);
      this.filterOptions = this.initFileterOptions(data);
    });
    this.columnsToDisplay = this.dataTableService.getColumns();
    this.initDisplayedColumns();
    this.updateAllComponent();
    this.rangeFilter.valueChanges.subscribe(() => this.filteringDate());
    this.selection.changed.subscribe((event) => {
      this.selectedWithActs = (<DataSourceModel[]>event.source.selected).filter(
        (v) => v.act
      );
      this.selectedWithActsPdf = (<DataSourceModel[]>(
        event.source.selected
      )).filter((v) => v.act_pdf);
      this.selectedWithProtocols = (<DataSourceModel[]>(
        event.source.selected
      )).filter((v) => v.protocol);

      console.log(this.selectedWithActs);
    });
  }

  initDataSource(data: GetAllActsQuery["getActs"]) {
    this.dataSource = new MatTableDataSource([
      ...data.map((d) => new DataSourceModel(d)),
    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

      switch (d.controlType) {
        case "Date":
          keyItems = [];
          break;
        default:
          data.forEach((data) => {
            const newItem = new Item(
              data[d.key].id,
              data[d.key].label,
              false,
              false
            );
            keyItems.push(newItem);
          });
      }

      const uniqueItems = [
        ...keyItems.filter(
          (v, i, a) => a.findIndex((d) => d.id === v.id) === i
        ),
      ];

      let controlType: string;

      if (d.controlType === "Date") {
        controlType = "Date";
      } else {
        controlType = "Consumer";
      }

      return new FilterItem(
        d.label,
        d.key,
        true,
        controlType,
        false,
        uniqueItems
      );
    });
  }

  removeFilter(option: FilterItem) {
    switch (option.controlType) {
      case "Date":
        this.rangeFilter.reset();
        option.isActive = false;
        break;
      default:
        option.items.forEach((item) => {
          item.isChecked = false;
        });

        this.updateFilter(false, option.key);
    }
  }

  updateFilter(event: boolean, key: string) {
    const filter = this.filterOptions.find((d) => d.key === key);

    const alone: boolean = this.filterOptions.find(
      (fd) => fd.key !== key && fd.isActive && fd.controlType !== "Date"
    )
      ? false
      : true;

    if (event && !filter.isActive && alone) {
      const activeCheckbox = this.toggleActiveCheckboxes(filter);

      const filteredData = this.filteringData(key, activeCheckbox, this.data);

      this.set_FilteredData(key, filteredData);

      this.filteredData = filteredData;

      this.initDataSource([...this.filteredData]);

      filter.isActive = true;

      this.disablingNoActiveCheckboxesAndFilteringData(this.filteredData);
    }
    if (event && !filter.isActive && !alone) {
      const activeCheckbox = this.toggleActiveCheckboxes(filter);

      const filteredData = this.filteringData(
        key,
        activeCheckbox,
        this.filteredData
      );

      this.filteredData = filteredData;

      this.set_FilteredData(key, filteredData);

      this.initDataSource([...this.filteredData]);

      filter.isActive = true;

      this.disablingNoActiveCheckboxesAndFilteringData(this.filteredData);
    }
    if (!event && filter.isActive && !alone) {
      filter.isActive = false;

      const filteringData = this.filteringAllData(this.data);

      this.filteredData = filteringData;

      this.initDataSource([...this.filteredData]);

      this.disablingNoActiveCheckboxesAndFilteringData(this.filteredData);
    }

    if (!event && filter.isActive && alone) {
      filter.isActive = false;

      this.initDataSource([...this.data]);

      this.disablingNoActiveCheckboxesAndFilteringData(this.data, true);
    }
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

  checkActivefilter;

  disablingNoActiveCheckboxesAndFilteringData(
    data: GetAllActsQuery["getActs"],
    dateControl: boolean = false
  ) {
    const noActiveFilters = dateControl
      ? this.filterOptions
      : this.getNotActiveFilters();

    noActiveFilters
      .filter((v) => v.controlType !== "Date")
      .forEach((filter, i) => {
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
            if (item.isChecked) {
              item.isChecked = false;
            }
            item.disabled = true;
          } else {
            activeCheckbox.push(item.id);
            item.disabled = false;
          }
        });
        this.set_FilteredData(
          filter.key,
          this.filteringData(filter.key, activeCheckbox, this.data)
        );

        if (filter.items.every((item) => !item.isChecked)) {
          filter.isActive = false;
        }
      });
  }

  getNotActiveFilters(): FilterItem[] {
    return this.filterOptions.filter(
      (f) => !f.isActive && f.controlType !== "Date"
    );
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

  filteringData(
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
    const activeFilters = this.filterOptions.filter(
      (f) => f.isActive && f.controlType !== "Date"
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

  filteringDate() {
    let startValue: Moment = this.rangeFilter.controls["start"].value;
    let endValue: Moment = this.rangeFilter.controls["end"].value;

    const start = startValue ? startValue.valueOf() : null;
    const end = endValue ? endValue.valueOf() : null;

    if (!start && !end) {
      this.data = [...this._data];

      this.disablingNoActiveCheckboxesAndFilteringData(this.data, true);

      this.initDataSource(this.data);
    }

    if (end) {
      this.filterOptions.find((v) => v.key === "date").isActive = true;

      this.data = [
        ...this._data.filter((data) => {
          const d = new Date(data.datetime.date).valueOf();
          if (start <= d && d <= end) return d;
        }),
      ];

      this.disablingNoActiveCheckboxesAndFilteringData(this.data, true);

      this.initDataSource(this.data);
    }
  }

  downloadFile(docId: string) {
    // this.subscriptions$.add(
    this.fcs.downloadFile(docId).then((doc) => {
      const arr = this.fds.convertDataURIToBinary(doc.doc);

      const blob = new Blob([arr]);
      saveAs(blob, doc.name);
    });
  }

  downloadManyFiles(selector: string) {
    let docArr = [];

    switch (selector) {
      case "act":
        docArr = [...this.selectedWithActs.map((value) => value.act.id)];
        break;
      case "act_pdf":
        docArr = [...this.selectedWithActsPdf.map((value) => value.act_pdf.id)];
        break;
      case "protocol":
        docArr = [
          ...this.selectedWithProtocols.map((value) => value.protocol.id),
        ];
        break;
    }

    docArr.forEach((id) => {
      this.downloadFile(id);
    });
  }
}
