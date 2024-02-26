export type DragAndDropZoneProps = {
    files: File[];
    removeFile: (name: string) => void;
    addFiles: (files: FileList) => void;
    className?: string;
}