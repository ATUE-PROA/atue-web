import type { UserToken, DiagnosticReport } from '../types/api';

const mockUserToken: UserToken = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockToken",
  user: {
    id: "user-123",
    name: "Larissa",
    email: "larissa@teste.com",
    organizationId: "org-456"
  }
};

const mockDiagnosticReport: DiagnosticReport = {
  id: "diag-789",
  organizationId: "org-456",
  score: 65,
  status: "amarelo",
  createdAt: new Date().toISOString(),
  issues: [
    { id: "1", name: "Política de Privacidade", description: "Documento não encontrado no site." },
    { id: "2", name: "Cookies", description: "Banner de cookies ausente." }
  ]
};

export const mockLogin = async (): Promise<UserToken> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserToken);
    }, 2000);
  });
};

export const mockGetDiagnostic = async (): Promise<DiagnosticReport> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDiagnosticReport);
    }, 2000);
  });
};