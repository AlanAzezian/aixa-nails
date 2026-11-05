import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reservar Turno | Aixa Nails - San Fernando',
  description:
    'Elegí tu servicio, día y horario para tu cita de manicura en Aixa Nails (Virreyes, San Fernando).',
};

export default function ReservarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
