import { Course } from "./course.model";
import { UserModel } from "./user.model";

export class CourseBooking {
  course!: Course;
  user!: UserModel;
  paymentMetod!: string;
  price!: number;
}
