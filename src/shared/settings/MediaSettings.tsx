import { FileAudio, FileVideo, X } from 'lucide-react';
import { useState } from 'react';
import { useCreatorStore } from '@/app/stores/creator';
import { Button, Card, FileDropzone, IconButton, toast } from '@/components';
import { formatFileSize } from '@/lib/utils';
import { PageShell } from '../PageShell';

/** SET-03 — Media Management: the reel library; the first asset is the headline reel. */
export default function MediaSettings() {
  const { media, addMedia, removeMedia } = useCreatorStore();
  const [draft, setDraft] = useState<File | null>(null);

  const upload = () => {
    if (!draft) return;
    addMedia({
      id: crypto.randomUUID(),
      kind: draft.type.startsWith('audio/') ? 'audio' : 'video',
      url: URL.createObjectURL(draft),
      sizeBytes: draft.size,
    });
    setDraft(null);
    toast.success('Uploaded', 'On the storefront it goes.');
  };

  return (
    <PageShell title="Media">
      <FileDropzone
        label="Add a Performance / Showcase Reel"
        file={draft}
        onChange={setDraft}
      />
      <Button disabled={!draft} onClick={upload} size="md">
        Upload
      </Button>

      <section className="flex flex-col gap-3" aria-label="Your media">
        {media.length === 0 ? (
          <Card className="border border-dashed border-border-control bg-surface-2 shadow-none">
            <p className="text-body text-muted">
              Nothing in the library yet — your headline reel appears first on the storefront.
            </p>
          </Card>
        ) : (
          media.map((asset, index) => (
            <Card key={asset.id} className="flex items-center gap-3">
              {asset.kind === 'audio' ? (
                <FileAudio size={22} aria-hidden="true" className="shrink-0 text-accent" />
              ) : (
                <FileVideo size={22} aria-hidden="true" className="shrink-0 text-accent" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-body font-medium text-ink">
                  {asset.kind === 'audio' ? 'Audio reel' : 'Video reel'}
                  {index === 0 && <span className="text-accent-text"> · headline</span>}
                </p>
                <p className="font-mono text-small text-muted">{formatFileSize(asset.sizeBytes)}</p>
              </div>
              <IconButton aria-label="Remove reel" onClick={() => removeMedia(asset.id)}>
                <X size={16} aria-hidden="true" />
              </IconButton>
            </Card>
          ))
        )}
      </section>
    </PageShell>
  );
}
