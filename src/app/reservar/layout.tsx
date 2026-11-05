import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reservar Turno | Aixa Nails - Zona Norte',
  description:
    'Elegí tu servicio, día y horario para tu cita de manicura a domicilio con Aixa Nails en Zona Norte.',
};

export default function ReservarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
