import { Especialidade } from './especialidade';
import { Regional } from './regional';

export class Entidade {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  dataInauguracao: Date;
  Ativa: boolean;
  regional: Regional;
  especialidades: Especialidade[];
}
