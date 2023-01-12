import { Entity, Post, Student, Teacher } from ".";
import { Email, Password } from "../value-objects";

export interface IProfileProps {
  id: string;
  email: Email;
  password: Password;
  level: number;
  type: 'student' | 'teacher';
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  isDeleted: boolean;

  owner?: Student | Teacher;
  posts?: Post[];
}

export class Profile extends Entity<IProfileProps> {
  constructor(props: IProfileProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get email(): Email {
    return this.props.email;
  }

  get password(): Password {
    return this.props.password;
  }

  get level(): number {
    return this.props.level;
  }

  get type(): 'student' | 'teacher' {
    return this.props.type;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt || undefined;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get owner(): Student | Teacher | undefined {
    return this.props.owner;
  }
  get posts(): Post[] {
    return this.props.posts || [];
  }
}
