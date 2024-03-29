import { FileExtension, MimeType } from "../value-objects";
import { Entity, Post } from ".";

export interface IFileProps {
  id: string;
  mimeType: MimeType;
  path: string;
  name: string;
  extension: FileExtension;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  isDeleted: boolean;

  post?: Post;
}

export class File extends Entity<IFileProps> {
  constructor(props: IFileProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get mimeType(): MimeType {
    return this.props.mimeType;
  }

  get path(): string {
    return this.props.path;
  }

  get name(): string {
    return this.props.name;
  }

  get extension(): FileExtension {
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

  get post(): Post | undefined {
    return this.props.post;
  }
}
