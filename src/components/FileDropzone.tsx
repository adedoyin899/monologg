import { FileAudio, FileVideo, UploadCloud, X } from 'lucide-react';
import { useRef, useState, type DragEvent } from 'react';
import { cn, formatFileSize } from '@/lib/utils';
import { Button } from './Button';
import { Field } from './Field';
import { IconButton } from './IconButton';

export interface FileDropzoneProps {
  label?: string;
  /** MIME prefixes/types for the file picker + drop validation. */
  accept?: string;
  maxSizeMB?: number;
  /** Overrides the default "Video or audio · up to NMB" helper line. */
  helper?: string;
  file: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  className?: string;
}

function matchesAccept(file: File, accept: string): boolean {
  return accept
    .split(',')
    .map((entry) => entry.trim())
    .some((entry) =>
      entry.endsWith('/*') ? file.type.startsWith(entry.slice(0, -1)) : file.type === entry,
    );
}

/**
 * Performance/Showcase Reel uploader: video/audio, 150MB cap, drag-drop with
 * visible feedback. Keyboard path = the Browse button; errors announce via the
 * field message (icon + text, never color alone).
 */
export function FileDropzone({
  label,
  accept = 'video/*,audio/*',
  maxSizeMB = 150,
  helper,
  file,
  onChange,
  disabled,
  className,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string>();

  const acceptFile = (candidate: File | undefined) => {
    setDragging(false);
    if (!candidate) return;
    if (!matchesAccept(candidate, accept)) {
      setError('That file type won’t play here — video or audio only.');
      return;
    }
    if (candidate.size > maxSizeMB * 1024 * 1024) {
      setError(`A little too much show — keep it under ${maxSizeMB}MB.`);
      return;
    }
    setError(undefined);
    onChange(candidate);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    if (disabled) return;
    acceptFile(event.dataTransfer.files[0]);
  };

  const FilePreviewIcon = file?.type.startsWith('audio/') ? FileAudio : FileVideo;

  return (
    <Field
      label={label}
      error={error}
      success={file ? 'Ready for the spotlight.' : undefined}
      helper={helper ?? `Video or audio · up to ${maxSizeMB}MB`}
      disabled={disabled}
      className={className}
    >
      {({ id, describedBy }) => (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          className={cn(
            'flex cursor-pointer flex-col items-center gap-3 rounded-md border-2 border-dashed bg-surface p-6 text-center transition-colors duration-200 ease-out',
            dragging && 'border-accent bg-surface-2',
            !dragging && error && 'border-error',
            !dragging && !error && file && 'border-success',
            !dragging && !error && !file && 'border-border-control',
            disabled && 'cursor-not-allowed',
          )}
        >
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={accept}
            disabled={disabled}
            aria-describedby={describedBy}
            className="sr-only"
            onChange={(event) => {
              acceptFile(event.target.files?.[0]);
              event.target.value = '';
            }}
          />
          {file ? (
            <div className="flex w-full items-center gap-3 text-left">
              <FilePreviewIcon size={24} aria-hidden="true" className="shrink-0 text-accent" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-body font-medium text-ink">{file.name}</p>
                <p className="font-mono text-small text-muted">{formatFileSize(file.size)}</p>
              </div>
              <IconButton
                aria-label="Remove file"
                disabled={disabled}
                onClick={(event) => {
                  event.stopPropagation();
                  setError(undefined);
                  onChange(null);
                }}
              >
                <X size={16} aria-hidden="true" />
              </IconButton>
            </div>
          ) : (
            <>
              <UploadCloud
                size={28}
                aria-hidden="true"
                className={cn(dragging ? 'text-accent' : 'text-muted')}
              />
              <p className="text-body text-ink">
                {dragging ? 'Drop it — the stage is yours' : 'Drag your reel here, or'}
              </p>
              <Button
                variant="outline"
                size="sm"
                disabled={disabled}
                onClick={(event) => {
                  event.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                Browse files
              </Button>
            </>
          )}
        </div>
      )}
    </Field>
  );
}
