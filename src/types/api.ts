export interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    organizationId: string;
  };
}

export interface Organization {
  id: string;
  name: string;
  cnpj: string;
  sector: string;
  createdAt: string;
}

export interface IssueCategory {
  id: string;
  name: string;
  description: string;
}

export interface DiagnosticReport {
  id: string;
  organizationId: string;
  score: number;
  status: 'vermelho' | 'amarelo' | 'verde';
  createdAt: string;
  issues: IssueCategory[];
}