import { IAvailableFileMediaTypes } from "@/types";
import { Entity } from ".";

export interface IFileProps {
    id: string;
    mediaType: IAvailableFileMediaTypes;
    path: string;
    name: string;
    extension: string;

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    isDeleted: boolean;
}

export class File extends Entity<IFileProps> {
    constructor (props: IFileProps) {
        super(props);
    }

    get id(): string {
        return this.props.id;
    }

    get mediaType(): IAvailableFileMediaTypes {
        return this.props.mediaType;
    }

    get path(): string {
        return this.props.path;
    }

    get name(): string {
        return this.props.name;
    }

    get extension(): string {
        return this.props.extension;
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
