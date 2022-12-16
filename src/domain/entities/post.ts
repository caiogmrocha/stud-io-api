import { Entity, File, Profile, Subject } from ".";

export type IPostProps = {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    isDeleted: boolean;

    profile?: Profile;
    subjects?: Subject[];
    files?: File[];
}

export class Post extends Entity<IPostProps> {
    constructor (props: IPostProps) {
        super(props);
    }

    get id(): string {
        return this.props.id
    }

    get title(): string {
        return this.props.title
    }

    get description(): string {
        return this.props.description
    }

    get createdAt(): Date {
        return this.props.createdAt
    }

    get updatedAt(): Date {
        return this.props.updatedAt
    }

    get deletedAt(): Date | undefined {
        return this.props.deletedAt
    }

    get isDeleted(): boolean {
        return this.props.isDeleted
    }

    get profile(): Profile | undefined {
        return this.props.profile;
    }

    get subjects(): Subject[] {
        return this.props.subjects || [];
    }

    get files(): File[] {
        return this.props.files || [];
    }
}
