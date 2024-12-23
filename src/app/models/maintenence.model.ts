import { GalleryItem } from "./gallery-item.model";

export class Maintenece {
  id!: number;
  name!: string;
  phone!: number;
  device!: string;
  serialNo!: string;
  complaint!: string;
  feedBack!: string;
  status!: string;
  creationDate!: string;
  gallery!: Array<GalleryItem>;
  createdBy = 'Requested';
}
