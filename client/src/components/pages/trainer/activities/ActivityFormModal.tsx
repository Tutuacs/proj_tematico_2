'use client';

import { useEffect, useMemo, useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

export type ActivityPayload = {
  name: string;
  type: 'CARDIO' | 'FORCA' | 'MOBILIDADE';
  description?: string;
  weight?: number | null;
  sets?: number | null;
  reps?: number | null;
  duration?: number | null; // em minutos
};

type Props = {
  open: boolean;
  onClose: () => void;
  initialData?: (ActivityPayload & { id: string }) | undefined;
  onSubmit: (data: ActivityPayload) => void;
};

export default function ActivityFormModal({
  open,
  onClose,
  initialData,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<ActivityPayload>({
    name: '',
    type: 'FORCA',
    description: '',
    weight: null,
    sets: null,
    reps: null,
    duration: null,
  });

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setForm({ ...rest });
    } else {
      setForm({
        name: '',
        type: 'FORCA',
        description: '',
        weight: null,
        sets: null,
        reps: null,
        duration: null,
      });
    }
  }, [initialData, open]);

  const title = useMemo(
    () => (initialData ? 'Editar Atividade' : 'Nova Atividade'),
    [initialData]
  );

  const handleChange = (key: keyof ActivityPayload, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleNumber = (key: keyof ActivityPayload, v: string) =>
    handleChange(key, v ? Number(v) : null);

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Esquerda */}
        <div className="space-y-4">
          <Input
            label="Nome Atividade"
            placeholder="Ex.: Supino reto"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />

          <Select
            label="Tipo"
            value={form.type}
            onChange={(v) =>
              handleChange('type', v as ActivityPayload['type'])
            }
            options={[
              { label: 'Força', value: 'FORCA' },
              { label: 'Cardio', value: 'CARDIO' },
              { label: 'Mobilidade', value: 'MOBILIDADE' },
            ]}
          />

          <Input
            label="Descrição"
            placeholder="Opcional"
            value={form.description ?? ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        {/* Direita */}
        <div className="space-y-4">
          <Input
            label="Peso (kg)"
            type="number"
            value={form.weight ?? ''}
            onChange={(e) => handleNumber('weight', e.target.value)}
          />
          <Input
            label="Séries"
            type="number"
            value={form.sets ?? ''}
            onChange={(e) => handleNumber('sets', e.target.value)}
          />
          <Input
            label="Repetições"
            type="number"
            value={form.reps ?? ''}
            onChange={(e) => handleNumber('reps', e.target.value)}
          />
          <Input
            label="Duração (min)"
            type="number"
            value={form.duration ?? ''}
            onChange={(e) => handleNumber('duration', e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => onSubmit(form)}
          className="rounded-lg bg-slate-900 px-6 py-2 text-white hover:bg-slate-800"
        >
          {initialData ? 'Salvar alterações' : 'Cadastrar/Salvar'}
        </button>
      </div>
    </Modal>
  );
}