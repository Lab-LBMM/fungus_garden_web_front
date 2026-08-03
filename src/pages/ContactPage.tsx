import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Building2, HelpCircle } from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'colaboracao',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'colaboracao',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <div className="contact-page">
      <div className="contact-page__hero">
        <div className="contact-page__hero-content">
          <div className="contact-page__badge">
            <Mail size={16} />
            <span>Fale com os Pesquisadores</span>
          </div>
          <h1 className="contact-page__title">Contato & Colaboração Científica</h1>
          <p className="contact-page__subtitle">
            Dúvidas taxonômicas, sugestões de novos organismos, correções de metadados ou propostas de colaboração acadêmica com o LBMM - UNESP.
          </p>
        </div>
      </div>

      <div className="contact-page__container">
        <div className="contact-page__grid">
          {/* Form */}
          <div className="contact-card contact-card--form">
            <h2 className="contact-card__title">Enviar Mensagem</h2>
            <p className="contact-card__sub">Preencha os campos abaixo para entrar em contato diretamente com nossa equipe de curadoria.</p>

            {submitted ? (
              <div className="contact-page__success">
                <div className="contact-page__success-icon">
                  <CheckCircle2 size={48} />
                </div>
                <h3>Mensagem Enviada com Sucesso!</h3>
                <p>
                  Obrigado pelo seu contato. Sua mensagem foi recebida pela equipe do LBMM DB e responderemos em breve através do e-mail informado.
                </p>
                <button className="contact-page__btn contact-page__btn--outline" onClick={handleReset}>
                  Enviar Nova Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form__group">
                  <label htmlFor="contact-name" className="contact-form__label">
                    Nome Completo *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="contact-form__input"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="contact-email" className="contact-form__label">
                    E-mail Institucional ou Pessoal *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className="contact-form__input"
                    placeholder="seu.email@instituicao.br"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="contact-subject" className="contact-form__label">
                    Assunto / Tipo de Solicitação
                  </label>
                  <select
                    id="contact-subject"
                    className="contact-form__select"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="colaboracao">Proposta de Colaboração Científica</option>
                    <option value="dados">Correção ou Sugestão de Dados</option>
                    <option value="duvida">Dúvida Taxonômica ou Genômica</option>
                    <option value="outros">Outros Assuntos</option>
                  </select>
                </div>

                <div className="contact-form__group">
                  <label htmlFor="contact-message" className="contact-form__label">
                    Mensagem *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    className="contact-form__textarea"
                    placeholder="Descreva detalhadamente sua dúvida, sugestão ou proposta..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="contact-page__btn">
                  <Send size={16} />
                  Enviar Mensagem
                </button>
              </form>
            )}
          </div>

          {/* Info Side Sidebar */}
          <div className="contact-page__sidebar">
            <div className="contact-card">
              <h3 className="contact-info__title">Informações Institucionais</h3>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <Building2 size={20} />
                </div>
                <div>
                  <strong>Laboratório de Bioinformática e Multi-Ômicas de Microorganismos</strong>
                  <p>Departamento de Biologia Geral e Aplicada</p>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <strong>Endereço</strong>
                  <p>Av. 24A, 1515 - Bela Vista</p>
                  <p>Rio Claro - SP, CEP 13506-900, Brasil</p>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <Mail size={20} />
                </div>
                <div>
                  <strong>Atendimento Acadêmico</strong>
                  <p>labbmmicro@gmail.com</p>
                  <p>rac.santos@unesp.br</p>
                </div>
              </div>

              
            </div>

            <div className="contact-card contact-card--help">
              <div className="contact-info__item">
                <div className="contact-info__icon contact-info__icon--slate">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <strong>Submissão de Novos Organismos</strong>
                  <p className="contact-card__sub-text">
                    Se você é pesquisador e deseja submeter dados de sequenciamento de novos simbiontes ou formigas, utilize o tipo de solicitação "Proposta de Colaboração".
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
