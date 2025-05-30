import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MeetAILogo } from "@/components/custom/Logo";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/20">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <MeetAILogo size={32} animated />
            <span className="text-xl font-semibold text-slate-900">MeetAI</span>
          </Link>
          <Link href="/sign-in">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-300 hover:bg-slate-50"
            >
              Fazer Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 px-8 md:px-12 py-12">
            <div className="absolute inset-0 opacity-30">
              <div className="h-full w-full bg-[length:60px_60px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_2px,transparent_2px)]" />
            </div>

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full backdrop-blur-sm">
                  <span className="text-sm font-medium text-emerald-100 tracking-wide">
                    PROJETO EM DESENVOLVIMENTO ATIVO
                  </span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                Termos de Serviço
              </h1>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="h-1 w-1 bg-slate-400 rounded-full" />
                <span className="text-sm">
                  Última atualização: {new Date().toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 md:px-12 py-12">
            <div className="prose prose-slate max-w-none">
              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-violet-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Sobre o MeetAI
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200/50 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-blue-500/10 border border-blue-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="h-6 w-6 bg-blue-500 rounded-md" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">
                        Projeto Experimental
                      </h4>
                      <p className="text-blue-800 text-sm leading-relaxed">
                        O MeetAI é um projeto experimental de código aberto em
                        desenvolvimento ativo, criado para demonstrar
                        capacidades avançadas de IA em videoconferência.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed mb-4">
                  Ao utilizar o MeetAI, você reconhece que este é um{" "}
                  <strong className="text-slate-900">
                    projeto em desenvolvimento
                  </strong>{" "}
                  e concorda com os termos estabelecidos. O MeetAI é uma
                  plataforma experimental que combina videoconferência com
                  tecnologias de IA avançadas.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Este projeto utiliza tecnologias de ponta, incluindo APIs da
                  OpenAI, e foi desenvolvido com base em código aberto
                  licenciado, visando democratizar o acesso a ferramentas de IA
                  para comunicação.
                </p>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Tecnologias e Recursos
                  </h2>
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">
                  O MeetAI integra as seguintes tecnologias avançadas:
                </p>

                <div className="grid gap-4 mb-6">
                  {[
                    {
                      title: "APIs da OpenAI",
                      desc: "Para transcrição, análise de sentimentos e geração de resumos",
                      color: "emerald",
                    },
                    {
                      title: "WebRTC",
                      desc: "Para comunicação de vídeo em tempo real",
                      color: "blue",
                    },
                    {
                      title: "IA Conversacional",
                      desc: "Processamento de linguagem natural avançado",
                      color: "violet",
                    },
                    {
                      title: "Análise Preditiva",
                      desc: "Insights automáticos sobre dinâmicas de reunião",
                      color: "purple",
                    },
                    {
                      title: "Síntese de Voz",
                      desc: "Recursos de texto para fala em múltiplos idiomas",
                      color: "indigo",
                    },
                  ].map((tech, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-r from-${tech.color}-50 to-${tech.color}-50/50 border border-${tech.color}-200/50 rounded-xl p-4 hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-3 w-3 bg-${tech.color}-500 rounded-full`}
                        />
                        <div>
                          <h4
                            className={`font-semibold text-${tech.color}-900`}
                          >
                            {tech.title}
                          </h4>
                          <p className={`text-${tech.color}-700 text-sm`}>
                            {tech.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-amber-500/10 border border-amber-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="h-1 w-6 bg-amber-500 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-2">
                        Nota Importante
                      </h4>
                      <p className="text-amber-800 text-sm leading-relaxed">
                        Como projeto em desenvolvimento, recursos podem ser
                        modificados, adicionados ou removidos sem aviso prévio.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Licenciamento e Código Aberto
                  </h2>
                </div>

                <p className="text-slate-700 leading-relaxed mb-4">
                  O MeetAI é construído sobre:
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    "Código base licenciado sob termos de código aberto",
                    "Bibliotecas e frameworks open source da comunidade",
                    "Contribuições de desenvolvedores independentes",
                    "APIs e serviços de terceiros (OpenAI, etc.)",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>

                <p className="text-slate-700 leading-relaxed">
                  Respeitamos todas as licenças de código aberto utilizadas e
                  contribuímos de volta para a comunidade sempre que possível.
                </p>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Responsabilidade do Usuário
                  </h2>
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">
                  Como usuário de uma plataforma experimental, você concorda em:
                </p>

                <div className="grid gap-3 mb-6">
                  {[
                    "Usar o serviço apenas para fins de teste e experimentação",
                    "Não confiar exclusivamente na plataforma para reuniões críticas",
                    "Reportar bugs e problemas através dos canais apropriados",
                    "Respeitar outros usuários e suas privacidades",
                    "Não tentar explorar vulnerabilidades do sistema",
                    "Compreender que o serviço pode ter interrupções",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="h-2 w-2 bg-teal-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Modelo de Cobrança e Transparência Financeira
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-emerald-500/10 border border-emerald-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="h-6 w-6 bg-emerald-500 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-900 mb-2">
                        Serviço Experimental Pago
                      </h4>
                      <p className="text-emerald-800 text-sm leading-relaxed">
                        Embora seja um projeto experimental, o MeetAI opera como
                        um serviço pago devido aos custos operacionais
                        significativos envolvidos em tecnologias de IA
                        avançadas.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Justificativa dos Custos
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Nossa estrutura de cobrança é transparente e reflete custos
                  operacionais reais:
                </p>

                <div className="grid gap-4 mb-6">
                  {[
                    {
                      title: "APIs da OpenAI",
                      desc: "Processamento de IA, transcrições e análises em tempo real",
                      cost: "~70% dos custos",
                      color: "blue",
                    },
                    {
                      title: "Infraestrutura Cloud",
                      desc: "Servidores, CDN, armazenamento e largura de banda",
                      cost: "~20% dos custos",
                      color: "violet",
                    },
                    {
                      title: "Desenvolvimento",
                      desc: "Manutenção, atualizações e melhorias contínuas",
                      cost: "~10% dos custos",
                      color: "indigo",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-r from-${item.color}-50 to-${item.color}-50/50 border border-${item.color}-200/50 rounded-xl p-4`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-3 w-3 bg-${item.color}-500 rounded-full`}
                          />
                          <div>
                            <h4
                              className={`font-semibold text-${item.color}-900`}
                            >
                              {item.title}
                            </h4>
                            <p className={`text-${item.color}-700 text-sm`}>
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-medium text-${item.color}-600 bg-${item.color}-100 px-2 py-1 rounded-full`}
                        >
                          {item.cost}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Política de Cobrança Experimental
                </h3>
                <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-2xl p-6 space-y-4">
                  <div className="space-y-3">
                    {[
                      "Cobrança baseada exclusivamente em uso efetivo de recursos",
                      "Sem taxas de setup ou mensalidades fixas durante fase experimental",
                      "Preços transparentes e calculados em tempo real",
                      "Créditos de cortesia para novos usuários testarem a plataforma",
                      "Reembolsos parciais disponíveis para falhas técnicas documentadas",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="h-2 w-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-slate-700">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-start gap-3">
                      <div className="h-4 w-4 bg-amber-500 rounded-sm mt-0.5 flex-shrink-0" />
                      <p className="text-slate-600 text-sm">
                        <strong>Importante:</strong> Como projeto experimental,
                        não garantimos disponibilidade 100%. Cobramos apenas
                        pelos recursos efetivamente utilizados e oferecemos
                        transparência total sobre custos.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-rose-500 to-red-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Limitações e Isenções
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/50 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-red-500/10 border border-red-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="h-6 w-6 border-2 border-red-500 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-900 mb-2">
                        Importante
                      </h4>
                      <p className="text-red-800 text-sm leading-relaxed">
                        Este é um projeto experimental sem garantias de
                        disponibilidade ou suporte técnico formal.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed mb-4">
                  Como projeto em desenvolvimento:
                </p>

                <div className="space-y-3">
                  {[
                    "Não oferecemos SLA (Service Level Agreement)",
                    "Suporte técnico é limitado ou inexistente",
                    "Funcionalidades podem mudar sem aviso",
                    "Não nos responsabilizamos por dados perdidos",
                    "O serviço pode ser descontinuado a qualquer momento",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Contato e Comunidade
                  </h2>
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">
                  Como projeto em desenvolvimento, nossos canais de comunicação
                  são limitados:
                </p>

                <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-2xl p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-slate-900 rounded-xl flex items-center justify-center flex-shrink-0">
                        <div className="h-6 w-6 bg-white rounded-sm" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">
                          Repositório GitHub
                        </h4>
                        <p className="text-slate-600 text-sm">
                          Issues e discussões técnicas
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <div className="h-6 w-6 bg-white rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">
                          Redes Sociais
                        </h4>
                        <p className="text-slate-600 text-sm">
                          Atualizações e novidades
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-start gap-3">
                      <div className="h-4 w-4 bg-amber-500 rounded-sm mt-0.5 flex-shrink-0" />
                      <p className="text-slate-600 text-sm">
                        <strong>Nota:</strong> Não oferecemos suporte técnico
                        individual devido ao status experimental do projeto.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Back Button */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <Link href="/sign-in">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white border-0 shadow-lg">
                  Voltar ao Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/90 backdrop-blur-md mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} MeetAI • Projeto Experimental de Código
            Aberto
          </p>
        </div>
      </footer>
    </div>
  );
}
