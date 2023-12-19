export interface Course {
    id: number;
    title: string;
    details: string;
    startDate: string;
    endDate: string;
    upcoming: boolean;
    image: string;
    instructors: string[];
}