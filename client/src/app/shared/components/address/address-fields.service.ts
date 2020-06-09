import { Injectable } from '@angular/core';
import { InputAct } from '../../models/ff/act-input';

@Injectable({
  providedIn: 'root'
})
export class AddressFieldsService {

  constructor() { }

  getFields() {
    let fields = [
      new InputAct({
        visible: true,
        key: "country",
        label: "Страна"
      }),
      new InputAct({
        visible: true,
        key: "region",
        label: "Область"
      }),
      new InputAct({
        visible: true,
        key: "city",
        label: "Город"
      }),
      new InputAct({
        visible: true,
        key: "street",
        label: "Улица"
      }),
      new InputAct({
        visible: true,
        key: "building",
        label: "Строение"
      }),
      new InputAct({
        visible: true,
        key: "room",
        label: "Офис/Квартира"
      }),
      new InputAct({
        visible: true,
        key: "zip",
        label: "Индекс"
      })
    ];
    return fields;
  }
}
