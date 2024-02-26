export type FilesTableItemProps = {
    file: File;
    files?: File[];
    removeFile: (path: string) => void;
    className?: string;
}