-- Criar tabela para rastrear ações do popup de pesquisa
CREATE TABLE IF NOT EXISTS survey_popup_actions (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255),
    phone VARCHAR(20),
    session_id VARCHAR(255),
    action_type VARCHAR(50) NOT NULL, -- 'popup_shown', 'click_survey', 'dismiss', 'later'
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    current_page VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_survey_popup_actions_email ON survey_popup_actions(email);
CREATE INDEX IF NOT EXISTS idx_survey_popup_actions_session_id ON survey_popup_actions(session_id);
CREATE INDEX IF NOT EXISTS idx_survey_popup_actions_action_type ON survey_popup_actions(action_type);
CREATE INDEX IF NOT EXISTS idx_survey_popup_actions_created_at ON survey_popup_actions(created_at);

-- Verificar se a tabela pesquisa_ai_code_pro existe, se não, criar
CREATE TABLE IF NOT EXISTS pesquisa_ai_code_pro (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    session_id VARCHAR(255),
    experiencia VARCHAR(100),
    interesse VARCHAR(100),
    desafio TEXT,
    objetivo TEXT,
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    utm_content VARCHAR(255),
    utm_term VARCHAR(255),
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar índices para a tabela de pesquisa
CREATE INDEX IF NOT EXISTS idx_pesquisa_ai_code_pro_email ON pesquisa_ai_code_pro(email);
CREATE INDEX IF NOT EXISTS idx_pesquisa_ai_code_pro_session_id ON pesquisa_ai_code_pro(session_id);
CREATE INDEX IF NOT EXISTS idx_pesquisa_ai_code_pro_created_at ON pesquisa_ai_code_pro(created_at);

-- Comentários para documentação
COMMENT ON TABLE survey_popup_actions IS 'Rastreia todas as ações relacionadas ao popup de pesquisa';
COMMENT ON COLUMN survey_popup_actions.action_type IS 'Tipo de ação: popup_shown, click_survey, dismiss, later';
COMMENT ON TABLE pesquisa_ai_code_pro IS 'Armazena respostas da pesquisa AI Code Pro';
