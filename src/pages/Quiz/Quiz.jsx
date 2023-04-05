import React, { useState } from "react";
import { Perguntas } from "../../pages/Quiz/data/perguntas";
import "./Quiz.css";

export function Quiz() {
  const questions = Perguntas ?? [];
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [showPontuacao, setShowPontuacao] = useState(false);
  const [pontos, setPontos] = useState(0);

  function proximaPergunta(correta) {
    const nextQuestion = perguntaAtual + 1;

    if (correta) {
      setPontos(pontos + 1);
    }

    if (nextQuestion < questions.length) {
      setPerguntaAtual(nextQuestion);
    } else {
      setShowPontuacao(true);
    }
  }

  return (
    <div className="quiz">
      <div className="card-quiz">
        {showPontuacao ? (
          <div className="pontuacao">
            <span>
              Sua pontuação é {pontos} de {questions.length}
            </span>
          </div>
        ) : (
          <>
            <div className="infoPerguntas">
              <div className="contagemPerguntas">
                <span>
                  Questão {perguntaAtual + 1}/{questions.length}
                </span>
              </div>
              <div className="pergunta">
                {questions[perguntaAtual].pergunta}
              </div>
            </div>
            <div className="resposta">
              {questions[perguntaAtual].opcoesResposta.map((opcoesResposta) => (
                <div className="grupoResposta">
                  <span></span>
                  <button
                    onClick={() => proximaPergunta(opcoesResposta.correta)}
                  >
                    {opcoesResposta.alternativa}
                    <br />
                    {opcoesResposta.resposta}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
