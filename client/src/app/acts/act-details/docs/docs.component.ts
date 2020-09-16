import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnDestroy,
  HostListener,
} from "@angular/core";
import { ActModel } from "src/app/shared/models/act.model";
import { FormBuilder, FormArray } from "@angular/forms";
import { saveAs } from "file-saver";
import { map, filter, switchMap } from "rxjs/operators";
import { Subscription, Observable, from } from "rxjs";
import { MatSelect } from "@angular/material/select";
import { FilesControlService } from "src/app/services/controls/files-control.service";
import { QueryRef, Apollo } from "apollo-angular";
import {
  ChangeDocsGQL,
  GetAllDocsGQL,
  Doc,
  GetAllDocsQuery,
} from "src/types/sub-generated";
import { FilesDataService } from "src/app/services/data/files-data.service";

export class ItemFile {
  constructor(public id: string, public file: File) {}
}

class ItemForm {
  constructor(public id: string, public type?: string) {}
}

class GroupItem {
  constructor(public status?: ItemForm) {}
}

@Component({
  selector: "app-docs",
  templateUrl: "./docs.component.html",
  styleUrls: ["./docs.component.scss"],
})
export class DocsComponent implements OnInit, OnDestroy {
  @ViewChild("fileInput") fileInput: any;
  @ViewChild("opt") opt: MatSelect;
  @Input() act: ActModel;
  @HostListener("window:beforeunload") deleteAllFiles() {
    this.removeAllFiles();
    this.uploadControl = false;
    this.fileInput.nativeElement.value = "";
  }
  private subscriptions$: Subscription = new Subscription();
  private subscription: Subscription = new Subscription();

  docs$: Observable<Doc[]>;
  docsQuery: QueryRef<any>;
  //   status: StatusModel;
  form: FormArray;
  doc = {};

  confirmDelete: boolean;
  _files: File[] = [];
  files: ItemFile[] = [];
  _options: any[];
  uploadControl: boolean = false;

  options = [
    { label: "Акт", type: "ACT" },
    { label: "Протокол", type: "PROTOCOL" },
    {
      label: "Итоговый протокол",
      type: "FINAL_PROTOCOL",
    },
  ];

  constructor(
    private fb: FormBuilder,
    private readonly fcs: FilesControlService,
    private readonly fds: FilesDataService,
    private readonly apollo: Apollo,
    private readonly getAllDocs: GetAllDocsGQL,
    private changeDoc: ChangeDocsGQL
  ) {}

  ngOnInit(): void {
    this._options = this.options;
    this.form = this.fb.array([]);
    this.subscriptions$.add(
      this.form.valueChanges
        .pipe(map((value: GroupItem[]) => value.map((val) => val.status)))
        .subscribe((value) => {
          if (value.indexOf(null) === -1 && value.indexOf(undefined) === -1) {
            this.uploadControl = true;
          } else {
            this.uploadControl = false;
          }
        })
    );
    this.docsQuery = this.apollo.use("filesWS").watchQuery({
      query: this.getAllDocs.document,
      variables: { actId: this.act.id },
    });
    this.subscribeToNewDocs(this.act.id);
    this.docs$ = this.docsQuery.valueChanges.pipe(
      filter(({ data }) => data.getDocs !== null),
      map(({ data }) => (<GetAllDocsQuery>data).getDocs)
    );
    this.subscriptions$.add(
      this.docs$
        .pipe(
          switchMap((docs) => from(docs)),
          filter((doc) => doc.title === "ACT")
        )
        .subscribe((data) => {
          this.doc["ACT"] = data;
        })
    );
    this.subscriptions$.add(
      this.docs$
        .pipe(
          switchMap((docs) => from(docs)),
          filter((doc) => doc.title === "PROTOCOL")
        )
        .subscribe((data) => {
          this.doc["PROTOCOL"] = data;
        })
    );
    this.subscriptions$.add(
      this.docs$
        .pipe(
          switchMap((docs) => from(docs)),
          filter((doc) => doc.title === "FINAL_PROTOCOL")
        )
        .subscribe((data) => {
          this.doc["FINAL_PROTOCOL"] = data;
        })
    );
  }

