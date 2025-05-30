import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MeetAILogo } from "@/components/custom/Logo";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/20">
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
          <div className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 px-8 md:px-12 py-12">
            <div className="absolute inset-0 opacity-30">
              <div className="h-full w-full bg-[length:40px_40px] bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1)_1px,transparent_1px)]" />
            </div>

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
                <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm">
                  <span className="text-sm font-medium text-cyan-100 tracking-wide">
                    TRANSPARÊNCIA EM IA E PRIVACIDADE
                  </span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                Política de Privacidade
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
                  <div className="h-8 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Compromisso com Privacidade
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/50 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-purple-500/10 border border-purple-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="h-6 w-6 bg-purple-500 rounded-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-2">
                        Projeto Experimental
                      </h4>
                      <p className="text-purple-800 text-sm leading-relaxed">
                        O MeetAI é um projeto experimental que prioriza
                        transparência sobre como dados são processados por
                        tecnologias de IA.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed mb-4">
                  Esta Política de Privacidade descreve como o MeetAI, um{" "}
                  <strong className="text-slate-900">
                    projeto experimental de código aberto
                  </strong>
                  , coleta, processa e protege suas informações ao utilizar
                  tecnologias avançadas de IA, incluindo APIs da OpenAI.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Como projeto em desenvolvimento, nossa abordagem prioriza{" "}
                  <strong className="text-slate-900">
                    transparência máxima
                  </strong>{" "}
                  sobre limitações técnicas e comerciais, em conformidade com
                  LGPD e boas práticas de privacidade em IA.
                </p>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-orange-500 to-red-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Integração com APIs de IA (OpenAI)
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-orange-500/10 border border-orange-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="h-6 w-6 border-2 border-orange-500 rounded-md" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">
                        Importante
                      </h4>
                      <p className="text-orange-800 text-sm leading-relaxed">
                        Utilizamos APIs externas da OpenAI para processamento de
                        IA. Seus dados podem ser processados nos servidores da
                        OpenAI conforme suas políticas.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Dados Processados pela OpenAI
                </h3>
                <div className="grid gap-3 mb-6">
                  {[
                    {
                      title: "Transcrições de áudio",
                      desc: "Convertidas em texto em tempo real",
                      color: "emerald",
                    },
                    {
                      title: "Análise de texto",
                      desc: "Para extração de insights e sentimentos",
                      color: "blue",
                    },
                    {
                      title: "Geração de resumos",
                      desc: "Sínteses automáticas de reuniões",
                      color: "violet",
                    },
                    {
                      title: "Processamento de linguagem",
                      desc: "Para recursos conversacionais",
                      color: "purple",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-r from-${item.color}-50 to-${item.color}-50/50 border border-${item.color}-200/50 rounded-xl p-4`}
                    >
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
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Controles de Privacidade com IA
                </h3>
                <div className="space-y-3 mb-6">
                  {[
                    "Processamento temporal (dados não são armazenados permanentemente pela IA)",
                    "Você pode desabilitar recursos de IA a qualquer momento",
                    "Transcrições locais disponíveis quando possível",
                    "Controle granular sobre quais dados são enviados para processamento",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="h-2 w-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Dados Coletados e Processados
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/50 rounded-2xl p-6">
                    <div className="h-12 w-12 bg-emerald-500/10 border border-emerald-200/50 rounded-xl flex items-center justify-center mb-4">
                      <div className="h-6 w-6 bg-emerald-500 rounded-sm" />
                    </div>
                    <h3 className="font-semibold text-emerald-900 mb-3">
                      Dados de Conta (Mínimos)
                    </h3>
                    <ul className="space-y-2 text-sm text-emerald-800">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                        Email e nome (apenas para autenticação)
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                        Preferências básicas de usuário
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                        Configurações de privacidade e IA
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6">
                    <div className="h-12 w-12 bg-blue-500/10 border border-blue-200/50 rounded-xl flex items-center justify-center mb-4">
                      <div className="h-6 w-6 bg-blue-500 rounded-full" />
                    </div>
                    <h3 className="font-semibold text-blue-900 mb-3">
                      Dados de Sessão (Temporários)
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        Áudio/vídeo processado em tempo real
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        Transcrições temporárias (deletadas após sessão)
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        Metadados básicos de reunião
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200/50 rounded-2xl p-6">
                    <div className="h-12 w-12 bg-violet-500/10 border border-violet-200/50 rounded-xl flex items-center justify-center mb-4">
                      <div className="h-6 w-6 bg-violet-500 rounded-lg" />
                    </div>
                    <h3 className="font-semibold text-violet-900 mb-3">
                      Dados Técnicos (Analytics Básicos)
                    </h3>
                    <ul className="space-y-2 text-sm text-violet-800">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-violet-500 rounded-full mt-1.5 flex-shrink-0" />
                        Logs de erro para debugging
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-violet-500 rounded-full mt-1.5 flex-shrink-0" />
                        Métricas de performance (anônimas)
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-violet-500 rounded-full mt-1.5 flex-shrink-0" />
                        Dados de uso para melhorias
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Finalidades e Base Legal
                  </h2>
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">
                  Processamos dados exclusivamente para:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-8 bg-green-500/10 border border-green-200/50 rounded-lg flex items-center justify-center">
                        <div className="h-4 w-4 bg-green-500 rounded-sm" />
                      </div>
                      <h4 className="font-semibold text-green-900">
                        Legítimo Interesse
                      </h4>
                    </div>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li className="flex items-start gap-2">
                        <div className="h-1 w-1 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        Operação da plataforma
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1 w-1 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        Melhorias técnicas
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1 w-1 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        Segurança e debugging
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-8 bg-blue-500/10 border border-blue-200/50 rounded-lg flex items-center justify-center">
                        <div className="h-4 w-4 bg-blue-500 rounded-full" />
                      </div>
                      <h4 className="font-semibold text-blue-900">
                        Consentimento
                      </h4>
                    </div>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start gap-2">
                        <div className="h-1 w-1 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        Processamento por IA
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1 w-1 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        Recursos experimentais
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1 w-1 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        Analytics opcionais
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Dados Financeiros e Cobrança
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-emerald-500/10 border border-emerald-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="h-6 w-6 bg-emerald-500 rounded-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-900 mb-2">
                        Transparência Financeira
                      </h4>
                      <p className="text-emerald-800 text-sm leading-relaxed">
                        Mesmo sendo experimental, processamos dados de cobrança
                        devido aos custos operacionais reais de APIs de IA e
                        infraestrutura avançada.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Dados de Cobrança Processados
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6">
                    <div className="h-12 w-12 bg-blue-500/10 border border-blue-200/50 rounded-xl flex items-center justify-center mb-4">
                      <div className="h-6 w-6 bg-blue-500 rounded-sm" />
                    </div>
                    <h4 className="font-semibold text-blue-900 mb-3">
                      Dados Mínimos de Pagamento
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        Últimos 4 dígitos do cartão (apenas para identificação)
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        País de cobrança (para conformidade fiscal)
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        Histórico de transações (apenas metadados)
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-6">
                    <div className="h-12 w-12 bg-green-500/10 border border-green-200/50 rounded-xl flex items-center justify-center mb-4">
                      <div className="h-6 w-6 bg-green-500 rounded-full" />
                    </div>
                    <h4 className="font-semibold text-green-900 mb-3">
                      Dados de Uso para Cobrança
                    </h4>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                        Minutos de IA processados
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                        Volume de transcrições geradas
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                        Recursos de IA utilizados (análise, resumos)
                      </li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Processadores de Pagamento Terceirizados
                </h3>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-orange-500/10 border border-orange-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="h-6 w-6 border-2 border-orange-500 rounded-md" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">
                        Dados Financeiros Terceirizados
                      </h4>
                      <p className="text-orange-800 text-sm leading-relaxed mb-3">
                        Utilizamos processadores de pagamento certificados
                        PCI-DSS. Não armazenamos dados completos de cartão em
                        nossos servidores.
                      </p>
                      <div className="space-y-2 text-sm text-orange-700">
                        <div className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                          <span>
                            <strong>Stripe:</strong> Processamento principal de
                            cartões e assinaturas
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                          <span>
                            <strong>PayPal:</strong> Processamento alternativo e
                            carteiras digitais
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Políticas de Retenção Financeira
                </h3>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-4 text-center">
                    <div className="h-12 w-12 bg-blue-500/10 border border-blue-200/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <div className="text-lg font-bold text-blue-600">7</div>
                    </div>
                    <h4 className="font-semibold text-blue-900 mb-1">Anos</h4>
                    <p className="text-xs text-blue-700">
                      Dados fiscais (conforme legislação)
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-4 text-center">
                    <div className="h-12 w-12 bg-green-500/10 border border-green-200/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <div className="text-lg font-bold text-green-600">90</div>
                    </div>
                    <h4 className="font-semibold text-green-900 mb-1">Dias</h4>
                    <p className="text-xs text-green-700">
                      Logs de transação (para suporte)
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200/50 rounded-2xl p-4 text-center">
                    <div className="h-12 w-12 bg-violet-500/10 border border-violet-200/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <div className="text-lg font-bold text-violet-600">
                        30
                      </div>
                    </div>
                    <h4 className="font-semibold text-violet-900 mb-1">Dias</h4>
                    <p className="text-xs text-violet-700">
                      Dados de uso para faturamento
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-slate-500/10 border border-slate-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="h-6 w-6 bg-slate-500 rounded-sm" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Compromisso com Transparência
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Fornecemos dashboards detalhados de uso e cobrança em
                        tempo real. Como projeto experimental, oferecemos
                        flexibilidade na cobrança e reembolsos quando
                        tecnicamente justificados.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-red-500 to-pink-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Compartilhamento e Terceiros
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-red-500/10 border border-red-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="h-6 w-6 border-2 border-red-500 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-900 mb-2">
                        Transparência
                      </h4>
                      <p className="text-red-800 text-sm leading-relaxed">
                        Como projeto experimental, temos limitações para
                        auditoria completa de terceiros.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Terceiros Essenciais
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          title: "OpenAI",
                          desc: "Para processamento de IA (sujeito às políticas da OpenAI)",
                        },
                        {
                          title: "Provedores de infraestrutura",
                          desc: "Para hospedagem e CDN",
                        },
                        {
                          title: "Serviços de autenticação",
                          desc: "Para login seguro",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="h-2 w-2 bg-slate-500 rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-slate-900">
                              {item.title}
                            </h4>
                            <p className="text-slate-600 text-sm">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Não Compartilhamos
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Dados pessoais para marketing",
                        "Informações com parceiros comerciais",
                        "Dados para fins não relacionados ao serviço",
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
                        >
                          <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-slate-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Seus Direitos (LGPD)
                  </h2>
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">
                  Como titular de dados, você possui os seguintes direitos:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Acesso",
                        desc: "Visualizar todos os dados que processamos",
                      },
                      {
                        title: "Correção",
                        desc: "Atualizar informações incorretas",
                      },
                      { title: "Exclusão", desc: "Solicitar remoção de dados" },
                    ].map((right, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200/50 rounded-xl"
                      >
                        <div className="h-8 w-8 bg-teal-500/10 border border-teal-200/50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <div className="h-3 w-3 bg-teal-500 rounded-sm" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-teal-900">
                            {right.title}
                          </h4>
                          <p className="text-teal-700 text-sm">{right.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: "Portabilidade", desc: "Exportar seus dados" },
                      { title: "Oposição", desc: "Opor-se ao processamento" },
                      {
                        title: "Informação",
                        desc: "Transparência sobre processamento",
                      },
                    ].map((right, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200/50 rounded-xl"
                      >
                        <div className="h-8 w-8 bg-teal-500/10 border border-teal-200/50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <div className="h-3 w-3 bg-teal-500 rounded-full" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-teal-900">
                            {right.title}
                          </h4>
                          <p className="text-teal-700 text-sm">{right.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200/50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-teal-500/10 border border-teal-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="h-6 w-6 bg-teal-500 rounded-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-900 mb-2">
                        Como Exercer
                      </h4>
                      <p className="text-teal-800 text-sm leading-relaxed">
                        Utilize as configurações da conta ou entre em contato
                        através do GitHub Issues (método principal devido ao
                        status experimental).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Segurança e Limitações
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200/50 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-yellow-500/10 border border-yellow-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="h-6 w-6 border-2 border-yellow-500 rounded-sm" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-2">
                        Limitações de Segurança
                      </h4>
                      <p className="text-yellow-800 text-sm leading-relaxed">
                        Como projeto experimental, nossas medidas de segurança
                        são básicas, adequadas para testes, mas não para dados
                        sensíveis.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Medidas Implementadas
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Criptografia em trânsito (HTTPS/TLS)",
                        "Autenticação básica protegida",
                        "Limpeza automática de dados temporários",
                        "Logs de acesso básicos",
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
                        >
                          <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-slate-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Limitações Reconhecidas
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Sem auditoria de segurança profissional",
                        "Recursos de monitoramento limitados",
                        "Equipe pequena para resposta a incidentes",
                        "Dependência de terceiros (OpenAI, infraestrutura)",
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg"
                        >
                          <div className="h-2 w-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-slate-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Retenção de Dados
                  </h2>
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">
                  Nossa política de retenção é minimalista:
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-6 text-center">
                    <div className="h-16 w-16 bg-green-500/10 border border-green-200/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <div className="text-2xl font-bold text-green-600">0</div>
                    </div>
                    <h4 className="font-semibold text-green-900 mb-2">Dias</h4>
                    <p className="text-sm text-green-700 font-medium mb-1">
                      Transcrições temporárias
                    </p>
                    <p className="text-xs text-green-600">
                      Deletadas após sessão
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 text-center">
                    <div className="h-16 w-16 bg-blue-500/10 border border-blue-200/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <div className="text-2xl font-bold text-blue-600">30</div>
                    </div>
                    <h4 className="font-semibold text-blue-900 mb-2">Dias</h4>
                    <p className="text-sm text-blue-700 font-medium mb-1">
                      Logs de sistema
                    </p>
                    <p className="text-xs text-blue-600">
                      Para debugging apenas
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200/50 rounded-2xl p-6 text-center">
                    <div className="h-16 w-16 bg-purple-500/10 border border-purple-200/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <div className="text-lg font-bold text-purple-600">∞</div>
                    </div>
                    <h4 className="font-semibold text-purple-900 mb-2">
                      Até exclusão
                    </h4>
                    <p className="text-sm text-purple-700 font-medium mb-1">
                      Dados de conta
                    </p>
                    <p className="text-xs text-purple-600">
                      Controlado por você
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Cookies e Tecnologias
                  </h2>
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">
                  Utilizamos tecnologias mínimas essenciais:
                </p>

                <div className="space-y-4 mb-6">
                  {[
                    {
                      title: "Cookies de Sessão",
                      desc: "Manter login ativo",
                      type: "Essencial",
                      color: "green",
                    },
                    {
                      title: "Preferências Locais",
                      desc: "Configurações do usuário",
                      type: "Essencial",
                      color: "green",
                    },
                    {
                      title: "Analytics Básicos",
                      desc: "Métricas anônimas de uso",
                      type: "Opcional",
                      color: "blue",
                    },
                  ].map((cookie, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-3 w-3 bg-${cookie.color}-500 rounded-full`}
                        />
                        <div>
                          <h4 className="font-medium text-slate-900">
                            {cookie.title}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {cookie.desc}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          cookie.color === "green"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {cookie.type}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-slate-500 to-gray-500 rounded-full flex-shrink-0 mt-1" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-0">
                    Contato e Transparência
                  </h2>
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">
                  Para exercer direitos ou esclarecer dúvidas sobre privacidade:
                </p>

                <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-2xl p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-slate-900 rounded-xl flex items-center justify-center flex-shrink-0">
                        <div className="h-6 w-6 bg-white rounded-sm" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">
                          GitHub Issues
                        </h4>
                        <p className="text-slate-600 text-sm">
                          Canal principal para questões de privacidade
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <div className="h-6 w-6 bg-white rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">
                          Comunidade
                        </h4>
                        <p className="text-slate-600 text-sm">
                          Discussões públicas sobre privacidade
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-start gap-3">
                      <div className="h-4 w-4 bg-amber-500 rounded-sm mt-0.5 flex-shrink-0" />
                      <p className="text-slate-600 text-sm">
                        <strong>Limitação de Suporte:</strong> Como projeto
                        experimental, não oferecemos suporte de privacidade
                        24/7. Respondemos conforme disponibilidade da equipe de
                        desenvolvimento.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Back Button */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <Link href="/sign-in">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg">
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
            © {new Date().getFullYear()} MeetAI • Privacidade Transparente em IA
            Experimental
          </p>
        </div>
      </footer>
    </div>
  );
}
