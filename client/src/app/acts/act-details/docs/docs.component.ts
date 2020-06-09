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
import { StatusModel } from "src/app/shared/models/status.model";
import { saveAs } from "file-saver";
import {
  Doc,
  GetAllDocsGQL,
  DroppDocGQL,
  TitlingDocGQL,
  RemoveDocGQL,
  SavingDocGQL,
  DeleteDocGQL,
  ChangeDocsGQL,
  DocSubscriptionsPayload,
  SavingAllDocsGQL,
} from "src/types/generated";
import { map, take } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { FileDeleteConfirmComponent } from "src/app/shared/components/dialogs/file-delete-confirm/file-delete-confirm.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSelect } from "@angular/material/select";
import { QueryRef, Apollo } from "apollo-angular";
import { ActControlService } from "src/app/services/controls/act-control.service";

class ItemFile {
  constructor(public id: string, public name: string) {}
}

class option {
  constructor(
    public label: string,
    public status: string,
    public type: string
  ) {}
}

class GroupItem {
  constructor(public status?: option) {}
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
  status: StatusModel;
  form: FormArray;

  confirmDelete: boolean;
  _files: File[] = [];
  files: ItemFile[] = [];
  _options: any[];
  uploadControl: boolean = false;

  options: option[] = [
    { label: "Акт", status: "registration", type: "ACT" },
    { label: "Протокол", status: "protocolCreated", type: "PROTOCOL" },
    {
      label: "Итоговый протокол",
      status: "protocolUploaded",
      type: "FINAL_PROTOCOL",
    },
  ];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private apollo: Apollo,
    private getAllDocs: GetAllDocsGQL,
    private droppDoc: DroppDocGQL,
    private titleDoc: TitlingDocGQL,
    private savingDoc: SavingDocGQL,
    private savingAllDocs: SavingAllDocsGQL,
    private removeDoc: RemoveDocGQL,
    private changeDoc: ChangeDocsGQL,
    private deleteDoc: DeleteDocGQL,
    private acs: ActControlService
  ) {}

  ngOnInit(): void {
    this._options = this.options;
    this.form = this.fb.array([]);
    this.docsQuery = this.apollo.watchQuery({
      query: this.getAllDocs.document,
      variables: { actId: this.act._id },
    });
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
    this.docs$ = this.docsQuery.valueChanges.pipe(map(({ data }) => data.docs));
    this.subscribeToNewDocs();
  }

  subscribeToNewDocs() {
    this.docsQuery.subscribeToMore({
      document: this.changeDoc.document,
      variables: { actId: this.act._id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }

        const payload: DocSubscriptionsPayload =
          subscriptionData.data.changeDocs;
        const mutationType = payload.mutation;
        const newDoc = payload.data;
        let newAllDocs;

        if (mutationType === "UPDATED") {
          newAllDocs = [newDoc, ...prev.docs];
        }

        if (mutationType === "DELETED") {
          newAllDocs = (<Doc[]>prev.docs).filter((doc) => doc.id !== newDoc.id);
        }

        return {
          ...prev,
          docs: newAllDocs,
        };
      },
    });
  }

  addFormArray(status?: option) {
    const newGroup = new GroupItem(status);
    this.form.push(this.fb.group(newGroup));
  }

  droppFiles(event: FileList) {
    if (this.files.length === 0) {
      this.files = [];
    }

    for (let i = 0; i < event.length; i++) {
      if (
        this.files.length > 0 &&
        this.files.map((file) => file.name).includes(event[i].name)
      ) {
        this._snackBar.open(
          "Вы не можете добавить документы с одинаковым именем",
          null,
          { duration: 3000 }
        );
        this.fileInput.nativeElement.value = "";
        return;
      } else {
        this._files.push(event[i]);
      }
    }

    if (this._files.length > 3) {
      this._snackBar.open(
        "Вы можете добавить только 3 документа к одному акту",
        null,
        { duration: 3000 }
      );
      this._files = [...this._files.slice(0, 3)];
    }

    this._files.forEach((element) => {
      const newObs = this.docs$.pipe(take(1))
      newObs.subscribe((docs) => {
        if (
          this.files.length > 0 &&
          this.files.map((file) => file.name).includes(element.name)
        ) {
          this._snackBar.open(
            "Вы не можете добавить документы с одинаковым именем",
            null,
            { duration: 3000 }
          );
          this.fileInput.nativeElement.value = "";
          return;
        }

        if (
          docs.length > 0 &&
          docs.map((doc) => doc.name).includes(element.name)
        ) {
          const id = docs.find((doc) => doc.name === element.name).id;

          const dialogRef = this.dialog.open(FileDeleteConfirmComponent, {
            data: {
              id: id,
              name: element.name,
            },
          });
          dialogRef.afterClosed().subscribe((data) => {
            if (data.confirm) {
              this._files = [
                ...this._files.filter((file) => file.name !== element.name),
              ];
              this.unsubscribeAdnDelete(data.id);
              this.droppMutation(element);
              this.fileInput.nativeElement.value = "";
            } else {
              this._files = [
                ...this._files.filter((file) => file.name !== element.name),
              ];
              this.fileInput.nativeElement.value = "";
              return;
            }
          });
        } else {
          this._files = [
            ...this._files.filter((file) => file.name !== element.name),
          ];
          this.droppMutation(element);
          this.fileInput.nativeElement.value = "";
        }
      })
    });
    this.fileInput.nativeElement.value = "";
  }

  downloadFile(docId: number, name: string) {
    this.subscriptions$.add(this.acs.downloadDoc(this.act._id, docId).subscribe((doc) => {
      saveAs(doc, name);
    }))
  }

  droppMutation(el: File) {
    this.subscriptions$.add(this.droppDoc
      .mutate({
        file: el,
        actId: this.act._id,
        name: el.name,
      })
      .subscribe(({ data }) => {
        const file = new ItemFile(data.droppDoc.id, el.name);
        this.files.push(file);
        this.addFormArray();
      }))
  }

  titlingDoc(id: string, title: string, optId: number, i: number) {
    if (id) {
      this.subscriptions$.add( 
      this.titleDoc
        .mutate({
          data: {
            docId: id,
            title: title,
          },
        })
        .subscribe())
    }
  }

  savingFile(docId: string, i: number) {
    this.fileInput.nativeElement.value = "";
    // this.subscription.unsubscribe();
    const actId = this.act._id;
    this.subscriptions$.add(this.savingDoc.mutate({ data: { docId, actId } }).subscribe(() => {
      this.files = [...this.files.filter((file) => file.id !== docId)];
      this.form.removeAt(i)
    }))
  }

  savingAllFiles() {
    // this.subscription.unsubscribe();
    this.fileInput.nativeElement.value = "";
    const docIds = [...this.files.map(file => file.id)];
    this.files = []
    this.form.reset
    this.subscriptions$.add(this.savingAllDocs.mutate({ data: { actId: this.act._id, docs: docIds } }).subscribe())
  }

  removeMutation(docId: string) {
    this.subscriptions$.add(this.removeDoc
      .mutate({
        docId: docId,
      })
      .subscribe())
  }

  removeFile(id: string, i: number) {
    this.files = [...this.files.filter((file) => file.id !== id)];
    this.form.removeAt(i)
    this.removeMutation(id);
  }

  removeAllFiles() {
    this.files.forEach((file) => {
      this.removeMutation(file.id);
    });
    this.files = [];
    this.form.reset
  }

  unsubscribeAdnDelete(id: string) {
    // this.subscription.unsubscribe();
    this.deleteFile(id);
  }

  deleteFile(id: string) {
    this.deleteDoc.mutate({ docId: id, actId: this.act._id }).subscribe();
  }

  ngOnDestroy() {
    this.removeAllFiles();
    this.subscriptions$.unsubscribe();
    this.subscription.unsubscribe()
    this.fileInput.nativeElement.value = "";
  }
}