  addFormArray(id: string) {
    const newGroup = this.fb.group(new GroupItem(new ItemForm(id)));
    this.form.push(newGroup);
  }

  droppFiles(event: FileList) {
    if (this.files.length === 0) {
      this.files = [];
    }
    for (let i = 0; i < event.length; i++) {
      this._files.push(event[i]);
    }

    this._files.forEach((element) => {
      this._files = [
        ...this._files.filter((file) => file.name !== element.name),
      ];
      this.droppMutation(element);
      this.fileInput.nativeElement.value = "";
    });
    this.fileInput.nativeElement.value = "";
  }

  downloadFile(docId: string) {
    // this.subscriptions$.add(
    this.fcs.downloadFile(docId).then((doc) => {
      const arr = this.fds.convertDataURIToBinary(doc.doc);

      const blob = new Blob([arr]);
      saveAs(blob, doc.name);
    });
  }

  droppMutation(el: File) {
    this.subscriptions$.add(
      this.fcs.postDroppDoc(this.act.id, el.name).subscribe((doc) => {
        this.addFormArray(doc.id);
        this.files.push(new ItemFile(doc.id, el));
      })
    );
  }

  titlingDoc(id: string, name: string, title: string, mimtype: string) {
    if (id) {
      this.subscriptions$.add(
        this.fcs.postTitleDoc(this.act.id, id, name, title, mimtype).subscribe()
      );
    }
  }

  savingFile(docId: string, file: File, type: string, i: number) {
    this.fileInput.nativeElement.value = "";
    this.subscription.unsubscribe();
    this.fcs.savintDoc(this.act.id, file, docId).then(() => {
      this.files = [...this.files.filter((file) => file.id !== docId)];
      this.form.removeAt(i);
    });
  }

  savingAllFiles() {
    this.subscription.unsubscribe();
    this.fileInput.nativeElement.value = "";
    this.form.reset;
    this.subscriptions$.add(
      this.fcs
        .savinAllDoc(this.files, this.act.id)
        .subscribe(() => (this.files = []))
    );
  }

  removeMutation(docId: string) {
    this.subscriptions$.add(this.fcs.removeDoc(docId).subscribe());
  }

  removeFile(id: string, i: number) {
    this.files = [...this.files.filter((file) => file.id !== id)];
    this.form.removeAt(i);
    this.removeMutation(id);
  }

  removeAllFiles() {
    this.files.forEach((file) => {
      this.removeMutation(file.id);
    });
    this.files = [];
    this.form.reset;
  }

  unsubscribeAdnDelete(id: string) {
    // this.subscription.unsubscribe();
    this.deleteFile(id);
  }

  deleteFile(id: string) {
    // this.deleteDoc.mutate({ docId: id, actId: this.act.id }).subscribe();
  }

  subscribeToNewDocs(id: string) {
    this.subscriptions$.add(
      this.docsQuery.subscribeToMore({
        document: this.changeDoc.document,
        variables: { actId: id },
        updateQuery: (prev, { subscriptionData }) => {
          console.log(subscriptionData);
          console.log(prev);

          if (!subscriptionData) {
            return prev;
          }

          const payload: Doc = subscriptionData.data.changeDocs;
          const newDoc = payload;
          let newAllDocs;

          newAllDocs = [newDoc, ...prev.getDocs];

          return {
            ...prev,
            getDocs: newAllDocs,
          };
        },
      })
    );
  }

  ngOnDestroy() {
    this.removeAllFiles();
    this.subscriptions$.unsubscribe();
    this.subscription.unsubscribe();
    this.fileInput.nativeElement.value = "";
  }
}
