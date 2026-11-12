/** Atalho de teclado para pular a navegação repetida e chegar ao conteúdo. */
export function SkipLink() {
  return (
    <a
      href="#conteudo"
      className="sr-only rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-background"
    >
      Pular para o conteúdo
    </a>
  )
}
