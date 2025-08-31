import { useContext, useEffect } from "react"
import { AlertCircleIcon, PaperclipIcon, UploadIcon, XIcon } from "lucide-react"
import { ThemeContext } from "../contexts/ThemeContext";
import { formatBytes, useFileUpload, } from "../hooks/useFileUpload"

const  FileUploader = ({setNewData}) => {

 const { theme } = useContext(ThemeContext);

  const maxSize = 10 * 1024 * 1024 // 10MB default

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    maxSize
  })

  const file = files[0]

  useEffect(()=>{
    
    if(file)
      setNewData((prev) => ({
        ...prev,
        file: file.file,
      }));
  },[file])

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="shadow-lg bg-dark-gray border-input hover:bg-gray-600 data-[dragging=true]:bg-gray-600 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-lg  p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px] cursor-pointer"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload file"
          disabled={Boolean(file)}
          required
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div
            className=" mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border border-white"
            aria-hidden="true"
          >
            <UploadIcon color={theme === "dark" ? "white": "black"} className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 text-sm font-medium text-black dark:text-white">Upload announcement</p>
          <p className="text-gray-400 text-xs">
            Drag & drop or click to browse (max. {formatBytes(maxSize)})
          </p>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}
      {file && (
        <div className="space-y-2">
          <div
            key={file.id}
            className="flex items-center justify-between gap-2 rounded-lg border border-black dark:border-white px-4 py-2"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <PaperclipIcon
                className="size-4 shrink-0 opacity-60"
                aria-hidden="true"
                color={theme === "dark" ? "white":"black"}
              />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium dark:text-white">
                  {file.file.name}
                </p>
              </div>
            </div>

            <button
              size="icon"
              variant="ghost"
              className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
              onClick={() => removeFile(files[0]?.id)}
              aria-label="Remove file"
            >
              <XIcon className="size-4" color={theme === "dark" ? "white":"black"} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      
    </div>
  )
}

export default FileUploader;