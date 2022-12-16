import { Entity, Post, Student, Teacher } from ".";

export interface IProfileProps {
    id: string;
    email: string;
    password: string;
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
    constructor (props: IProfileProps) {
        super(props);
    }

    get id(): string {
        return this.props.id;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): string {
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
