import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode';
import { Button, Dialog, Input, Notice, ui } from '@/components/ui';
import { exerciseById } from '@/content/index';
import type { Program } from '@/domain/user';
import { encodeProgram, shareUrl, SHARE_URL_WARN_LENGTH } from '@/share/codec';
import css from './pro.module.css';

/** Génère le lien de partage (et son QR code, calculé localement) d'un programme praticien. */
export function ShareDialog({ program, open, onClose }: { program: Program; open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const url = useMemo(() => {
    try {
      return shareUrl(window.location.origin, encodeProgram(program, (id) => exerciseById.get(id)));
    } catch {
      return '';
    }
  }, [program]);
  const [qr, setQr] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open || !url) return;
    void QRCode.toString(url, { type: 'svg', margin: 1, errorCorrectionLevel: 'L' })
      .then(setQr)
      .catch(() => setQr(''));
  }, [open, url]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* le champ reste sélectionnable manuellement */
    }
  };
  const canShare = typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <Dialog open={open} onClose={onClose} title={t('pro.shareTitle')}>
      <div className={ui.stack}>
        {!url ? (
          <Notice tone="danger">{t('pro.shareError')}</Notice>
        ) : (
          <>
            <p className={ui.muted}>{t('pro.shareHelp')}</p>
            <Input readOnly value={url} onFocus={(e) => e.target.select()} aria-label={t('pro.shareLink')} />
            <div className={ui.row}>
              <Button icon="copy" onClick={() => void copy()}>
                {copied ? t('pro.copied') : t('pro.copy')}
              </Button>
              {canShare && (
                <Button
                  variant="secondary"
                  icon="share"
                  onClick={() => void navigator.share({ title: program.title, text: t('pro.shareText', { title: program.title }), url }).catch(() => {})}
                >
                  {t('pro.share')}
                </Button>
              )}
            </div>
            {url.length > SHARE_URL_WARN_LENGTH && <Notice tone="warning">{t('pro.tooLong')}</Notice>}
            {qr && <div className={css.qr} role="img" aria-label={t('pro.qrAlt')} dangerouslySetInnerHTML={{ __html: qr }} />}
            <p className={ui.muted}>{t('pro.sharePrivacy')}</p>
          </>
        )}
      </div>
    </Dialog>
  );
}
