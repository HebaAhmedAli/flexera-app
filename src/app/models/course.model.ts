import { GalleryItem } from "./gallery-item.model";

export interface Course {
    id: number;
    title: string;
    details: string;
    startDate: string;
    endDate: string;
    upcoming: boolean;
    instructors: string[];
    gallery: Array<GalleryItem>;
    canBeBooked: boolean;
    price: number;
}
