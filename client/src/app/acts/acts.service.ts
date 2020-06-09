import { Injectable } from '@angular/core';
import { StatusBaseModel } from '../shared/models/interface/status-base.model';

@Injectable({
  providedIn: 'root'
})
export class ActsService {

  constructor() { }

  getStatus() {
    let status: StatusBaseModel[] = [

      new StatusBaseModel({
        key: "registration",
        label: "Зарегистрированные",
        filters: true
      }),
      new StatusBaseModel({
        key: "protocolCreated",
        label: "Протокол Загружен",
        filters: true
      }),
      new StatusBaseModel({
        key: "remarks",
        label: "Замечания",
        filters: true
      }),
      new StatusBaseModel({
        key: "noRemarks",
        label: "Без Замечаний",
        filters: true
      }),
      new StatusBaseModel({
        key: "protocolUploaded",
        label: "Финальный Протокол Загружен",
        filters: true
      }),
    ];

    return status
  }
}
