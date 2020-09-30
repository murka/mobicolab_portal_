import { Injectable } from "@angular/core";

import { ActBase } from "../../shared/models/ff/act-base";
import { ManySelectAct } from "../../shared/models/ff/act-manySelect";
import { InputAct } from "../../shared/models/ff/act-input";
import { DateAct } from "../../shared/models/ff/act-date";
import { TextFieldAct } from "../../shared/models/ff/act-textField";
import { SelectWAdrAct } from "../../shared/models/ff/act-selectWAdr";
import { GroupSelectAct } from "../../shared/models/ff/act-group-select";
import { TimeAct } from "../../shared/interfaces/forms/act-time";
import { NestedAct } from "src/app/shared/interfaces/forms/act-nested";
import { AutocompleteAct } from "src/app/shared/models/ff/act-autocomplete";
import { CheapAutocompleteAct } from "src/app/shared/models/ff/act-cheap-autocomplete";

@Injectable({
  providedIn: "root",
})
export class ActFormFieldsService {
  constructor() {}

  getFields(key: string, fieldControl: string) {
    if (key === "act" && fieldControl === "act") {
      let acts: ActBase<any>[] = [
        new InputAct({
          required: true,
          visible: true,
          key: "name",
          label: "Номер пробы",
        }),

        new SelectWAdrAct({
          required: true,
          visible: true,
          key: "customer",
          label: "Заказчик",
          populate: true,
          editable: true,
        }),

        new SelectWAdrAct({
          required: true,
          visible: true,
          key: "generalCustomer",
          label: "Генеральный заказчик",
          populate: true,
          editable: true,
        }),

        new SelectWAdrAct({
          required: true,
          visible: true,
          key: "lab",
          label: "Лаборатория",
          populate: true,
          editable: true,
        }),

        new NestedAct({
          controlType: "typeOfSample",
          visible: true,
          required: false,
          key: "typeOfSample",
          label: "Тип отбираемой Среды",
        }),

        new InputAct({
          visible: true,
          key: "objectName",
          label: "Наименование объекта",
        }),

        new SelectWAdrAct({
          visible: true,
          key: "place",
          label: "Место отбора пробы",
          editable: true,
          deletable: true,
        }),

        new NestedAct({
          controlType: "datetime",
          required: true,
          visible: true,
          key: "datetime",
          label: 'Время отбора'
        }),

        new SelectWAdrAct({
          visible: true,
          key: "method",
          label: "Метод отбора проб",
          editable: true,
          deletable: true,
        }),

        new SelectWAdrAct({
          visible: true,
          key: "toolType",
          label: "Tип пробоотборного устройства",
          editable: true,
          deletable: true,
        }),

        new InputAct({
          visible: true,
          key: "climaticEnvironmental",
          label: "Климатические условия окружающей среды при отборе проб",
        }),

        new InputAct({
          visible: true,
          key: "planning",
          label: "План (программа) отбора",
        }),

        new ManySelectAct({
          visible: true,
          key: "normativeDocument",
          label: "НД на метод отбора",
          editable: true,
          deletable: true,
        }),

        new SelectWAdrAct({
          visible: true,
          key: "sampleType",
          label: "Тип пробы",
          editable: true,
        }),

        new AutocompleteAct({
          visible: true,
          key: "sample",
          label: "Объем отобранной пробы, материал тары",
          editable: true,
          deletable: true,
        }),

        new ManySelectAct({
          visible: true,
          key: "preparation",
          label: "Подготовка пробы к хранению",
          editable: true,
          deletable: true,
        }),

        new SelectWAdrAct({
          visible: true,
          key: "goal",
          label: "Цель исследования воды",
          editable: true,
          deletable: true,
        }),

        new CheapAutocompleteAct({
          visible: true,
          key: "definedIndicators",
          label: "Определяемые показатели",
          editable: true,
          deletable: true,
        }),

        new TextFieldAct({
          visible: true,
          key: "additions",
          label: "Дополнительные сведения",
        }),

        new TextFieldAct({
          visible: true,
          key: "informationAboutSelection",
          label: "Сведения о проведенных при отборе измерениях",
        }),

        new SelectWAdrAct({
          visible: true,
          key: "environmentalEngineer",
          label: "Должность, Ф.И.О., подпись лица, отбирающего пробу",
          editable: true,
          deletable: true,
        }),

        new SelectWAdrAct({
          visible: true,
          key: "representative",
          label: "Должность, Ф.И.О., подпись представителя",
          editable: true,
          deletable: true,
        }),

        new SelectWAdrAct({
          visible: true,
          key: "passedSample",
          label: "Пробу сдал",
          editable: true,
          deletable: true,
        }),

        // new ActBase({
        //   nestedArray: true,
        //   key: "application",
        //   visible: false
        // })
      ];

      return acts;
    }
    if (key === "applications" && fieldControl === "act") {
      let apps: any[] = [
        new ActBase({
          controlType: "id",
          visible: false,
          key: "id",
        }),

        new SelectWAdrAct({
          visible: true,
          required: true,
          key: "place",
          label: "Место отбора пробы",
        }),

        new NestedAct({
          controlType: "datetime",
          required: false,
          visible: true,
          key: "datetime",
        }),
      ];
      return apps;
    }
    if (key === "datetime" && fieldControl === "act") {
      let dateTimesFields: TimeAct[] | DateAct[] = [
        new DateAct({
          required: true,
          visible: true,
          key: "date",
          label: "Дата",
        }),

        new TimeAct({
          required: true,
          visible: true,
          key: "time",
          label: "Время",
        }),
      ];

      return dateTimesFields;
    }
    if (key === "typeOfSample" && fieldControl === "act") {
      let fields: any[] = [
        new GroupSelectAct({
          visible: true,
          key: "habitan",
        }),

        new ActBase({
          required: true,
          visible: false,
          key: "htype",
        }),
      ];

      return fields;
    }
    if (
      (key === "customer" && fieldControl === "editOptions") ||
      (key === "generalCustomer" && fieldControl === "editOptions") ||
      (key === "lab" && fieldControl === "editOptions")
    ) {
      let fields = [
        new InputAct({
          required: true,
          visible: true,
          key: "fullname",
          label: "Название",
        }),

        new InputAct({
          required: true,
          visible: true,
          key: "label",
          label: "Сокращённое название",
        }),

        new NestedAct({
          required: false,
          visible: true,
          key: "address",
          label: "Адрес",
          controlType: "address",
        }),

        new InputAct({
          visible: true,
          key: "tel",
          label: "Телефон",
        }),

        new InputAct({
          visible: true,
          key: "email",
          label: "E-mail",
        }),
      ];
      return fields;
    }
    if (
      (key === "normativeDocument" && fieldControl === "editOptions") ||
      (key === "sample" && fieldControl === "editOptions") ||
      (key === "preparation" && fieldControl === "editOptions") ||
      (key === "definedIndicators" && fieldControl === "editOptions") ||
      (key === "toolType" && fieldControl === "editOptions") ||
      (key === "method" && fieldControl === "editOptions") ||
      (key === "sampleType" && fieldControl === "editOptions") ||
      (key === "goal" && fieldControl === "editOptions") ||
      (key === "place" && fieldControl === "editOptions") ||
      (key === "environmentalEngineer" && fieldControl === "editOptions") ||
      (key === "representative" && fieldControl === "editOptions") ||
      (key === "passedSample" && fieldControl === "editOptions") ||
      (key === "typeOfSample" && fieldControl === "editOptions")
    ) {
      let fields = [
        new InputAct({
          required: true,
          visible: true,
          key: "label",
          label: "Название",
        }),
      ];
      return fields;
    }
  }
}
