'use client';

import React, { useEffect, useState } from 'react';
import { buildWhatsAppUrl, fetchSiteSettings } from '@/lib/siteSettings';

/** Teléfono de WhatsApp configurado por Aixa en el panel (null mientras carga o si no hay). */
export function useWhatsAppPhone(): string | null {
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchSiteSettings().then((settings) => {
      if (active) setPhone(settings?.whatsapp_phone ?? null);
    });
    return () => {
      active = false;
    };
  }, []);

  return phone;
}

type WhatsAppLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  /** Mensaje pre-cargado (texto plano, se codifica automáticamente). */
  text: string;
};

/** Enlace wa.me que apunta al número real de Aixa configurado en "Ajustes del sitio". */
export default function WhatsAppLink({ text, children, ...rest }: WhatsAppLinkProps) {
  const phone = useWhatsAppPhone();
  return (
    <a href={buildWhatsAppUrl(text, phone)} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
