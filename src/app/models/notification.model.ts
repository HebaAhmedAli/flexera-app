export class NotificationModel {
  id!: number;
  title!: string;
  body!: string;
  url!: string;
  urlItemId?: number;
  read: boolean = false;
  deleted = false;
  date!: string;
}
