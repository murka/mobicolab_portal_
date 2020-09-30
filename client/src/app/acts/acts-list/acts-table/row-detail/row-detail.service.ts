import { Injectable } from "@angular/core";
import { GetWholeActQuery } from "src/types/generated";
import { ContentItem } from './models/content-items.model';

@Injectable({
  providedIn: "root",
})
export class RowDetailService {
  constructor() {}

  getContent(act: GetWholeActQuery['getAct'], fields: any[]) {
    let content: ContentItem[] = []
    fields.forEach((field) => {
      switch (typeof act[field.key]) {
        case "string":
          content.push(new ContentItem(field.label, act[field.key]))
          break
        case 'object':
          if (!act[field.key].length && act[field.key]['__typename'] === 'TypeOfSample') {
            content.push(new ContentItem(field.label, act[field.key]['habitan']['label']))
            break
          }
          if (!act[field.key].length && act[field.key]['__typename'] !== "DateAndTime" && act[field.key]['__typename']) {
            content.push(new ContentItem(field.label, act[field.key]['label']))
            break
          }
          if (!act[field.key].length) {
            const dateLabel = new Intl.DateTimeFormat('ru-ru').format(new Date(act[field.key]['date']))
            const timeLabel = act[field.key]['time']
            const label = `${dateLabel}, ${timeLabel}`
            content.push(new ContentItem(field.label, label))
            break
            
          }
      }
    });
    return content
  }
}
