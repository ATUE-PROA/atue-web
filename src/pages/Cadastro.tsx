import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { mockLogin } from '../mocks/api';

const cadastroSchema = z.object({
    nome: z.string().min(3, "O nome precisa ter pelo menos 3 letras"),
    email: z.string().email("Digite um e-mail válido"),
    senha: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
    empresa: z.string().min(2, "O nome da empresa é obrigatório"),
});

type CadastroForm = z.infer<typeof cadastroSchema>;

export function Cadastro() {
    const [carregando, setCarregando] = useState(false);
    const [sucesso, setSucesso] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CadastroForm>({
        resolver: zodResolver(cadastroSchema),
    });

    const onSubmit = async (dados: CadastroForm) => {
        setCarregando(true);
        setSucesso(false);

        try {
            const resposta = await mockLogin();
            console.log("Sucesso! Token mockado recebido:", resposta.token);

            //Aqui, depois salvar o token no Context API
            setSucesso(true);
        } catch (error) {
            console.error("Erro no cadastro", error);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-card text-card-foreground rounded-xl border shadow-sm">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Cadastro ATUE</h1>
                    <p className="text-muted-foreground text-sm mt-2">Crie a conta da sua empresa</p>
                </div>

                {sucesso && (
                    <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm text-center">
                        Cadastro simulado com sucesso!
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Seu Nome</label>
                        <input
                            {...register("nome")}
                            className="w-full mt-1 p-2 border rounded-md bg-transparent"
                            placeholder="Nome e Sobrenome"
                        />
                        {errors.nome && <span className="text-red-500 text-xs">{errors.nome.message}</span>}
                    </div>

                    <div>
                        <label className="text-sm font-medium">E-mail</label>
                        <input
                            {...register("email")}
                            className="w-full mt-1 p-2 border rounded-md bg-transparent"
                            placeholder="seu@email.com"
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="text-sm font-medium">Nome da Empresa</label>
                        <input
                            {...register("empresa")}
                            className="w-full mt-1 p-2 border rounded-md bg-transparent"
                            placeholder="Minha Empresa LTDA"
                        />
                        {errors.empresa && <span className="text-red-500 text-xs">{errors.empresa.message}</span>}
                    </div>

                    <div>
                        <label className="text-sm font-medium">Senha</label>
                        <input
                            type="password"
                            {...register("senha")}
                            className="w-full mt-1 p-2 border rounded-md bg-transparent"
                            placeholder="******"
                        />
                        {errors.senha && <span className="text-red-500 text-xs">{errors.senha.message}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        {carregando ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}