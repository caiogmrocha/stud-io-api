import { Entity } from ".";

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
}
