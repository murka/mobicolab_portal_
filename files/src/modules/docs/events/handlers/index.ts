import { DroppedDocHandler } from "./dropped-doc.handler";
import { SavedDocHadler } from "./saved-doc.handler";
import { DownloadedDocHandler } from "./dowloaded-doc.handler";

export const EventHandlers = [DroppedDocHandler, SavedDocHadler, DownloadedDocHandler]