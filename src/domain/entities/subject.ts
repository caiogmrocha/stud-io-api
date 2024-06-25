import { Entity, Post, Profile, Student, Teacher } from ".";

export interface ISubjectProps {
  id: number;
  name: string;
  displayName: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted: boolean;

  teachers?: Teacher[];
  students?: Student[];
  posts?: Post[];
}

export class Subject extends Entity<ISubjectProps> {
  constructor(props: ISubjectProps) {
    super(props);
  }

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get displayName(): string {
    return this.props.displayName;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt || undefined;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get teachers(): Teacher[] {
    return this.props.teachers || [];
  }

  get students(): Student[] {
    return this.props.students || [];
  }

  get posts(): Post[] {
    return this.props.posts || [];
  }
}
