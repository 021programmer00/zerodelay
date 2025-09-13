import React, { useState, useEffect } from 'react';
import { X, Zap, Cpu, HardDrive, Shield, Clock, Users, Star, ChevronDown, ChevronRight, ExternalLink, Disc as Discord } from 'lucide-react';

const CouponModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDiscordRedirect = () => {
    navigator.clipboard.writeText('ZDEAL30');
    window.open('https://discord.gg/cNWypfzT9y', '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10"></div>
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🎁</div>
            <h3 className="text-2xl font-bold text-white mb-2">Bem-vindo — Cupom 30% OFF</h3>
            <div className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent text-lg font-semibold">
              Parabéns! Você ganhou desconto automático
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-cyan-500/30">
            <div className="text-center mb-3">
              <div className="text-3xl font-bold text-white mb-1">ZDEAL30</div>
              <div className="text-gray-300 text-sm">Código do cupom</div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 line-through">De R$ 49,99</span>
              <span className="text-green-400 font-bold">Por R$ 34,99</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-orange-400 font-semibold mb-2">⏰ Oferta expira em:</div>
            <div className="text-2xl font-mono text-white bg-gray-800/50 rounded-lg py-2 px-4 border border-orange-500/30">
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleDiscordRedirect}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Discord size={20} />
              Resgatar no Discord
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "A otimização serve para todos os jogos?",
      answer: "Sim — a otimização é do Windows/sistema e impacta todos os jogos. Não é otimização por jogo específico."
    },
    {
      question: "Vocês causam banimentos?",
      answer: "Não. Não alteramos arquivos de jogos nem mexemos em serviços de anti-cheat. Todas as mudanças são no sistema operacional."
    },
    {
      question: "Preciso ficar presente durante o processo?",
      answer: "É opcional. Você pode acompanhar o processo ou deixar conosco. Fazemos tudo via AnyDesk com total segurança."
    },
    {
      question: "Posso pagar depois do serviço?",
      answer: "Não, o pagamento é antecipado. Após a confirmação do pagamento, você recebe acesso ao Discord para abrir o ticket."
    },
    {
      question: "Quanto tempo demora a otimização?",
      answer: "Entre 30 a 60 minutos, dependendo do estado atual do seu sistema. Você recebe um relatório completo no final."
    },
    {
      question: "Posso fazer formatação?",
      answer: "Sim — oferecemos ISO otimizada por +R$50 ou você pode usar uma ISO padrão do Windows."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800/30 transition-colors"
          >
            <span className="text-white font-semibold">{faq.question}</span>
            {openIndex === index ? (
              <ChevronDown className="text-cyan-400 flex-shrink-0" size={20} />
            ) : (
              <ChevronRight className="text-gray-400 flex-shrink-0" size={20} />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6">
              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-900/20 via-gray-950 to-purple-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent"></div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="https://i.imgur.com/i8qm5mu.jpeg" 
              alt="ZeroDelay Logo" 
              className="h-10 w-10 rounded-lg"
            />
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              ZeroDelay
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="hover:text-cyan-400 transition-colors">Serviços</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-cyan-400 transition-colors">Como Funciona</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-cyan-400 transition-colors">Preços</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-cyan-400 transition-colors">FAQ</button>
          </nav>

          <a
            href="https://discord.gg/cNWypfzT9y"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Discord size={18} />
            Entrar no Discord
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                ZeroDelay
              </span>
              <br />
              <span className="text-white text-4xl md:text-5xl">
                Otimização Gamer & Profissional
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Teste grátis do cupom: <span className="text-green-400 font-bold">30% OFF</span>
            </p>
            <p className="text-lg text-gray-400 mb-8">
              De <span className="line-through">R$49,99</span> por <span className="text-green-400 font-bold text-xl">R$34,99</span> — entre no Discord e resgate agora
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300 mb-12">
              <div className="flex items-center gap-2">
                <Users className="text-cyan-400" size={16} />
                +2700 clientes atendidos
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-purple-400" size={16} />
                Otimização remota via AnyDesk
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-green-400" size={16} />
                Resultados imediatos
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                <Zap size={20} />
                Ganhe 30% OFF — Entrar no Discord
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors border border-gray-600"
              >
                Ver serviços
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">O que fazemos</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Otimização completa do seu PC para máximo desempenho em jogos e aplicações profissionais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Performance Máxima</h3>
              <p className="text-gray-300">Aumentamos FPS e reduzimos input lag com ajustes avançados no sistema.</p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Calibração Profunda</h3>
              <p className="text-gray-300">Ajustes na GPU, CPU, RAM e subsistemas gráficos para máximo rendimento.</p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <HardDrive className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Sistema Enxuto</h3>
              <p className="text-gray-300">Removemos bloatware, caches e processos desnecessários do Windows.</p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-orange-500/30 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Seguro & Confiável</h3>
              <p className="text-gray-300">Nenhuma alteração que provoque ban; backups e total respeito à privacidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Como funciona</h2>
            <p className="text-gray-400 text-lg">Processo simples e rápido em 4 passos</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Pague o ticket", desc: "Clique no botão e efetue o pagamento seguro" },
              { step: "02", title: "Entre no Discord", desc: "Abra ticket e receba recibo automático" },
              { step: "03", title: "Receba link AnyDesk", desc: "Passe o código para acesso remoto" },
              { step: "04", title: "Otimização completa", desc: "Processo em minutos + relatório final" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm">
              💡 Oferecemos <span className="text-cyan-400">ISO otimizada</span> por +R$50 se desejar formatação completa
            </p>
          </div>
        </div>
      </section>

      {/* Results & Social Proof */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Resultados & Prova Social</h2>
            <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
              +2.700
            </div>
            <p className="text-xl text-gray-300">clientes satisfeitos com resultados comprovados</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-gray-300 mb-4">"Meu FPS subiu drasticamente! Serviço profissional e rápido."</p>
              <p className="text-sm text-gray-400">— Gabriel M., CS:GO Player</p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-gray-300 mb-4">"Serviço seguro e confiável. Nenhum problema com banimentos."</p>
              <p className="text-sm text-gray-400">— Lucas S., Valorant Pro</p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-gray-300 mb-4">"Vale cada centavo. PC rodando como nunca!"</p>
              <p className="text-sm text-gray-400">— Amanda R., Streamer</p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-lg px-8 py-4">
              <div className="text-green-400 font-bold">Taxa de sucesso:</div>
              <div className="text-3xl font-bold text-white">98%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Pacote Único</h2>
            <p className="text-gray-400 text-lg">Otimização completa com tudo incluso</p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 border-2 border-cyan-500 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-red-600 text-white px-6 py-2 rounded-bl-lg font-bold text-sm">
                30% OFF
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Otimização ZeroDelay</h3>
                <p className="text-gray-300 mb-6">Tudo incluso: otimização completa, suporte via chat, relatório final</p>
                
                <div className="mb-6">
                  <div className="text-gray-400 line-through text-xl mb-2">R$ 49,99</div>
                  <div className="text-5xl font-bold text-white mb-2">R$ 34,99</div>
                  <div className="text-green-400 font-semibold">Cupom automático ZDEAL30</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Otimização completa do sistema",
                  "Calibração GPU e CPU",
                  "Limpeza de bloatware",
                  "Suporte 24/7 no Discord",
                  "Relatório final detalhado",
                  "Backup antes das alterações"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Discord size={20} />
                  Resgatar Cupom & Ir pro Discord
                </button>
                <a
                  href="https://discord.gg/cNWypfzT9y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink size={18} />
                  Pagar agora
                </a>
              </div>

              <div className="text-xs text-gray-400 text-center mt-4">
                Sem reembolso após execução do serviço (produto digital).<br />
                Resultados variam conforme hardware.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Detalhes Técnicos</h2>
            <p className="text-gray-400 text-lg">Veja exatamente o que fazemos no seu sistema</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Otimização de Processamento</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Priorização de processos de jogos</li>
                <li>• Configuração de núcleos da CPU</li>
                <li>• Desativação de telemetria do Windows</li>
                <li>• Ajustes no agendador de tarefas</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Otimização de Memória</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• RAM allocation dinâmica</li>
                <li>• Limpeza de cache, logs e bloatware</li>
                <li>• Configuração de arquivo de paginação</li>
                <li>• Otimização do registro do Windows</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Calibração GPU</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Ajustes de drivers otimizados</li>
                <li>• Configuração de latência de renderização</li>
                <li>• Otimização de V-Sync e G-Sync</li>
                <li>• Melhoria DirectX e OpenGL</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-orange-400">Sistema & Segurança</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Firewall básico configurado</li>
                <li>• Manutenção térmica preventiva</li>
                <li>• Desativação de serviços desnecessários</li>
                <li>• Configuração de energia otimizada</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-200">
              ⚠️ <strong>Aviso técnico:</strong> Não prometemos transformar hardware muito antigo em top-tier.<br />
              Removemos gargalos quando possível, mas limitações físicas do hardware se aplicam.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-gray-400 text-lg">Tire suas dúvidas sobre nosso serviço</p>
          </div>

          <FAQ />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
              <img 
                src="https://i.imgur.com/i8qm5mu.jpeg" 
                alt="ZeroDelay Logo" 
                className="h-8 w-8 rounded-lg"
              />
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  ZeroDelay
                </div>
                <div className="text-sm text-gray-400">+2.700 clientes atendidos</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Política de Privacidade</a>
              <a 
                href="https://discord.gg/cNWypfzT9y" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <Discord size={14} />
                Discord
              </a>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-gray-800 text-gray-400 text-sm">
            © 2024 ZeroDelay — Técnicos certificados • Atendimento rápido • Suporte Premium
          </div>
        </div>
      </footer>

      <CouponModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default App;