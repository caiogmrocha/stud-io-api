import { Entity, Profile, Subject } from ".";

export interface ITeacherProps {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  isDeleted: boolean;

  profile?: Profile;
  subjects?: Subject[];
}

export class Teacher extends Entity<ITeacherProps> {
  constructor(props: ITeacherProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
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

  get profile(): Profile | undefined {
    return this.props.profile || undefined;
  }
  get subjects(): Subject[] {
    return this.props.subjects || [];
  }
}
