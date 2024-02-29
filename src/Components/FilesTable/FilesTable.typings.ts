import { FilesTableItemProps } from "../FilesTableItem";

export type FilesTableProps = {
    files: File[];
    removeFile?: (path: string) => void;
    className?: string;
    isDisabled?: boolean;
}